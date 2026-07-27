

// Leave history
export const tableData = [
  {
    _id: 1,
    name: "Akindele Ajanlekoko",
    reason:'Retrenchement',
    company: "Konga",
    employment_type: "Hybrid",
    date: "2024-02-04T23:00:00.000Z",
    status: "approved",
    approvals: [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false },
  { name: "Kayode Adeyinka", role: "Head of Department", abbr: "HD",main:false },
  { name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH",main:false },
  { name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL",main:false },
],
  },
  {
    _id: 2,
    name: "Adekunle Ajasin",
    reason:'Emigration',
    company: "Amazon",
    employment_type: "Remote",
    date: "2024-02-04T23:00:00.000Z",
    status: "pending",
    approvals: [
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false },
  { name: "Kayode Adeyinka", role: "Head of Department", abbr: "HD",main:false },
  { name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH",main:false },
  { name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL",main:false },
],
  },
  {
    _id: 3,
  name: "Ajani Janingo",
  reason:'Dessertion',
  company: "Jumia",
    employment_type: "Hybrid",
    date: "2024-02-04T23:00:00.000Z",
    status: "approved",
    approvals: [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false },
],
  },
  {
    _id: 4,
     name: "Chukwuemeka Benson",
     reason:'Personal Conflict',
     company: "Konga",
    employment_type: "Hybrid",
    date: "2024-02-04T23:00:00.000Z",
    status: "rejected",
    approvals:  [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH",main:false },
  { name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL",main:false },
],
  },
  {
    _id: 5,
    name: "Benita Allyson",
    reason:'Retirement',
    company: "Ali Express",
    employment_type: "Hybrid",
    date: "2024-02-04T23:00:00.000Z",
    status: "approved",
    approvals: [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false },
],
  },
  {
    _id: 6,
    name: "Musa Adulgafar",
    reason:'Health',
    company: "Amazon",
    employment_type: "Remote",
    date: "2024-02-04T23:00:00.000Z",
    status: "pending",
    approvals: [
  { name: "Kayode Adeyinka", role: "Head of Department", abbr: "HD",main:false },
  { name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH",main:false },
  { name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL",main:false },
],
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "S/N", uid: "s_n", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "COMPANY", uid: "company", sortable: true },
  { name: "EXIT REASON", uid: "reason", sortable: true },
  { name: "EMPLOYMENT TYPE", uid: "employment_type", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "APPROVALS", uid: "approvals", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const status = [
  { name: "approved", uid: "approved" },
  { name: "pending", uid: "pending" },
  { name: "rejected", uid: "rejected" },
];

export const statusColor = {
  approved: "success",
  rejected: "danger",
  pending: "warning",
};

export const tableHeader = [
  "s_n",
  // "name",
  "reason",
  // "company",
  // "employment_type",
  "date",
  "status",
  "approvals",
  "actions",
];
