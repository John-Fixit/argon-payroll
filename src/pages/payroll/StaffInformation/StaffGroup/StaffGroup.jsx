/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import StaffGroupTable from "./StaffGroupTable";
import { IoMdSearch } from "react-icons/io";
import { IoIosAdd } from "react-icons/io";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import { app_routes } from "../../../../utils/app_routes";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import Add_UpdateStaffGroupForm from "../../../../components/payroll_components/Add_UpdateStaffGroupForm";
export default function StaffGroup() {
  const data = [
    {
      _id: 1,
      name: "ADMIN (HQTRS ABUJA)",
      code: "113",
      default: "Yes",
      action: 'Action'
    },
    {
      _id: 2,
      name: "ADMIN (HQTRS ABUJA)",
      code: "113",
      default: "Yes",
      action: 'Action'
    },
    {
      _id: 3,
      name: "ADMIN (HQTRS ABUJA)",
      code: "113",
      default: "No",
      action: 'Action'
    },
    {
      _id: 4,
      name: "ADMIN (HQTRS ABUJA)",
      code: "113",
      default: "Yes",
      action: 'Action'
    },
    {
      _id: 5,
      name: "ADMIN (HQTRS ABUJA)",
      code: "113",
      default: "No",
      action: 'Action'
    },
    {
      _id: 6, 
      name: "ADMIN (HQTRS ABUJA)",
      code: "113",
      default: "Yes",
      action: 'Action'
    },
  ];
  //drawer functions
  const [open, setOpen] = useState({status: false, group: null, role: null});

  const handleOpenDrawer = ({group, role}) => {
    setOpen({...open, status: true, group, role});
  };
  const handleCloseDrawer = () => {
    setOpen({...open, status: false});
  };

  return (
    <Fragment>
      <section className="staff_group">
      <section>
          <PageHeader header_text={'Staff Groups'} breadCrumb_data={[{path: app_routes.payroll.staffInformation.index, name: 'Staf Information'}, {path: app_routes.payroll.staffInformation.groups, name: 'Group'}]} buttonProp = { [{button_text: 'Add New Group', fn: handleOpenDrawer, fnParameter: {role: 'create'}}]} btnAvailable={true}/>
        </section>

        {/* suspension table */}
        <section>
        <Separator separator_text={'Staff Group'}/>
                   
          <StaffGroupTable rows={data} handleOpenDrawer={handleOpenDrawer}/>
        </section>
      </section>
      <ExpandedDrawerWithButton isOpen={open.status} onClose={handleCloseDrawer}>
        <FormDrawer tabs={[{title: open?.group?'Update Name':'Add Group'}]}>
          <Add_UpdateStaffGroupForm group={open.group} role={open.role}/>
        </FormDrawer>
      </ExpandedDrawerWithButton>
    </Fragment>
  );
}
