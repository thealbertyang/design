"use client";

import type { Placement } from "@floating-ui/react-dom";
import classNames from "classnames";
import type React from "react";
import { Column, DropdownWrapper, type DropdownWrapperProps, User, type UserProps } from ".";
import styles from "./UserMenu.module.css";

interface UserMenuProps
  extends UserProps,
    Pick<DropdownWrapperProps, "minHeight" | "minWidth" | "maxWidth"> {
  selected?: boolean;
  placement?: Placement;
  dropdown?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const UserMenu: React.FC<UserMenuProps> = ({
  selected = false,
  dropdown,
  minWidth,
  maxWidth,
  minHeight,
  placement,
  className,
  style,
  loading,
  ...userProps
}) => {
  return (
    <DropdownWrapper
      minWidth={minWidth}
      maxWidth={maxWidth}
      minHeight={minHeight}
      placement={placement}
      disableTriggerClick={loading}
      style={{
        borderRadius: "var(--radius-full)",
      }}
      trigger={
        <Column
          tabIndex={loading ? -1 : 0}
          padding="4"
          radius="full"
          cursor={loading ? "default" : "interactive"}
          border={selected ? "neutral-medium" : "transparent"}
          background={selected ? "neutral-strong" : "transparent"}
          pointerEvents={loading ? "none" : "auto"}
          className={classNames(className || "", selected ? styles.selected : "", styles.wrapper)}
          style={style}
        >
          <User loading={loading} {...userProps} />
        </Column>
      }
      dropdown={dropdown}
    />
  );
};

UserMenu.displayName = "UserMenu";
export { UserMenu };
