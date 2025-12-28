'use client'

import { Cursor, ServerFlex } from '.'
import { useLayout } from '..'
import { useResponsiveClasses } from '../hooks/useResponsiveClasses'
import type { DisplayProps, FlexProps, ResponsiveFlexProps, StyleProps } from '../interfaces'
import type { CSSProperties, Ref } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface ClientFlexProps extends FlexProps, StyleProps, DisplayProps {
	cursor?: StyleProps['cursor']
	hide?: boolean
	ref?: Ref<HTMLDivElement>
}

function ClientFlex({ cursor, hide, xl, l, m, s, xs, ref, ...props }: ClientFlexProps) {
	const elementRef = useRef<HTMLDivElement>(null)
	const [isTouchDevice, setIsTouchDevice] = useState(false)
	const { currentBreakpoint, isDefaultBreakpoints } = useLayout()

	// Always call hooks unconditionally - pass enabled flag instead
	const shouldUseResponsiveClasses = !isDefaultBreakpoints()
	useResponsiveClasses(
		elementRef,
		{ xl, l, m, s, xs },
		currentBreakpoint,
		shouldUseResponsiveClasses
	)

	// Combine refs using React 19 pattern
	const combinedRef = useCallback(
		(node: HTMLDivElement | null) => {
			elementRef.current = node
			if (typeof ref === 'function') {
				ref(node)
			} else if (ref && 'current' in ref) {
				;(ref as React.MutableRefObject<HTMLDivElement | null>).current = node
			}
		},
		[ref]
	)

	const appliedResponsiveStyles = useRef<Set<string>>(new Set())
	const baseStyleRef = useRef<CSSProperties>({})

	// Responsive styles logic (client-side only)
	const applyResponsiveStyles = useCallback(() => {
		if (!elementRef.current) return

		const element = elementRef.current

		// Update base styles when style prop changes
		if (props.style) {
			baseStyleRef.current = { ...props.style }
		}

		// Determine which responsive props to apply based on current breakpoint
		let currentResponsiveProps: ResponsiveFlexProps | null = null
		if (currentBreakpoint === 'xl' && xl) {
			currentResponsiveProps = xl
		} else if (currentBreakpoint === 'l' && l) {
			currentResponsiveProps = l
		} else if (currentBreakpoint === 'm' && m) {
			currentResponsiveProps = m
		} else if (currentBreakpoint === 's' && s) {
			currentResponsiveProps = s
		} else if (currentBreakpoint === 'xs' && xs) {
			currentResponsiveProps = xs
		}

		// Clear only responsive styles, not base styles
		const styleRecord = element.style as unknown as Record<string, string>
		appliedResponsiveStyles.current.forEach((key) => {
			styleRecord[key] = ''
		})
		appliedResponsiveStyles.current.clear()

		// Reapply base styles
		if (baseStyleRef.current) {
			Object.entries(baseStyleRef.current).forEach(([key, value]) => {
				styleRecord[key] = value as string
			})
		}

		// Apply new responsive styles if we have them for current breakpoint
		if (currentResponsiveProps) {
			if (currentResponsiveProps.style) {
				Object.entries(currentResponsiveProps.style).forEach(([key, value]) => {
					styleRecord[key] = value as string
					appliedResponsiveStyles.current.add(key)
				})
			}
			if (currentResponsiveProps.aspectRatio) {
				element.style.aspectRatio = String(currentResponsiveProps.aspectRatio)
				appliedResponsiveStyles.current.add('aspect-ratio')
			}
		}
	}, [xl, l, m, s, xs, props.style, currentBreakpoint])

	useEffect(() => {
		applyResponsiveStyles()
	}, [applyResponsiveStyles])

	// Detect touch device
	useEffect(() => {
		const checkTouchDevice = () => {
			const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
			const hasPointer = window.matchMedia('(pointer: fine)').matches
			setIsTouchDevice(hasTouch && !hasPointer)
		}

		checkTouchDevice()

		const mediaQuery = window.matchMedia('(pointer: fine)')
		const handlePointerChange = () => checkTouchDevice()

		mediaQuery.addEventListener('change', handlePointerChange)

		return () => {
			mediaQuery.removeEventListener('change', handlePointerChange)
		}
	}, [])

	// Determine if we should hide the default cursor
	const shouldHideCursor = typeof cursor === 'object' && cursor && !isTouchDevice

	return (
		<>
			<ServerFlex
				{...props}
				xl={xl}
				l={l}
				m={m}
				s={s}
				xs={xs}
				isDefaultBreakpoints={isDefaultBreakpoints()}
				hide={hide}
				ref={combinedRef}
				style={{
					...props.style,
					cursor: shouldHideCursor ? 'none' : props.style?.cursor,
				}}
			/>
			{typeof cursor === 'object' && cursor && !isTouchDevice && (
				<Cursor
					cursor={cursor}
					elementRef={elementRef}
				/>
			)}
		</>
	)
}

ClientFlex.displayName = 'ClientFlex'

export { ClientFlex }
