'use client'

import { Column, type Flex, Grid, Icon, Row } from '.'
import styles from './Accordion.module.css'
import classNames from 'classnames'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface AccordionHandle extends HTMLDivElement {
	toggle: () => void
	open: () => void
	close: () => void
}

interface AccordionProps extends Omit<React.ComponentProps<typeof Flex>, 'title'> {
	title: React.ReactNode
	children: React.ReactNode
	icon?: string
	iconRotation?: number
	size?: 's' | 'm' | 'l'
	radius?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'full'
	open?: boolean
	onToggle?: () => void
	className?: string
	style?: React.CSSProperties
	ref?: React.Ref<AccordionHandle>
}

function Accordion({
	title,
	children,
	open = false,
	onToggle,
	iconRotation = 180,
	radius = 'm',
	icon = 'chevronDown',
	size = 'm',
	className,
	style,
	ref,
	...rest
}: AccordionProps) {
	const [isOpen, setIsOpen] = useState(open)
	const internalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		setIsOpen(open)
	}, [open])

	// Use controlled state when onToggle is provided, otherwise use internal state
	const isAccordionOpen = onToggle ? open : isOpen

	const toggleAccordion = useCallback(() => {
		if (onToggle) {
			// If onToggle is provided, let the parent control the state
			onToggle()
		} else {
			// Otherwise, manage state internally
			setIsOpen((prev) => !prev)
		}
	}, [onToggle])

	// Handle ref with imperative methods
	useEffect(() => {
		if (ref && internalRef.current) {
			const methods = {
				toggle: toggleAccordion,
				open: () => setIsOpen(true),
				close: () => setIsOpen(false),
			}

			const handle = Object.assign(internalRef.current, methods) as AccordionHandle

			if (typeof ref === 'function') {
				ref(handle)
			} else {
				ref.current = handle
			}
		}
	}, [ref, toggleAccordion])

	return (
		<Column
			fillWidth
			ref={internalRef}
		>
			<Row
				tabIndex={0}
				className={classNames(styles.accordion, className)}
				style={style}
				cursor="interactive"
				transition="macro-medium"
				paddingY={size === 's' ? '8' : size === 'm' ? '12' : '16'}
				paddingX={size === 's' ? '12' : size === 'm' ? '16' : '20'}
				vertical="center"
				horizontal="between"
				onClick={toggleAccordion}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault()
						toggleAccordion()
					}
				}}
				aria-expanded={isAccordionOpen}
				aria-controls="accordion-content"
				radius={radius}
				role="button"
			>
				<Row
					fillWidth
					textVariant="heading-strong-s"
				>
					{title}
				</Row>
				<Icon
					name={icon}
					size={size === 's' ? 'xs' : 's'}
					onBackground={isAccordionOpen ? 'neutral-strong' : 'neutral-weak'}
					style={{
						display: 'flex',
						transform: isAccordionOpen ? `rotate(${iconRotation}deg)` : 'rotate(0deg)',
						transition: 'var(--transition-micro-medium)',
					}}
				/>
			</Row>
			<Grid
				id="accordion-content"
				fillWidth
				transition="macro-medium"
				style={{
					gridTemplateRows: isAccordionOpen ? '1fr' : '0fr',
				}}
				aria-hidden={!isAccordionOpen}
			>
				<Row
					fillWidth
					minHeight={0}
					overflow="hidden"
				>
					<Column
						fillWidth
						paddingX={size === 's' ? '12' : size === 'm' ? '16' : '20'}
						paddingTop="8"
						paddingBottom="16"
						{...rest}
					>
						{children}
					</Column>
				</Row>
			</Grid>
		</Column>
	)
}

Accordion.displayName = 'Accordion'
export { Accordion }
