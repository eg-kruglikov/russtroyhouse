import { useCallback, useEffect, useMemo, useRef } from "react";
import { ymGoal } from "../utils/metrika";

const STORAGE_KEY = "metrikaEngagementState";
const GOALS = [
  { name: "engagement_soft", minSeconds: 60, minPages: 1, minScroll: 75 },
  { name: "engagement_medium", minSeconds: 120, minPages: 2, minScroll: 75 },
  { name: "engagement_deep", minSeconds: 180, minPages: 3, minScroll: 75 },
];

const isBrowser =
  typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";

const createDefaultState = () => ({
  sessionStart: isBrowser ? Date.now() : 0,
  elapsedSeconds: 0,
  pageCount: 1,
  maxScroll: 0,
  triggered: GOALS.reduce(
    (acc, goal) => ({
      ...acc,
      [goal.name]: false,
    }),
    {}
  ),
});

const loadState = () => {
  if (!isBrowser) {
    return createDefaultState();
  }

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultState();
    }

    const parsed = JSON.parse(raw);
    return {
      ...createDefaultState(),
      ...parsed,
      triggered: {
        ...createDefaultState().triggered,
        ...(parsed?.triggered || {}),
      },
    };
  } catch (error) {
    console.warn("Failed to load engagement state:", error);
    return createDefaultState();
  }
};

const saveState = (state) => {
  if (!isBrowser) return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save engagement state:", error);
  }
};

const hasStateChanged = (prev, next) => {
  if (!prev || !next) return true;
  if (
    prev.sessionStart !== next.sessionStart ||
    prev.elapsedSeconds !== next.elapsedSeconds ||
    prev.pageCount !== next.pageCount ||
    prev.maxScroll !== next.maxScroll
  ) {
    return true;
  }

  return GOALS.some(
    (goal) => prev.triggered[goal.name] !== next.triggered[goal.name]
  );
};

export const useEngagementGoals = () => {
  const stateRef = useRef(loadState());
  const rafRef = useRef(null);

  const evaluateAndPersist = useCallback((candidate) => {
    const nextState = {
      ...candidate,
      triggered: { ...candidate.triggered },
    };

    let goalTriggered = false;

    GOALS.forEach((goal) => {
      if (
        !nextState.triggered[goal.name] &&
        nextState.elapsedSeconds >= goal.minSeconds &&
        nextState.pageCount >= goal.minPages &&
        nextState.maxScroll >= goal.minScroll
      ) {
        ymGoal(goal.name, {
          elapsedSeconds: nextState.elapsedSeconds,
          pageCount: nextState.pageCount,
          maxScroll: nextState.maxScroll,
        });
        nextState.triggered[goal.name] = true;
        goalTriggered = true;
      }
    });

    if (goalTriggered || hasStateChanged(stateRef.current, nextState)) {
      stateRef.current = nextState;
      saveState(nextState);
    }
  }, []);

  const updateState = useCallback(
    (patch) => {
      const current = stateRef.current;
      const candidate = {
        ...current,
        ...patch,
        triggered: { ...current.triggered, ...(patch?.triggered || {}) },
      };

      // Если сессия не была сохранена ранее (например, при восстановлении из sessionStorage)
      if (!candidate.sessionStart) {
        candidate.sessionStart = Date.now();
      }

      evaluateAndPersist(candidate);
    },
    [evaluateAndPersist]
  );

  useEffect(() => {
    evaluateAndPersist(stateRef.current);
  }, [evaluateAndPersist]);

  useEffect(() => {
    if (!isBrowser) return;

    const tick = () => {
      const start = stateRef.current.sessionStart || Date.now();
      const elapsed = Math.max(0, Math.floor((Date.now() - start) / 1000));

      if (elapsed !== stateRef.current.elapsedSeconds) {
        updateState({ elapsedSeconds: elapsed });
      }
    };

    const interval = window.setInterval(tick, 5000);
    tick();

    return () => window.clearInterval(interval);
  }, [updateState]);

  useEffect(() => {
    if (!isBrowser) return;

    const updateScrollDepth = () => {
      const { documentElement } = document;
      if (!documentElement) return;

      const scrollTop = window.scrollY || documentElement.scrollTop || 0;
      const viewportHeight =
        window.innerHeight || documentElement.clientHeight || 0;
      const scrollHeight = documentElement.scrollHeight || 0;

      if (scrollHeight === 0) return;

      const depth = Math.min(
        100,
        Math.round(((scrollTop + viewportHeight) / scrollHeight) * 100)
      );

      if (depth > stateRef.current.maxScroll) {
        updateState({ maxScroll: depth });
      }
    };

    const handleScroll = () => {
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        updateScrollDepth();
      });
    };

    updateScrollDepth();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateState]);

  const registerPageCount = useCallback(
    (pageCount) => {
      if (!isBrowser) return;

      const normalized =
        Number.isFinite(pageCount) && pageCount > 0 ? pageCount : 1;

      if (normalized !== stateRef.current.pageCount) {
        updateState({ pageCount: normalized });
      } else {
        evaluateAndPersist(stateRef.current);
      }
    },
    [evaluateAndPersist, updateState]
  );

  return useMemo(
    () => ({
      registerPageCount,
      getState: () => stateRef.current,
    }),
    [registerPageCount]
  );
};

export default useEngagementGoals;
