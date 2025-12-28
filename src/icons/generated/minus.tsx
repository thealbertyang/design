import type { SVGProps } from 'react'

export const Minus = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		width="1em"
		height="1em"
		role="img"
		aria-label="Minus"
		{...props}
	>
		<title>Minus</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M5 12h14"
		/>
	</svg>
)
