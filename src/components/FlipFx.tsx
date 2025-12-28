'use client'

import { Flex } from '.'
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect'
import type React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface FlipFxProps extends React.ComponentProps<typeof Flex> {
	flipDirection?: 'horizontal' | 'vertical'
	timing?: number
	flipped?: boolean
	onFlip?: (flipped: boolean) => void
	disableClickFlip?: boolean
	autoFlipInterval?: number
	front: React.ReactNode
	back: React.ReactNode
	className?: string
	style?: React.CSSProperties
	ref?: React.Ref<HTMLDivElement>
}

const FlipFx: React.FC<FlipFxProps> = ({
	flipDirection = 'horizontal',
	timing = 2000,
	flipped,
	onFlip,
	disableClickFlip = false,
	autoFlipInterval,
	front,
	back,
	className,
	style,
	ref,
	...flex
}) => {
	const [internalFlipped, setInternalFlipped] = useState(false)
	const flippedState = flipped ?? internalFlipped

	const cardRef = useRef<HTMLDivElement>(null)
	const frontRef = useRef<HTMLDivElement>(null)
	const backRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (ref) {
			if (typeof ref === 'function') {
				ref(cardRef.current)
			} else {
				ref.current = cardRef.current
			}
		}
	}, [ref])

	useIsomorphicLayoutEffect(() => {
		const updateHeight = () => {
			if (cardRef.current && frontRef.current && backRef.current) {
				const frontH = frontRef.current.scrollHeight
				const backH = backRef.current.scrollHeight
				cardRef.current.style.height = `${Math.max(frontH, backH)}px`
			}
		}

		updateHeight()

		const observer = new ResizeObserver(updateHeight)
		if (frontRef.current) observer.observe(frontRef.current)
		if (backRef.current) observer.observe(backRef.current)

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (autoFlipInterval) {
			const interval = setInterval(() => {
				setInternalFlipped((prev) => !prev)
				onFlip?.(!flippedState)
			}, autoFlipInterval * 1000)

			return () => clearInterval(interval)
		}
	}, [autoFlipInterval, flippedState, onFlip])

	const handleFlip = useCallback(() => {
		if (disableClickFlip || autoFlipInterval) return
		setInternalFlipped((v) => !v)
		onFlip?.(!flippedState)
	}, [disableClickFlip, autoFlipInterval, flippedState, onFlip])

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault()
				handleFlip()
			}
		},
		[handleFlip]
	)

	return (
		<Flex
			ref={cardRef}
			className={className}
			style={{
				transformStyle: 'preserve-3d',
				transition: `transform ${timing}ms cubic-bezier(0.22, 1, 0.36, 1)`,
				transform: flippedState
					? flipDirection === 'vertical'
						? 'rotateX(180deg)'
						: 'rotateY(180deg)'
					: 'none',
				perspective: '1000px',
				...style,
			}}
			onClick={handleFlip}
			onKeyDown={handleKeyDown}
			role="button"
			aria-pressed={flippedState}
			tabIndex={0}
			{...flex}
		>
			<Flex
				ref={frontRef}
				fill
				position="absolute"
				overflow="hidden"
				aria-hidden={flippedState}
				style={{
					backfaceVisibility: 'hidden',
				}}
			>
				{front}
			</Flex>

			<Flex
				ref={backRef}
				fill
				position="absolute"
				overflow="hidden"
				aria-hidden={!flippedState}
				style={{
					backfaceVisibility: 'hidden',
					transform: 'rotateY(180deg)',
				}}
			>
				<Flex
					fill
					style={{
						transform:
							flipDirection === 'vertical'
								? 'rotateY(-180deg) rotateX(180deg)'
								: undefined,
					}}
				>
					{back}
				</Flex>
			</Flex>
		</Flex>
	)
}

FlipFx.displayName = 'FlipFx'
export { FlipFx }
