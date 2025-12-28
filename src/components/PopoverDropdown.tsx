'use client'

import { Dropdown } from '.'
import styles from './PopoverDropdown.module.css'
import type React from 'react'
import type { ReactNode } from 'react'
import { useId } from 'react'

export type PopoverPlacement =
	| 'top'
	| 'top-start'
	| 'top-end'
	| 'bottom'
	| 'bottom-start'
	| 'bottom-end'
	| 'left'
	| 'left-start'
	| 'left-end'
	| 'right'
	| 'right-start'
	| 'right-end'

export interface PopoverDropdownProps {
	/** Fill parent width */
	fillWidth?: boolean
	/** Minimum width in rem */
	minWidth?: number
	/** Maximum width in rem */
	maxWidth?: number
	/** Minimum height in px */
	minHeight?: number
	/** Placement relative to trigger (uses CSS anchor positioning) */
	placement?: PopoverPlacement
	/** Trigger element */
	trigger: ReactNode
	/** Dropdown content */
	dropdown: ReactNode
	/** Currently selected option value */
	selectedOption?: string
	/** Container style */
	style?: React.CSSProperties
	/** Container className */
	className?: string
	/** Called when an option is selected */
	onSelect?: (value: string) => void
	/** Custom popover ID */
	dropdownId?: string
	/** Disable trigger click (for manual control) */
	disableTriggerClick?: boolean
	/** Ref to the container element */
	ref?: React.Ref<HTMLDivElement>
}

/**
 * PopoverDropdown - A lightweight dropdown using native Popover API and CSS anchor positioning.
 *
 * This component uses cutting-edge browser features:
 * - Native Popover API (`popover="auto"`)
 * - CSS Anchor Positioning (`anchor-name`, `position-anchor`, `position-area`)
 * - `@starting-style` for entry animations
 * - `@position-try` for auto-flip behavior
 *
 * For browsers without support, it falls back gracefully.
 *
 * Use this for simple dropdowns. For complex dropdowns with keyboard navigation,
 * focus trapping, and accessibility features, use DropdownWrapper instead.
 */
function PopoverDropdown({
	trigger,
	dropdown,
	selectedOption,
	minHeight,
	onSelect,
	minWidth,
	maxWidth,
	fillWidth = false,
	placement = 'bottom-start',
	className,
	style,
	dropdownId,
	disableTriggerClick = false,
	ref,
}: PopoverDropdownProps) {
	const id = useId()
	const popoverId = dropdownId || id
	const anchorId = `anchor-${id}`

	const containerStyle = {
		...style,
		anchorName: `--${anchorId}`,
		display: fillWidth ? 'block' : 'inline-block',
		width: fillWidth ? '100%' : 'auto',
	} as React.CSSProperties

	const popoverStyle = {
		...(minWidth && { '--min-width': `${minWidth}rem` }),
		...(maxWidth && { '--max-width': `${maxWidth}rem` }),
		...(minHeight && { '--min-height': `${minHeight}px` }),
		positionAnchor: `--${anchorId}`,
	} as React.CSSProperties

	const handleSelect = (value: string) => {
		onSelect?.(value)
		document.getElementById(popoverId)?.hidePopover?.()
	}

	return (
		<div
			ref={ref}
			id={anchorId}
			style={containerStyle}
			className={className}
		>
			<button
				type="button"
				popoverTarget={disableTriggerClick ? undefined : popoverId}
				style={{ all: 'unset', display: 'contents' }}
				disabled={disableTriggerClick}
			>
				{trigger}
			</button>

			<div
				popover="auto"
				id={popoverId}
				className={`${styles.popover} ${styles[placement]}`}
				style={popoverStyle}
			>
				<Dropdown
					radius="l"
					padding="0"
					selectedOption={selectedOption}
					onSelect={handleSelect}
				>
					{dropdown}
				</Dropdown>
			</div>
		</div>
	)
}

PopoverDropdown.displayName = 'PopoverDropdown'
export { PopoverDropdown }
