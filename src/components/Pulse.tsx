'use client'

import { Row } from '.'
import type { ColorScheme, CondensedTShirtSizes } from '../types'
import styles from './Pulse.module.css'
import type { ReactNode } from 'react'

interface PulseProps extends React.ComponentProps<typeof Row> {
	variant?: ColorScheme
	size?: CondensedTShirtSizes
	children?: ReactNode
	className?: string
	style?: React.CSSProperties
	ref?: React.Ref<HTMLDivElement>
}

function Pulse({
	children,
	className,
	style,
	size = 'm',
	variant = 'brand',
	ref,
	...flex
}: PulseProps) {
	return (
		<Row
			ref={ref}
			minWidth={size === 's' ? '16' : size === 'm' ? '24' : '32'}
			minHeight={size === 's' ? '16' : size === 'm' ? '24' : '32'}
			center
			data-solid="color"
			className={className}
			style={style}
			{...flex}
		>
			<Row
				position="absolute"
				className={styles.position}
			>
				<Row
					solid={`${variant}-medium`}
					radius="full"
					className={styles.dot}
					width={size === 's' ? '32' : size === 'm' ? '48' : '64'}
					height={size === 's' ? '32' : size === 'm' ? '48' : '64'}
				/>
			</Row>
			<Row
				solid={`${variant}-strong`}
				minWidth={size === 's' ? '4' : size === 'm' ? '8' : '12'}
				minHeight={size === 's' ? '4' : size === 'm' ? '8' : '12'}
				radius="full"
			/>
		</Row>
	)
}

Pulse.displayName = 'Pulse'
export { Pulse }
