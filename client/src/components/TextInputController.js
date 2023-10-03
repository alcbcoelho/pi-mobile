import { TextInput } from 'react-native-paper';
import { Controller } from 'react-hook-form';

// Styles
import { global } from '../styles/global';

export default function TextInputController({
	name,
	control,
	label,
	placeholder,
	error,
	keyboardType,
	multiline,
	leftIcon,
	rightIcon,
	...textInputProps
}) {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<TextInput
					style={global.input}
					label={label}
					placeholder={placeholder}
					error={error}
					keyboardType={keyboardType || 'default'}
					multiline={multiline || false}
					value={value}
					onChangeText={onChange}
					mode='outlined'
					left={<TextInput.Icon icon={() => leftIcon} />}
					right={<TextInput.Icon icon={() => rightIcon} />}
					{...textInputProps}
				/>
			)}
		/>
	);
}
