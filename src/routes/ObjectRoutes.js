import { createStackNavigator } from "@react-navigation/stack";
import ObjectRegister from "../pages/ObjectRegister";
import ObjectDetails from "../pages/ObjectDetails";
import ObjectEdit from "../pages/ObjectEdit";

// Data
import MyObjectsList from "../mockup/RegisteredObjectsData";
const { lostObjects, foundObjects } = MyObjectsList;

const Stack = createStackNavigator();

export default function ObjectRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="ObjectDetails"
        component={ObjectDetails}
        options={({ route }) => ({
          title:
            (route.params?.foundObject
              ? foundObjects[route.params?.objectId - 1]?.object
              : lostObjects[route.params?.objectId - 1]?.object) ||
            "Detalhes do Objeto",
        })}
      />
      <Stack.Screen
        name="ObjectEdit"
        component={ObjectEdit}
        options={{
          title: "Editar Registro",
        }}
      />
      <Stack.Screen
        name="ObjectRegister"
        component={ObjectRegister}
        options={{
          title: "Novo Registro",
        }}
      />
    </Stack.Navigator>
  );
}
