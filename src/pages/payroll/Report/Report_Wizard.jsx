import { useState } from "react";
import PageHeader from "../../../components/payroll_components/PageHeader";
import Separator from "../../../components/payroll_components/Separator";
import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
import PayrollReportTable from "../../../components/core/reportWizard/PayrollReportTable";
import GenerateWizardReportForm from "../../../components/core/reportWizard/GenerateR";
import ComplexPayrollReportTable from "../../../components/core/reportWizard/ComplexReport";
import PayslipReport from "../../../components/core/reportWizard/PayslipReport";

const ReportWizard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [reportData, setReportData] = useState([]);

  if (reportData) {
    // console.log(reportData);
  }

  const openDrawer = () => {
    setIsOpen(true);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleReportClose = () => {
    setReportData([]);
    openDrawer();
  };

  // console.log(reportData);

  return (
    <>
      <section className="max-w-[90rem] !overflow-hidden">
        <PageHeader
          header_text={"Reports"}
          buttonProp={[{ button_text: "Open Report", fn: openDrawer }]}
        />
        <Separator separator_text={"Report History"} />

        {/* Only show regular table when it's not complex AND not payslip */}
        {!reportData?.is_complex && !reportData?.is_payslip && (
          <PayrollReportTable
            tableData={reportData?.data ?? []}
            reportData={reportData}
            is_grouped={reportData?.is_grouped}
            title={reportData?.title}
            is_yearly={reportData?.is_yearly}
            is_allowance={reportData?.is_allowance}
            is_staff={reportData?.is_staff}
          />
        )}
      </section>

      {/* Main form drawer */}
      <ExpandedDrawerWithButton
        isOpen={isOpen}
        onClose={closeDrawer}
        maxWidth={600}
      >
        <GenerateWizardReportForm
          setReportData={setReportData}
          closeDrawer={closeDrawer}
        />
      </ExpandedDrawerWithButton>

      {/* Complex report drawer - ONLY when is_complex is true AND is_payslip is not true */}
      <ExpandedDrawerWithButton
        isOpen={reportData?.is_complex === true && !reportData?.is_payslip}
        onClose={handleReportClose}
        maxWidth={1300}
      >
        {reportData?.is_complex === true && !reportData?.is_payslip && (
          <ComplexPayrollReportTable
            tableData={reportData?.data ?? []}
            title={reportData?.title?.replaceAll("'", "")}
          />
        )}
      </ExpandedDrawerWithButton>

      {/* Payslip report drawer - ONLY when is_payslip is true AND is_complex is not true */}
      <ExpandedDrawerWithButton
        isOpen={reportData?.is_payslip === true && !reportData?.is_complex}
        onClose={handleReportClose}
        maxWidth={1300}
      >
        {reportData?.is_payslip === true && !reportData?.is_complex && (
          <PayslipReport data={reportData?.data ?? null} isFetching={false} />
        )}
      </ExpandedDrawerWithButton>
    </>
  );
};

export default ReportWizard;

// import { useState, useEffect } from "react";
// import PageHeader from "../../../components/payroll_components/PageHeader";
// import Separator from "../../../components/payroll_components/Separator";
// import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
// import PayrollReportTable from "../../../components/core/reportWizard/PayrollReportTable";
// import GenerateWizardReportForm from "../../../components/core/reportWizard/GenerateR";
// import ComplexPayrollReportTable from "../../../components/core/reportWizard/ComplexReport";
// import PayslipReport from "../../../components/core/reportWizard/PayslipReport";

// const ReportWizard = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [reportData, setReportData] = useState(null);
//   const [activeDrawer, setActiveDrawer] = useState('form');

//   const openDrawer = () => {
//     setIsOpen(true);
//     setActiveDrawer('form');
//   };

//   const closeDrawer = () => {
//     setIsOpen(false);
//     setActiveDrawer('none');
//   };

//   const handleReportClose = () => {
//     setReportData(null);
//     setActiveDrawer('form');
//     setIsOpen(true);
//   };

//   // Determine which drawer should be active based on reportData
//   const determineActiveDrawer = () => {
//     if (!reportData) {
//       console.log('🔍 No reportData, showing form');
//       return 'form';
//     }

//     console.log('🔍 FULL reportData object:', reportData);
//     console.log('🔍 Determining active drawer with reportData:', {
//       is_complex: reportData.is_complex,
//       is_payslip: reportData.is_payslip,
//       is_grouped: reportData.is_grouped,
//       'typeof is_payslip': typeof reportData.is_payslip,
//       'is_payslip === true': reportData.is_payslip === true,
//       'is_payslip == true': reportData.is_payslip == true,
//       'Boolean(is_payslip)': Boolean(reportData.is_payslip)
//     });

