import { View, FlatList, Image, Pressable, ScrollView } from "react-native";
import { Divider, Text } from "react-native-paper";

// Data
import RegisteredObjectsData from '../mockup/RegisteredObjectsData';

// Styles
import { global } from "../styles/global";

export default function ObjectList({ navigation, foundObjects = false }) {
  return (
    <FlatList
      data={foundObjects ? RegisteredObjectsData.foundObjects : RegisteredObjectsData.lostObjects}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate("ObjectDetails", {
          foundObject: foundObjects,
          objectId: item.id,
        })}>
          <View style={global.item}>
            <Image
              style={{ width: 50, height: 50, borderRadius: 2.5 }}
              source={{ uri: item.imgUrl[0] }}
            />
            <ScrollView>
              <Text variant="titleMedium">{item.object}</Text>
              <Text variant="labelMedium">
                {foundObjects ? "Achado" : "Perdido"} em {item.date}, por volta
                das {item.time}, em {item.place}
              </Text>
            </ScrollView>
          </View>
          <Divider />
        </Pressable>
      )}
    />
  );
}
