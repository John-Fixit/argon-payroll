import { Input } from "antd";
import PageHeader from "../../../components/payroll_components/PageHeader";
import Label from "../../../components/forms/FormElements/Label";
import PayRunTable from "../../../components/core/payroll/payrun/PayRunTable";

const PayRun = () => {
  return (
    <>
      <main>
        <PageHeader
          header_text={"Pay Run"}
          breadCrumb_data={[{ name: "payroll" }, { name: "pay run" }]}
          buttonProp={[
            { button_text: "Generate Payroll for new month", fn: null },
          ]}
        />
        <section className="mt-10">
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

          <PayRunTable tableData={[]} />
        </section>
      </main>
    </>
  );
};

export default PayRun;
