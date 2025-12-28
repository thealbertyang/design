'use client'

import { Flex } from '.'
import type { Ref } from 'react'

export interface ColumnProps extends React.ComponentProps<typeof Flex> {
	children?: React.ReactNode
	ref?: Ref<HTMLDivElement>
}

function Column({ children, ref, ...rest }: ColumnProps) {
	return (
		<Flex
			direction="column"
			ref={ref}
			{...rest}
		>
			{children}
		</Flex>
	)
}

Column.displayName = 'Column'

export { Column }
