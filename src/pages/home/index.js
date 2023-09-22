import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, FAB } from 'react-native-paper';

// Styles
import { global } from '../../styles/global';

export default function Home({ navigation }) {
	const [user, setUser] = useState({ name: 'Fulano de Tal' });

	return (
		<View style={global.pageContainer}>
			<View style={global.contentContainer}>
				<Text>Olá {user.name}</Text>
				<Text>Parece que você ainda não fez nenhum registro de item achado ou perdido!</Text>
				<Text onPress={() => navigation.navigate('AccountLogin')}>Entrar</Text>
				<Text onPress={() => navigation.navigate('AccountRecover')}>Recuperar</Text>
				<Text onPress={() => navigation.navigate('AccountRegister')}>Cadastre-se</Text>
				<FAB
					style={global.fab}
					icon='plus'
					label='Novo Registro'
					onPress={() => navigation.navigate('ObjectRegister')}
				/>
			</View>
		</View>
	);
}

// const styles = StyleSheet.create({});
