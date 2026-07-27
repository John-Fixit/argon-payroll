import { FaHouseMedical } from "react-icons/fa6";
import { GiTeamIdea } from "react-icons/gi";
import { MdOutlineReviews } from "react-icons/md";
import { TbBuildingMonument } from "react-icons/tb";

// Leave history
export const tableData = [
  {
    _id: 1,
    title: "Lateness",
    description: "You do come late to office",
    employee: { name: "Ajani Janingo", role: "Section Head", abbr: "SH", main: false },
    official:{ name: "Adeoye John", role: "Section Head", abbr: "SH", main: false },
    report_date: "2024-02-04T23:00:00.000Z",
    status: "warning",
  },
  {
    _id: 2,
    title: "Lateness",
    description: "You do come late to office",
    employee: { name: "Ajani Janingo", role: "Section Head", abbr: "SH", main: false },
    official:{},
    report_date: "",
    status: "warning",
  },
  {
    _id: 3,
    title: "Lateness",
    description: "You do come late to office",
    employee: { name: "Ajani Janingo", role: "Section Head", abbr: "SH", main: false },
    official:{ name: "Adeoye John", role: "Section Head", abbr: "SH", main: false },
    report_date: "2024-02-04T23:00:00.000Z",
    status: "warning",
  },
  {
    _id: 4,
    title: "Lateness",
    description: "You do come late to office",
    employee: { name: "Ajani Janingo", role: "Section Head", abbr: "SH", main: false },
    official:{ name: "Adeoye John", role: "Section Head", abbr: "SH", main: false },
    report_date: "2024-02-04T23:00:00.000Z",
    status: "warning",
  },
  {
    _id: 5,
    title: "Lateness",
    description: "You do come late to office",
    employee: { name: "Ajani Janingo", role: "Section Head", abbr: "SH", main: false },
    official:{ name: "Adeoye John", role: "Section Head", abbr: "SH", main: false },
    report_date: "2024-02-04T23:00:00.000Z",
    status: "warning",
  },
];

export const columns = [
  { name: "ID", uid: "_id", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "DESCRIPTION", uid: "description", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "EMPLOYEE", uid: "employee", sortable: true },
  { name: "OFFICIAL", uid: "official", sortable: true },
  { name: "REPORT DATE", uid: "report_date", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

export const status = [
  // { name: "approved", uid: "approved" },
  { name: "warning", uid: "warning" },
  { name: "danger", uid: "danger" },
];

export const statusColor = {
  // approved: "success",
  danger: "danger",
  warning: "warning",
};

export const tableHeader = [
  "title",
  "report_date",
  "description",
  "employee",
  "status",
  "official",
  "actions",
];

export const dsciplineOverview = [
  {
    title: "Danger",
    no_of_people: 3,
    icon: FaHouseMedical,
    b_color: "bg-red-100",
    t_color: "text-red-500",
  },
  {
    title: "Warning",
    no_of_people: 6,
    icon: MdOutlineReviews,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
    title: "Low",
    no_of_people: 2,
    icon: GiTeamIdea,
    b_color: "bg-purple-100",
    t_color: "text-purple-500",
  },
  {
    title: "Something",
    no_of_people: 8,
    icon: TbBuildingMonument,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
];

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

