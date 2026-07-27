import { useForm } from "react-hook-form";
import ExpandedDrawerWithButton from "../../../../modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../payroll_components/FormDrawer";
import NewAllowancesForm from "./NewAllowancesForm";
import PropTypes from "prop-types";
import AllowanceGrouping from "./AllowanceGrouping";
import AddAttachment from "./AddAttachment";
import { errorToast, successToast } from "../../../../../utils/toastMsgPop";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { useCreatePayrollAllowance } from "../../../../../API/allowance";
import { useEffect } from "react";

const requiredFields = {
  allowance_name: "Attribute name is required",
  abbrevation: "Abbreviation name is required",
  allowance_type: "Allowance Type is required",
  pay_deduct: "Salary Type is required",
};

const validateForm = (values) => {
  const newErrors = {};

  Object.keys(requiredFields).forEach((field) => {
    const value = values?.[field];

    if (Array.isArray(value)) {
      if (value.length === 0) {
        newErrors[field] = requiredFields[field];
      }
    } else {
      // Check for null, undefined, or empty string — but allow 0 and false
      if (value === undefined || value === null || value === "") {
        newErrors[field] = requiredFields[field];
      }
    }
  });

  return newErrors;
};

const NewAllowancesDrawer = ({ isOpen, handleCloseDrawer, defaultValues }) => {
  const { mutateAsync: mutatePayrollAllowance, isPending: isLoading } =
    useCreatePayrollAllowance();

  const { userData } = useCurrentUser();

  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { touchedFields, errors },
    reset,
  } = useForm({
    defaultValues: {
      custom_step: 0,
    },
  });

  useEffect(() => {
    reset({
      company_id: userData?.data?.COMPANY_ID,
      allowance_name: defaultValues?.name,
      abbrevation: defaultValues?.code,
      allowance_type: defaultValues?.is_contract, // 0 for Full time, 1 for Contarct,
      is_loan: defaultValues?.is_loan, //0
      show_on_payroll: defaultValues?.show_payroll, //0
      use_as_salary_advance: defaultValues?.use_as_salary_advance, //0
      is_nhf: defaultValues?.is_nhf || 0, //0
      is_grouped: defaultValues?.has_groups || 0, //0
      group_type: defaultValues?.group_type, //grade/rank
      custom_step: defaultValues?.has_steps, //0
      is_pension: defaultValues?.is_pension, //0
      is_arrears: defaultValues?.is_arrears, //0
      is_contribution: defaultValues?.is_contribution, //0
      is_coperative: defaultValues?.is_coperative, //0
      is_tax: defaultValues?.is_tax, //0
      is_taxable: defaultValues?.is_taxable, //0
      is_arrearsable: defaultValues?.is_arrearsable, //0
      pay_deduct: defaultValues?.pay_deduct, //0 for Payment, 1 for deduction
      is_thirteenth_month: defaultValues?.is_thirteenth_month, //0
      is_regular: defaultValues?.is_regular || 0, //0
      flat_field: Number(defaultValues?.flat_field) || "",
      rate_field: defaultValues?.rate_field, // will be null if is_grouped is 1 or flat_field is with value
      created_by: defaultValues?.created_by || "", // only possible when is_group is 1
      payment_type:
        defaultValues?.rate_field === "NULL" || !defaultValues?.rate_field
          ? "flat"
          : "rate",
      allowances_values: formatDefaultAllowanceValues(),
      parent_id: defaultValues?.arrears_parent,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  const formatGrades = (data = []) => {
    const gradeMap = new Map();

    data?.forEach(({ grade_level, step, flat_field }) => {
      if (!gradeMap.has(grade_level)) {
        gradeMap.set(grade_level, []);
      }
      gradeMap.get(grade_level).push({ step, flat_field });
    });

    const grades = Array.from(gradeMap.entries()).map(([grade, steps]) => ({
      id: `${grade}`,
      name: `Grade ${grade}`,
      steps: steps?.map(({ step, flat_field }) => ({
        step_name: `Step ${step}`,
        step,
        flat_field: Number(flat_field).toFixed(2),
      })),
    }));
    return grades;
  };

  const formatDefaultAllowanceValues = () => {
    const gradesWithStep = formatGrades(defaultValues?.group_amount);
    if (defaultValues?.has_groups && defaultValues?.has_steps) {
      const defaultGroupFees = gradesWithStep?.map((grade) =>
        grade?.steps.map((step) => ({
          grade: grade?.id,
          step: step.step,
          amount_to_pay: step?.flat_field,
        }))
      );
      return defaultGroupFees;
    } else if (defaultValues?.group_type === "rank") {
      const defaultGroupFees = []?.map((rank) => ({
        //empty array will be replaced by default grouped ranks
        rank: rank?.RANK,
        code: rank.CODE,
        amount_to_pay: "",
      }));
      return defaultGroupFees;
    } else {
      const defaultGroupFees = defaultValues?.group_amount?.map(
        ({ grade_level, step, flat_field }) => ({
          grade: grade_level,
          step: step,
          amount_to_pay: Number(flat_field)?.toFixed(2),
        })
      );
      return defaultGroupFees;
    }
  };

  const flapMapGroup = (allowance_values) => {
    return allowance_values?.flat()?.filter((it) => it?.amount_to_pay);
  };

  const onSubmit = async () => {
    const data = getValues();

    const group_fees = data?.is_grouped
      ? flapMapGroup(data?.allowances_values)
      : null;

    const formErrors = validateForm({ ...data, group_fees });

    const payload = {
      company_id: userData?.data?.COMPANY_ID,
      name: data?.allowance_name,
      allowance_id: data?.id,
      abbrevation: data.abbrevation?.replace(/\s+/g, "-"),
      allowance_type: data?.allowance_type || 0, // 0 for Full time, 1 for Contarct,
      is_loan: data?.is_loan || 0, //0
      show_on_payroll: data?.show_on_payroll || 0, //0
      use_as_salary_advance: data?.use_as_salary_advance || 0, //0
      is_nhf: data?.is_nhf || 0, //0
      has_group: data?.is_grouped || 0, //0
      group_type: data?.is_grouped ? data?.group_type : "", //grade/rank
      has_step: data?.custom_step || 0, //0
      is_pension: data?.is_pension || 0, //0
      is_arrears: data?.is_arrears || 0, //0
      is_arrearsable: 0, //0
      is_contribution: data?.is_contribution || 0, //0
      is_coperative: data?.is_coperative || 0 || 0, //0
      is_tax: data?.is_tax || 0, //0
      is_taxable: data?.is_taxable || 0, //0
      pay_deduct: data?.pay_deduct || 0, //0 for Payment, 1 for deduction
      is_thirteenth_month: data?.is_thirteenth_month || 0, //0
      is_regular: data?.is_regular || 0, //0
      flat_field:
        !data?.is_grouped && data?.payment_type === "flat"
          ? data?.flat_field
          : 0, //will be 0 if is_grouped is 1 or when rate_field is with value
      rate_field:
        !data?.is_grouped && data?.payment_type === "rate"
          ? data?.rate_field
          : 0, // will be null if is_grouped is 1 or flat_field is with value
      staff_id: userData?.data?.STAFF_ID, // only possible when is_group is 1
      group_fees,
      group_excel: data?.group_excel || null, //this is group fees in excel.. which is uploaded
    };

    if (Object.keys(formErrors).length > 0) {
      const combinedMessage = Object.values(formErrors).join("\n");
      errorToast(combinedMessage);
      return;
    } else {
      console.log(payload);
      try {
        const res = await mutatePayrollAllowance(payload);
        successToast(res?.data?.message);
        reset();
        handleCloseDrawer();
      } catch (err) {
        const errMsg = err?.response?.data?.message;
        errorToast(errMsg);
      }
    }
  };

  return (
    <>
      <ExpandedDrawerWithButton
        isOpen={isOpen}
        onClose={handleCloseDrawer}
        maxWidth={850}
      >
        <FormDrawer
          tabs={[
            {
              title: "Allowance",
              component: (
                <NewAllowancesForm
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  watch={watch}
                  touchedFields={touchedFields}
                  errors={errors}
                />
              ),
            },
            {
              title: "Calculations",
              component: (
                <AllowanceGrouping
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  watch={watch}
                  touchedFields={touchedFields}
                  errors={errors}
                  isLoading={isLoading}
                  onSubmit={onSubmit}
                />
              ),
            },
            {
              title: "Attachment",
              component: (
                <AddAttachment
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  watch={watch}
                  touchedFields={touchedFields}
                  errors={errors}
                  isPending={isLoading}
                  handleSubmit={onSubmit}
                />
              ),
            },
          ]}
        ></FormDrawer>
      </ExpandedDrawerWithButton>
    </>
  );
};

NewAllowancesDrawer.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseDrawer: PropTypes.func,
  defaultValues: PropTypes.object,
};

export default NewAllowancesDrawer;
