import React, { useContext, useCallback } from "react";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MaterialIcons, Ionicons } from "@expo/vector-icons";

// Hooks
import useAppTheme from "../hooks/useAppTheme";

// Styles
import { global } from "../styles/global";

export default function Header({
  navigation,
  route,
  back,
  options,
  actionless = false,
}) {
  const { theme, toggleThemeType, themeType } = useAppTheme();
  const { top } = useSafeAreaInsets();

  return (
    <Appbar.Header
      style={{ backgroundColor: "#946D51" }}
      elevated={true}
      safeAreaInsets={top}
    >
      {back || route.name !== "MyObjects" ? (
        <Appbar.BackAction color={"#fff"} onPress={() => navigation.goBack()} />
      ) : null}
      {/* Verificar lógica do botão de voltar */}
      <Appbar.Content title={options.title} titleStyle={{ color: "#fff" }} />
      {!options.hideHeaderActions && (
        <>
          <Appbar.Action
            icon={useCallback(
              () => (
                <Ionicons
                  name={themeType === "dark" ? "moon" : "moon-outline"}
                  color="#fff"
                  size={24}
                  onPress={toggleThemeType}
                  // onPress={() => {
                  // 	console.log(options.title);
                  // }}
                />
              ),
              [themeType]
            )}
          />
          <Appbar.Action
            icon={useCallback(
              () => (
                <Ionicons
                  name="menu-outline"
                  color="#fff"
                  size={24}
                  onPress={() => navigation.toggleDrawer()}
                />
              ),
              []
            )}
          />
        </>
      )}
      {/* <Appbar.Action
				icon={() => <MaterialIcons name='notifications' size={24} />}
				onPress={() => navigation.navigate('MyNotifications')}
			/>
			<Appbar.Action
				icon={() => <MaterialIcons name='account-circle' size={24} />}
				onPress={() => navigation.navigate('MyProfile')}
			/> */}
    </Appbar.Header>
  );
}