//     // STRICT priority: payslip > complex > regular table
//     console.log('🔍 Checking is_payslip === true:', reportData.is_payslip === true);
//     console.log('🔍 Raw is_payslip value:', reportData.is_payslip);
//     console.log('🔍 Type of is_payslip:', typeof reportData.is_payslip);

//     if (reportData.is_payslip === true) {
//       console.log('🔍 ✅ Payslip condition matched - showing payslip drawer');
//       return 'payslip';
//     }

//     console.log('🔍 Checking is_complex === true:', reportData.is_complex === true);
//     if (reportData.is_complex === true) {
//       console.log('🔍 ✅ Complex condition matched - showing complex drawer');
//       return 'complex';
//     }

//     console.log('🔍 Checking for regular data...');
//     if (reportData.data && Array.isArray(reportData.data) && reportData.data.length > 0) {
//       console.log('🔍 ✅ Regular data condition matched - showing table in main view');
//       return 'none';
//     }

//     console.log('🔍 ❌ No valid data - showing form');
//     return 'form';
//   };

//   // Update active drawer when reportData changes
//   useEffect(() => {
//     console.log('🔄 useEffect triggered with reportData:', reportData);

//     if (reportData) {
//       const newActiveDrawer = determineActiveDrawer();
//       console.log('🔄 determineActiveDrawer() returned:', newActiveDrawer);
//       console.log('🔄 Setting activeDrawer to:', newActiveDrawer);
//       setActiveDrawer(newActiveDrawer);
//       setIsOpen(false); // Close form drawer when showing results
//     }
//   }, [reportData]);

//   // Debug current state
//   console.log('🎯 Current state:', {
//     activeDrawer,
//     isOpen,
//     reportData: reportData ? {
//       is_complex: reportData.is_complex,
//       is_payslip: reportData.is_payslip,
//       is_grouped: reportData.is_grouped,
//       title: reportData.title
//     } : null
//   });

//   // Debug drawer conditions
//   console.log('🚪 Drawer conditions:', {
//     formDrawer: activeDrawer === 'form',
//     complexDrawer: activeDrawer === 'complex',
//     payslipDrawer: activeDrawer === 'payslip',
//     tableInMainView: activeDrawer === 'none'
//   });

//   return (
//     <>
//       <section className="max-w-[90rem] !overflow-hidden">
//         <PageHeader
//           header_text={"Reports"}
//           buttonProp={[{ button_text: "Open Report", fn: openDrawer }]}
//         />
//         <Separator separator_text={"Report History"} />

//         {/* Only show regular table when activeDrawer is 'none' AND data is array */}
//         {activeDrawer === 'none' && reportData && Array.isArray(reportData?.data) && (
//           <PayrollReportTable
//             tableData={reportData?.data ?? []}
//             is_grouped={reportData?.is_grouped}
//             title={reportData?.title}
//             is_yearly={reportData?.is_yearly}
//             is_allowance={reportData?.is_allowance}
//             is_staff={reportData?.is_staff}
//           />
//         )}
//       </section>

//       {/* Main form drawer */}
//       <ExpandedDrawerWithButton
//         isOpen={activeDrawer === 'form'}
//         onClose={closeDrawer}
//         maxWidth={600}
//       >
//         {/* {activeDrawer === 'form' && ( */}
//           <GenerateWizardReportForm
//             setReportData={setReportData}
//             closeDrawer={closeDrawer}
//           />
//         {/* )} */}
//       </ExpandedDrawerWithButton>

//       {/* Complex report drawer */}
//       {console.log('🔴 Complex drawer isOpen:', activeDrawer === 'complex')}
//       <ExpandedDrawerWithButton
//         isOpen={activeDrawer === 'complex'}
//         onClose={handleReportClose}
//         maxWidth={1300}
//       >
//         {activeDrawer === 'complex' && reportData && (
//           <ComplexPayrollReportTable
//             tableData={reportData?.data ?? []}
//             title={reportData?.title?.replaceAll("'", "")}
//           />
//         )}
//       </ExpandedDrawerWithButton>

//       {/* Payslip report drawer */}
//       {console.log('🔵 Payslip drawer isOpen:', activeDrawer === 'payslip')}
//       <ExpandedDrawerWithButton
//         isOpen={activeDrawer === 'payslip'}
//         onClose={handleReportClose}
//         maxWidth={1300}
//       >
//         {activeDrawer === 'payslip' && reportData && (
//           <PayslipReport
//             data={reportData?.data ?? null}
//             isFetching={false}
//           />
//         )}
//       </ExpandedDrawerWithButton>
//     </>
//   );
// };

