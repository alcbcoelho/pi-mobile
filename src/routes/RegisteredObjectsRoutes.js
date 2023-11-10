// Components
import LostObjects from "../components/LostObjects";
import FoundObjects from "../components/FoundObjects";
import TabBar from "../components/TabBar";
import Home from "../pages/Home";
import PrimaryFAB from "../components/PrimaryFAB";

// Data
import RegisteredObjectsData from "../mockup/RegisteredObjectsData";
const { lostObjects, foundObjects } = RegisteredObjectsData;

// Styles
import { global } from "../styles/global";

export default function RegisteredObjectsRoutes({ navigation }) {
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
    </>
  );
}
