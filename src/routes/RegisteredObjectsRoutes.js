import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FAB } from 'react-native-paper';

// Components
import LostObjects from '../components/LostObjects';
import FoundObjects from '../components/FoundObjects';

// Styles
import { global } from '../styles/global';

const Tab = createMaterialTopTabNavigator();

export default function RegisteredObjectsRoutes() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarStyle: { backgroundColor: 'white' },
				tabBarIndicatorStyle: { backgroundColor: '#af4a4a' },
				tabBarLabelStyle: { textTransform: 'none' },
				tabBarActiveTintColor: '#af4a4a',
			}}
		>
			<Tab.Screen name='LostObjects' component={LostObjects} options={{ title: 'Objetos Perdidos' }} />
			<Tab.Screen name='FoundObjects' component={FoundObjects} options={{ title: 'Objetos Achados' }} />
		</Tab.Navigator>
	);
}
