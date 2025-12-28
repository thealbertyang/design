import type { SVGProps } from 'react'

export const Pause = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		width="1em"
		height="1em"
		role="img"
		aria-label="Pause"
		{...props}
	>
		<title>Pause</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M15.75 5.25v13.5m-7.5-13.5v13.5"
		/>
	</svg>
)
