'use client'

import { Flex, HoverCard, Icon, Tooltip } from '.'
import type { IconName } from '../icons'
import buttonStyles from './Button.module.css'
import { ElementType } from './ElementType'
import iconStyles from './IconButton.module.css'
import classNames from 'classnames'
import type React from 'react'
import type { ReactNode } from 'react'

interface CommonProps {
	icon?: IconName
	id?: string
	size?: 's' | 'm' | 'l'
	radius?:
		| 'none'
		| 'top'
		| 'right'
		| 'bottom'
		| 'left'
		| 'top-left'
		| 'top-right'
		| 'bottom-right'
		| 'bottom-left'
	tooltip?: string
	tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'
	variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost'
	className?: string
	style?: React.CSSProperties
	href?: string
	children?: ReactNode
	ref?: React.Ref<HTMLButtonElement>
}

export type IconButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

function IconButton({
	icon = 'refresh',
	size = 'm',
	id,
	radius,
	tooltip,
	tooltipPosition = 'top',
	variant = 'primary',
	href,
	children,
	className,
	style,
	ref,
	...props
}: IconButtonProps | AnchorProps) {
	const radiusSize = size === 's' || size === 'm' ? 'm' : 'l'

	const button = (
		<ElementType
			id={id}
			href={href}
			ref={ref}
			className={classNames(
				buttonStyles.button,
				buttonStyles[variant],
				iconStyles[size],
				className,
				radius === 'none'
					? 'radius-none'
					: radius
						? `radius-${radiusSize}-${radius}`
						: `radius-${radiusSize}`,
				'text-decoration-none',
				'button',
				'cursor-interactive',
				className
			)}
			style={style}
			aria-label={tooltip || icon}
			{...props}
		>
			<Flex
				fill
				center
			>
				{children ? (
					children
				) : (
					<Icon
						name={icon}
						size="s"
					/>
				)}
			</Flex>
		</ElementType>
	)

	if (tooltip) {
		return (
			<HoverCard
				trigger={button}
				placement={tooltipPosition}
				fade={0}
				scale={0.9}
				duration={200}
				offsetDistance="4"
			>
				<Tooltip label={tooltip} />
			</HoverCard>
		)
	}

	return button
}

IconButton.displayName = 'IconButton'
export { IconButton }
