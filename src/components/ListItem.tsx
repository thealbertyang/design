"use client";

import classNames from "classnames";
import type React from "react";
import { Text } from ".";
import styles from "./List.module.css";

interface ListItemProps extends React.ComponentProps<typeof Text> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLLIElement>;
}

function ListItem({ className, children, style, ref, ...props }: ListItemProps) {
  const listItemClass = classNames(styles.listItem, className);

  return (
    <Text
      as="li"
      paddingY="0"
      paddingRight="0"
      paddingLeft="8"
      className={listItemClass}
      style={style}
      ref={ref}
      {...props}
    >
      {children}
    </Text>
  );
}

ListItem.displayName = "ListItem";
export { ListItem };