// export default ReportWizard;

// import { useState } from "react";
// import PageHeader from "../../../components/payroll_components/PageHeader";
// import Separator from "../../../components/payroll_components/Separator";
// import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
// import PayrollReportTable from "../../../components/core/reportWizard/PayrollReportTable";
// import GenerateWizardReportForm from "../../../components/core/reportWizard/GenerateR";
// import ComplexPayrollReportTable from "../../../components/core/reportWizard/ComplexReport";
// import PayslipReport from "../../../components/core/reportWizard/PayslipReport";

// const ReportWizard = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [reportData, setReportData] = useState(null);

//   if (reportData) {
//     console.log(reportData);
//   }

//   const openDrawer = () => {
//     setIsOpen(true);
//   };

//   const closeDrawer = () => {
//     setIsOpen(false);
//   };

//   const handleReportClose = () => {
//     setReportData(null); // Clear all report data completely
//     openDrawer();
//   };

//   console.log(reportData);

//   return (
//     <>
//       <section className="max-w-[90rem] !overflow-hidden">
//         <PageHeader
//           header_text={"Reports"}
//           buttonProp={[{ button_text: "Open Report", fn: openDrawer }]}
//         />
//         <Separator separator_text={"Report History"} />

//         {/* Only show regular table when it's not complex AND not payslip AND reportData exists */}
//         {reportData && !reportData?.is_complex && !reportData?.is_payslip && (
//           <PayrollReportTable
//             tableData={reportData?.data ?? []}
//             is_grouped={reportData?.is_grouped}
//             title={reportData?.title}
//             is_yearly={reportData?.is_yearly}
//             is_allowance={reportData?.is_allowance}
//             is_staff={reportData?.is_staff}
//           />
//         )}
//       </section>

//       {/* Main form drawer */}
//       <ExpandedDrawerWithButton
//         isOpen={isOpen}
//         onClose={closeDrawer}
//         maxWidth={600}
//       >
//         <GenerateWizardReportForm
//           setReportData={setReportData}
//           closeDrawer={closeDrawer}
//         />
//       </ExpandedDrawerWithButton>

//       {/* Complex report drawer - ONLY when is_complex is true AND is_payslip is not true */}
//       <ExpandedDrawerWithButton
//         isOpen={reportData?.is_complex === true && !reportData?.is_payslip}
//         onClose={handleReportClose}
//         maxWidth={1300}
//       >
//         <ComplexPayrollReportTable
//           tableData={reportData?.data ?? []}
//           title={reportData?.title?.replaceAll("'", "")}
//         />
//       </ExpandedDrawerWithButton>

//       {/* Payslip report drawer - ONLY when is_payslip is true AND is_complex is not true */}
//       <ExpandedDrawerWithButton
//         isOpen={reportData?.is_payslip === true && !reportData?.is_complex}
//         onClose={handleReportClose}
//         maxWidth={1300}
//       >
//         <PayslipReport
//           data={reportData?.data ?? null}
//           isFetching={false}
//         />
//       </ExpandedDrawerWithButton>
//     </>
//   );
// };

// export default ReportWizard;

// import { useState } from "react";
// import PageHeader from "../../../components/payroll_components/PageHeader";
// import Separator from "../../../components/payroll_components/Separator";
// import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
// import PayrollReportTable from "../../../components/core/reportWizard/PayrollReportTable";
// import GenerateWizardReportForm from "../../../components/core/reportWizard/GenerateR";
// import ComplexPayrollReportTable from "../../../components/core/reportWizard/ComplexReport";
// import PayslipReport from "../../../components/core/reportWizard/PayslipReport";

// const ReportWizard = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [reportData, setReportData] = useState([]);

//   if (reportData) {
//     console.log(reportData);
//   }

//   const openDrawer = () => {
//     setIsOpen(true);
//   };

//   const closeDrawer = () => {
//     setIsOpen(false);
//   };

//   const handleReportClose = () => {
//     setReportData([]);
//     openDrawer();
//   };

//   console.log(reportData);

//   return (
//     <>
//       <section className="max-w-[90rem] !overflow-hidden">
//         <PageHeader
//           header_text={"Reports"}
//           buttonProp={[{ button_text: "Open Report", fn: openDrawer }]}
//         />
//         <Separator separator_text={"Report History"} />

