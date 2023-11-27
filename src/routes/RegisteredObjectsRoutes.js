// Components
import LostObjects from "../components/LostObjects";
import FoundObjects from "../components/FoundObjects";
import TabBar from "../components/TabBar";
import Home from "../pages/Home";
import PrimaryFAB from "../components/PrimaryFAB";
import { Portal, Snackbar, Text } from "react-native-paper";

import { useContext, useEffect } from "react";

// Contexts
import { AuthContext } from "../contexts/AuthContext";
import { DataMockupContext } from "../contexts/DataMockupContext";

// Data
// import RegisteredObjectsData from "../mockup/RegisteredObjectsData";
// const { lostObjects, foundObjects } = RegisteredObjectsData;

// Styles
import { global } from "../styles/global";

export default function RegisteredObjectsRoutes({ navigation, route }) {
  const { userData } = useContext(DataMockupContext);
  const {
    login, user: { id },
  } = useContext(AuthContext);

  useEffect(() => {
    if (route?.params?.email) {
      login(route.params.email);
    }
  }, [])  // gambiarra

  const index = userData.findIndex((user) => user.id == id);

  const foundObjects = userData[index]?.objects.foundObjects;
  const lostObjects = userData[index]?.objects.lostObjects;

  const page =
    foundObjects?.length || lostObjects?.length ? (
      <TabBar
        screens={[
          { component: LostObjects, title: "Objetos Perdidos" },
          { component: FoundObjects, title: "Objetos Achados" },
        ]}
        hasBadge={[
          userData[index]?.objects.lostObjects.length,
          userData[index]?.objects.foundObjects.length,
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
        onPress={() =>
          navigation.navigate("ObjectRegister", {
            userId: id,
          })
        }
      />
      {/* <Portal>
        <Snackbar visible={route?.params ? true : false}>
          {
            RegisteredObjectsData[
              route?.params?.foundObject ? "foundObjects" : "lostObjects"
            ][route?.params?.objectId - 1]?.object + " apagado com sucesso"
          }
        </Snackbar>
      </Portal> */}
    </>
  );
}
