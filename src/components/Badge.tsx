"use client";

import classNames from "classnames";
import React from "react";
import type { IconName } from "../icons";
import { Arrow, Flex, Icon, SmartLink } from ".";
import styles from "./Badge.module.css";

export interface BadgeProps extends Omit<React.ComponentProps<typeof Flex>, "ref"> {
  title?: string;
  icon?: IconName;
  arrow?: boolean;
  children?: React.ReactNode;
  href?: string;
  effect?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  ref?: React.Ref<HTMLDivElement | HTMLAnchorElement>;
}

function Badge({
  title,
  icon,
  href,
  arrow = !!href,
  children,
  effect = true,
  className,
  style,
  id,
  ref,
  ...rest
}: BadgeProps) {
  const content = (
    <Flex
      id={id || "badge"}
      paddingX="20"
      paddingY="12"
      fitWidth
      className={classNames(effect ? styles.animation : undefined, className)}
      style={style}
      vertical="center"
      radius="full"
      background="neutral-weak"
      onBackground="brand-strong"
      border="brand-alpha-medium"
      textVariant="label-strong-s"
      {...rest}
    >
      {icon && <Icon marginRight="8" size="s" name={icon} onBackground="brand-medium" />}
      {title}
      {children}
      {arrow && <Arrow trigger={`#${id || "badge"}`} />}
    </Flex>
  );

  if (href) {
    return (
      <SmartLink
        unstyled
        className={className}
        style={{
          borderRadius: "var(--radius-full)",
          ...style,
        }}
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </SmartLink>
    );
  }

  return React.cloneElement(content, {
    ref: ref as React.Ref<HTMLDivElement>,
  });
}

Badge.displayName = "Badge";
export { Badge };
