/* eslint-disable no-unused-vars */
import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@nextui-org/react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useGetEmploymentType } from "../../../API/officials";
import {
  useGeneratePayrollReport,
  useGenerateReport,
  useGetArrearsAllowances,
  useGetBankAllowances,
  useGetContributionAllowances,
  useGetCoperativeAllowances,
  useGetDeductionAllowances,
  useGetIncomeAllowances,
  useGetLoanAllowances,
  useGetMembershipAllowances,
} from "../../../API/reports";
import { errorToast } from "../../../utils/toastMsgPop";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetStaffByType } from "../../../API/variation";
import { User } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { filePrefix } from "../../../utils/filePrefix";
import { useGetAllAllowances } from "../../../API/allowance";
import {
  useGetAllPayrollStaff,
  useGetAllPayrollStaffFORREPORT,
} from "../../../API/payroll_staff";

const listData = [
  { label: "Full Report", value: "full report" },
  { label: "Summary", value: "summary report" },
];
const staffTypeData = [
  { label: "Full Time", value: "0" },
  { label: "Contract", value: "1" },
];
const AnnualyData = [
  { label: "Annualy", value: "yearly" },
  { label: "Monthly", value: "monthly" },
];

const monthData = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

// year data from 2018
const startYear = 2018;
const currentYear = new Date().getFullYear();
const yearData = Array.from(
  { length: currentYear - startYear + 1 },
  (_, i) => ({ label: startYear + i, value: startYear + i })
);

const SummaryData = [
  { label: "Allowance", value: "allowance" },
  { label: "Department", value: "department" },
  { label: "Bank", value: "bank" },
  { label: "Pension", value: "pension" },
  { label: "Tax", value: "tax" },
  { label: "Salary", value: "salary" },
  { label: "Grade", value: "grade" },
  { label: "Tax Annual", value: "tax annual" },

  // { label: "Arrears Info", value: "arrears info" },
  // { label: "Grade", value: "grade" },
  // { label: "Allowances", value: "Allowances" },
  // { label: "Location / Dept", value: "Location / Dept" },
  // { label: "Grade Level", value: "Grade Level" },
  // { label: "Contribution", value: "Contribution" },
  // { label: "Loan", value: "Loan" },
  // { label: "Arrears", value: "Arrears" },
];

const fullReportData = [
  { label: "Remita", value: "remita" },
  { label: "Tax", value: "tax" },
  { label: "Pension", value: "pension" },
  { label: "Pension Remita", value: "pension remita" },
  { label: "NHF", value: "NHF" },
  { label: "Contribution", value: "contribution" },
  { label: "Cooperative", value: "coperative" },
  { label: "Loan", value: "loans" },

  { label: "Arrears", value: "arrears" },
  { label: "Membership", value: "membership" },
  { label: "Incomes", value: "income" },
  { label: "Deduction", value: "deduction" },

  { label: "Payroll Variance", value: "payroll variance" },
  { label: "Staff Variance", value: "staff variance" },
  { label: "Allowances Variance", value: "allowance variance" },
  // { label: "Annual", value: "annual" },
  { label: "Staff Annual", value: "staff annual" },
  { label: "Allowances Annual", value: "allowance annual" },
  { label: "Inflow/Outflow", value: "inflow outflow" },
  { label: "Negative", value: "negative" },
  { label: "Bank Allowance", value: "bank allowance" },
  { label: "Default", value: "default" },
  { label: "Arrears Run", value: "arrears run" },
  { label: "Payslip", value: "payslip" },
  { label: "Audit", value: "audit" },
  { label: "Thirteenth Audit", value: "thirteenth audit" },

  // { label: "Exit Staff", value: "Exit Staff" },
  // { label: "Remita Bank report", value: "Remita Bank report" },
  // { label: "Bank Attribute Reports", value: "Bank Attribute Reports" },
  // { label: "Bank", value: "Bank" },
  // { label: "Allowances", value: "Allowances" },
  // { label: "Month Variance", value: "Month Variance" },
  // { label: "Inflow/Outflow", value:"Inflow/Outflow"  },
  // { label: "Department Audit", value: "Department Audit"  },
];

