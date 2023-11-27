import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";

// Routes
import AuthenticatedRoutes from "./AuthenticatedRoutes";
import UnauthenticatedRoutes from "./UnauthenticatedRoutes";

// Contexts
import { AuthContext } from "../contexts/AuthContext";

const Stack = createStackNavigator();

export default function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    // <Stack.Navigator
    //   /* initialRouteName='UnauthenticatedRoutes' */ screenOptions={{
    //     headerShown: false,
    //   }}
    // >
    //   {user.loggedIn ? (
    //     <Stack.Screen
    //       name="AuthenticatedRoutes"
    //       component={AuthenticatedRoutes}
    //     />
    //   ) : (
    //     <Stack.Screen
    //       name="UnauthenticatedRoutes"
    //       component={UnauthenticatedRoutes}
    //     />
    //   )}
    // </Stack.Navigator>
    <Stack.Navigator initialRouteName='UnauthenticatedRoutes' screenOptions={{ headerShown: false }}>
    	<Stack.Screen name='AuthenticatedRoutes' component={AuthenticatedRoutes} />
    	<Stack.Screen name='UnauthenticatedRoutes' component={UnauthenticatedRoutes} />
    </Stack.Navigator>
  );
}
