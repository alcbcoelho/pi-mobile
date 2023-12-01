import { Ionicons } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

// Hooks
import useAppTheme from '../hooks/useAppTheme';
import useAuth from '../hooks/useAuth';

// Routes
import ObjectsRoutes from './ObjectsRoutes';
import UserScreenRoutes from './UserScreenRoutes';
import NotificationsRoutes from './NotificationsRoutes';
import ObjectScreenRoutes from './ObjectScreenRoutes';

// Pages
import ObjectRegister from '../pages/ObjectRegister';

// Components
import Header from '../components/Header';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	const { theme } = useAppTheme();
	const { logout } = useAuth();

	// const miscStyleProperties = {
	// 	style: { borderRadius: 32 },
	// 	activeBackgroundColor: '#946D51',
	// 	activeTintColor: theme.colors.surface,
	// 	inactiveTintColor: theme.colors.onSurfaceVariant,
	// };

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<Divider
				bold
				style={{
					width: '92%',
					alignSelf: 'center',
					backgroundColor: theme.colors.onSurfaceVariant,
				}}
			/>
			<DrawerItem
				icon={({ focused, color, size }) => (
					<Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={color} />
				)}
				label='Sair'
				onPress={() => {
					logout();
					// FIXME: descobrir qual é a treta com a navegação
					// props.navigation.navigate('UnauthenticatedRoutes', {
					// 	screen: 'AccountLogin',
					// });
				}}
				style={{ borderRadius: 32 }}
				activeBackgroundColor='#946D51'
				activeTintColor={theme.colors.surface}
				inactiveTintColor={theme.colors.onSurfaceVariant}
			/>
		</DrawerContentScrollView>
	);
}

export default function AuthenticatedRoutes() {
	const { theme } = useAppTheme();
	// const { top } = useSafeAreaInsets();

	return (
		<Drawer.Navigator
			initialRouteName={'MyObjects'}
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: true,
				header: (props) => <Header {...props} />,
				swipeEnabled: false,
				drawerPosition: 'right',
				drawerActiveBackgroundColor: '#946D51',
				drawerActiveTintColor: theme.colors.surface,
				drawerInactiveTintColor: theme.colors.onSurfaceVariant,
				drawerStyle: {
					height: '50%',
					borderTopStartRadius: 32,
					borderBottomStartRadius: 32,
					backgroundColor: theme.colors.background,
					// paddingBottom: top,
				},
				drawerItemStyle: { borderRadius: 32 },
			}}
		>
			<Drawer.Screen
				name='MyObjects'
				component={ObjectsRoutes}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Ionicons name={focused ? 'albums' : 'albums-outline'} size={size} color={color} />
					),
					drawerLabel: 'Meus Objetos',
					title: 'Meus Objetos',
				}}
			/>
			<Drawer.Screen
				name='UserScreenRoutes'
				component={UserScreenRoutes}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? 'person-circle' : 'person-circle-outline'}
							size={size}
							color={color}
						/>
					),
					drawerLabel: 'Meu Perfil',
					title: 'Meu Perfil',
					headerShown: false,
					// drawerItemStyle: { display: 'none' },
				}}
			/>
			<Drawer.Screen
				name='MyNotifications'
				component={NotificationsRoutes}
				options={{
					drawerIcon: ({ focused, color, size }) => (
						<Ionicons
							name={focused ? 'notifications' : 'notifications-outline'}
							size={size}
							color={color}
						/>
					),
					drawerLabel: 'Minhas Notificações',
					title: 'Minhas Notificações',
				}}
			/>
			<Drawer.Screen
				name='ObjectScreenRoutes'
				component={ObjectScreenRoutes}
				options={{
					headerShown: false,
					drawerItemStyle: { display: 'none' },
				}}
			/>
			<Drawer.Screen
				name='ObjectRegister'
				component={ObjectRegister}
				options={{
					title: 'Novo Registro',
					drawerItemStyle: { display: 'none' },
				}}
			/>
		</Drawer.Navigator>
	);
}
