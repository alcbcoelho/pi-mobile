// Hooks
import { createContext, useState } from "react";

// Data
import MyObjectsList from "../mockup/RegisteredObjectsData";
const { lostObjects, foundObjects } = MyObjectsList;

export const InitialRouteContext = createContext();

export const initialRouteName_ = foundObjects.length || lostObjects.length ? "MyObjects" : "Home";

export default function InitialRouteContextProvider({ children }) {
  const [initialRouteName, setInitialRouteName] = useState(initialRouteName_);

  return (
    <InitialRouteContext.Provider value={{initialRouteName}}>
      {children}
    </InitialRouteContext.Provider>
  );
}
