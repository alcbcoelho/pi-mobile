import { createStackNavigator } from '@react-navigation/stack';

// Pages
import AccountLogin from '../pages/AccountLogin';
import AccountRecover from '../pages/AccountRecover';
import AccountRegister from '../pages/AccountRegister';

const Stack = createStackNavigator();

export default function UnauthenticatedRoutes() {
	return (
		<Stack.Navigator initialRouteName='AccountLogin' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='AccountLogin' component={AccountLogin} options={{ title: 'Entrar' }} />
			<Stack.Screen name='AccountRecover' component={AccountRecover} options={{ title: 'Recuperar Conta' }} />
			<Stack.Screen name='AccountRegister' component={AccountRegister} options={{ title: 'Registrar Conta' }} />
		</Stack.Navigator>
	);
}
