import { Flex } from '.'
import Link from 'next/link'
import type React from 'react'
import type { ReactNode } from 'react'

interface ElementTypeProps {
	href?: string
	onClick?: React.MouseEventHandler<HTMLElement>
	onLinkClick?: () => void
	children: ReactNode
	className?: string
	style?: React.CSSProperties
	type?: 'button' | 'submit' | 'reset' | (string & {})
	ref?: React.Ref<HTMLElement>
	[key: string]: unknown
}

const isExternalLink = (url: string) => /^https?:\/\//.test(url)

function ElementType({
	href,
	type,
	onClick,
	onLinkClick,
	children,
	className,
	style,
	ref,
	...props
}: ElementTypeProps) {
	if (href) {
		const isExternal = isExternalLink(href)
		if (isExternal) {
			return (
				<a
					href={href}
					target="_blank"
					rel="noreferrer"
					ref={ref as React.Ref<HTMLAnchorElement>}
					className={className}
					style={style}
					onClick={() => onLinkClick?.()}
					{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{children}
				</a>
			)
		}
		return (
			<Link
				href={href}
				prefetch={true}
				className={className}
				style={style}
				onClick={() => onLinkClick?.()}
				{...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
			>
				{children}
			</Link>
		)
	}

	if (onClick || type === 'submit' || type === 'button') {
		return (
			<button
				ref={ref as React.Ref<HTMLButtonElement>}
				className={className}
				onClick={onClick}
				style={style}
				type={type as 'button' | 'submit' | 'reset' | undefined}
				{...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
			>
				{children}
			</button>
		)
	}

	return (
		<Flex
			ref={ref as React.Ref<HTMLDivElement>}
			className={className}
			style={style}
			{...(props as React.HTMLAttributes<HTMLDivElement>)}
		>
			{children}
		</Flex>
	)
}

ElementType.displayName = 'ElementType'
export { ElementType }
