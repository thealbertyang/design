'use client'

import { type Flex, Icon, Row, Text } from '.'
import type { IconName } from '../icons'
import styles from './Tag.module.css'
import type { ColorScheme } from '@/types'
import classNames from 'classnames'
import type React from 'react'
import type { ReactNode } from 'react'

interface TagProps extends React.ComponentProps<typeof Flex> {
	variant?: ColorScheme | 'gradient'
	size?: 's' | 'm' | 'l'
	label?: string
	prefixIcon?: IconName
	suffixIcon?: IconName
	children?: ReactNode
	ref?: React.Ref<HTMLDivElement>
}

function Tag({
	variant = 'neutral',
	size = 'm',
	label = '',
	prefixIcon,
	suffixIcon,
	className,
	children,
	ref,
	...rest
}: TagProps) {
	const paddingX = size === 's' ? '8' : size === 'm' ? '8' : '12'
	const paddingY = size === 's' ? '1' : size === 'm' ? '2' : '4'

	return (
		<Row
			fitWidth
			background={variant !== 'gradient' ? (`${variant}-weak` as const) : undefined}
			border={variant !== 'gradient' ? (`${variant}-alpha-medium` as const) : 'brand-medium'}
			onBackground={variant !== 'gradient' ? (`${variant}-medium` as const) : undefined}
			paddingX={paddingX}
			paddingY={paddingY}
			vertical="center"
			radius="s"
			gap="4"
			ref={ref}
			className={classNames(
				styles.tag,
				variant === 'gradient' ? styles.gradient : undefined,
				className
			)}
			{...rest}
		>
			{prefixIcon && (
				<Icon
					name={prefixIcon}
					size="xs"
				/>
			)}
			<Row
				style={{ userSelect: 'none' }}
				vertical="center"
			>
				<Text variant="label-default-s">{label || children}</Text>
			</Row>
			{suffixIcon && (
				<Icon
					name={suffixIcon}
					size="xs"
				/>
			)}
		</Row>
	)
}

Tag.displayName = 'Tag'

export { Tag }
export type { TagProps }
