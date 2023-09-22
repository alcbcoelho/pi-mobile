import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons } from '@expo/vector-icons';

// Pages
import MyNotifications from '../pages/MyNotifications';
import MyObjects from '../pages/MyObjects';
import MyProfile from '../pages/MyProfile';
import StackRoutes from './stack.routes';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
	return (
		<Drawer.Navigator initialRouteName='StackRoutes'>
			<Drawer.Screen
				name='StackRoutes'
				component={StackRoutes}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='home' size={size} color={color} />,
					drawerLabel: 'Início',
				}}
			/>
			<Drawer.Screen
				name='MyProfile'
				component={MyProfile}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='account-circle' size={size} color={color} />,
					drawerLabel: 'Perfil',
				}}
			/>
			<Drawer.Screen
				name='MyNotifications'
				component={MyNotifications}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='notifications' size={size} color={color} />,
					drawerLabel: 'Notificações',
				}}
			/>
			<Drawer.Screen
				name='MyObjects'
				component={MyObjects}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='image-search' size={size} color={color} />,
					drawerLabel: 'Meus Objetos',
				}}
			/>
			<Drawer.Screen
				name='logout'
				component={''}
				options={{
					drawerIcon: ({ color, size }) => <MaterialIcons name='logout' size={size} color={color} />,
					drawerLabel: 'Sair',
				}}
			/>
		</Drawer.Navigator>
	);
}
