import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

// Components
import Header from '../components/Header';

// Screens
// import ObjectRegister from '../pages/ObjectRegister';
import ObjectDetails from '../pages/ObjectDetails';
import ObjectEdit from '../pages/ObjectEdit';

const Stack = createStackNavigator();

export default function ObjectScreenRoutes() {
	return (
		<Stack.Navigator
			screenOptions={{
				header: (props) => <Header {...props} />,
				// animationEnabled: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen
				name='ObjectDetails'
				component={ObjectDetails}
				options={{
					title: 'Detalhes do Objeto',
				}}
			/>
			<Stack.Screen
				name='ObjectEdit'
				component={ObjectEdit}
				options={{
					title: 'Editar Registro',
					hideDrawerMenu: true,
				}}
			/>
			{/* <Stack.Screen
				name='ObjectRegister'
				component={ObjectRegister}
				options={{
					title: 'Novo Registro',
					hideDrawerMenu: true,
				}}
			/> */}
		</Stack.Navigator>
	);
}
