import type {
	CommonProps,
	DisplayProps,
	FlexProps,
	SizeProps,
	SpacingProps,
	StyleProps,
} from '../interfaces'
import { ClientFlex } from './ClientFlex'
import { ServerFlex } from './ServerFlex'
import type { Ref } from 'react'

interface SmartFlexProps
	extends FlexProps, StyleProps, SpacingProps, SizeProps, CommonProps, DisplayProps {
	xl?: any
	l?: any
	m?: any
	s?: any
	xs?: any
	ref?: Ref<HTMLDivElement>
}

function Flex({ cursor, xl, l, m, s, xs, style, hide, ref, ...props }: SmartFlexProps) {
	// Check if we need client-side functionality
	const needsClientSide = () => {
		// Custom cursor requires client-side
		if (typeof cursor === 'object' && cursor) return true

		// Responsive props require client-side
		if (xl || l || m || s || xs) return true

		// Dynamic styles require client-side
		if (
			style &&
			typeof style === 'object' &&
			Object.keys(style as Record<string, any>).length > 0
		)
			return true

		return false
	}

	// Use client component if any client-side functionality is needed
	if (needsClientSide()) {
		return (
			<ClientFlex
				ref={ref}
				cursor={cursor}
				xl={xl}
				l={l}
				m={m}
				s={s}
				xs={xs}
				style={style}
				hide={hide}
				{...props}
			/>
		)
	}

	// Use server component for static content
	return (
		<ServerFlex
			ref={ref}
			cursor={cursor}
			hide={hide}
			{...props}
		/>
	)
}

Flex.displayName = 'Flex'

export { Flex }
