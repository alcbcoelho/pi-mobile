import { createStackNavigator } from '@react-navigation/stack';
import useAuth from '../hooks/useAuth';

// Routes
import AuthenticatedRoutes from './AuthenticatedRoutes';
import UnauthenticatedRoutes from './UnauthenticatedRoutes';

const Stack = createStackNavigator();

export default function MainRoutes() {
	const { userAuth } = useAuth();

	return (
		<Stack.Navigator initialRouteName='UnauthenticatedRoutes' screenOptions={{ headerShown: false }}>
			{userAuth.isAuthenticated ? (
				<Stack.Screen name='AuthenticatedRoutes' component={AuthenticatedRoutes} />
			) : (
				<Stack.Screen name='UnauthenticatedRoutes' component={UnauthenticatedRoutes} />
			)}
		</Stack.Navigator>
	);
}
