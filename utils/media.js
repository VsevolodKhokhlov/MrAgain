import React, { useContext, useEffect, useState } from "react";
import { css } from "styled-components";

export const sizes = {
  uhd: 1980,
  widescreen: 1366,
  desktop: 1024,
  tablet: 768,
  mobile: 420,
};

export function getScreenSize() {
  const sizeAsArr = Object.keys(sizes).sort(
    (key1, key2) => sizes[key1] - sizes[key2]
  );
  const index = sizeAsArr.findIndex((key) => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia(`(max-width: ${sizes[key]}px)`).matches;
  });

  return sizeAsArr[index] || "uhd";
}

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;
  return acc;
}, {});

const ScreenSizeContext = React.createContext();

export function useScreenSize() {
  return useContext(ScreenSizeContext);
}

export function ScreenSizeProvider({ children }) {
  const [size, updateSize] = useState();
  useEffect(() => {
    updateSize(getScreenSize());
    setInterval(() => {
      const newSize = getScreenSize();
      if (newSize === size) {
        return;
      }
      updateSize(newSize);
    }, 400);
  }, []);

  return (
    <ScreenSizeContext.Provider value={{ size }}>
      {children}
    </ScreenSizeContext.Provider>
  );
}

export function OnMobile({ children, show = true, only = false }) {
  const isMobile = useScreenSize().size === "mobile";

  if (isMobile) {
    if (show) {
      return children || null;
    }

    return null;
  }

  if (only) {
    return null;
  }

  return children || null;
}
