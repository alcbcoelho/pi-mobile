import { TextInput, useTheme } from 'react-native-paper';
import { Controller } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';

// Styles
import { global } from '../styles/global';

export default function TextInputController({ name, control, rules, label, placeholder, error, leftIcon, rightIcon }) {
	const theme = useTheme();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<TextInput
					label={label}
					placeholder={placeholder}
					error={error}
					value={value}
					onChangeText={onChange}
					mode='outlined'
					left={<TextInput.Icon icon={() => leftIcon} />}
					right={<TextInput.Icon icon={() => rightIcon} />}
					// {...props}
				/>
			)}
		/>
	);
}
