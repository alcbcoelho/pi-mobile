import { createStackNavigator } from '@react-navigation/stack';

// Routes
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';

const Stack = createStackNavigator();

export default function AppRoutes() {
	return (
		<Stack.Navigator initialRouteName='UnauthenticatedRoutes' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='AuthenticatedRoutes' component={AuthenticatedRoutes} />
			<Stack.Screen name='UnauthenticatedRoutes' component={UnauthenticatedRoutes} />
		</Stack.Navigator>
	);
}
