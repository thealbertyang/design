import type { SVGProps } from 'react'

export const Enter = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		width="1em"
		height="1em"
		role="img"
		aria-label="Enter"
		{...props}
	>
		<title>Enter</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499"
		/>
	</svg>
)
