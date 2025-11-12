import React, { createContext, useContext, useMemo, useState } from "react";

const ScrollContext = createContext({
  scrollFunctions: null,
  setScrollFunctions: () => {},
  activeScrollKey: null,
  setActiveScrollKey: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const [scrollFunctions, setScrollFunctions] = useState(null);
  const [activeScrollKey, setActiveScrollKey] = useState(null);

  const value = useMemo(
    () => ({
      scrollFunctions,
      setScrollFunctions,
      activeScrollKey,
      setActiveScrollKey,
    }),
    [scrollFunctions, activeScrollKey]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

