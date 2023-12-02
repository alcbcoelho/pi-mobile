import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Portal, Snackbar, Text } from 'react-native-paper';

// Components
import TabBar from '../components/TabBar';
import PrimaryFAB from '../components/PrimaryFAB';
import LostObjects from '../components/LostObjects';
import FoundObjects from '../components/FoundObjects';

// Hooks
import useUser from '../hooks/useUser';

// Styles
import { global } from '../styles/global';

export default function Home({ navigation, route }) {
	const [wasDeleted, setWasDeleted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { userItems } = useUser();
	const controller = new AbortController();

	useEffect(() => {
		let snackbarTime;
		if (route.params?.objectDeleted) {
			setWasDeleted(true);

			snackbarTime = setTimeout(() => {
				setWasDeleted(false);
				route.params.objectDeleted = false;
			}, 3000);
		}

		return () => {
			controller.abort();
			clearTimeout(snackbarTime);
		};
	}, [route.params]);

	useEffect(() => {
		if (userItems.length) setIsLoading(false);
	}, [userItems]);

	return (
		<>
			{isLoading ? (
				<View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator animating={true} size={'large'} />
				</View>
			) : userItems.length ? (
				<TabBar
					screens={[
						{ component: LostObjects, title: 'Objetos Perdidos' },
						{ component: FoundObjects, title: 'Objetos Achados' },
					]}
					hasBadge={[
						userItems.filter((object) => object.situation === 'lost').length,
						userItems.filter((object) => object.situation === 'found').length,
					]}
				/>
			) : (
				<View style={global.pageContainer}>
					<View style={styles.homeContainer}>
						<Text style={styles.greeting}>Sem objetos para exibir</Text>
						<Text style={styles.message}>
							Parece que você ainda não fez nenhum registro de item achado ou perdido!
						</Text>
					</View>
				</View>
			)}
			<PrimaryFAB
				style={global.fabButton}
				icon='plus'
				label='Novo Registro'
				onPress={() => {
					navigation.navigate('ObjectRegister', { unsavedChanges: false });
				}}
			/>
			<Portal>
				<Snackbar visible={wasDeleted}>Objeto apagado com sucesso!</Snackbar>
			</Portal>
		</>
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
});
