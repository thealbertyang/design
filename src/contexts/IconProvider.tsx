"use client";

import { createContext, useContext } from "react";
import { iconLibrary as defaultIcons, type IconLibrary } from "../icons";

export const IconContext = createContext<{
  icons: IconLibrary;
}>({
  icons: defaultIcons,
});

export const IconProvider = ({
  icons,
  children,
}: {
  icons?: Partial<IconLibrary>;
  children: React.ReactNode;
}) => {
  const mergedIcons = icons
    ? (Object.assign({}, defaultIcons, icons) as IconLibrary)
    : defaultIcons;

  return <IconContext.Provider value={{ icons: mergedIcons }}>{children}</IconContext.Provider>;
};

export const useIcons = () => useContext(IconContext);
