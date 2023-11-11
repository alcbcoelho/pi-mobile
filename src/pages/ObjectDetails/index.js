import { View, Image, ScrollView, FlatList } from "react-native";
import { Text, Chip, List, FAB, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import PrimaryFAB from "../../components/PrimaryFAB";
import { useWindowDimensions } from "react-native";

// Hooks
import useAppTheme from "../../hooks/useAppTheme";

// Data
import MyObjectsList from "../../mockup/RegisteredObjectsData";

// Styles
import { global } from "../../styles/global";

export default function ObjectDetails({ route }) {
  const object =
    MyObjectsList[route.params.foundObject ? "foundObjects" : "lostObjects"][
      route.params.objectId - 1
    ];

  const theme = useTheme();
  const { themeType } = useAppTheme();
  const { width } = useWindowDimensions();

  console.log(route.params);

  return (
    <>
      <ScrollView>
        <View
          style={[
            global.pageContainer,
            { justifyContent: "flex-start", height: "100%" },
          ]}
        >
          <FlatList
            ListEmptyComponent={() => (
              <View
                style={[
                  global.imagePlaceholder,
                  {
                    width,
                    height: width,
                    flex: 1,
					backgroundColor: (themeType === 'light') ? 'rgba(147, 75, 0, 0.15)' : 'rgba(255, 183, 130, 0.15)'
                  },
                ]}
              >
                <Ionicons
                  name="american-football"
                  size={width * 0.75}
                  color={theme.colors.background}
                />
              </View>
            )}
            data={object.imgUrl}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            alwaysBounceHorizontal={false}
            bounces={false}
            directionalLockEnabled={true}
            pagingEnabled={true}
            // ListEmptyComponent={}	// configurar isso aqui depois
            renderItem={({ item, index }) => (
              <View key={index} style={{ width, height: width }}>
                <Image
                  style={{ width, height: "100%" }}
                  source={{ uri: item }}
                />
              </View>
            )}
          />
          <View style={global.objectTags}>
            {object.brand ? <Chip mode="outlined">{object.brand}</Chip> : null}
            {object.model ? <Chip mode="outlined">{object.model}</Chip> : null}
            {object.color ? <Chip mode="outlined">{object.color}</Chip> : null}
            {object.characteristics.length !== 0
              ? object.characteristics.map((item, index) => (
                  <Chip key={index} mode="outlined">
                    {item}
                  </Chip>
                ))
              : null}
          </View>
          <View style={global.objectSpecs}>
            <List.Item
              style={global.objectItemSpec}
              title={`Achado por ${object.owner}`}
              left={(props) => (
                <List.Icon
                  {...props} /* icon='account-circle-outline' */
                  icon={({ size }) => (
                    <Image
                      source={{
                        uri: "https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg",
                      }}
                      style={{
                        width: size,
                        height: size,
                        aspectRatio: 1 / 1,
                        borderRadius: 256,
                      }}
                    />
                  )}
                />
              )}
            />
            <List.Item
              style={global.objectItemSpec}
              title={object.date}
              left={(props) => (
                <List.Icon
                  {...props}
                  /* icon='calendar-month-outline' */ icon={({
                    size,
                    color,
                  }) => (
                    <Ionicons
                      name="calendar-outline"
                      size={size}
                      color={color}
                    />
                  )}
                />
              )}
            />
            <List.Item
              style={global.objectItemSpec}
              title={`Por volta de ${object.time}`}
              left={(props) => (
                <List.Icon
                  {...props}
                  /* icon='clock-outline' */ icon={({ size, color }) => (
                    <Ionicons name="time-outline" size={size} color={color} />
                  )}
                />
              )}
            />
            <List.Item
              style={global.objectItemSpec}
              title={object.place}
              left={(props) => (
                <List.Icon
                  {...props}
                  /* icon='map-marker-outline' */ icon={({ size, color }) => (
                    <Ionicons
                      name="location-outline"
                      size={size}
                      color={color}
                    />
                  )}
                />
              )}
            />
          </View>
          <View style={global.objectInfo}>
            <Text style={global.objectInfoText}>{object.info}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[global.fabButton, { gap: 16 }]}>
        <PrimaryFAB
          icon="pencil-outline"
          onPress={() => console.log("Editar")}
        />
        <FAB
          icon="trash-can-outline"
          color={"white" /* theme.colors.onError */}
          style={{
            backgroundColor: "rgb(186, 26, 26)" /* theme.colors.error */,
          }}
          onPress={() => console.log("Excluir")}
        />
      </View>
    </>
  );
}
