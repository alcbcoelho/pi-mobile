import { FAB, useTheme } from 'react-native-paper';

export default function PrimaryFAB(props) {
	const theme = useTheme();

	return (
		<FAB
			{...props}
			color={'white' /* theme.colors.onPrimary */}
			style={[props.style, { backgroundColor: '#946D51' /* theme.colors.primary */ }]}
		/>
	);
}
