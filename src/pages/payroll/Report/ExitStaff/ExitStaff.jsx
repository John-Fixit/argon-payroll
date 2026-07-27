/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import ExitStaffTable from "./ExitStaffTable";
import { IoMdSearch } from "react-icons/io";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
export default function ExitStaff() {
  const data = [
    {
      _id: 1,
      empType: "CONTRACT",
      empNo:  "P2233",
      title: "Mr",
      staffName: "John Doe",
      address1: "NCAA",
      gender: "M",
      dob: "1 Jan 2013",
      maritalStatus: "Single",
      state: "Lagos",
      lga: "Ikeja",
      dateEmployed: "1 Jan 2013",
      divisionName: "DOLT (KADUNA)",
      grade: "16",
      step: "10",
      bank: "Guarantee Trust Bank",
      accountNo: "1234567890",
      rankName: "FLIGHT OPERATIONS INSPECTOR",
      nhfNo: "",
      pfaCode: "",
      pfaAccNumber: "PEN200030001878",
      tinNo: "1028414140"
    },
    {
      _id: 2,
     empType: "CONTRACT",
      empNo:  "P2233",
      title: "Mr",
      staffName: "John Doe",
      address1: "NCAA",
      gender: "M",
      dob: "1 Jan 2013",
      maritalStatus: "Single",
      state: "Lagos",
      lga: "Ikeja",
      dateEmployed: "1 Jan 2013",
      divisionName: "DOLT (KADUNA)",
      grade: "16",
      step: "10",
      bank: "Guarantee Trust Bank",
      accountNo: "1234567890",
      rankName: "FLIGHT OPERATIONS INSPECTOR",
      nhfNo: "",
      pfaCode: "",
      pfaAccNumber: "PEN200030001878",
      tinNo: "1028414140"
    },
    {
      _id: 3,
      empType: "CONTRACT",
      empNo:  "P2233",
      title: "Mr",
      staffName: "John Doe",
      address1: "NCAA",
      gender: "M",
      dob: "1 Jan 2013",
      maritalStatus: "Single",
      state: "Lagos",
      lga: "Ikeja",
      dateEmployed: "1 Jan 2013",
      divisionName: "DOLT (KADUNA)",
      grade: "16",
      step: "10",
      bank: "Guarantee Trust Bank",
      accountNo: "1234567890",
      rankName: "FLIGHT OPERATIONS INSPECTOR",
      nhfNo: "",
      pfaCode: "",
      pfaAccNumber: "PEN200030001878",
      tinNo: "1028414140"
    },
    {
      _id: 4,
     empType: "CONTRACT",
      empNo:  "P2233",
      title: "Mr",
      staffName: "John Doe",
      address1: "NCAA",
      gender: "M",
      dob: "1 Jan 2013",
      maritalStatus: "Single",
      state: "Lagos",
      lga: "Ikeja",
      dateEmployed: "1 Jan 2013",
      divisionName: "DOLT (KADUNA)",
      grade: "16",
      step: "10",
      bank: "Guarantee Trust Bank",
      accountNo: "1234567890",
      rankName: "FLIGHT OPERATIONS INSPECTOR",
      nhfNo: "",
      pfaCode: "",
      pfaAccNumber: "PEN200030001878",
      tinNo: "1028414140"
    },
    {
      _id: 5,
      empType: "CONTRACT",
      empNo:  "P2233",
      title: "Mr",
      staffName: "John Doe",
      address1: "NCAA",
      gender: "M",
      dob: "1 Jan 2013",
      maritalStatus: "Single",
      state: "Lagos",
      lga: "Ikeja",
      dateEmployed: "1 Jan 2013",
      divisionName: "DOLT (KADUNA)",
      grade: "16",
      step: "10",
      bank: "Guarantee Trust Bank",
      accountNo: "1234567890",
      rankName: "FLIGHT OPERATIONS INSPECTOR",
      nhfNo: "",
      pfaCode: "",
      pfaAccNumber: "PEN200030001878",
      tinNo: "1028414140"
    },
    {
      _id: 6,
      empType: "CONTRACT",
      empNo:  "P2233",
      title: "Mr",
      staffName: "John Doe",
      address1: "NCAA",
      gender: "M",
      dob: "1 Jan 2013",
      maritalStatus: "Single",
      state: "Lagos",
      lga: "Ikeja",
      dateEmployed: "1 Jan 2013",
      divisionName: "DOLT (KADUNA)",
      grade: "16",
      step: "10",
      bank: "Guarantee Trust Bank",
      accountNo: "1234567890",
      rankName: "FLIGHT OPERATIONS INSPECTOR",
      nhfNo: "",
      pfaCode: "",
      pfaAccNumber: "PEN200030001878",
      tinNo: "1028414140"
    },
    {
      _id: 7,
      empType: "CONTRACT",
      empNo:  "P2233",
      title: "Mr",
      staffName: "John Doe",
      address1: "NCAA",
      gender: "M",
      dob: "1 Jan 2013",
      maritalStatus: "Single",
      state: "Lagos",
      lga: "Ikeja",
      dateEmployed: "1 Jan 2013",
      divisionName: "DOLT (KADUNA)",
      grade: "16",
      step: "10",
      bank: "Guarantee Trust Bank",
      accountNo: "1234567890",
      rankName: "FLIGHT OPERATIONS INSPECTOR",
      nhfNo: "",
      pfaCode: "",
      pfaAccNumber: "PEN200030001878",
      tinNo: "1028414140"
    },
  ];
  return (
    <Fragment>
      <section className="header">
      <PageHeader header_text={'Exited Staff Record'} breadCrumb_data={[{path: app_routes.payroll.staffInformation.index, name: 'Report'}, {path: app_routes.payroll.staffInformation.groups, name: 'Exited Staff'}]}  btnAvailable={false}/>
       
        {/*exited  staff record table */}
        <section>
        <Separator separator_text={'Exited Staff Record'}/>
          
          <ExitStaffTable rows={data} />
        </section>
      </section>
    </Fragment>
  );
}
