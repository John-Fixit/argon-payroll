/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import SuspendStaffTable from "./SuspendStaffTable";
import { IoMdSearch } from "react-icons/io";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import Separator from "../../../../components/payroll_components/Separator";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import AddSuspensionForm from "../../../../components/payroll_components/AddSuspensionForm";
import SuspensionTable from "../../../../components/core/payroll/suspension/SuspensionTable";
import SuspensionDrawer from "../../../../components/core/payroll/suspension/SuspensionDrawer";
const SuspendStaff = () => {
  const data = [
    {
      _id: 1,
      FIRST_NAME: "John",
      LAST_NAME: "Doe",
      staff: "John Doe",
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
      action: "Action",
    },
    {
      _id: 2,
      FIRST_NAME: "John",
      LAST_NAME: "Doe",
      staff: "John Doe",
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
      action: "Action",
    },
    {
      _id: 3,
      FIRST_NAME: "John",
      LAST_NAME: "Doe",
      staff: "John Doe",
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
      action: "Action",
    },
    {
      _id: 4,
      FIRST_NAME: "John",
      LAST_NAME: "Doe",
      staff: "John Doe",
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
      action: "Action",
    },
    {
      _id: 5,
      FIRST_NAME: "John",
      LAST_NAME: "Doe",
      staff: "John Doe",
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
      action: "Action",
    },
    {
      _id: 6,
      FIRST_NAME: "John",
      LAST_NAME: "Doe",
      staff: "John Doe",
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
      action: "Action",
    },
  ];

  //drawer functions
  const [open, setOpen] = useState({ status: false });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };
  const handleCloseDrawer = () => {
    setOpen({ ...open, status: false });
  };
  return (
    <Fragment>
      <section className="header">
        <PageHeader
          header_text={"Suspension"}
          breadCrumb_data={[
            {
              path: app_routes.payroll.staffInformation.index,
              name: "Suspend Staff",
            },
            {
              path: app_routes.payroll.staffInformation.suspend_staff,
              name: "Staff",
            },
          ]}
          buttonProp={[
            { button_text: "Add Staff Suspension", fn: handleOpenDrawer },
          ]}
          btnAvailable={true}
        />

        {/* suspension table */}
        <section>
          <Separator separator_text={"Staff List"} />

          {/* <SuspendStaffTable rows={data} /> */}
          <SuspensionTable tableData={data} />
        </section>
      </section>

      <SuspensionDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
    </Fragment>
  );
};

export default SuspendStaff;
