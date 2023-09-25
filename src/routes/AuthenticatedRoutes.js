import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

// Hooks
import useAppTheme from '../hooks/useAppTheme';

// Routes
import RegisteredObjectsRoutes from './RegisteredObjectsRoutes';
import NotificationsRoutes from './NotificationsRoutes';

// Pages
import Home from '../pages/Home';
// import MyNotifications from '../pages/MyNotifications';
// import MyObjects from '../pages/MyObjects';
import MyProfile from '../pages/MyProfile';
import ObjectDetails from '../pages/ObjectDetails';
import ObjectRegister from '../pages/ObjectRegister';

// Components
import Header from '../components/Header';

// Styles
import { global } from '../styles/global';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<Divider bold style={{ width: '92%', alignSelf: 'center' }} />
			<DrawerItem
				icon={({ color, size }) => <MaterialIcons name='logout' size={size} color={color} />}
				label='Sair'
				onPress={() => props.navigation.navigate('UnauthenticatedRoutes', { screen: 'AccountLogin' })}
				style={{ borderRadius: 32 }}
			/>
		</DrawerContentScrollView>
	);
}

export default function AuthenticatedRoutes() {
	const { theme } = useAppTheme();
	const { top } = useSafeAreaInsets();

	return (
		<Drawer.Navigator
			initialRouteName='Home'
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: true,
				header: ({ navigation, route, back, options }) => (
					<Header navigation={navigation} route={route} back={back} options={options} />
				),
				swipeEnabled: false, // Manter False ou não?
				drawerPosition: 'right',
				drawerStyle: {
					height: '50%',
					borderTopStartRadius: 32,
					borderBottomStartRadius: 32,
					// paddingBottom: top,
				},
				// drawerItemStyle: { borderRadius: 32 },
				// tentar colocar o theme.roundness ao invés de 32
			}}
		>
			<Drawer.Screen
				name='Home'
				component={Home}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='home' size={size} color={color} />,
					drawerLabel: 'Início',
					title: 'Santo Pulinho', // Qual nome a gnt deve deixar?
				}}
			/>
			<Drawer.Screen
				name='MyProfile'
				component={MyProfile}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='account-circle' size={size} color={color} />,
					drawerLabel: 'Meu Perfil',
					title: 'Meu Perfil',
				}}
			/>
			<Drawer.Screen
				name='MyNotifications'
				component={NotificationsRoutes}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='notifications' size={size} color={color} />,
					drawerLabel: 'Minhas Notificações',
					title: 'Minhas Notificações',
				}}
			/>
			<Drawer.Screen
				name='MyObjects'
				component={RegisteredObjectsRoutes}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='image-search' size={size} color={color} />,
					drawerLabel: 'Meus Objetos',
					title: 'Meus Objetos',
				}}
			/>
			<Drawer.Screen
				name='ObjectDetails'
				component={ObjectDetails}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='image-search' size={size} color={color} />,
					drawerLabel: 'Detalhes do Objeto',
					title: 'Detalhes do Objeto',
					drawerItemStyle: { display: 'none' },
				}}
			/>
			<Drawer.Screen
				name='ObjectRegister'
				component={ObjectRegister}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='image-search' size={size} color={color} />,
					drawerLabel: 'Novo Registro',
					title: 'Novo Registro',
					drawerItemStyle: { display: 'none' },
				}}
			/>
		</Drawer.Navigator>
	);
}
