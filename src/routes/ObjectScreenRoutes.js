import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from '@react-navigation/stack';
import Header from '../components/Header';
import ObjectDetails from '../pages/ObjectDetails';
import ObjectEdit from '../pages/ObjectEdit';

// Data
import MyObjectsList from '../mockup/RegisteredObjectsData';
const { lostObjects, foundObjects } = MyObjectsList;

const Stack = createStackNavigator();

export default function ObjectScreenRoutes() {
	return (
		<Stack.Navigator
			screenOptions={{
				header: ({ navigation, route, back, options }) => (
					<Header navigation={navigation} route={route} back={back} options={options} />
				),
				// animationEnabled: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<Stack.Screen
				name='ObjectDetails'
				component={ObjectDetails}
				options={({ route }) => ({
					title:
						(route.params?.foundObject
							? foundObjects[route.params?.objectId - 1]?.object
							: lostObjects[route.params?.objectId - 1]?.object) || 'Detalhes do Objeto',
				})}
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
        name="ObjectRegister"
        component={ObjectRegister}
        options={{
          title: "Novo Registro",
        }}
      /> */}
		</Stack.Navigator>
	);
}
