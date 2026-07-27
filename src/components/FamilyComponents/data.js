
export const staff = [
  {
    id: 1,
    name: "Adeoye John",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Section Head",
    abbr: "SH",
    status:'vacation',
    main: false,
  },
  {
  id: 2,
    name: "Olaitan Okunade",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Team Lead",
    abbr: "TL",
    status:'active',
    main: false,
  },
  {
  id: 3,
    name: "Stephen Alagbe",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Section Head",
    abbr: "SH",
    status:'active',
    main: false,
  },
  {
  id: 4,
    name: "Kayode Adeyinka",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Head of Department",
    abbr: "HD",
    status:'vacation',
    main: false,
  },
  {
  id: 5,
    name: "Adeyemi Aderinto",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Section Head",
    abbr: "SH",
    status:'vacation',
    main: false,
  },
  {
  id: 6,
    name: "Emmanuel Oluwatayese",
    avatar: "https://i.pravatar.cc/150?img=45",
    role: "Team Lead",
    abbr: "TL",
    status:'active',
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
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];
export const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export const tableHeader = ["name", "role", "status", "actions"];
