import type { CommonProps, SpacingProps, TextProps } from '../interfaces'
import type { ColorScheme, ColorWeight, SpacingToken, TextVariant } from '../types'
import classNames from 'classnames'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

const COLOR_SCHEMES = new Set<string>([
	'brand',
	'accent',
	'neutral',
	'success',
	'warning',
	'danger',
	'info',
])

const COLOR_WEIGHTS = new Set<string>(['strong', 'medium', 'weak'])

function isColorScheme(value: string): value is ColorScheme {
	return COLOR_SCHEMES.has(value)
}

function isColorWeight(value: string): value is ColorWeight {
	return COLOR_WEIGHTS.has(value)
}

function parseColorProp(value: string): [ColorScheme, ColorWeight] | null {
	const parts = value.split('-')
	if (parts.length !== 2) return null
	const [scheme, weight] = parts
	if (scheme && weight && isColorScheme(scheme) && isColorWeight(weight)) {
		return [scheme, weight]
	}
	return null
}

type TypeProps<T extends ElementType> = TextProps<T> &
	CommonProps &
	SpacingProps &
	ComponentPropsWithoutRef<T>

const Text = <T extends ElementType = 'span'>({
	as,
	variant,
	size,
	weight,
	onBackground,
	onSolid,
	align,
	wrap,
	padding,
	paddingLeft,
	paddingRight,
	paddingTop,
	paddingBottom,
	paddingX,
	paddingY,
	margin,
	marginLeft,
	marginRight,
	marginTop,
	marginBottom,
	marginX,
	marginY,
	children,
	style,
	className,
	truncate,
	...props
}: TypeProps<T>) => {
	const Component = as || 'span'

	if (variant && (size || weight)) {
		console.warn("When 'variant' is set, 'size' and 'weight' are ignored.")
	}

	if (onBackground && onSolid) {
		console.warn(
			"You cannot use both 'onBackground' and 'onSolid' props simultaneously. Only one will be applied."
		)
	}

	const getVariantClasses = (variant: TextVariant) => {
		const [fontType, weight, size] = variant.split('-')
		return [`font-${fontType}`, `font-${weight}`, `font-${size}`]
	}

	const sizeClass = size ? `font-${size}` : ''
	const weightClass = weight ? `font-${weight}` : ''

	const classes = variant ? getVariantClasses(variant) : [sizeClass, weightClass]

	let colorClass = ''
	if (onBackground) {
		const parsed = parseColorProp(onBackground)
		if (parsed) {
			const [scheme, weight] = parsed
			colorClass = `${scheme}-on-background-${weight}`
		}
	} else if (onSolid) {
		const parsed = parseColorProp(onSolid)
		if (parsed) {
			const [scheme, weight] = parsed
			colorClass = `${scheme}-on-solid-${weight}`
		}
	}

	const generateClassName = (prefix: string, token: SpacingToken | undefined) => {
		return token ? `${prefix}-${token}` : undefined
	}

	const combinedClasses = classNames(
		...classes,
		colorClass,
		className,
		generateClassName('p', padding),
		generateClassName('pl', paddingLeft),
		generateClassName('pr', paddingRight),
		generateClassName('pt', paddingTop),
		generateClassName('pb', paddingBottom),
		generateClassName('px', paddingX),
		generateClassName('py', paddingY),
		generateClassName('m', margin),
		generateClassName('ml', marginLeft),
		generateClassName('mr', marginRight),
		generateClassName('mt', marginTop),
		generateClassName('mb', marginBottom),
		generateClassName('mx', marginX),
		generateClassName('my', marginY),
		truncate && 'truncate'
	)

	return (
		<Component
			className={combinedClasses}
			style={{
				textAlign: align,
				textWrap: wrap,
				...style,
			}}
			{...props}
		>
			{children}
		</Component>
	)
}

Text.displayName = 'Text'

export { Text }
