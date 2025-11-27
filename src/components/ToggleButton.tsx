"use client";

import classNames from "classnames";
import type React from "react";
import type { ReactNode } from "react";
import type { IconName } from "../icons";
import { ElementType, Flex, Icon } from ".";
import styles from "./ToggleButton.module.css";

interface CommonProps {
  label?: ReactNode;
  selected?: boolean;
  variant?: "ghost" | "outline";
  size?: "s" | "m" | "l";
  radius?:
    | "none"
    | "top"
    | "right"
    | "bottom"
    | "left"
    | "top-left"
    | "top-right"
    | "bottom-right"
    | "bottom-left";
  horizontal?: "start" | "center" | "end" | "between";
  fillWidth?: boolean;
  weight?: "default" | "strong";
  truncate?: boolean;
  prefixIcon?: IconName;
  suffixIcon?: IconName;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  href?: string;
  ref?: React.Ref<HTMLElement>;
}

export type ToggleButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

function ToggleButton({
  label,
  selected = false,
  variant = "ghost",
  size = "m",
  radius,
  horizontal = "center",
  fillWidth = false,
  weight = "default",
  truncate = false,
  prefixIcon,
  suffixIcon,
  className,
  style,
  children,
  href,
  ref,
  ...props
}: ToggleButtonProps) {
  return (
    <ElementType
      ref={ref}
      href={href}
      className={classNames(
        styles.button,
        styles[variant],
        styles[size],
        selected && styles.selected,
        radius === "none" ? "radius-none" : radius ? `radius-${size}-${radius}` : `radius-${size}`,
        "text-decoration-none",
        "button",
        "cursor-interactive",
        {
          "fill-width": fillWidth,
          "fit-width": !fillWidth,
          [`justify-${horizontal}`]: horizontal,
        },
        className,
      )}
      style={style}
      {...props}
    >
      {prefixIcon && <Icon name={prefixIcon} size={size === "l" ? "s" : "xs"} />}
      {(label || children) && (
        <Flex
          fillWidth={fillWidth}
          horizontal={horizontal}
          textWeight={weight}
          paddingX={size === "s" ? "2" : "4"}
          textSize={size === "l" ? "m" : "s"}
          className="font-label"
          position="static"
        >
          {label || children}
        </Flex>
      )}
      {suffixIcon && <Icon name={suffixIcon} size={size === "l" ? "s" : "xs"} />}
    </ElementType>
  );
}

ToggleButton.displayName = "ToggleButton";
export { ToggleButton };
