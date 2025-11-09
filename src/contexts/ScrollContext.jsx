import React, { createContext, useContext, useMemo, useState } from "react";

const ScrollContext = createContext({
  scrollFunctions: null,
  setScrollFunctions: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const [scrollFunctions, setScrollFunctions] = useState(null);

  const value = useMemo(
    () => ({
      scrollFunctions,
      setScrollFunctions,
    }),
    [scrollFunctions]
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

