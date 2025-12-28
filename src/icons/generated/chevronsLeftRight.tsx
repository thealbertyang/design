import type { SVGProps } from 'react'

export const ChevronsLeftRight = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		width="1em"
		height="1em"
		role="img"
		aria-label="Chevrons Left Right"
		{...props}
	>
		<title>Chevrons Left Right</title>
		<path d="m9 7-5 5 5 5" />
		<path d="m15 7 5 5-5 5" />
	</svg>
)
