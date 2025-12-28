'use client'

import { Flex } from '.'
import type { Ref } from 'react'

export interface RowProps extends React.ComponentProps<typeof Flex> {
	children?: React.ReactNode
	ref?: Ref<HTMLDivElement>
}

function Row({ children, ref, ...rest }: RowProps) {
	return (
		<Flex
			ref={ref}
			{...rest}
		>
			{children}
		</Flex>
	)
}

Row.displayName = 'Row'

export { Row }
