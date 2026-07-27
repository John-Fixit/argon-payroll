import { MdApproval , } from "react-icons/md";

// Leave history
export const tableData = [
  {
    _id: 1,
    item: "Generator",
    purchased_from: "Konga",
    description: "It is needed as the electricity supply is flunctuating",
    amount: "150,000.00",
    date: "2024-02-04T23:00:00.000Z",
    purchased_by: "Okunade Olaitan",
    paid_by: "Cash",
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
    item: "Air Conditional",
    purchased_from: "Amazon",
    description: "It is needed in this hot weather",
    amount: "100,000.00",
    date: "2024-02-04T23:00:00.000Z",
    purchased_by: "Adeoye John",
    paid_by: "Transfer",
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
  item: "Fridge",
  purchased_from: "Jumia",
    description: "It is needed to support the AC",
    amount: "10,000.00",
    date: "2024-02-04T23:00:00.000Z",
    purchased_by: "Akangbe Stephen",
    paid_by: "Cheque",
    status: "approved",
    approvals: [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false },
],
  },
  {
    _id: 4,
     item: "Window Blind",
     purchased_from: "Konga",
    description: "To serve its purposes",
    amount: "10,000.00",
    date: "2024-02-04T23:00:00.000Z",
    purchased_by: "Emmanuel Oluwatayese",
    paid_by: "Transfer",
    status: "pending",
    approvals:  [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Adeyemi Aderinto", role: "Section Head", abbr: "SH",main:false },
  { name: "Emmanuel Oluwatayese", role: "Team Lead", abbr: "TL",main:false },
],
  },
  {
    _id: 5,
    item: "Micro Wave",
    purchased_from: "Ali Express",
    description: "To serve its purposes",
    amount: "80,000.00",
    date: "2024-02-04T23:00:00.000Z",
    purchased_by: "Olayinka Praise",
    paid_by: "Cash",
    status: "pending",
    approvals: [
  { name: "Adeoye John", role: "Section Head", abbr: "SH",main:false },
  { name: "Olaitan Okunade", role: "Team Lead", abbr: "TL",main:false },
  { name: "Stephen Alagbe", role: "Section Head", abbr: "SH",main:false },
],
  },
  {
    _id: 6,
    item: "Office table",
    purchased_from: "Amazon",
    description: "To serve its purposes",
    amount: "60,000.00",
    date: "2024-02-04T23:00:00.000Z",
    purchased_by: "Adeyemi Aderinto",
    paid_by: "Cheque",
    status: "approved",
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
  { name: "ITEM", uid: "item", sortable: true },
  { name: "PURCHASED FROM", uid: "purchased_from", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "PAID BY", uid: "paid_by", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "APPROVALS", uid: "approvals", sortable: true },
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
  // "s_n",
  "item",
  // "purchased_from",
  "amount",
  // "paid_by",
  "date",
  "status",
  "approvals",
  "actions",
];

// export const expensesHistory = [
//   {
//     type: "Pending Approvals",
//     no_of_expenses: 6,
//     icon: MdApproval  ,
//     b_color: "bg-amber-100",
//     t_color: "text-amber-500",
//   },
//   {
//     type: "Pending Payment",
//     no_of_expenses: 8,
//     icon: MdApproval  ,
//     b_color: "bg-purple-100",
//     t_color: "text-purple-500",
//   },
//   {
//     type: "Pending Finance Approvals",
//     no_of_expenses: 4,
//     icon: MdApproval  ,
//     b_color: "bg-amber-100",
//     t_color: "text-amber-500",
//   },
//   {
//     type: "Incomplete Claims",
//     no_of_expenses: 7,
//     icon: MdApproval  ,
//     b_color: "bg-red-100",
//     t_color: "text-red-500",
//   },
//   {
//     type: "Passed for payment",
//     no_of_expenses: 10,
//     icon: MdApproval  ,
//     b_color: "bg-green-100",
//     t_color: "text-green-500",
//   },
// ];

export const expensesHistory = [
  {
    id:'all',
  label:'All Expenses',
    icon: MdApproval  ,
    b_color: "bg-purple-100",
    t_color: "text-purple-500",
  },
  {
    id:'pending',
  label:'Pending Expenses',
    icon: MdApproval  ,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
   id:'approved',
  label:'Approved Expenses',
    icon: MdApproval  ,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
];
