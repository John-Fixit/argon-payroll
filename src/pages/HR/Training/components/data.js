
import { MdModelTraining, } from "react-icons/md";


export const tableData = [
    {
      _id: 1,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 2,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 3,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 4,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    {
      _id: 5,
      creator: "LASISI OLAYINKA",
      directorate: "DIRECTORATE OF FINANCE & ACCOUNTS",
      title: "BUDGETINGPLANNING ANG MANAGEMENT REPORTING",
      desc: "TO EQUIP STAFF WITH FINANCIAL SKILLS FOR BETTER DECISION MAKING",
      type: 'Local',
      staff: '19',
      start: '2024-09-02',
      end: '2024-09-14',
      period: '13',
      venue: 'UYO',
      fee: '₦450,000',
    },
    
  ];

export const columns = [
  {name: "S/N", uid: "s_n", sortable: true},
  {name: "creator", uid: "creator", sortable: true},
  {name: "directorate", uid: "directorate", sortable: true},
  {name: "Title", uid: "title", sortable: true},
  // {name: "description", uid: "desc", sortable: true},
  {name: "type", uid: "type", sortable: true},
  // {name: "staff", uid: "staff", sortable: true},
  {name: "start", uid: "start", sortable: true},
  {name: "end", uid: "end", sortable: true},
  // {name: "period", uid: "period", sortable: true},
  // {name: "venue", uid: "venue", sortable: true},
  {name: "fee", uid: "fee", sortable: true},
  {name: "Actions", uid: "actions", sortable: true},
];

export const status = [
  { name: "pending", uid: "pending" },
  { name: "approved", uid: "approved" },
  { name: "rejected", uid: "rejected" },
];

export const statusColor = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
};

export const tableHeader = [
  "s_n",
  "creator",
  "directorate",
  "title",
  // "desc",
  "type",
  // "staff",
  "start",
  "end",
  // "period",
  // "venue",
  "fee",
  "actions"
];


export const trainingHistory = [
  {
    type: "Training Request",
    no_of_training: 6,
    icon: MdModelTraining ,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
    type: "Rejected Trainings",
    no_of_training: 3,
    icon: MdModelTraining ,
    b_color: "bg-red-100",
    t_color: "text-red-500",
  },
  {
    type: "Approved Training",
    no_of_training: 8,
    icon: MdModelTraining ,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
  {
    type: "Remaining Trainings",
    no_of_training: 2,
    icon: MdModelTraining ,
    b_color: "bg-purple-100",
    t_color: "text-purple-500",
  },
];
