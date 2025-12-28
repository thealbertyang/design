'use client'

import { Flex } from '.'
import styles from './Card.module.css'
import { ElementType } from './ElementType'
import classNames from 'classnames'
import type React from 'react'

interface CardProps extends React.ComponentProps<typeof Flex> {
	children?: React.ReactNode
	href?: string
	onClick?: () => void
	fillHeight?: boolean
	style?: React.CSSProperties
	className?: string
	ref?: React.Ref<HTMLDivElement>
}

function Card({ children, href, onClick, style, className, fillHeight, ref, ...flex }: CardProps) {
	return (
		<ElementType
			tabIndex={onClick || href ? 0 : undefined}
			className={classNames(
				'reset-button-styles',
				'display-flex',
				'fill-width',
				fillHeight ? 'fill-height' : undefined,
				'min-width-0',
				(onClick || href) && 'focus-ring',
				(onClick || href) && (flex.radius ? `radius-${flex.radius}` : 'radius-l')
			)}
			href={href}
			onClick={onClick && onClick}
			role={onClick ? 'button' : href ? 'link' : 'none'}
			ref={ref}
		>
			<Flex
				background="surface"
				onBackground="neutral-strong"
				transition="macro-medium"
				border="neutral-medium"
				cursor="interactive"
				align="left"
				onClick={onClick && onClick}
				className={classNames(styles.card, className)}
				style={{ ...style }}
				{...flex}
			>
				{children}
			</Flex>
		</ElementType>
	)
}

Card.displayName = 'Card'
export { Card }
