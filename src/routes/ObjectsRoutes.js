import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Portal, Snackbar } from 'react-native-paper';

// Hooks
import useUser from '../hooks/useUser';

// Components
import LostObjects from '../components/LostObjects';
import FoundObjects from '../components/FoundObjects';
import PrimaryFAB from '../components/PrimaryFAB';
import TabBar from '../components/TabBar';

// Pages
// import Home from '../pages/Home';

// Styles
import { global } from '../styles/global';

export default function ObjectsRoutes({ navigation, route }) {
	const [wasDeleted, setWasDeleted] = useState(false);
	// const [isLoading, setIsLoading] = useState(true);
	const { userItems } = useUser();
	const controller = new AbortController();

	useEffect(() => {
		let snackbarTime;
		if (route.params?.objectDeleted) {
			setWasDeleted(true);

			snackbarTime = setTimeout(() => {
				setWasDeleted(false);
				route.params.objectDeleted = false;
				route.params.objectRemovedName = '';
			}, 3000);
		}

		return () => {
			controller.abort();
			clearTimeout(snackbarTime);
		};
	}, [route.params]);

	// useEffect(() => {
	// 	if (userItems.length) setIsLoading(false);
	// }, [userItems]);

	return (
		<>
			{userItems.length ? (
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
				<View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
					<ActivityIndicator animating={true} size={'large'} />
				</View>
			)}
			<PrimaryFAB
				style={global.fabButton}
				icon='plus'
				label='Novo Registro'
				onPress={() => navigation.navigate('ObjectRegister')}
			/>
			<Portal>
				<Snackbar visible={wasDeleted}>{route.params?.objectRemovedName + ' apagado(a) com sucesso.'}</Snackbar>
			</Portal>
		</>
	);
}
