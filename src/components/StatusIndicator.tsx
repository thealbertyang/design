import classNames from "classnames";
import type React from "react";
import { Flex } from ".";
import styles from "./StatusIndicator.module.css";

interface StatusIndicatorProps extends React.ComponentProps<typeof Flex> {
  size?: "s" | "m" | "l";
  color:
    | "blue"
    | "indigo"
    | "violet"
    | "magenta"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "moss"
    | "green"
    | "emerald"
    | "aqua"
    | "cyan"
    | "gray";
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<HTMLDivElement>;
}

function StatusIndicator({
  size = "m",
  color = "blue",
  ariaLabel = `${color} status indicator`,
  className,
  style,
  ref,
  ...rest
}: StatusIndicatorProps) {
  return (
    <Flex
      ref={ref}
      style={style}
      className={classNames(styles.statusIndicator, styles[size], styles[color], className)}
      aria-label={ariaLabel}
      radius="full"
      {...rest}
    />
  );
}

StatusIndicator.displayName = "StatusIndicator";

export { StatusIndicator };
