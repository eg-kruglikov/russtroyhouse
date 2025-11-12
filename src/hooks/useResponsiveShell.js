import { useEffect, useMemo, useState } from "react";

const SIDEBAR_MIN_WIDTH = 180;
const SIDEBAR_MAX_WIDTH = 230;
const RIGHT_GUTTER_MIN = 100;
const LAYOUT_PADDING_MOBILE = 0;
const LAYOUT_PADDING_DESKTOP = 32;

const clamp = (value, min, max) => {
  if (max !== undefined) {
    return Math.min(Math.max(value, min), max);
  }
  return Math.max(value, min);
};

const computeContentWidth = (viewportWidth, viewportHeight, layoutPadding) => {
  const desiredWidth = Math.min(
    950,
    viewportHeight ? viewportHeight / 1.3 : 950
  );
  if (!viewportWidth || viewportWidth <= 0) {
    return Math.round(desiredWidth);
  }

  const maxContentWidth = Math.max(0, viewportWidth - (layoutPadding || 0) * 2);
  if (maxContentWidth === 0) {
    return Math.round(Math.min(desiredWidth, viewportWidth));
  }

  const minWidth = Math.min(360, maxContentWidth);
  const limitedWidth = Math.min(desiredWidth, maxContentWidth);
  return Math.round(Math.max(minWidth, limitedWidth));
};

const computeLayoutState = (viewportWidth, viewportHeight) => {
  const layoutPadding =
    viewportWidth && viewportWidth < 768
      ? LAYOUT_PADDING_MOBILE
      : LAYOUT_PADDING_DESKTOP;

  const contentWidth = computeContentWidth(
    viewportWidth,
    viewportHeight,
    layoutPadding
  );

  const safeViewportWidth = Math.max(0, viewportWidth || 0);
  const availableHorizontalSpace = Math.max(
    0,
    safeViewportWidth - contentWidth - layoutPadding * 2
  );

  const showSidebar =
    availableHorizontalSpace >= SIDEBAR_MIN_WIDTH + RIGHT_GUTTER_MIN;

  let sidebarWidth = 0;

  if (showSidebar) {
    const sidebarCandidate = availableHorizontalSpace - RIGHT_GUTTER_MIN;
    sidebarWidth = clamp(
      sidebarCandidate,
      SIDEBAR_MIN_WIDTH,
      SIDEBAR_MAX_WIDTH
    );
  }

  return {
    viewportWidth: safeViewportWidth,
    viewportHeight: viewportHeight || 0,
    contentWidth,
    layoutPadding,
    showSidebar,
    sidebarWidth,
  };
};

export const useResponsiveShell = () => {
  const [viewport, setViewport] = useState(() => {
    if (typeof window === "undefined") {
      return { width: 0, height: 0 };
    }
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const layoutState = useMemo(
    () => computeLayoutState(viewport.width, viewport.height),
    [viewport.width, viewport.height]
  );

  return layoutState;
};
