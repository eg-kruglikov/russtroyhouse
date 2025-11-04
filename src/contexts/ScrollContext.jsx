import React, { createContext, useContext } from "react";

const ScrollContext = createContext(null);

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children, scrollFunctions }) => {
  return (
    <ScrollContext.Provider value={scrollFunctions}>
      {children}
    </ScrollContext.Provider>
  );
};

