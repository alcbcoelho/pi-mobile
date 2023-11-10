import { Ionicons } from '@expo/vector-icons';
import { Divider, useTheme } from 'react-native-paper';
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

// Context
import InitialRouteContextProvider, { initialRouteName_ as initialRouteName } from '../contexts/InitialRouteContext';

// Styles
import { global } from '../styles/global';

// Data
import MyObjectsList from '../mockup/RegisteredObjectsData';
const { lostObjects, foundObjects } = MyObjectsList;

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const { theme } = useAppTheme();

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<Divider bold style={{ width: '92%', alignSelf: 'center', backgroundColor: theme.colors.onSurfaceVariant }} />
			<DrawerItem
				icon={({ focused, color, size }) => <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={color} />}
				label='Sair'
				onPress={() => {
					// setInputLabelColor('#fff')
					props.navigation.navigate('UnauthenticatedRoutes', { screen: 'AccountLogin' })
				}}
				style={{ borderRadius: 32 }}
				activeBackgroundColor='#946D51'
				activeTintColor={theme.colors.surface}
				inactiveTintColor={theme.colors.onSurfaceVariant}
			/>
		</DrawerContentScrollView>
	);
}

export default function AuthenticatedRoutes({ route }) {
	const { theme } = useAppTheme();
	const { top } = useSafeAreaInsets();

	return (
		<InitialRouteContextProvider>
			<Drawer.Navigator
				initialRouteName={'MyObjects'/* initialRouteName */}
				drawerContent={(props) => <CustomDrawerContent {...props} />}
				screenOptions={{
					headerShown: true,
					header: ({ navigation, route, back, options }) => (
						<Header navigation={navigation} route={route} back={back} options={options} />
					),
					swipeEnabled: false, // Manter False ou não?
					drawerPosition: 'right',
					drawerActiveBackgroundColor: '#946D51'/* theme.colors.primary */,
					drawerActiveTintColor: theme.colors.surface,
					drawerInactiveTintColor: theme.colors.onSurfaceVariant,
					drawerStyle: {
						height: '50%',
						// borderTopStartRadius: 32,
						borderBottomStartRadius: 32,
						backgroundColor: theme.colors.background
						// paddingBottom: top,
					},
					drawerItemStyle: { borderRadius: 32 },
					// tentar colocar o theme.roundness ao invés de 32
				}}
			>
				{/* <Drawer.Screen
					name='Home'
					component={Home}
					options={{
						drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />,
						drawerLabel: 'Início',
						title: 'Santo Pulinho', // Qual nome a gnt deve deixar?
					}}
				/> */}
				<Drawer.Screen
					name='MyObjects'
					component={RegisteredObjectsRoutes}
					options={{
						drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />,
						drawerLabel: 'Meus Objetos',
						title: 'Meus Objetos',
					}}
				/>
				<Drawer.Screen
					name='MyProfile'
					component={MyProfile}
					options={{
						drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />,
						drawerLabel: 'Meu Perfil',
						title: 'Meu Perfil',
					}}
				/>
				<Drawer.Screen
					name='MyNotifications'
					component={NotificationsRoutes}
					options={{
						drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'notifications' : 'notifications-outline'} size={size} color={color} />,
						drawerLabel: 'Minhas Notificações',
						title: 'Minhas Notificações',
					}}
				/>
				<Drawer.Screen
					name='ObjectDetails'
					component={ObjectDetails}
					options={({ route }) => ({
						drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />,
						drawerLabel: 'Detalhes do Objeto',
						title: (route.params?.foundObject ? foundObjects[route.params?.objectId - 1]?.object : lostObjects[route.params?.objectId - 1]?.object) || 'Detalhes do Objeto',
						drawerItemStyle: { display: 'none' },
					})}
				/>
				<Drawer.Screen
					name='ObjectRegister'
					component={ObjectRegister}
					options={{
						drawerIcon: ({ focused, color, size }) => <Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />,
						drawerLabel: 'Novo Registro',
						title: 'Novo Registro',
						drawerItemStyle: { display: 'none' },
					}}
				/>
			</Drawer.Navigator>
		</InitialRouteContextProvider>
	);
}
