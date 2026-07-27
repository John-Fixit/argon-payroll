import { PiStepsDuotone } from "react-icons/pi";


// Leave history
export const tableData = [
  {
    _id: 1,
    promoted_employee: 'Ade Bola',
    department: "Web Development",
    promoted_from: "Web Developer",
    promoted_to: "Sr Web Developer",
    promotion_date: "28 Feb 2019",
  },
  {
    _id: 2,
    promoted_employee: 'Ade Bola',
    department: "Web Development",
    promoted_from: "Web Developer",
    promoted_to: "Sr Web Developer",
    promotion_date: "28 Feb 2019",
  },
  {
    _id: 3,
    promoted_employee: 'Ade Bola',
    department: "Web Development",
    promoted_from: "Web Developer",
    promoted_to: "Sr Web Developer",
    promotion_date: "28 Feb 2019",
  },
  {
    _id: 4,
    promoted_employee: 'Ade Bola',
    department: "Web Development",
    promoted_from: "Web Developer",
    promoted_to: "Sr Web Developer",
    promotion_date: "28 Feb 2019",
  },
  {
    _id: 5,
    promoted_employee: 'Ade Bola',
    department: "Web Development",
    promoted_from: "Web Developer",
    promoted_to: "Sr Web Developer",
    promotion_date: "28 Feb 2019",
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "S/N", uid: "s_n", sortable: true },
  { name: "PROMOTED EMPLOYEE", uid: "promoted_employee", sortable: true },
  { name: "DEPARTMENT", uid: "department", sortable: true },
  { name: "PROMOTION DESIGNATION FROM", uid: "promoted_from", sortable: true },
  { name: "PROMOTION DESIGNATION TO", uid: "promoted_to", sortable: true },
  { name: "PROMOTION DATE", uid: "promotion_date", sortable: true },
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
  "promoted_employee",
  "department",
  "promoted_from",
  "promoted_to",
  "promotion_date",
  "actions",
];


export const promotionCardsData = [
  {
    type: "Draft",
    no_of_training: 6,
    icon: PiStepsDuotone ,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
    type: "Pending",
    no_of_training: 3,
    icon: PiStepsDuotone ,
    b_color: "bg-purple-100",
    t_color: "text-purple-500",
  },
  {
    type: "Approved",
    no_of_training: 8,
    icon: PiStepsDuotone ,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
  {
    type: "Declined",
    no_of_training: 2,
    icon: PiStepsDuotone ,
    b_color: "bg-red-100",
    t_color: "text-red-500",

  },
];
