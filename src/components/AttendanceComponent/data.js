

// Attendance history
export const tableData = [
  {
    _id: 1,
    date: "2024-03-24T23:00:00.000Z",
    punch_in: "10:00 AM",
    punch_out: "7:00 PM",
    production: "7hr",
    break: "1 hr",
    overtime: 3,
  },
  {
    _id: 2,
    date: "2024-03-23T23:00:00.000Z",
    punch_in: "10:45 AM",
    punch_out: "5:14 PM",
    production: "4hr",
    break: "1 hr",
    overtime: 1,
  }, 
  {
    _id: 3,
    date: "2024-03-22T23:00:00.000Z",
    punch_in: "9:00 AM",
    punch_out: "5:00 PM",
    production: "6hr",
    break: "1 hr",
    overtime: 1,
  },
  {
    _id: 4,
    date: "2024-03-21T23:00:00.000Z",
    punch_in: "10:00 AM",
    punch_out: "6:00 PM",
    production: "6hr",
    break: "1 hr",
    overtime: 1,
  },

  {
    _id: 5,
    date: "2024-03-20T23:00:00.000Z",
    punch_in: "10:30 AM",
    punch_out: "6:00 PM",
    production: "5hr",
    break: "1 hr",
    overtime: 2,
  },



];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  // { name: "S/N", uid: "s_n", sortable: true },
  { name: "DATE", uid: "date", sortable: true },
  { name: "PUNCH IN", uid: "punch_in", sortable: true },
  { name: "PUNCH OUT", uid: "punch_out", sortable: true },
  // { name: "PRODUCTION", uid: "production", sortable: true },
  // { name: "BREAK", uid: "Break", sortable: true },
  // { name: "OVERTIME", uid: "overtime" },
];


export const tableHeader = [
  // "s_n",
  "date",
  "punch_in",
  "punch_out",
  "production",
  "break",
  "overtime",
];