const GenerateWizardReportForm = ({ setReportData, closeDrawer }) => {
  const mutation = useGenerateReport();

  const { userData } = useCurrentUser();
  const company_id = userData?.data.COMPANY_ID;

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    annually: null,
  });

  // const [varaintItemList, setVariantItemList] = useState([]);
  // const [varaintinputValues, setVariantInputValues] = useState({});

  const { data: getEmployeeType, isLoading: employeeTypeLoading } =
    useGetEmploymentType();
  const { mutate: generateReport, isPending: isGenerating } =
    useGeneratePayrollReport();

  const { data: allFAllowances, isPending: fAllowanceLoading } =
    useGetAllAllowances({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: "0",
    });
  const { data: allCAllowances, isPending: cAllowanceLoading } =
    useGetAllAllowances({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: "1",
    });

  const {
    data: allFullContributionAllowances,
    isPending: fullcontributionAllowanceLoading,
  } = useGetContributionAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "0",
  });
  const {
    data: allContractContributionAllowances,
    isPending: contractcontributionAllowanceLoading,
  } = useGetContributionAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  const {
    data: allFullCoperativeAllowances,
    isPending: fullcoperateAllowanceLoading,
  } = useGetCoperativeAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "0",
  });
  const {
    data: allContractCoperativeAllowances,
    isPending: contractcoperateAllowanceLoading,
  } = useGetCoperativeAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  const { data: allFullLoanAllowances, isPending: fullloanAllowanceLoading } =
    useGetLoanAllowances({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: "0",
    });
  const {
    data: allContractLoanAllowances,
    isPending: contractloanAllowanceLoading,
  } = useGetLoanAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  const {
    data: allFullArrearsAllowances,
    isPending: fullArrearsAllowanceLoading,
  } = useGetArrearsAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "0",
  });
  const {
    data: allContractArrearsAllowances,
    isPending: contractArrearsAllowanceLoading,
  } = useGetArrearsAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  const {
    data: allFullMembershipAllowances,
    isPending: fullMembershipAllowanceLoading,
  } = useGetMembershipAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "0",
  });
  const {
    data: allContractMembershipAllowances,
    isPending: contractMembershipAllowanceLoading,
  } = useGetMembershipAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  const {
    data: allFullIncomeAllowances,
    isPending: fullIncomeAllowanceLoading,
  } = useGetIncomeAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "0",
  });
  const {
    data: allContractIncomeAllowances,
    isPending: contractIncomeAllowanceLoading,
  } = useGetIncomeAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  const {
    data: allFullDeductionAllowances,
    isPending: fullDeductionAllowanceLoading,
  } = useGetDeductionAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "0",
  });
  const {
    data: allContractDeductionAllowances,
    isPending: contractDeductionAllowanceLoading,
  } = useGetDeductionAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  const { data: allFullBankAllowances, isPending: fullBankAllowanceLoading } =
    useGetBankAllowances({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: "0",
    });
  const {
    data: allContractBankAllowances,
    isPending: contractBankAllowanceLoading,
  } = useGetBankAllowances({
    company_id: userData?.data?.COMPANY_ID,
    allowance_type: "1",
  });

  // console.log(allFullContributionAllowances, allFullCoperativeAllowances,allFullLoanAllowances )
  //
  const handleAllAllowance = (value) => {
    if (value == "0") {
      return (
        allFAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allCAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };
  const handleContribution = (value) => {
    if (value == "0") {
      return (
        allFullContributionAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractContributionAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };

  const handleCoperative = (value) => {
    if (value == "0") {
      return (
        allFullCoperativeAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractCoperativeAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };
  const handleLoan = (value) => {
    if (value == "0") {
      return (
        allFullLoanAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractLoanAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };
  const handleArrears = (value) => {
    if (value == "0") {
      return (
        allFullArrearsAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractArrearsAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };
  const handleMembership = (value) => {
    if (value == "0") {
      return (
        allFullMembershipAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractMembershipAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };

  const handleIncome = (value) => {
    if (value == "0") {
      return (
        allFullIncomeAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractIncomeAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };
  const handleBank = (value) => {
    if (value == "0") {
      return (
        allFullBankAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractBankAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };

  const handleDeduction = (value) => {
    if (value == "0") {
      return (
        allFullDeductionAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else if (value == "1") {
      return (
        allContractDeductionAllowances?.map((item) => ({
          ...item,
          value: item?.id,
          label: item?.name,
        })) || []
      );
    } else {
      return [];
    }
  };

  const { data: getStaffFull, isPending: isGetStaffLoading } =
    useGetAllPayrollStaffFORREPORT({
      company_id: userData?.data?.COMPANY_ID,
      staff_type: "0",
    });

  // useGetAllPayrollStaff
  const { data: getStaffContract, isPending: isGetStaffLoadingC } =
    useGetAllPayrollStaffFORREPORT({
      company_id: userData?.data?.COMPANY_ID,
      staff_type: "1",
    });

  const formattedStaffLabel = useCallback(
    (staff) => (
      <User
        avatarProps={{
          icon: <FaUser size={20} className="" />,
          radius: "full",
          src: staff?.FILE_NAME ? filePrefix + staff?.FILE_NAME : "",
          className:
            "w-8 h-8 my-2 object-cover rounded-full border-default-200 border",
        }}
        name={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-helvetica text-xs uppercase">{`${
              staff?.fullname || ""
            } ${staff?.FIRST_NAME || ""}`}</span>
            {staff?.empno && "-"}
            <span className="font-helvetica text-black opacity-30 my-auto capitalize text-xs">
              {`${staff?.empno}`}
            </span>
          </div>
        }
        classNames={{
          description: "w-48 truncat",
          name: "",
        }}
        css={{
          ".nextui-user-icon svg": {
            color: "red", // Set the color of the default icon
          },
        }}
        description={
          <div>
            <div className="flex flex-wrap flex-co gap-y-1 justify-cente gap-x-3 m">
              {staff?.DESIGNATION ? (
                <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                  {staff?.DESIGNATION?.toLowerCase()}
                </p>
              ) : null}
              {/* <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                  {staff?.STAFF_NUMBER}
                </p> */}
            </div>
            <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
              <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                {staff?.DEPARTMENT?.toLowerCase()}
              </p>
            </div>
            <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
              <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                Grade {staff?.grade}
              </p>
              {staff?.grade && staff?.step && <span>-</span>}
              <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                Step {staff?.step}
              </p>
            </div>
          </div>
        }
      />
    ),
    []
  );

  // console.log(watch('employee_type'))
  const emp_change = getValues("employee_type");

  const staffs = useMemo(
    () =>
      (emp_change === "0" ? getStaffFull : getStaffContract)?.map((item) => ({
        ...item,
        label: formattedStaffLabel(item),
        value: item?.staff_id,
        searchValue: `${item?.fullname || ""} ${item?.staff_id}`,
      })),
    [getStaffFull, getStaffContract, formattedStaffLabel, emp_change]
  );

  // *****************************

  const onSubmit = (data) => {
    const monthString = monthData.find(
      (item) => item.value === data?.report_month
    )?.label;
    const compareMonthString = monthData.find(
      (item) => item.value === data?.compare_month
    )?.label;

    const is_yearly =
      data?.report_name === "allowance annual" ||
      data?.report_name === "staff variance" ||
      data?.report_name === "NHF" ||
      data?.report_name === "tax annual" ||
      data?.report_name === "tax" ||
      data.report_name === "grade"
        ? true
        : data?.annualy === "yearly"
        ? true
        : data?.report_month
        ? false
        : false;

    const is_allowance =
      data?.report_name === "allowance" ||
      data?.report_name === "staff variance" ||
      data?.report_name === "allowance annual" ||
      data?.report_name === "staff annual";

    const json = {
      company_id: userData?.data.COMPANY_ID,
      staff_id: data?.staff ?? userData?.data.STAFF_ID,
      report_type: data?.category,
      report_name: data?.report_name,
      staff_type: data?.employee_type,
      year: data?.report_year,
      month: data?.annualy !== "yearly" ? data?.report_month || null : null,
      month_string: data?.annualy !== "yearly" ? monthString || null : null,
      compare_month: data?.compare_month ?? null,
      compare_month_string: compareMonthString ?? null,
      compare_year: data?.compare_year ?? null,
      allowance_id: data?.allowance ?? null,
    };

    // console.log(json)

    generateReport(json, {
      onSuccess: (data) => {
        // console.log(data)

        const months = [
          "JAN",
          "FEB",
          "MAR",
          "APR",
          "MAY",
          "JUN",
          "JUL",
          "AUG",
          "SEP",
          "OCT",
          "NOV",
          "DEC",
          "NET",
        ];
        const isTaxAnnual =
          getValues("report_name") === "tax annual" &&
          getValues("category") === "summary report";

        const resData = data?.data?.data;

        const title = data?.data?.report;

        // Determine report type FIRST
        const is_payslip = json?.report_name === "payslip";

        // Only check for complex/grouped structure if it's NOT a payslip
        let is_grouped = false;
        let is_complex = false;
        let is_staff = false;

        if (!is_payslip) {
          // Check if data is grouped (not a simple array)
          // console.log(resData)
          is_grouped = !Array.isArray(resData);

          if (is_grouped) {
            // Determine if data is staff-based structure
            is_staff = Object.values(resData).some(
              (value) =>
                typeof value === "object" &&
                !Array.isArray(value) &&
                ("Income" in value || "Deduction" in value)
            );

            // Determine if data is complex (3-level nested structure)
            is_complex = Object.values(resData).some(
              (value) =>
                typeof value === "object" &&
                !Array.isArray(value) &&
                Object.values(value).some(
                  (nestedValue) =>
                    typeof nestedValue === "object" &&
                    !Array.isArray(nestedValue) &&
                    Object.values(nestedValue).some(
                      (deepValue) =>
                        typeof deepValue === "object" &&
                        !Array.isArray(deepValue)
                    )
                )
            );
          }
        }

        // console.log('Report type:', json?.report_name);
        // console.log('Data structure:', { is_payslip, is_grouped, is_complex, is_staff });

        // Create the report data object with mutually exclusive flags
        const reportDataObject = {
          data: resData,
          is_payslip: is_payslip,
          is_complex: is_payslip ? false : is_complex, // Ensure payslip is never complex
          is_grouped: is_payslip ? false : is_grouped, // Ensure payslip is never grouped
          is_yearly: is_grouped ? true : is_yearly,
          is_allowance: is_allowance,
          title: title,
          is_staff: is_payslip ? false : is_staff, // Ensure payslip is never staff
          isTaxAnnual: isTaxAnnual, // Specific flag for tax annual summary
        };

        // console.log("Final report data object:", reportDataObject);

        setReportData(reportDataObject);
        closeDrawer();
        setValue("annualy", "", { shouldDirty: true });
        // reset();
      },
      onError: (error) => {
        console.log(error);
        errorToast(error?.response?.data?.message);
      },
    });
  };

  // v1!
  // const onSubmit = (data) => {
  //   const monthString = monthData.find((item) => item.value === data?.report_month)?.label;
  //   const compareMonthString = monthData.find((item) => item.value === data?.compare_month)?.label;

  //   const is_yearly = (data?.report_name === "allowance annual" || data?.report_name === "staff variance" || data?.report_name === "NHF") ? true :  data?.annualy === "yearly" ? true : data?.report_month ? false : false;

  //   const is_allowance = data?.report_name === "allowance" || data?.report_name === "staff variance" || data?.report_name === "allowance annual"

  //   const json = {
  //     company_id: userData?.data.COMPANY_ID,
  //     staff_id: data?.staff ?? userData?.data.STAFF_ID,
  //     report_type: data?.category,
  //     report_name: data?.report_name,
  //     staff_type: data?.employee_type,
  //     year: data?.report_year,
  //     month: data?.annualy !== "yearly" ? data?.report_month : null,
  //     month_string: data?.annualy !== "yearly" ? monthString : null,
  //     compare_month:data?.compare_month ?? null,
  //     compare_month_string:compareMonthString ?? null,
  //     compare_year:data?.compare_year ?? null,
  //     allowance_id:data?.allowance ?? null
  //   };

  //   console.log(json)

  //   generateReport(json, {
  //     onSuccess: (data) => {
  //       console.log(data)
  //       const resData = data?.data?.data;
  //       const title = data?.data?.report

  //       // const is_grouped = Object.entries(resData).length > 1 ? true : false;
  //       const is_grouped = !Array.isArray(resData);

  //       const is_payslip = json?.report_name === "payslip"

  //       // Determine if data is staff-based structure
  //       const is_staff = is_payslip ? false : is_grouped &&
  //         Object.values(resData).some(value =>
  //           typeof value === 'object' &&
  //           !Array.isArray(value) &&
  //           ('Income' in value || 'Deduction' in value)
  //         );

  //       // Determine if data is complex (3-level nested structure)
  //       const is_complex = is_payslip ? false :  is_grouped &&
  //         Object.values(resData).some(value =>
  //           typeof value === 'object' &&
  //           !Array.isArray(value) &&
  //           Object.values(value).some(nestedValue =>
  //             typeof nestedValue === 'object' &&
  //             !Array.isArray(nestedValue) &&
  //             Object.values(nestedValue).some(deepValue =>
  //               typeof deepValue === 'object' &&
  //               !Array.isArray(deepValue)
  //             )
  //           )
  //         );

  //       console.log(json?.report_name, )

  //     console.log('Data structure:', { is_grouped, is_complex });
  //     setReportData({ data: resData, is_complex:is_payslip ? false : is_complex, is_grouped, is_payslip, is_yearly: is_grouped ? true : is_yearly , is_allowance,  title, is_staff });
  //     closeDrawer();
  //       setValue("annualy", '', { shouldDirty: true });
  //     // reset();
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //       errorToast(error?.response?.data?.message);
  //     },
  //   });
  // };

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const onChangeStartDate = (date, dateString) => {
    setValue("report_date", dateString);
    trigger("report_date");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white shadow-md p-5 py-10 rounded border flex justify-center flex-col gap-4">
          <h2 className="text-[22px] font-helvetica text-[#212529]">
            Generate Payroll Reports
          </h2>

          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Report Type
            </h5>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="category"
                    size="large"
                    placeholder="Select category"
                    optionFilterProp="label"
                    options={listData}
                    status={
                      touchedFields?.category && errors?.category ? "error" : ""
                    }
                    {...field}
                    className="w-full"
                    onChange={(value) => onChange(value, "category")}
                  />

                  <span className="text-red-500">
                    {touchedFields?.category && errors?.category?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This fied is required" }}
            />
          </div>

          {watch("category") && watch("category") === "full report" && (
            <>
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Select Full Report Type
                </h5>
                <Controller
                  name="report_name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="report_name"
                        size="large"
                        showSearch
                        placeholder="Report Type"
                        optionFilterProp="label"
                        options={fullReportData}
                        status={
                          touchedFields?.report_name && errors?.report_name
                            ? "error"
                            : ""
                        }
                        {...field}
                        className="w-full"
                        onChange={(value) => onChange(value, "report_name")}
                      />
                      <span className="text-red-500">
                        {touchedFields?.report_name &&
                          errors?.report_name?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            </>
          )}
          {watch("category") &&
            watch("category") === "full report" &&
            watch("report_name") === "tax" && (
              <>
                <div className="">
                  <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                    Select Period
                  </h5>
                  <Controller
                    name="period"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Select
                          aria-label="period"
                          size="large"
                          showSearch
                          placeholder=""
                          optionFilterProp="label"
                          options={[
                            { label: "Yearly", value: "yearly" },
                            { label: "Monthly", value: "monthly" },
                          ]}
                          status={
                            touchedFields?.period && errors?.period
                              ? "error"
                              : ""
                          }
                          {...field}
                          className="w-full"
                          onChange={(value) => onChange(value, "period")}
                        />
                        <span className="text-red-500">
                          {touchedFields?.period && errors?.period?.message}
                        </span>
                      </div>
                    )}
                    rules={{ required: "This field is required" }}
                  />
                </div>
              </>
            )}
          {watch("category") && watch("category") === "summary report" && (
            <>
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Select Summary Report Type
                </h5>
                <Controller
                  name="report_name"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="report_name"
                        size="large"
                        showSearch
                        placeholder="Report Type"
                        optionFilterProp="label"
                        options={SummaryData}
                        status={
                          touchedFields?.report_name && errors?.report_name
                            ? "error"
                            : ""
                        }
                        {...field}
                        className="w-full"
                        onChange={(value) => onChange(value, "report_name")}
                      />
                      <span className="text-red-500">
                        {touchedFields?.report_name &&
                          errors?.report_name?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            </>
          )}

          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Staff Type
            </h5>
            <Controller
              name="employee_type"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="employee_type"
                    size="large"
                    // mode="multiple"
                    placeholder="Select Staff Type"
                    optionFilterProp="label"
                    options={staffTypeData}
                    status={
                      touchedFields?.employee_type && errors?.employee_type
                        ? "error"
                        : ""
                    }
                    {...field}
                    onChange={(value) => {
                      onChange(value, "employee_type");
                      // handleSelectedAllownace(value)
                    }}
                    className="w-full"
                  />

                  <span className="text-red-500">
                    {touchedFields?.employee_type &&
                      errors?.employee_type?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>

          {(watch("report_name") === "staff variance" ||
            watch("report_name") === "staff annual" ||
            watch("report_name") === "payslip") &&
            watch("employee_type") !== null && (
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                  Staff
                </h5>
                <Controller
                  name="staff"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="staff"
                        size="large"
                        showSearch
                        virtual={false}
                        // mode="multiple"
                        placeholder="Select staff"
                        optionFilterProp="label"
                        options={staffs}
                        loading={isGetStaffLoading || isGetStaffLoadingC}
                        status={
                          touchedFields?.staff && errors?.staff ? "error" : ""
                        }
                        {...field}
                        filterOption={(input, option) => {
                          const searchValue =
                            option?.searchValue?.toLowerCase();
                          const staffNumber =
                            option?.STAFF_NUMBER?.toLowerCase();
                          return (
                            searchValue?.includes(input.toLowerCase()) ||
                            staffNumber?.includes(input.toLowerCase())
                          );
                        }}
                        className="w-full"
                      />
                      <span className="text-red-500">
                        {touchedFields?.staff && errors?.staff?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            )}

          {watch("report_name") &&
            (watch("report_name") === "contribution" ||
              watch("report_name") === "coperative" ||
              watch("report_name") === "loans" ||
              watch("report_name") === "membership" ||
              watch("report_name") === "arrears" ||
              watch("report_name") === "income" ||
              watch("report_name") === "default" ||
              watch("report_name") === "allowance variance" ||
              watch("report_name") === "bank allowance" ||
              watch("report_name") === "deduction") && (
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Allowance Type
                </h5>
                <Controller
                  name="allowance"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="allowance"
                        size="large"
                        // mode="multiple"
                        placeholder="Select Allowance Type"
                        optionFilterProp="label"
                        options={
                          watch("report_name") === "contribution"
                            ? handleContribution(getValues("employee_type"))
                            : watch("report_name") === "coperative"
                            ? handleCoperative(getValues("employee_type"))
                            : watch("report_name") === "loans"
                            ? handleLoan(getValues("employee_type"))
                            : watch("report_name") === "arrears"
                            ? handleArrears(getValues("employee_type"))
                            : watch("report_name") === "membership"
                            ? handleMembership(getValues("employee_type"))
                            : watch("report_name") === "income"
                            ? handleIncome(getValues("employee_type"))
                            : watch("report_name") === "default"
                            ? handleIncome(getValues("employee_type"))
                            : watch("report_name") === "allowance variance"
                            ? handleAllAllowance(getValues("employee_type"))
                            : watch("report_name") === "bank allowance"
                            ? handleBank(getValues("employee_type"))
                            : watch("report_name") === "deduction"
                            ? handleDeduction(getValues("employee_type"))
                            : []
                        }
                        status={
                          touchedFields?.allowance && errors?.allowance
                            ? "error"
                            : ""
                        }
                        {...field}
                        onChange={(value) => onChange(value, "allowance")}
                        className="w-full"
                      />

                      <span className="text-red-500">
                        {touchedFields?.allowance && errors?.allowance?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            )}
          {watch("report_name") &&
            (watch("report_name") === "allowance" ||
              watch("report_name") === "NHF" ||
              watch("report_name") === "contribution" ||
              watch("report_name") === "arrears" ||
              watch("report_name") === "loans" ||
              watch("report_name") === "income" ||
              watch("report_name") === "deduction" ||
              watch("report_name") === "coperative" ||
              watch("report_name") === "membership") && (
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Select Duration Type
                </h5>
                <Controller
                  name="annualy"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="annualy"
                        size="large"
                        // mode="multiple"
                        placeholder="Select duration type"
                        optionFilterProp="label"
                        options={AnnualyData}
                        status={
                          touchedFields?.annualy && errors?.annualy
                            ? "error"
                            : ""
                        }
                        {...field}
                        onChange={(value) => {
                          onChange(value, "annualy");
                          // handleSelectedAllownace(value)
                        }}
                        className="w-full"
                      />

                      <span className="text-red-500">
                        {touchedFields?.annualy && errors?.annualy?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            )}

          {watch("annualy") !== "yearly" &&
            watch("report_name") !== "staff annual" &&
            watch("report_name") !== "tax annual" &&
            (watch("category") === "full report" ||
              watch("category") === "summary report") &&
            watch("period") !== "yearly" && (
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Month
                </h5>
                <Controller
                  name="report_month"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="report_month"
                        size="large"
                        // mode="multiple"
                        placeholder="Select month"
                        optionFilterProp="label"
                        options={monthData}
                        status={
                          touchedFields?.report_month && errors?.report_month
                            ? "error"
                            : ""
                        }
                        {...field}
                        onChange={(value) => onChange(value, "report_month")}
                        className="w-full"
                      />

                      <span className="text-red-500">
                        {touchedFields?.report_month &&
                          errors?.report_month?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            )}
          {(watch("report_name") === "payroll variance" ||
            watch("report_name") === "allowance variance" ||
            watch("report_name") === "staff variance") && (
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Compare Month
              </h5>
              <Controller
                name="compare_month"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="compare_month"
                      size="large"
                      // mode="multiple"
                      placeholder="Select compare month"
                      optionFilterProp="label"
                      options={monthData}
                      status={
                        touchedFields?.compare_month && errors?.compare_month
                          ? "error"
                          : ""
                      }
                      {...field}
                      onChange={(value) => onChange(value, "compare_month")}
                      className="w-full"
                    />

                    <span className="text-red-500">
                      {touchedFields?.compare_month &&
                        errors?.compare_month?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          )}
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Year
            </h5>
            <Controller
              name="report_year"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="report_year"
                    size="large"
                    // mode="multiple"
                    placeholder="Select year"
                    optionFilterProp="label"
                    options={yearData}
                    status={
                      touchedFields?.report_year && errors?.report_year
                        ? "error"
                        : ""
                    }
                    {...field}
                    onChange={(value) => onChange(value, "report_year")}
                    className="w-full"
                  />

                  <span className="text-red-500">
                    {touchedFields?.report_year && errors?.report_year?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          {(watch("report_name") === "payroll variance" ||
            watch("report_name") === "allowance variance" ||
            watch("report_name") === "staff variance") && (
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Compare Year
              </h5>
              <Controller
                name="compare_year"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="compare_year"
                      size="large"
                      // mode="multiple"
                      placeholder="Select compare year"
                      optionFilterProp="label"
                      options={yearData}
                      status={
                        touchedFields?.compare_year && errors?.compare_year
                          ? "error"
                          : ""
                      }
                      {...field}
                      onChange={(value) => onChange(value, "compare_year")}
                      className="w-full"
                    />

                    <span className="text-red-500">
                      {touchedFields?.compare_year &&
                        errors?.compare_year?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end py-3">
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex items-center gap-x-3"
          >
            {isGenerating ? <Spinner color="default" size="sm" /> : null}
            Generate Report
          </button>
        </div>
      </form>
    </>
  );
};
GenerateWizardReportForm.propTypes = {
  setReportData: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};
export default GenerateWizardReportForm;

//  {watch("report_type") === "Summary" && (
//             <div>
//               <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
//                 Select summary Reports
//               </h5>

//               <div className="flex flex-wrap gap-3 py-4">
//                 {reportSummaryData?.map((variant) => {
//                   return (
//                     <div
//                       key={variant?.value}
//                       className={cn(
//                         `border border-default-200 rounded-2xl px-4 py-2`,
//                         {
//                           "border-primary-500": selection.includes(
//                             variant?.label
//                           ),
//                         }
//                       )}
//                     >
//                       <Checkbox
//                         classNames={{ label: "leading-tight" }}
//                         isSelected={selection.includes(variant?.label)}
//                         onValueChange={(v) => {
//                           if (v) {
//                             setSelection((prev) => [...prev, variant?.label]);
//                           } else {
//                             setSelection((prev) =>
//                               prev.filter((s) => s !== variant?.label)
//                             );
//                           }
//                         }}
//                       >
//                         {variant?.label}
//                       </Checkbox>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
