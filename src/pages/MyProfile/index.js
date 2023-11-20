import { useState, useContext } from "react";
import { View, Image } from "react-native";
import { Text, Avatar, List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import PrimaryFAB from "../../components/PrimaryFAB";

// Hooks
import useAppTheme from "../../hooks/useAppTheme";

// Contexts
import { AuthContext } from "../../contexts/AuthContext";

// Styles
import { global } from "../../styles/global";

// Data
import { userData } from "../../mockup/UserData";

export default function MyProfile({ navigation }) {
  const { user } = useContext(AuthContext);
  const { themeType } = useAppTheme();

  const index = userData.findIndex((user_) => user_.email === user.email);

  return (
    <View style={[global.pageContainer, { justifyContent: "flex-start" }]}>
      {userData[index].avatar ? (
        <Avatar.Image
          size={192}
          style={{ marginVertical: 32 }}
          source={() => (
            <Image
              style={{ aspectRatio: 1 / 1, borderRadius: 256 }}
              source={{ uri: userData[index].avatar }}
            />
          )}
        />
      ) : (
        <Avatar.Icon
          size={192}
          icon={({ size, color }) => (
            <Ionicons name="person" size={size} color={color} />
          )} /* 'account' */
          style={{
            backgroundColor:
              themeType === "light"
                ? "rgba(147, 75, 0, 0.15)"
                : "rgba(255, 183, 130, 0.15)",
            marginVertical: 32,
          }}
        />
      )}
      <Text style={global.perfilUserName}>{`${userData[index].firstName} ${userData[index].lastName}`}</Text>
      <View style={global.button}>
        <List.Item
          style={global.objectItemSpec}
          title={userData[index].email}
          left={(props) => (
            <List.Icon
              {...props}
              icon={({ size, color }) => (
                <Image
                  source={require("../../../assets/icons/mail-outline.png")}
                  style={{ width: size, height: size, tintColor: color }}
                />
              )}
            />
          )}
        />
        <List.Item
          style={global.objectItemSpec}
          title={userData[index].phone}
          left={(props) => (
            <List.Icon
              {...props}
              icon={({ size, color }) => (
                <Image
                  source={require("../../../assets/icons/phone-outline.png")}
                  style={{ width: size, height: size, tintColor: color }}
                />
              )}
            />
          )}
        />
      </View>
      <View style={[global.fabButton, { gap: 16 }]}>
        <PrimaryFAB
          icon="pencil-outline"
          onPress={() =>
            navigation.navigate("EditProfile", {
              userId: userData[index].id,
            })
          }
        />
      </View>
    </View>
  );
}
