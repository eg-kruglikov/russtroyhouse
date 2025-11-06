import React, { createContext, useContext, useState } from "react";

const PhoneIconContext = createContext();

export const PhoneIconProvider = ({ children }) => {
  const [isScrolledToEnd, setIsScrolledToEnd] = useState(false);

  return (
    <PhoneIconContext.Provider value={{ isScrolledToEnd, setIsScrolledToEnd }}>
      {children}
    </PhoneIconContext.Provider>
  );
};

export const usePhoneIconContext = () => {
  const context = useContext(PhoneIconContext);
  if (!context) {
    return { isScrolledToEnd: false, setIsScrolledToEnd: () => {} };
  }
  return context;
};


