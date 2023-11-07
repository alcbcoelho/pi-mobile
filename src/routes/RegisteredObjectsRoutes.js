// Components
import LostObjects from "../components/LostObjects";
import FoundObjects from "../components/FoundObjects";
import TabBar from "../components/TabBar";
import Home from "../pages/Home";

// Data
import RegisteredObjectsData from "../mockup/RegisteredObjectsData";
const { lostObjects, foundObjects } = RegisteredObjectsData;

export default function RegisteredObjectsRoutes() {
  if (foundObjects.length || lostObjects.length) {
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
    )
  }
  return <Home />
}