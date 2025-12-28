import { Flex } from '.'
import type React from 'react'

interface LineProps extends React.ComponentProps<typeof Flex> {
	vert?: boolean
	style?: React.CSSProperties
	ref?: React.Ref<HTMLDivElement>
}

function Line({ vert, className, style, ref, ...rest }: LineProps) {
	return (
		<Flex
			ref={ref}
			minWidth={(vert && '1') || undefined}
			minHeight={(!vert && '1') || undefined}
			width={(vert && '1') || undefined}
			height={(!vert && '1') || undefined}
			fillWidth={!vert}
			fillHeight={vert}
			background="neutral-strong"
			direction={vert ? 'column' : 'row'}
			className={className}
			style={style}
			{...rest}
		/>
	)
}

Line.displayName = 'Line'
export { Line }
