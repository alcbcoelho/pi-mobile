import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import PrimaryFAB from '../../components/PrimaryFAB';

// Styles
import { global } from '../../styles/global';

export default function Home() {
	const [user, setUser] = useState({ name: 'Fulano de Tal' });

	return (
		<View style={global.pageContainer}>
			<View style={styles.homeContainer}>
				<Text style={styles.greeting}>Sem objetos para exibir</Text>
				<Text style={styles.message}>
					Parece que você ainda não fez nenhum registro de item achado ou perdido!
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		alignItems: 'center',
		// justifyContent: 'center',
		width: '100%',
		paddingHorizontal: 32,
		paddingVertical: 64 /*64*/,
	},
	greeting: {
		fontSize: 24,
		marginBottom: 64,
	},
	message: {
		textAlign: 'center',
		fontSize: 16,
	},
	routesContainer: {
		marginVertical: 64,
		gap: 16,
	},
});
