import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// Components
import UnreadNotifications from '../components/UnreadNotifications';
import AllNotifications from '../components/AllNotifications';

const Tab = createMaterialTopTabNavigator();

export default function NotificationsRoutes() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: { backgroundColor: 'white' },
				tabBarIndicatorStyle: { backgroundColor: '#af4a4a' },
				tabBarLabelStyle: { textTransform: 'none' },
				tabBarActiveTintColor: '#af4a4a',
			}}
		>
			<Tab.Screen name='UnreadNotifications' component={UnreadNotifications} options={{ title: 'Não Lidas' }} />
			<Tab.Screen name='AllNotifications' component={AllNotifications} options={{ title: 'Todas' }} />
		</Tab.Navigator>
	);
}
