import { Pressable } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function CustomPressable(props) {
	const theme = useTheme();

	return (
		<Pressable android_ripple={{ color: theme.colors.surfaceVariant }} {...props}>
			{props.children}
		</Pressable>
	);
}
