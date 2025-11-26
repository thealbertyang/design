"use client";

import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";
import { Text } from ".";
import styles from "./List.module.css";

interface ListItemProps extends React.ComponentProps<typeof Text> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  ({ className, children, style, ...props }, ref) => {
    const listItemClass = classNames(styles.listItem, className);

    return (
      <Text
        as="li"
        paddingY="0"
        paddingRight="0"
        paddingLeft="8"
        className={listItemClass}
        style={style}
        {...props}
      >
        {children}
      </Text>
    );
  },
);

ListItem.displayName = "ListItem";
export { ListItem };
