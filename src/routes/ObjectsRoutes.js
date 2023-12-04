// import { useEffect, useState } from 'react';
// import { View } from 'react-native';
// import { ActivityIndicator, Portal, Snackbar } from 'react-native-paper';

// // Hooks
// import useUser from '../hooks/useUser';

// // Components
// import LostObjects from '../components/LostObjects';
// import FoundObjects from '../components/FoundObjects';
// import PrimaryFAB from '../components/PrimaryFAB';
// import TabBar from '../components/TabBar';

// // Pages
// // import Home from '../pages/Home';

// // Styles
// import { global } from '../styles/global';

// export default function ObjectsRoutes({ navigation, route }) {
// 	const [wasDeleted, setWasDeleted] = useState(false);
// 	// const [isLoading, setIsLoading] = useState(true);
// 	const { userItems } = useUser();
// 	const controller = new AbortController();

// 	useEffect(() => {
// 		let snackbarTime;
// 		if (route.params?.objectDeleted) {
// 			setWasDeleted(true);

// 			snackbarTime = setTimeout(() => {
// 				setWasDeleted(false);
// 				route.params.objectDeleted = false;
// 			}, 3000);
// 		}

// 		return () => {
// 			controller.abort();
// 			clearTimeout(snackbarTime);
// 		};
// 	}, [route.params]);

// 	// useEffect(() => {
// 	// 	if (userItems.length) setIsLoading(false);
// 	// }, [userItems]);

// 	return (
// 		<>
// 			{userItems.length ? (
// 				<TabBar
// 					screens={[
// 						{ component: LostObjects, title: 'Objetos Perdidos' },
// 						{ component: FoundObjects, title: 'Objetos Achados' },
// 					]}
// 					hasBadge={[
// 						userItems.filter((object) => object.situation === 'lost').length,
// 						userItems.filter((object) => object.situation === 'found').length,
// 					]}
// 				/>
// 			) : (
// 				<View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
// 					<ActivityIndicator animating={true} size={'large'} />
// 				</View>
// 			)}
// 			<PrimaryFAB
// 				style={global.fabButton}
// 				icon='plus'
// 				label='Novo Registro'
// 				onPress={() => navigation.navigate('ObjectScreenRoutes', { screen: 'ObjectRegister' })}
// 			/>
// 			<Portal>
// 				<Snackbar visible={wasDeleted}>Objeto apagado com sucesso!</Snackbar>
// 			</Portal>
// 		</>
// 	);
// }
// ------------------------------------------------------------------------------------
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

// Components
import Header from '../components/Header';
import Home from '../pages/Home';
import { Portal, Snackbar } from 'react-native-paper';

// Pages
import ObjectRegister from '../pages/ObjectRegister';
import { useEffect, useState } from 'react';

const Stack = createStackNavigator();

export default function RegisteredObjectsRoutes({ route }) {
	const [snackbarVisibility, setSnackbarVisibility] = useState(false);
	const controller = new AbortController;

	useEffect(() => {
		let snackbarTime;
		if (route.params?.createdAccount) {
			setSnackbarVisibility(true);

			snackbarTime = setTimeout(() => {
				setSnackbarVisibility(false);
				route.params.createdAccount = false;
			}, 3000);
		}

		return () => {
			controller.abort();
			clearTimeout(snackbarTime);
		};
	}, [route.params?.createdAccount])

	return (
		<>
			<Stack.Navigator
				screenOptions={{
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			>
				<Stack.Screen
					name='Home'
					component={Home}
					options={{
						header: (props) => <Header {...props} back={null} />,
						title: 'Meus Objetos',
					}}
				/>
				<Stack.Screen
					name='ObjectRegister'
					component={ObjectRegister}
					options={{
						header: (props) => <Header {...props} />,
						title: 'Novo Registro',
						hideDrawerMenu: true,
					}}
				/>
			</Stack.Navigator>
			<Portal>
				<Snackbar visible={snackbarVisibility}>
					Conta criada com sucesso!
				</Snackbar>
        	</Portal>
			{/* <Snackbar params={route.params?.createdAccount}>
				Conta criada com sucesso!
			</Snackbar> */}
		</>
	);
}
