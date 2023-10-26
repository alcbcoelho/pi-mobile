import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, FAB } from 'react-native-paper';

// Styles
import { global } from '../../styles/global';

export default function Home({ navigation }) {
	const [user, setUser] = useState({ name: 'Fulano de Tal' });

	return (
		<View style={global.pageContainer}>
			<View style={styles.homeContainer}>
				<Text style={styles.greeting}>Olá, {user.name}</Text>
				<Text style={styles.message}>
					Parece que você ainda não fez nenhum {/* '\n' */}registro de item achado ou perdido!
				</Text>
				{/* <View style={styles.routesContainer}>
					<Text style={styles.message} onPress={() => navigation.navigate('ObjectDetails')}>
						Detalhes do Objeto
					</Text>
					<Text style={styles.message} onPress={() => navigation.navigate('AccountLogin')}>
						Entrar
					</Text>
					<Text style={styles.message} onPress={() => navigation.navigate('AccountRecover')}>
						Recuperar
					</Text>
					<Text style={styles.message} onPress={() => navigation.navigate('AccountRegister')}>
						Cadastre-se
					</Text>
				</View> */}
				<FAB
					style={global.fabButton}
					icon='plus'
					label='Novo Registro'
					onPress={() => navigation.navigate('ObjectRegister')}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	homeContainer: {
		flex: 1,
		alignItems: 'center',
		width: '100%',
		paddingHorizontal: 32,
		paddingVertical: 64,
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
