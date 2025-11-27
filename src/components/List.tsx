"use client";

import type React from "react";
import { Column } from ".";

interface ListProps extends React.ComponentProps<typeof Column> {
  as?: "ul" | "ol";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

function List({ as = "ul", className, children, style, ref, ...props }: ListProps) {
  if (as === "ol") {
    return (
      <Column
        as="ol"
        fillWidth
        margin="0"
        paddingY="0"
        paddingRight="0"
        paddingLeft="20"
        ref={ref}
        className={className}
        style={style}
        {...props}
      >
        {children}
      </Column>
    );
  }

  return (
    <Column
      as="ul"
      fillWidth
      margin="0"
      paddingY="0"
      paddingRight="0"
      paddingLeft="20"
      ref={ref}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Column>
  );
}

List.displayName = "List";
export { List };
