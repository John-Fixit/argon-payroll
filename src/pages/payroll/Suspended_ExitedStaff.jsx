import { Input } from "antd";
import Label from "../../components/forms/FormElements/Label";
import PageHeader from "../../components/payroll_components/PageHeader";
import Suspension_ExitStaffTable from "../../components/core/payroll/suspended_exited_staff_list/Suspension_ExitStaffTable";

const Suspended_ExitedStaff = () => {
  return (
    <>
      <main>
        <PageHeader
          header_text={"HR Suspension"}
          breadCrumb_data={[
            { name: "Payroll" },
            { name: "HR SUSPENDED/EXIT STAFF LIST" },
          ]}
        />
        <section className="mt-10">
          {/* <Separator separator_text={'Attributes List'}/> */}
          <div className="mb-3 flex flex-col">
            <Label htmlFor="to">Search</Label>
            <Input
              size="large"
              style={{ width: "25%" }}
              placeholder="Search"
              // value={staffname}
              allowClear
              className="w-full rounded-md"
              // onChange={handleSearchByStaff}
            />
          </div>
          <Suspension_ExitStaffTable
            tableData={[]}
            // handleOpenDrawer={handleOpenDrawer}
          />
        </section>
      </main>
    </>
  );
};

export default Suspended_ExitedStaff;
