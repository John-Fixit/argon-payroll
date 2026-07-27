
export const staff = [
  {
    id: 1,
    firstName: "John",
    lastName: "Adeoye",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Section Head",
    abbr: "SH",
    status:'pending',
    main: false,
  },
  {
  id: 2,
    firstName: "Olaitan",
    lastName: "Okunade",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Team Lead",
    abbr: "TL",
    status:'approved',
    main: false,
  },
  {
  id: 3,
    firstName: "Stephen",
    lastName: "Alagbe",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Section Head",
    abbr: "SH",
    status:'approved',
    main: false,
  },
  {
  id: 4,
    firstName: "Kayode",
    lastName: "Adeyinka",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Head of Department",
    abbr: "HD",
    status:'pending',
    main: false,
  },
  {
  id: 5,
    firstName: "Adeyemi",
    lastName: "Aderinto",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Section Head",
    abbr: "SH",
    status:'pending',
    main: false,
  },
  {
  id: 6,
    firstName: "Emmanuel",
    lastName: "Oluwatayese",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Team Lead",
    abbr: "TL",
    status:'approved',
    main: false,
  },
  {
  id: 7,
    firstName: "Caleb",
    lastName: "Ajani",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Team Lead",
    abbr: "TL",
    status:'rejected',
    main: false,
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "ROLE", uid: "role", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  {name: "approved", uid: "approved"},
  {name: "rejected", uid: "rejected"},
  {name: "pending", uid: "pending"},
];
export const statusColorMap = {
  approved: "success",
  rejected: "danger",
  pending: "warning",
};

export const tableHeader = ["name", "role", "status", "actions"];
