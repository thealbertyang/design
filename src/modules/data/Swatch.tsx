'use client'

import { Row } from '../../components'
import { useDataTheme } from '../../contexts'
import type { RadiusSize, SpacingToken } from '../../types'
import type { ChartVariant } from './interfaces'
import type React from 'react'

export interface SwatchProps {
	color: string
	size?: 's' | 'm'
	variant?: ChartVariant
}

export const Swatch: React.FC<SwatchProps> = ({
	color,
	size = 'm',
	variant = useDataTheme().variant,
}) => {
	const sizeMap: Record<
		string,
		{ minWidth: SpacingToken; minHeight: SpacingToken; radius: RadiusSize }
	> = {
		s: {
			minWidth: '12',
			minHeight: '12',
			radius: 'xs',
		},
		m: {
			minWidth: '16',
			minHeight: '16',
			radius: 's',
		},
	}

	const getStyleByVariant = () => {
		const baseStyle = {
			backgroundClip: 'padding-box',
			border: `1px solid ${color}`,
		}

		switch (variant) {
			case 'flat':
				return {
					...baseStyle,
					background: color,
				}
			case 'outline':
				return {
					...baseStyle,
					background: 'transparent',
				}
			default:
				return {
					...baseStyle,
					background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)`,
				}
		}
	}

	return (
		<Row
			style={getStyleByVariant()}
			minWidth={sizeMap[size].minWidth}
			minHeight={sizeMap[size].minHeight}
			radius={sizeMap[size].radius}
		/>
	)
}
