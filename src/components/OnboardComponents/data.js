

// Onboard approved history
export const approvedTableData =[ 
    {
      _id: 1,
      firstName: "John",
    lastName: "Adeoye",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'Olutoyin Johnson',
      status:'approved',
    },
    {
      _id: 2,
      firstName: "Olaitan",
    lastName: "Okunade",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'Olutoyin Johnson',
      status:'approved',
    },
    {
      _id: 3,
      firstName: "Adeyemi",
    lastName: "Aderinto",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'Olutoyin Johnson',
      status:'approved',
    },
    {
      _id: 4,
        firstName: "Kayode",
    lastName: "Adeyinka",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'Olutoyin Johnson',
      status:'approved',
    },
    {
      _id: 5,
      firstName: "Adeyemi",
    lastName: "Aderinto",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      approvedBy: 'Olutoyin Johnson',
      status:'approved',
    },
    
  ];

export const approved_columns = [
 {name: "S/N", uid: "s_n", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "STAFF NO", uid: "staffNo", sortable: true},
  {name: "APPROVED BY", uid: "approvedBy", sortable: true},
  {name: "DATE APPROVED", uid: "dateApproved", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions", sortable: true},
];

export const status = [
    {name: "Approved", uid: "approved"},
  {name: "Rejected", uid: "rejected"},
  {name: "Pending", uid: "pending"},
];

export const statusColor = {
  approved: "success",
  rejected: "danger",
  pending: "warning",
};

export const approvedTableHeader = [
   "s_n",
  "name",
  "staffNo",
  "approvedBy",
  "dateApproved",
  "status",
  "actions"
];

// Onboard pending history
export const pendingTableData =[ 
    {
      _id: 1,
      firstName: "John",
    lastName: "Adeoye",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      status:'pending',
    },
    {
      _id: 2,
      firstName: "Olaitan",
    lastName: "Okunade",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      status:'pending',
    },
    {
      _id: 3,
      firstName: "Adeyemi",
    lastName: "Aderinto",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      status:'pending',
    },
    {
      _id: 4,
        firstName: "Kayode",
    lastName: "Adeyinka",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      status:'pending',
    },
    {
      _id: 5,
      firstName: "Adeyemi",
    lastName: "Aderinto",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      dateApproved: '2024-09-14',
      status:'pending',
    },
    
  ];

export const pending_columns = [
 {name: "S/N", uid: "s_n", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "STAFF NO", uid: "staffNo", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions", sortable: true},
];


export const pendingTableHeader = [
   "s_n",
  "name",
  "staffNo",
  "status",
  "actions"
];
// Onboard rejected history
export const rejectedTableData =[ 
    {
      _id: 1,
      firstName: "John",
    lastName: "Adeoye",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      rejectedBy: 'Olutoyin Johnson',
      dateRejected: '2024-09-14',
      status:'rejected',
    },
    {
      _id: 2,
      firstName: "Olaitan",
    lastName: "Okunade",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      rejectedBy: 'Olutoyin Johnson',
      dateRejected: '2024-09-14',
      status:'rejected',
    },
    {
      _id: 3,
      firstName: "Adeyemi",
    lastName: "Aderinto",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      rejectedBy: 'Olutoyin Johnson',
      dateRejected: '2024-09-14',
      status:'rejected',
    },
    {
      _id: 4,
        firstName: "Kayode",
    lastName: "Adeyinka",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      rejectedBy: 'Olutoyin Johnson',
      dateRejected: '2024-09-14',
      status:'rejected',
    },
    {
      _id: 5,
      firstName: "Adeyemi",
    lastName: "Aderinto",
      staffNo: 'NCAA/P.2357',
      employmentType: 'FULL TIMe',
      rejectedBy: 'Olutoyin Johnson',
      dateRejected: '2024-09-14',
      status:'rejected',
    },
    
  ];

export const rejected_columns = [
 {name: "S/N", uid: "s_n", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "STAFF NO", uid: "staffNo", sortable: true},
  {name: "REJECTED BY", uid: "rejectedBy", sortable: true},
   {name: "DATE REJECTED", uid: "dateRejected", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions", sortable: true},
];


export const rejectedTableHeader = [
   "s_n",
  "name",
  "staffNo",
  "rejectedBy",
  "dateRejected",
  "status",
  "actions"
];

