'use client'

import { Flex } from '.'
import styles from './Skeleton.module.css'
import classNames from 'classnames'
import type React from 'react'

interface SkeletonProps extends React.ComponentProps<typeof Flex> {
	shape: 'line' | 'circle' | 'block'
	width?: 'xl' | 'l' | 'm' | 's' | 'xs'
	height?: 'xl' | 'l' | 'm' | 's' | 'xs'
	delay?: '1' | '2' | '3' | '4' | '5' | '6'
	style?: React.CSSProperties
	className?: string
	ref?: React.Ref<HTMLDivElement>
}

function Skeleton({
	shape = 'line',
	width = 'm',
	height = 'm',
	delay,
	style,
	className,
	ref,
	...props
}: SkeletonProps) {
	return (
		<Flex
			{...props}
			ref={ref}
			style={style}
			radius={shape === 'line' || shape === 'circle' ? 'full' : undefined}
			inline
			className={classNames(
				styles.skeleton,
				styles[shape],
				width && styles[`w-${width}`],
				height && styles[`h-${height}`],
				delay && styles[`delay-${delay}`],
				className
			)}
		/>
	)
}

Skeleton.displayName = 'Skeleton'

export { Skeleton }
