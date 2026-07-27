import { useState } from "react";
import PageHeader from "../../components/payroll_components/PageHeader";
import Separator from "../../components/payroll_components/Separator";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import GenerateReportForm from "../../components/core/reports/GenerateReportForm";
import ReportTable from "../../components/core/reports/ReportTable";

const Reports = () => {
  const [isOpen, setIsOpen] = useState(true);

  const [reportData, setReportData] = useState([]);

  console.log(reportData);

  const openDrawer = () => {
    setIsOpen(true);
  };
  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="max-w-[90rem] !overflow-hidden">
        <PageHeader
          header_text={"Reports"}
          buttonProp={[{ button_text: "Generate Report", fn: openDrawer }]}
        />
        <Separator separator_text={"Report History"} />

        <ReportTable
          tableData={reportData?.data ?? []}
          is_nominal_report={reportData?.is_nominal_report}
          is_grouped={reportData?.is_grouped}
        />
      </section>

      <ExpandedDrawerWithButton
        isOpen={isOpen}
        onClose={closeDrawer}
        maxWidth={600}
      >
        <GenerateReportForm
          setReportData={setReportData}
          closeDrawer={closeDrawer}
        />
      </ExpandedDrawerWithButton>
    </>
  );
};

export default Reports;
