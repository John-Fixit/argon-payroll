import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
// import AllowanceGrouping from "./AllowanceGrouping";
import AddAttachment from "./AddAttachment";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";
import ExpandedDrawerWithButton from "../../../modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../payroll_components/FormDrawer";
import UploadLoanForm from "./UploadLoanForm";
import { useUploadLoan } from "../../../../API/payroll";

const requiredFields = {
  allowance_id: "Allowance is required",
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

const UploadLoanDrawer = ({ isOpen, handleCloseDrawer, defaultValues }) => {
  const { mutateAsync: mutateUploadLoan, isPending: isLoading } =
    useUploadLoan();

  const { userData } = useCurrentUser();

  const staffLoansDefaultRow = {
    staff_id: "",
    principal: "",
    duration: "",
  };

  const {
    control,
    setValue,
    getValues,
    watch,
    register,
    formState: { touchedFields, errors },
    reset,
  } = useForm({
    defaultValues: {
      custom_step: 0,
      staff_loans: [staffLoansDefaultRow],
    },
  });

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
      allowance_id: data?.allowance_id,
      staff_loans: data?.staff_loans, // only possible when is_group is 1
      staff_excel_loans: data?.staff_excel_loans || null,
    };

    if (Object.keys(formErrors).length > 0) {
      const combinedMessage = Object.values(formErrors).join("\n");
      errorToast(combinedMessage);
      return;
    } else {
      // console.log(payload);
      try {
        const res = await mutateUploadLoan(payload);
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
        <h4 className="header_h3 text-2xl font-helvetica">Upload Loan</h4>
        <FormDrawer
          tabs={[
            {
              title: "Allowance",
              component: (
                <UploadLoanForm
                  control={control}
                  setValue={setValue}
                  getValues={getValues}
                  watch={watch}
                  register={register}
                  touchedFields={touchedFields}
                  errors={errors}
                  handleSubmit={onSubmit}
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

UploadLoanDrawer.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseDrawer: PropTypes.func,
  defaultValues: PropTypes.object,
};

export default UploadLoanDrawer;
