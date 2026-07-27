/* eslint-disable no-unused-vars */
import { Fragment, useState } from "react";
import StaffDataTable from "./StaffDataTable";
import { IoMdSearch } from "react-icons/io";
import Separator from "../../../../components/payroll_components/Separator";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { app_routes } from "../../../../utils/app_routes";
import { useNavigate } from "react-router";
import PayrollStaffDetailTable from "../../../../components/core/payroll/staff_details/PayrollStaffDetailTable";
import ActiveStaffDrawer from "../../../../components/core/payroll/staff_details/ActiveStaffDrawer";
const StaffDetailRecord = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate({});
  const data = [
    {
      _id: 1,
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
    },
    {
      _id: 2,
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
    },
    {
      _id: 3,
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
    },
    {
      _id: 4,
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
    },
    {
      _id: 5,
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
    },
    {
      _id: 6,
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
    },
    {
      _id: 7,
      dateAdded: "1 Jan 2013",
      expiryDate: "1 Jan 2013",
    },
  ];

  const handleChangePfa = (route) => {
    // navigate(route);
  };

  const handleOpenDrawer = () => {
    setIsOpen(true);
  };


  return (
    <Fragment>
      <section className="header">
        <PageHeader
          header_text={"Staff Record"}
          breadCrumb_data={[
            {
              path: app_routes.payroll.staffInformation.index,
              name: "Staff Information",
            },
            {
              path: app_routes.payroll.staffInformation.groups,
              name: "Staff Record",
            },
          ]}
          buttonProp={[
            { button_text: "Onboard Staff", fn: handleOpenDrawer },
          ]}
          btnAvailable={true}
        />

        {/* staff record table */}
        <section>
          <Separator separator_text={"Staff Record"} />
          <PayrollStaffDetailTable tableData={[]} />
        </section>
      </section>
      <ActiveStaffDrawer setIsOpen={setIsOpen} isOpen={isOpen} />
    </Fragment>
  );
};

export default StaffDetailRecord;
