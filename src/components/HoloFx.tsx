'use client'

import { Flex } from '.'
import styles from './HoloFx.module.css'
import classNames from 'classnames'
import type React from 'react'
import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'

interface MaskOptions {
	maskPosition?: string
}

interface HoloFxStyleProperties extends React.CSSProperties {
	'--burn-opacity'?: string
	'--shine-opacity'?: string
	'--texture-opacity'?: string
}

interface HoloFxProps extends React.ComponentProps<typeof Flex> {
	children: React.ReactNode
	shine?: {
		opacity?: number
		filter?: string
		blending?: CSSProperties['mixBlendMode']
		mask?: MaskOptions
	}
	burn?: {
		opacity?: number
		filter?: string
		blending?: CSSProperties['mixBlendMode']
		mask?: MaskOptions
	}
	texture?: {
		opacity?: number
		filter?: string
		blending?: CSSProperties['mixBlendMode']
		image?: string
		mask?: MaskOptions
	}
}

const formatMask = (maskPosition = '100 200'): string => {
	const [x, y] = maskPosition.split(' ')
	const formattedX = `${x}%`
	const formattedY = `${y ? y : x}%`
	return `radial-gradient(ellipse ${formattedX} ${formattedY} at var(--gradient-pos-x, 50%) var(--gradient-pos-y, 50%), black 50%, transparent 100%)`
}

const getMaskStyle = (mask?: MaskOptions): string => {
	return mask?.maskPosition ? formatMask(mask.maskPosition) : formatMask()
}

const HoloFx: React.FC<HoloFxProps> = ({ children, shine, burn, texture, ...rest }) => {
	const ref = useRef<HTMLDivElement>(null)
	const lastCallRef = useRef<number>(0)

	const shineDefaults = {
		opacity: shine?.opacity ?? 30,
		blending: (shine?.blending ?? 'color-dodge') as CSSProperties['mixBlendMode'],
		filter: shine?.filter,
		mask: getMaskStyle(shine?.mask),
	}

	const burnDefaults = {
		opacity: burn?.opacity ?? 30,
		filter: burn?.filter ?? 'brightness(0.2) contrast(2)',
		blending: (burn?.blending ?? 'color-dodge') as CSSProperties['mixBlendMode'],
		mask: getMaskStyle(burn?.mask),
	}

	const textureDefaults = {
		opacity: texture?.opacity ?? 10,
		blending: (texture?.blending ?? 'color-dodge') as CSSProperties['mixBlendMode'],
		filter: texture?.filter,
		image:
			texture?.image ??
			'repeating-linear-gradient(-45deg, var(--static-white) 0, var(--static-white) 1px, transparent 3px, transparent 2px)',
		mask: getMaskStyle(texture?.mask),
	}

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			const now = Date.now()
			if (now - lastCallRef.current < 16) return
			lastCallRef.current = now

			const element = ref.current
			if (!element) return

			const rect = element.getBoundingClientRect()
			const offsetX = event.clientX - rect.left
			const offsetY = event.clientY - rect.top

			const centerX = rect.width / 2
			const centerY = rect.height / 2

			const deltaX = ((offsetX - centerX) / centerX) * 100
			const deltaY = ((offsetY - centerY) / centerY) * 100

			element.style.setProperty('--gradient-pos-x', `${deltaX}%`)
			element.style.setProperty('--gradient-pos-y', `${deltaY}%`)
		}

		document.addEventListener('mousemove', handleMouseMove)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove)
		}
	}, [])

	return (
		<Flex
			overflow="hidden"
			className={styles.holoFx}
			ref={ref}
			{...rest}
		>
			<Flex
				fill
				className={styles.base}
			>
				{children}
			</Flex>
			<Flex
				m={{ hide: true }}
				position="absolute"
				fill
				pointerEvents="none"
				className={classNames(styles.overlay, styles.burn)}
				style={
					{
						'--burn-opacity': `${burnDefaults.opacity}%`,
						filter: burnDefaults.filter,
						mixBlendMode: burnDefaults.blending,
						maskImage: burnDefaults.mask,
					} satisfies HoloFxStyleProperties
				}
			>
				{children}
			</Flex>
			<Flex
				m={{ hide: true }}
				position="absolute"
				fill
				pointerEvents="none"
				className={classNames(styles.overlay, styles.shine)}
				style={
					{
						'--shine-opacity': `${shineDefaults.opacity}%`,
						filter: shineDefaults.filter,
						mixBlendMode: shineDefaults.blending,
						maskImage: shineDefaults.mask,
					} satisfies HoloFxStyleProperties
				}
			>
				{children}
			</Flex>
			<Flex
				m={{ hide: true }}
				position="absolute"
				fill
				pointerEvents="none"
				className={classNames(styles.overlay, styles.texture)}
				style={
					{
						'--texture-opacity': `${textureDefaults.opacity}%`,
						backgroundImage: textureDefaults.image,
						filter: textureDefaults.filter,
						mixBlendMode: textureDefaults.blending,
						maskImage: textureDefaults.mask,
					} satisfies HoloFxStyleProperties
				}
			></Flex>
		</Flex>
	)
}

HoloFx.displayName = 'HoloFx'
export { HoloFx }
