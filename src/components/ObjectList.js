import { View, FlatList, Image, Pressable, ScrollView, StyleSheet } from "react-native";
import CustomPressable from "./CustomPressable";
import { Divider, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

// Hooks
import { useContext } from "react";
import { useTheme } from "react-native-paper";
import useAppTheme from "../hooks/useAppTheme";

// Context
import { AuthContext } from "../contexts/AuthContext";
import { DataMockupContext } from "../contexts/DataMockupContext";

// Data
import RegisteredObjectsData from '../mockup/RegisteredObjectsData';

// Styles
import { global } from "../styles/global";

export default function ObjectList({ navigation, foundObjects = false }) {
  const { userData } = useContext(DataMockupContext);
  const { user: { id } } = useContext(AuthContext);

  const index = userData.findIndex((user) => user.id == id);

  const theme = useTheme();
  const { themeType } = useAppTheme();

  return (
      <FlatList
        data={foundObjects ? userData[index].objects.foundObjects : userData[index].objects.lostObjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CustomPressable
            onPress={() => navigation.navigate("ObjectScreenRoutes", {
            screen: "ObjectDetails",
            params: {
              foundObject: foundObjects,
              objectId: item.id,
              userId: id
            }
          })}>
            <View style={global.item}>
              {
                item.imgUrl.length ?
                <Image
                  style={styles.thumbnail}
                  source={{ uri: item.imgUrl[0] }}
                />
                :
                <View style={[
                  styles.thumbnail,
                  global.imagePlaceholder,
                  { backgroundColor: (themeType === 'light') ? 'rgba(147, 75, 0, 0.15)' : 'rgba(255, 183, 130, 0.15)' }
                ]}>
                  <Ionicons name="american-football" size={24} color={theme.colors.background} />
                </View>
              }
              <ScrollView>
                <Text variant="titleMedium">{item.object}</Text>
                <Text variant="labelMedium">
                  {foundObjects ? "Achado" : "Perdido"} em {item.date}, por volta
                  das {item.time}, em {item.place}
                </Text>
              </ScrollView>
            </View>
            <Divider />
          </CustomPressable>
        )}
      />
  );
}

const styles = StyleSheet.create({
  thumbnail: { width: 50, height: 50, borderRadius: 2.5 }
})
