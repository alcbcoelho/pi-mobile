// Components
import LostObjects from "../components/LostObjects";
import FoundObjects from "../components/FoundObjects";
import TabBar from "../components/TabBar";
import Home from "../pages/Home";
import PrimaryFAB from "../components/PrimaryFAB";
import { Portal, Snackbar, Text } from "react-native-paper";

// Data
import RegisteredObjectsData from "../mockup/RegisteredObjectsData";
const { lostObjects, foundObjects } = RegisteredObjectsData;

// Styles
import { global } from "../styles/global";

export default function RegisteredObjectsRoutes({ navigation, route }) {
  const page =
    foundObjects.length || lostObjects.length ? (
      <TabBar
        screens={[
          { component: LostObjects, title: "Objetos Perdidos" },
          { component: FoundObjects, title: "Objetos Achados" },
        ]}
        hasBadge={[
          RegisteredObjectsData.lostObjects.length,
          RegisteredObjectsData.foundObjects.length,
        ]}
      />
    ) : (
      <Home />
    );

  return (
    <>
      {page}
      <PrimaryFAB
        style={global.fabButton}
        icon="plus"
        label="Novo Registro"
        onPress={() => navigation.navigate("ObjectRegister")}
      />
      <Portal>
        <Snackbar visible={route?.params ? true : false}>
          {
            RegisteredObjectsData[
              route?.params?.foundObject ? "foundObjects" : "lostObjects"
            ][route?.params?.objectId - 1]?.object + " apagado com sucesso"
          }
        </Snackbar>
      </Portal>
    </>
  );
}
