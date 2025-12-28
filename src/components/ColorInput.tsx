'use client'

import { Flex, Icon, IconButton, Input, type InputProps } from '.'
import type React from 'react'
import { useRef } from 'react'

interface ColorInputProps extends Omit<InputProps, 'onChange' | 'value'> {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	ref?: React.Ref<HTMLInputElement>
}

function ColorInput({ label, id, value, onChange, ref, ...props }: ColorInputProps) {
	const colorInputRef = useRef<HTMLInputElement>(null)

	const handleHexClick = () => {
		if (colorInputRef.current) {
			colorInputRef.current.click()
		}
	}

	const handleReset = () => {
		onChange({
			target: { value: '' },
		} as React.ChangeEvent<HTMLInputElement>)
	}

	return (
		<Input
			style={{ cursor: 'pointer' }}
			id={id}
			ref={colorInputRef}
			label={label}
			type="color"
			value={value}
			{...props}
			hasPrefix={
				<Flex>
					<Flex
						width={value ? '0' : '20'}
						opacity={value ? 0 : 100}
						transition="micro-medium"
						style={{
							transform: value ? 'scale(0)' : 'scale(1)',
						}}
					>
						<Icon
							marginLeft="4"
							padding="2"
							size="xs"
							name="eyeDropper"
							onBackground="neutral-medium"
						/>
					</Flex>
					<Flex
						border="neutral-strong"
						className={`prefix ${value ? '' : 'hidden'}`}
						onClick={handleHexClick}
						height="20"
						marginLeft="4"
						width={value ? '20' : '0'}
						cursor="interactive"
						radius="xs"
						opacity={value ? 100 : 0}
						transition="micro-medium"
						style={{
							backgroundColor: value,
							transform: value ? 'scale(1)' : 'scale(0)',
						}}
					/>
				</Flex>
			}
			hasSuffix={
				<Flex
					className={`suffix ${value ? '' : 'hidden'}`}
					position="absolute"
					cursor="interactive"
					left="48"
					style={{
						width: 'calc(100% - var(--static-space-48))',
					}}
				>
					<Flex
						onClick={handleHexClick}
						fillWidth
						opacity={value ? 100 : 0}
						transition="micro-medium"
					>
						{value}
					</Flex>
					{value && (
						<Flex
							position="absolute"
							right="12"
							style={{
								transform: 'translateY(-50%)',
							}}
						>
							<IconButton
								onClick={handleReset}
								variant="secondary"
								tooltip="Remove"
								tooltipPosition="left"
								icon="close"
							/>
						</Flex>
					)}
				</Flex>
			}
			onChange={onChange}
		/>
	)
}

ColorInput.displayName = 'ColorInput'

export { ColorInput }
