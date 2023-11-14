// Components
import Header from "../components/Header";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

// Screens
import MyProfile from "../pages/MyProfile";
import MyProfileEdit from "../pages/MyProfileEdit";

const Stack = createStackNavigator();

export default function UserScreenRoutes() {
    return (
        <Stack.Navigator
            initialRouteName="MyProfile"
            screenOptions={{
                header: ({ navigation, route, back, options }) => (
                    <Header
                      navigation={navigation}
                      route={route}
                      back={back}
                      options={options}
                    />
                ),
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <Stack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{
                    title: "Meu Perfil" //
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={MyProfileEdit}
                options={{
                    title: "Editar Perfil",
                    hideHeaderActions: true
                }}
            />
        </Stack.Navigator>
    )
}