//         {/* Only show regular table when it's not complex AND not payslip */}
//         {!reportData?.is_complex && !reportData?.is_payslip && (
//           <PayrollReportTable
//             tableData={reportData?.data ?? []}
//             is_grouped={reportData?.is_grouped}
//             title={reportData?.title}
//             is_yearly={reportData?.is_yearly}
//             is_allowance={reportData?.is_allowance}
//             is_staff={reportData?.is_staff}
//           />
//         )}
//       </section>

//       {/* Main form drawer */}
//       <ExpandedDrawerWithButton
//         isOpen={isOpen}
//         onClose={closeDrawer}
//         maxWidth={600}
//       >
//         <GenerateWizardReportForm
//           setReportData={setReportData}
//           closeDrawer={closeDrawer}
//         />
//       </ExpandedDrawerWithButton>

//       {/* Complex report drawer - ONLY when is_complex is true AND is_payslip is not true */}
//       <ExpandedDrawerWithButton
//         isOpen={reportData?.is_complex === true && !reportData?.is_payslip}
//         onClose={handleReportClose}
//         maxWidth={1300}
//       >
//         <ComplexPayrollReportTable
//           tableData={reportData?.data ?? []}
//           title={reportData?.title?.replaceAll("'", "")}
//         />
//       </ExpandedDrawerWithButton>

//       {/* Payslip report drawer - ONLY when is_payslip is true AND is_complex is not true */}
//       <ExpandedDrawerWithButton
//         isOpen={reportData?.is_payslip === true && !reportData?.is_complex}
//         onClose={handleReportClose}
//         maxWidth={1300}
//       >
//         <PayslipReport
//           data={reportData?.data ?? null}
//           isFetching={false}
//         />
//       </ExpandedDrawerWithButton>
//     </>
//   );
// };

// export default ReportWizard;

// import { useState } from "react";
// import PageHeader from "../../../components/payroll_components/PageHeader";
// import Separator from "../../../components/payroll_components/Separator";
// import ExpandedDrawerWithButton from "../../../components/modals/ExpandedDrawerWithButton";
// import PayrollReportTable from "../../../components/core/reportWizard/PayrollReportTable";
// import GenerateWizardReportForm from "../../../components/core/reportWizard/GenerateR";
// import ComplexPayrollReportTable from "../../../components/core/reportWizard/ComplexReport";
// import PayslipReport from "../../../components/core/reportWizard/PayslipReport";

// const ReportWizard = () => {
//   const [isOpen, setIsOpen] = useState(true);

//   const [reportData, setReportData] = useState([]);

//   if (reportData) {
//     console.log(reportData);
//   }

//   const openDrawer = () => {
//     setIsOpen(true);
//   };
//   const closeDrawer = () => {
//     setIsOpen(false);
//   };

//   console.log(reportData)
//   return (
//     <>
//       <section className="max-w-[90rem] !overflow-hidden">
//         <PageHeader
//           header_text={"Reports"}
//           buttonProp={[{ button_text: "Open Report", fn: openDrawer }]}
//         />
//         <Separator separator_text={"Report History"} />

//       {
//         reportData?.is_complex || reportData?.is_payslip ?
//         <></>:
//         <PayrollReportTable
//           tableData={reportData?.data ?? []}
//           is_grouped={reportData?.is_grouped}
//           title={reportData?.title}
//           is_yearly={reportData?.is_yearly}
//           is_allowance={reportData?.is_allowance}
//           is_staff={reportData?.is_staff}
//         />
//       }

//       </section>

//       <ExpandedDrawerWithButton
//         isOpen={isOpen}
//         onClose={closeDrawer}
//         maxWidth={600}
//       >
//         <GenerateWizardReportForm
//           setReportData={setReportData}
//           closeDrawer={closeDrawer}
//         />
//       </ExpandedDrawerWithButton>

//       <ExpandedDrawerWithButton
//         isOpen={reportData?.is_complex == true}
//         onClose={()=> {
//           setReportData([])
//           openDrawer()
//         }
//       }
//         maxWidth={1300}
//       >
//         <ComplexPayrollReportTable
//            tableData={reportData?.data ?? []}
//            title={reportData?.title?.replaceAll("'", "")}
//          />
//       </ExpandedDrawerWithButton>

//       {
//         reportData?.is_payslip == true &&
//         <ExpandedDrawerWithButton
//           isOpen={reportData?.is_payslip == true && !reportData?.is_complex}
//           onClose={()=> {
//             setReportData([])
//             openDrawer()
//           }
//         }
//           maxWidth={1300}
//         >
//           <PayslipReport
//             data={reportData?.data ?? null}
//             isFetching={false}
//           />
//         </ExpandedDrawerWithButton>
//       }
//     </>
//   );
// };

// export default ReportWizard;
