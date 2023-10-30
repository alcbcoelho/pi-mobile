// Components
import LostObjects from "../components/LostObjects";
import FoundObjects from "../components/FoundObjects";
import TabBar from "../components/TabBar";

// Data
import RegisteredObjectsData from "../mockup/RegisteredObjectsData";

export default function RegisteredObjectsRoutes() {
  return (
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
  );
}