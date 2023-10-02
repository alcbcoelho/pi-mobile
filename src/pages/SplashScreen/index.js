import { View } from 'react-native';
import { Text } from 'react-native-paper';

// Styles
import { global } from '../../styles/global';

export default function SplashScreen() {
	return (
		<View style={global.pageContainer}>
			<Text>SplashScreen</Text>
		</View>
	);
}
