

// Leave history
export const tableData = [
  {
    _id: 1,
    invoice_id: "#INV-0001",
    provider: "Global Technologies",
    payment_type: 'Paypal',
    payment_date: "8 Feb 2019",
    paid_amount: "$400",
  },
  {
    _id: 2,
    invoice_id: "#INV-0001",
    provider: "Electricity",
    payment_type: 'Paypal',
    payment_date: "8 Feb 2019",
    paid_amount: "$400",
  },
  {
    _id: 3,
    invoice_id: "#INV-0001",
    provider: "Global Technologies",
    payment_type: 'Paypal',
    payment_date: "8 Feb 2019",
    paid_amount: "$400",
  },
  {
    _id: 4,
    invoice_id: "#INV-0001",
    provider: "Cable subscription",
    payment_type: 'Paypal',
    payment_date: "8 Feb 2019",
    paid_amount: "$400",
  },
  {
    _id: 5,
    invoice_id: "#INV-0001",
    provider: "Global Technologies",
    payment_type: 'Paypal',
    payment_date: "8 Feb 2019",
    paid_amount: "$400",
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "S/N", uid: "s_n", sortable: true },
  { name: "INVOICE ID", uid: "invoice_id", sortable: true },
  { name: "PROVIDER", uid: "provider", sortable: true },
  { name: "PAYMENT TYPE", uid: "payment_type", sortable: true },
  { name: "PAYMENT DATE", uid: "payment_date", sortable: true },
  { name: "PAID AMOUNT", uid: "paid_amount", sortable: true },
  // { name: "ACTIONS", uid: "actions" },
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
  "invoice_id",
  "provider",
  "payment_type",
  "payment_date",
  "paid_amount",
  // "actions",
];
