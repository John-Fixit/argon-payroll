/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import ActiveStaffTable from "./ActiveStaffTable";
import { IoMdSearch } from "react-icons/io";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import { useNavigate } from "react-router-dom";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import EditStaffForm from "../../../../components/payroll_components/EditStaffForm";
export default function ActiveStaff() {
  const navigate = useNavigate({});
  const [open, setOpen] = useState({status: false, staff: null});
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

  const changeStaff_Pfa=(route)=>{
    navigate(route)
  }

   //drawer functions
   const handleOpenDrawer = (staff) => {
    setOpen({...open, status: true, staff});
  };
  const handleCloseDrawer = () => {
    setOpen({...open, status: false});
  };

  return (
    <Fragment>
      <section className="header">
      <PageHeader header_text={'Staff Record'} breadCrumb_data={[{path: app_routes.payroll.staffInformation.index, name: 'Report'}, {path: app_routes.payroll.staffInformation.groups, name: 'Staff Record'}]} buttonProp = { [{button_text: 'Change Staff PFA', fn: changeStaff_Pfa, fnParameter: app_routes?.payroll?.setting?.pfa_change}, {button_text: 'Change Staff Bank', fn: changeStaff_Pfa, fnParameter: app_routes?.payroll?.setting?.bank_change}]} btnAvailable={true}/>
       
        {/* staff record table */}
        <section>
        <Separator separator_text={'Staff Record'}/>
          
          <ActiveStaffTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>

      <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
        maxWidth={"60rem"}
      >
        <FormDrawer tabs={[{title: "Edit Staff"}]}>
          <EditStaffForm staff={open.staff}/>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </Fragment>
  );
}
