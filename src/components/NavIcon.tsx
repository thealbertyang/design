import { Flex } from '.'
import styles from './NavIcon.module.css'
import classNames from 'classnames'
import type React from 'react'

interface NavIconProps extends React.ComponentProps<typeof Flex> {
	className?: string
	style?: React.CSSProperties
	onClick?: () => void
	isActive: boolean
	ref?: React.Ref<HTMLDivElement>
}

function NavIcon({ className, isActive, style, onClick, ref, ...rest }: Partial<NavIconProps>) {
	return (
		<Flex
			ref={ref}
			tabIndex={0}
			radius="m"
			cursor="interactive"
			width="40"
			height="40"
			minHeight="40"
			minWidth="40"
			className={className}
			style={style}
			onClick={onClick}
			{...rest}
		>
			<div className={classNames(styles.line, isActive && styles.active)} />
			<div className={classNames(styles.line, isActive && styles.active)} />
		</Flex>
	)
}

NavIcon.displayName = 'NavIcon'

export { NavIcon }
