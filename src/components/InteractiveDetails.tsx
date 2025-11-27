"use client";

import type React from "react";
import { Column, IconButton, type IconButtonProps, Row, Text } from ".";

interface InteractiveDetailsProps {
  ref?: React.Ref<HTMLDivElement>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  iconButtonProps?: IconButtonProps;
  onClick: () => void;
  className?: string;
  id?: string;
}

function InteractiveDetails({
  ref,
  label,
  description,
  iconButtonProps,
  onClick,
  className,
  id,
  disabled,
}: InteractiveDetailsProps) {
  return (
    <Column
      ref={ref}
      cursor={disabled ? "not-allowed" : undefined}
      className={className}
      onClick={onClick}
      id={id}
    >
      <Row gap="4" vertical="center">
        <Text
          as="span"
          variant="label-default-m"
          onBackground={disabled ? "neutral-weak" : "neutral-strong"}
        >
          {label}
        </Text>
        {iconButtonProps?.tooltip && (
          <IconButton
            size="s"
            variant="ghost"
            icon="help"
            {...iconButtonProps}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              iconButtonProps?.onClick?.(e);
            }}
          />
        )}
      </Row>
      {description && (
        <Text as="span" variant="body-default-s" onBackground="neutral-weak">
          {description}
        </Text>
      )}
    </Column>
  );
}

InteractiveDetails.displayName = "InteractiveDetails";

export { InteractiveDetails };
export type { InteractiveDetailsProps };
