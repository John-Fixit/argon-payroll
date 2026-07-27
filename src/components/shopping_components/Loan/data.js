

// Leave history
export const tableData = [
  {
    _id: 1,
    type: 'Small Business Loans',
    amount: "$400",
    interest_rate: "20%",
    due_date: "8 Feb 2019",
  },
  {
    _id: 2,
    type: 'Personal Loans',
    amount: "$400",
    interest_rate: "20%",
    due_date: "8 Feb 2019",
  },
  {
    _id: 3,
    type: 'Debt Consolidation Loans',
    amount: "$400",
    interest_rate: "20%",
    due_date: "8 Feb 2019",
  },
  {
    _id: 4,
    type: 'Home Equity Loans',
    amount: "$400",
    interest_rate: "20%",
    due_date: "8 Feb 2019",
  },
  {
    _id: 5,
    type: 'Refinance Loans',
    amount: "$400",
    interest_rate: "20%",
    due_date: "8 Feb 2019",
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "S/N", uid: "s_n", sortable: true },
  { name: "TYPE", uid: "type", sortable: true },
  { name: "AMOUNT", uid: "amount", sortable: true },
  { name: "INTEREST RATE", uid: "interest_rate", sortable: true },
  { name: "DUE DATE", uid: "due_date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const status = [
  { name: "active", uid: "active" },
  { name: "inactive", uid: "inactive" },
];

export const statusColor = {
  active: "success",
  inactive: "danger",
};

export const tableHeader = [
  "s_n",
  "type",
  "amount",
  "interest_rate",
  "due_date",
  "actions",
];
