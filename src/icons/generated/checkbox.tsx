import type { SVGProps } from 'react'

export const Checkbox = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		width="1em"
		height="1em"
		role="img"
		aria-label="Checkbox"
		{...props}
	>
		<title>Checkbox</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m4.5 12.75 6 6 9-13.5"
		/>
	</svg>
)
