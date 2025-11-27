"use client";

import type { Ref } from "react";
import { Flex } from ".";

export interface ColumnProps extends React.ComponentProps<typeof Flex> {
  children?: React.ReactNode;
  ref?: Ref<HTMLDivElement>;
}

function Column({ children, ref, ...rest }: ColumnProps) {
  return (
    <Flex direction="column" ref={ref} {...rest}>
      {children}
    </Flex>
  );
}

Column.displayName = "Column";

export { Column };
