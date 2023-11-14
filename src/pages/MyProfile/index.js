import { useState } from "react";
import { View, Image } from "react-native";
import { Text, Avatar, List } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import PrimaryFAB from "../../components/PrimaryFAB";

// Hooks
import useAppTheme from "../../hooks/useAppTheme";

// Styles
import { global } from "../../styles/global";

export default function MyProfile({ navigation }) {
  const [user, setUser] = useState({
    id: 1,
    name: "Cleiton Fernandes",
    email: "cleitin.hta@gmail.com",
    phone: "+55 61 9 9251-3746",
    avatar:
      /* null */'https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg',
  });

  const { themeType } = useAppTheme();

  return (
    <View style={[global.pageContainer, { justifyContent: "flex-start" }]}>
      {user.avatar ? (
        <Avatar.Image
          size={192}
          style={{ marginVertical: 32 }}
          source={() => (
            <Image
              style={{ aspectRatio: 1 / 1, borderRadius: 256 }}
              source={{ uri: user.avatar }}
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
      <Text style={global.perfilUserName}>{user.name}</Text>
      <View style={global.button}>
        <List.Item
          style={global.objectItemSpec}
          title={user.email}
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
          title={user.phone}
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
          onPress={() => console.log(navigation.navigate("EditProfile"))}
        />
      </View>
    </View>
  );
}
