import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Badge, useTheme } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

export default function TabBar({ screens, hasBadge = false }) {
  const theme = useTheme();

  const badges =
    Array.isArray(hasBadge) && hasBadge.length > 0 && hasBadge.length <= 2
      ? hasBadge.map((value) =>
          value > 0 && !isNaN(value)
            ? () => (
                <Badge
                  style={{
                    backgroundColor: theme.colors.primary,
                    marginRight: 10,
                    marginTop: 14,
                  }}
                >
                  {value}
                </Badge>
              )
            : null
        )
      : null;

  const generateBadge = function (index = 0) {
    return badges !== null ? badges[index] : null;
  };

  //   console.log(badges)

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarIndicatorStyle: {
          backgroundColor: theme.colors.primary /* '#af4a4a' */,
        },
        tabBarLabelStyle: { textTransform: "none" },
        tabBarActiveTintColor: theme.colors.primary /* '#af4a4a' */,
        tabBarPressColor: theme.colors.surfaceVariant,
      }}
    >
      <Tab.Screen
        name="LostObjects"
        component={screens[0].component}
        options={{ title: screens[0].title, tabBarBadge: generateBadge() }}
      />
      <Tab.Screen
        name="FoundObjects"
        component={screens[1].component}
        options={{ title: screens[1].title, tabBarBadge: generateBadge(1) }}
      />
    </Tab.Navigator>
  );
}
