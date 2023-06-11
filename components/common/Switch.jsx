import React, { createContext, useContext } from "react";

const Context = createContext();

export default function Switch({ value, children }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function Case({ value, children }) {
  const contextValue = useContext(Context);

  if (contextValue !== value) {
    return null;
  }

  return children || null;
}

Switch.Case = Case;
