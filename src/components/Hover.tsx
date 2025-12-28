'use client'

import { type Flex, Row } from '.'
import styles from './Hover.module.css'
import type React from 'react'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

export interface HoverProps extends React.ComponentProps<typeof Flex> {
	ref?: React.Ref<HTMLDivElement>
	trigger: ReactNode
	overlay: ReactNode
	interactive?: boolean
	delay?: number
	hideDelay?: number
	disabled?: boolean
	touch?: 'disable' | 'enable' | 'display'
}

function Hover({
	ref,
	trigger,
	overlay,
	interactive = false,
	delay = 0,
	hideDelay = 0,
	disabled = false,
	touch = 'disable',
	...flex
}: HoverProps) {
	const [isHovered, setIsHovered] = useState(false)
	const [isFocused, setIsFocused] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [isTouchDevice, setIsTouchDevice] = useState(false)

	const wrapperRef = useRef<HTMLDivElement>(null)
	const showTimeoutRef = useRef<NodeJS.Timeout | null>(null)
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		setMounted(true)
		setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
	}, [])

	const showOverlay = useCallback(() => {
		if (disabled) return

		// Clear any pending hide timeout
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current)
			hideTimeoutRef.current = null
		}

		if (delay > 0) {
			showTimeoutRef.current = setTimeout(() => {
				setIsHovered(true)
			}, delay)
		} else {
			setIsHovered(true)
		}
	}, [delay, disabled])

	const hideOverlay = useCallback(() => {
		// Clear any pending show timeout
		if (showTimeoutRef.current) {
			clearTimeout(showTimeoutRef.current)
			showTimeoutRef.current = null
		}

		if (hideDelay > 0) {
			hideTimeoutRef.current = setTimeout(() => {
				setIsHovered(false)
			}, hideDelay)
		} else {
			setIsHovered(false)
		}
	}, [hideDelay])

	const handleMouseEnter = useCallback(() => {
		showOverlay()
	}, [showOverlay])

	const handleMouseLeave = useCallback(() => {
		hideOverlay()
	}, [hideOverlay])

	const handleFocus = useCallback(() => {
		setIsFocused(true)
		showOverlay()
	}, [showOverlay])

	const handleBlur = useCallback(() => {
		setIsFocused(false)
		hideOverlay()
	}, [hideOverlay])

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			if (showTimeoutRef.current) {
				clearTimeout(showTimeoutRef.current)
			}
			if (hideTimeoutRef.current) {
				clearTimeout(hideTimeoutRef.current)
			}
		}
	}, [])

	// Determine if overlay should show based on touch mode
	const shouldShowOverlay = (() => {
		if (!mounted || disabled) return false

		// If on touch device, handle based on touch prop
		if (isTouchDevice) {
			if (touch === 'disable') return false
			if (touch === 'display') return true
			// touch === 'enable', fall through to normal hover logic
		}

		return isHovered || isFocused
	})()

	return (
		<Row
			ref={ref || wrapperRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onFocus={handleFocus}
			onBlur={handleBlur}
			{...flex}
		>
			{trigger}
			{shouldShowOverlay && (
				<Row
					position="absolute"
					pointerEvents={interactive ? 'auto' : 'none'}
					fill
					style={{
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
					className={styles.fadeIn}
				>
					{overlay}
				</Row>
			)}
		</Row>
	)
}

Hover.displayName = 'Hover'
export { Hover }
