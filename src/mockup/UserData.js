import MyObjectsList from "./RegisteredObjectsData";

const defaultObjectsField = { lostObjects: [], foundObjects: [] };

export const defaultFields = {
  avatar: null,
  objects: defaultObjectsField,
}

export const userData = [
  {
    id: 1,
    firstName: "Cleiton",
    lastName: "Fernandes",
    password: "123456",
    email: "cleitin.hta@gmail.com",
    phone: "61 99251-3746",
    avatar:
      /* null */ "https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-avatar-ou-perfil-humano_23-2150671142.jpg",
    objects: MyObjectsList,
  },
  {
    id: 2,
    firstName: "Glória",
    lastName: "Soares",
    password: "123456",
    email: "h@d",
    phone: "61 98442-6228",
    avatar: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg?w=826&t=st=1701102895~exp=1701103495~hmac=4d8ce2c702a5b7ac2c5d1b55af6e6bc36a40d2630233c9eda4c451ac1d719f59",
    objects: { lostObjects: [], foundObjects: [] }/* defaultObjectsField */,
  },
];
