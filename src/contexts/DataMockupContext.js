import { createContext, useContext, useState } from "react";
import { userData as userData_ } from "../mockup/UserData";
// import { AuthContext } from "./AuthContext";

export const DataMockupContext = createContext();

export default function DataMockupProvider({ children }) {
  // const { user: { id } } = useContext(AuthContext);
  
  const [userData, setUserData] = useState(userData_);

  // const index = userData.findIndex(user => user.id === id)
  const objectsData_ = userData.map(user => user.objects)

  const [objectsData, setObjectsData] = useState(objectsData_);

  function createUser(newUserRecord) {
    setUserData((userData) => [...userData, newUserRecord]);
  }

  function editUser(editedUserRecord) {
    setUserData((userData) => {
      const rest = userData.filter(user => user.id != editedUserRecord.id);
      return [...rest, editedUserRecord]
    });
  }

  function createObject(newObjectRecord, userId) {
    setUserData((userData) => {
      const index = userData.findIndex(user => user.id == userId);

      const otherUserRecords = userData.filter(user => user.id != userId);

      const unalteredUserRecordFields = {
        id: userId,
        firstName: userData[index].firstName,
        lastName: userData[index].lastName,
        password: userData[index].password,
        email: userData[index].email,
        phone: userData[index].phone,
        avatar: userData[index].avatar,
      };

      const updatedUserRecord = newObjectRecord.situation === "found" ? {
        ...unalteredUserRecordFields,
        objects: {
          lostObjects: userData[index].objects.lostObjects,
          foundObjects: [newObjectRecord, ...userData[index].objects.foundObjects]
        }
      } : {
        ...unalteredUserRecordFields,
        objects: {
          lostObjects: [newObjectRecord, ...userData[index].objects.lostObjects],
          foundObjects: userData[index].objects.foundObjects
        }
      };

      return [updatedUserRecord, ...otherUserRecords];
    })
    // setObjectsData((objectsData) => [newObjectRecord, ...objectsData])
    /*
    [
      { lostObjects: [{1}, {2}, {3}, {4}], foundObjects: [{1}, {2}, {3}] },
      { lostObjects: [{1}, {2}, {3}], foundObjects: [{1}, {2}, {3}] },
      { lostObjects: [{1}, {2}, {3}], foundObjects: [{1}, {2}, {3}] },
      ...
    ]
    */
    // setObjectsData((objectsData) => [...objectsData, newObjectRecord]);
  }

  function editObject(id) {}

  function removeObject(id) {}

  const context = {
    userData,
    createUser,
    editUser,
    // objectsData,
    createObject,
    editObject,
    removeObject,
  };

  return (
    <DataMockupContext.Provider value={context}>
      {children}
    </DataMockupContext.Provider>
  );
}
