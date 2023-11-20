import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { useTheme } from 'react-native-paper';

// Styles
import { global } from '../styles/global';


export default function TextInputController({
	style,
	name,
	control,
	label,
	placeholder,
	error,
	outlineColor,
	textColor,
	keyboardType,
	multiline,
	leftIcon,
	rightIcon,
	...textInputProps
}) {
	const theme = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<TextInput
					style={style || global.input}
					label={label}
					placeholder={placeholder}
					error={error}
					outlineColor={outlineColor || theme.colors.outline}
					textColor={textColor || theme.colors.onSurface}
					keyboardType={keyboardType || 'default'}
					multiline={multiline || false}
					value={value}
					onChangeText={onChange}
					mode='outlined'
					left={leftIcon && <TextInput.Icon icon={() => leftIcon} />}
					right={rightIcon && <TextInput.Icon icon={() => rightIcon} />}
					{...textInputProps}
				/>
			)}
		/>
	);
}
