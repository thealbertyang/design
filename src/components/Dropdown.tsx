'use client'

import { Column, Row } from '.'
import type React from 'react'
import type { ReactNode, SyntheticEvent } from 'react'

interface DropdownProps extends Omit<React.ComponentProps<typeof Row>, 'onSelect'> {
	selectedOption?: string
	children?: ReactNode
	onEscape?: () => void
	onSelect?: (event: string) => void
	ref?: React.Ref<HTMLDivElement>
}

function Dropdown({
	selectedOption: _selectedOption,
	className: _className,
	children,
	onEscape: _onEscape,
	onSelect,
	ref,
	...flex
}: DropdownProps) {
	const handleSelect = (event: SyntheticEvent<HTMLDivElement>) => {
		// Only handle clicks on elements that have a data-value attribute
		const target = event.target
		if (!(target instanceof HTMLElement)) return

		const value =
			target.getAttribute('data-value') ||
			target.closest('[data-value]')?.getAttribute('data-value')

		if (onSelect && value) {
			onSelect(value)
		}
	}

	return (
		<Row
			ref={ref}
			role="listbox"
			onClick={handleSelect}
			flex={1}
			border="neutral-medium"
			background="surface"
			overflow="hidden"
			{...flex}
		>
			<Column
				flex={1}
				overflowY="auto"
				gap="2"
			>
				{children}
			</Column>
		</Row>
	)
}

Dropdown.displayName = 'Dropdown'

export { Dropdown }
export type { DropdownProps }
