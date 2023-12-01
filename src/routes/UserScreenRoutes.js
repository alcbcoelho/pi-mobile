import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

// Components
import Header from '../components/Header';

// Screens
import MyProfile from '../pages/MyProfile';
import MyProfileEdit from '../pages/MyProfileEdit';

const Stack = createStackNavigator();

export default function UserScreenRoutes() {
	return (
		<Stack.Navigator
			initialRouteName='MyProfile'
			screenOptions={{
				header: (props) => <Header {...props} />,
				cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
			}}
		>
			<Stack.Screen
				name='MyProfile'
				component={MyProfile}
				options={{
					title: 'Meu Perfil',
				}}
			/>
			<Stack.Screen
				name='EditProfile'
				component={MyProfileEdit}
				options={{
					title: 'Editar Perfil',
					hideDrawerMenu: true,
				}}
			/>
		</Stack.Navigator>
	);
}
