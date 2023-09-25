import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function AccountLogin({ navigation }) {
	return (
		<View>
			<Text>AccountLogin</Text>
			<Button mode='outlined' onPress={() => navigation.navigate('AuthenticatedRoutes', { screen: 'Home' })}>
				Entrar
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({});
