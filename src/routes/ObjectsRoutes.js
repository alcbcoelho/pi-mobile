import { useEffect, useState } from 'react';
import { Portal, Snackbar } from 'react-native-paper';

// Hooks
import useUser from '../hooks/useUser';

// Components
import LostObjects from '../components/LostObjects';
import FoundObjects from '../components/FoundObjects';
import PrimaryFAB from '../components/PrimaryFAB';
import TabBar from '../components/TabBar';

// Pages
import Home from '../pages/Home';

// Styles
import { global } from '../styles/global';

export default function ObjectsRoutes({ navigation, route }) {
	const [wasDeleted, setWasDeleted] = useState(false);
	const { userItems } = useUser();
	const controller = new AbortController();

	useEffect(() => {
		if (route.params?.objectDeleted) {
			setWasDeleted(true);

			setTimeout(() => {
				setWasDeleted(false);
				route.params.objectDeleted = false;
				route.params.objectRemovedName = '';
			}, 3000);
		}

		return () => controller.abort();
	}, [route.params]);

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
				<Home />
			)}
			<PrimaryFAB
				style={global.fabButton}
				icon='plus'
				label='Novo Registro'
				onPress={() => navigation.navigate('ObjectRegister')}
			/>
			<Portal>
				<Snackbar visible={wasDeleted}>{route.params?.objectRemovedName + ' apagado com sucesso.'}</Snackbar>
			</Portal>
		</>
	);
}
