/**
 * Hex to OKLCH Color Validation Script
 * Compares original once-ui hex values with our OKLCH values
 *
 * Run: bun run scripts/validate-colors.js
 */

// Convert hex to RGB
function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	if (!result) return null
	return {
		r: parseInt(result[1], 16) / 255,
		g: parseInt(result[2], 16) / 255,
		b: parseInt(result[3], 16) / 255,
	}
}

// Convert linear RGB to XYZ
function rgbToXyz(r, g, b) {
	// sRGB to linear RGB
	const toLinear = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)

	const lr = toLinear(r)
	const lg = toLinear(g)
	const lb = toLinear(b)

	// Linear RGB to XYZ (D65 illuminant)
	return {
		x: lr * 0.4124564 + lg * 0.3575761 + lb * 0.1804375,
		y: lr * 0.2126729 + lg * 0.7151522 + lb * 0.072175,
		z: lr * 0.0193339 + lg * 0.119192 + lb * 0.9503041,
	}
}

// Convert XYZ to OKLAB
function xyzToOklab(x, y, z) {
	// XYZ to LMS
	const l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z
	const m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z
	const s = 0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z

	// LMS to L'M'S' (cube root)
	const l_ = Math.cbrt(l)
	const m_ = Math.cbrt(m)
	const s_ = Math.cbrt(s)

	// L'M'S' to Oklab
	return {
		L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
		a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
		b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
	}
}

// Convert OKLAB to OKLCH
function oklabToOklch(L, a, b) {
	const C = Math.sqrt(a * a + b * b)
	let H = (Math.atan2(b, a) * 180) / Math.PI
	if (H < 0) H += 360

	return { L, C, H }
}

// Full conversion: Hex -> OKLCH
function hexToOklch(hex) {
	const rgb = hexToRgb(hex)
	if (!rgb) return null

	const xyz = rgbToXyz(rgb.r, rgb.g, rgb.b)
	const lab = xyzToOklab(xyz.x, xyz.y, xyz.z)
	const lch = oklabToOklch(lab.L, lab.a, lab.b)

	return {
		L: Math.round(lch.L * 100) / 100,
		C: Math.round(lch.C * 100) / 100,
		H: Math.round(lch.H),
	}
}

// Format OKLCH for CSS
function formatOklch(oklch) {
	return `oklch(${oklch.L} ${oklch.C} ${oklch.H})`
}

// Original once-ui hex values (from upstream/main scheme.scss)
const originalColors = {
	// Gray (neutral)
	gray: {
		100: '#0A0A0A',
		200: '#151515',
		300: '#3F3F3F',
		400: '#595959',
		500: '#757575',
		600: '#959595',
		700: '#B2B2B2',
		800: '#D2D2D2',
		900: '#E0E0E0',
		1000: '#EDEDED',
		1100: '#F3F3F3',
		1200: '#F9F9F9',
	},
	// Slate (neutral variant)
	slate: {
		100: '#040816',
		200: '#0F152B',
		300: '#393F55',
		400: '#52586F',
		500: '#6D748A',
		600: '#8E94AA',
		700: '#ACB2C8',
		800: '#CCD2E8',
		900: '#DAE0F6',
		1000: '#E9EDFE',
		1100: '#F1F3FD',
		1200: '#F8F9FD',
	},
	// Blue (brand)
	blue: {
		100: '#0A071B',
		200: '#0D0B44',
		300: '#0019CB',
		400: '#033CF8',
		500: '#2D69FA',
		600: '#5A93FC',
		700: '#84B5FD',
		800: '#B4D6FB',
		900: '#CBE3FB',
		1000: '#E0EFFC',
		1100: '#EBF5FC',
		1200: '#F6FAFD',
	},
	// Violet (accent/purple)
	violet: {
		100: '#0E0512',
		200: '#210B2B',
		300: '#60099B',
		400: '#7D04E4',
		500: '#9745F7',
		600: '#B07AFA',
		700: '#C7A2FD',
		800: '#DDCBFB',
		900: '#E6DCFB',
		1000: '#F0EBFC',
		1100: '#F5F3FC',
		1200: '#FAF8FD',
	},
	// Red (danger/tomato)
	red: {
		100: '#130507',
		200: '#2A0A10',
		300: '#830711',
		400: '#B6020C',
		500: '#E90507',
		600: '#FF5F53',
		700: '#FF9689',
		800: '#FDC6BD',
		900: '#FDD8D2',
		1000: '#FDEAE6',
		1100: '#FCF1EF',
		1200: '#FDF9F8',
	},
	// Orange (warning/amber)
	orange: {
		100: '#120605',
		200: '#270D0A',
		300: '#7C1A06',
		400: '#AC2401',
		500: '#DB3400',
		600: '#FD6325',
		700: '#FF9964',
		800: '#FEC8A4',
		900: '#FDDAC2',
		1000: '#FDEADD',
		1100: '#FCF2E9',
		1200: '#FCF9F5',
	},
	// Green (success)
	green: {
		100: '#040B07',
		200: '#081810',
		300: '#0D4929',
		400: '#0C6731',
		500: '#0A8637',
		600: '#08AC3A',
		700: '#01CF38',
		800: '#5FEF61',
		900: '#91F88C',
		1000: '#C0FDBB',
		1100: '#DAFDD7',
		1200: '#F0FDEF',
	},
}

// Print color comparison
console.log('='.repeat(80))
console.log('OKLCH Color Validation - Original Hex vs Converted OKLCH')
console.log('='.repeat(80))
console.log('')

for (const [colorName, steps] of Object.entries(originalColors)) {
	console.log(`\n## ${colorName.toUpperCase()}`)
	console.log('-'.repeat(60))

	// Convert 100-1200 scale to 1-12 scale for display
	const stepMapping = {
		100: 1,
		200: 2,
		300: 3,
		400: 4,
		500: 5,
		600: 6,
		700: 7,
		800: 8,
		900: 9,
		1000: 10,
		1100: 11,
		1200: 12,
	}

	for (const [step, hex] of Object.entries(steps)) {
		const oklch = hexToOklch(hex)
		const ourStep = stepMapping[step]
		console.log(`Step ${ourStep.toString().padStart(2)}: ${hex} -> ${formatOklch(oklch)}`)
	}
}

// Print summary for key mid-tones (step 6) which are used for interactive elements
console.log('\n')
console.log('='.repeat(80))
console.log('KEY MID-TONES (Step 6) - Used for buttons and interactive elements')
console.log('='.repeat(80))

const keyColors = ['gray', 'slate', 'blue', 'violet', 'red', 'orange', 'green']
for (const colorName of keyColors) {
	const hex = originalColors[colorName]['600']
	const oklch = hexToOklch(hex)
	console.log(
		`${colorName.padEnd(8)}: ${hex} -> L: ${oklch.L.toFixed(2)}, C: ${oklch.C.toFixed(3)}, H: ${oklch.H}`
	)
}

console.log('\n')
console.log('='.repeat(80))
console.log('RECOMMENDED BASE VALUES (for color-mix() generation)')
console.log('='.repeat(80))
console.log('')
console.log('Based on step 6 (mid-tone), recommended OKLCH base values:')
console.log('')

for (const colorName of keyColors) {
	const hex = originalColors[colorName]['600']
	const oklch = hexToOklch(hex)
	const varName = `--${colorName}-base`
	console.log(
		`${varName.padEnd(16)}: oklch(${oklch.L.toFixed(2)} ${oklch.C.toFixed(2)} ${oklch.H});`
	)
}
