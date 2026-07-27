// leave forms data
export const options = [
  { value: "Annual", label: "Annual", color: "blue" },
  { value: "Casual", label: "Casual", color: "blue" },
  { value: "Compassionate", label: "Compassionate", color: "red" },
  { value: "Emergency", label: "Emergency", color: "yellow" },
  { value: "Maternity", label: "Maternity", color: "green" },
  { value: "Paternity", label: "Paternity", color: "purple" },
  { value: "Annual Leave 1-3", label: "Annual Leave 1-3", color: "green" },
  { value: "Sick Leave", label: "Sick Leave", color: "green" },
  { value: "Academics", label: "Academics", color: "purple" },
];
export const reasons = [
  { value: "Personal", label: "Personal", color: "blue" },
  { value: "Business", label: "Business", color: "red" },
  { value: "Family", label: "Family", color: "yellow" },
];

// leave forms tab
// export  const leaveFormTabs = [
//     { title: 'Form',},
//     {
//       title: 'Hand Over',
//     },
//     {
//       title: 'Approval',
//     },
//     {
//       title: 'Attachments',
//     },
//     { title: 'Notes',},
//   ]

export const leaveFormTabs = [
  { title: "Form", sub: "Fill form",},
  {
    title: "Attachments",
    sub: "Upload ",
  },
  { title: "Notes", sub: "Add Note",},
  {
    title: "HandOver",
    sub: "Upload ",
  },
  {
    title: "Approval",
    sub: "Add Note",
  },
];

// Approval form
export const aprrovalRoles = [
  { value: "Section Head", label: "Section Head" },
  { value: "Team Lead", label: "Team Lead" },
  { value: "Head of Department", label: "Head of Department" },
];
export const staff = [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false },
  { name: "Kayode Adeyinka", role: "Head of Department", abbr: "HD",main:false },
  { name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH",main:false },
  { name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL",main:false },
];

// Leave history
export const tableData = [
  {
    _id: 1,
    type: "Casual",
    from: "2024-01-25T23:00:00.000Z",
    to: "2024-02-04T23:00:00.000Z",
    no_of_days: "10",
    reason: "Personal",
    status: "approved",
    approvals: [{ name: "Adeoye John", role: "Section Head", abbr: "SH",main:false }],
  },
  {
    _id: 2,
    type: "Casual",
    from: "2024-01-25T23:00:00.000Z",
    to: "2024-02-04T23:00:00.000Z",
    no_of_days: "8",
    reason: "Business",
    status: "pending",
    approvals: [{ name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false }],
  },
  {
    _id: 3,
    type: "Annual",
    from: "2024-01-25T23:00:00.000Z",
    to: "2024-02-04T23:00:00.000Z",
    no_of_days: "10",
    reason: "Family",
    status: "declined",
    approvals: [{ name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false }],
  },
  {
    _id: 4,
    type: "Casual",
    from: "2024-01-25T23:00:00.000Z",
    to: "2024-02-04T23:00:00.000Z",
    no_of_days: "10",
    reason: "Business",
    status: "approved",
    approvals:  [{ name: "Kayode Adeyinka", role: "Head of Department", abbr: "HD",main:false }],
  },
  {
    _id: 5,
    type: "Annual",
   from: "2024-01-25T23:00:00.000Z",
    to: "2024-02-04T23:00:00.000Z",
    no_of_days: "10",
    reason: "Personal",
    status: "declined",
    approvals: [{ name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH",main:false }],
  },
  {
    _id: 6,
    type: "Casual",
  from: "2024-01-25T23:00:00.000Z",
    to: "2024-02-04T23:00:00.000Z",
    no_of_days: "10",
    reason: "Business",
    status: "pending",
    approvals: [{ name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL",main:false }],
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "FROM", uid: "from", sortable: true },
  { name: "TO", uid: "to", sortable: true },
  { name: "NO OF DAYS", uid: "no_of_days", sortable: true },
  { name: "REASON", uid: "reason", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "APPROVED BY", uid: "approvals", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const status = [
  { name: "approved", uid: "approved" },
  { name: "pending", uid: "pending" },
  { name: "declined", uid: "declined" },
];

export const statusColor = {
  approved: "success",
  declined: "danger",
  pending: "warning",
};

export const tableHeader = [
  "type",
  "from",
  "to",
  "no_of_days",
  "reason",
  "status",
  "approvals",
  "actions",
];
