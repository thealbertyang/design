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

// Helper to safely assign ref
function assignRef<T extends HTMLElement>(
	ref: React.Ref<T> | undefined,
	element: T | null
): void {
	if (!ref) return
	if (typeof ref === 'function') {
		ref(element)
	} else if (ref && typeof ref === 'object' && 'current' in ref) {
		// RefObject - need to use Object.assign to avoid readonly error
		Object.assign(ref, { current: element })
	}
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
					ref={(el) => assignRef(ref, el)}
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
				ref={(el) => assignRef(ref, el)}
				className={className}
				onClick={onClick}
				style={style}
				type={type === 'submit' ? 'submit' : type === 'reset' ? 'reset' : 'button'}
				{...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
			>
				{children}
			</button>
		)
	}

	return (
		<Flex
			ref={(el) => assignRef(ref, el)}
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
