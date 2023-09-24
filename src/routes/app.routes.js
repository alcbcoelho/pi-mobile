import { createStackNavigator } from '@react-navigation/stack';

// Routes
import AuthenticatedRoutes from './drawer.routes';
import UnauthenticatedRoutes from './stack.routes';

const Stack = createStackNavigator();

export default function AppRoutes() {
	return (
		<Stack.Navigator initialRouteName='UnauthenticatedRoutes' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='AuthenticatedRoutes' component={AuthenticatedRoutes} />
			<Stack.Screen name='UnauthenticatedRoutes' component={UnauthenticatedRoutes} />
		</Stack.Navigator>
	);
}
