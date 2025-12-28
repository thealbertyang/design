'use client'

import { Arrow, Flex, Icon, SmartLink } from '.'
import type { IconName } from '../icons'
import styles from './Badge.module.css'
import classNames from 'classnames'
import React from 'react'

interface BadgeLinkProps extends Omit<React.ComponentProps<typeof Flex>, 'ref'> {
	title?: string
	icon?: IconName
	arrow?: boolean
	children?: React.ReactNode
	href: string
	effect?: boolean
	className?: string
	style?: React.CSSProperties
	id?: string
	ref?: React.Ref<HTMLAnchorElement>
}

interface BadgeDivProps extends Omit<React.ComponentProps<typeof Flex>, 'ref'> {
	title?: string
	icon?: IconName
	arrow?: boolean
	children?: React.ReactNode
	href?: undefined
	effect?: boolean
	className?: string
	style?: React.CSSProperties
	id?: string
	ref?: React.Ref<HTMLDivElement>
}

export type BadgeProps = BadgeLinkProps | BadgeDivProps

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
	const badgeId = id || 'badge'

	const innerContent = (
		<>
			{icon && (
				<Icon
					marginRight="8"
					size="s"
					name={icon}
					onBackground="brand-medium"
				/>
			)}
			{title}
			{children}
			{arrow && <Arrow trigger={`#${badgeId}`} />}
		</>
	)

	const flexProps = {
		id: badgeId,
		paddingX: '20' as const,
		paddingY: '12' as const,
		fitWidth: true,
		className: classNames(effect ? styles.animation : undefined, className),
		style,
		vertical: 'center' as const,
		radius: 'full' as const,
		background: 'neutral-weak' as const,
		onBackground: 'brand-strong' as const,
		border: 'brand-alpha-medium' as const,
		textVariant: 'label-strong-s' as const,
		...rest,
	}

	if (href) {
		return (
			<SmartLink
				unstyled
				className={className}
				style={{
					borderRadius: 'var(--radius-full)',
					...style,
				}}
				href={href}
				ref={ref}
			>
				<Flex {...flexProps}>{innerContent}</Flex>
			</SmartLink>
		)
	}

	return (
		<Flex
			{...flexProps}
			ref={ref}
		>
			{innerContent}
		</Flex>
	)
}

Badge.displayName = 'Badge'
export { Badge }
