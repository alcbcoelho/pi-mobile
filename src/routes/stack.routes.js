import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

// Pages
import Home from '../pages/Home';
import MyNotifications from '../pages/MyNotifications';
import MyObjects from '../pages/MyObjects';
import MyProfile from '../pages/MyProfile';
import ObjectDetails from '../pages/ObjectDetails';
import ObjectRegister from '../pages/ObjectRegister';

import AccountLogin from '../pages/AccountLogin';
import AccountRecover from '../pages/AccountRecover';
import AccountRegister from '../pages/AccountRegister';

const Stack = createStackNavigator();

export default function StackRoutes() {
	return (
		<Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: true }}>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='MyNotifications' component={MyNotifications} />
			<Stack.Screen name='MyObjects' component={MyObjects} />
			<Stack.Screen name='MyProfile' component={MyProfile} />
			<Stack.Screen name='ObjectDetails' component={ObjectDetails} />
			<Stack.Screen name='ObjectRegister' component={ObjectRegister} />
			<Stack.Screen name='AccountLogin' component={AccountLogin} />
			<Stack.Screen name='AccountRecover' component={AccountRecover} />
			<Stack.Screen name='AccountRegister' component={AccountRegister} />
		</Stack.Navigator>
	);
}
