import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { Drawer } from "antd";
import AdvanceForm from "./forms/AdvanceForm";
import { useForm } from "react-hook-form";
import AllowanceForm from "./forms/AllowanceForm";
import useVariationStore from "../../../hooks/useVariationStore";
import { useCreateVariation } from "../../../API/variation";
import { errorToast, successToast } from "../../../utils/toastMsgPop";

const requiredFields = {
  variation_name: "Variation name is required",
  commencement_date: "Commencement Date is required",
};

const validateForm = (values) => {
  const newErrors = {};

  const updatedRequiredField =
    values?.variation_name === "Other" && !values?.custom_variation_name
      ? {
          ...requiredFields,
          custom_variation_name: "Please provide your variation name",
        }
      : { ...requiredFields };

  Object.keys(updatedRequiredField).forEach((field) => {
    if (Array.isArray(values?.[field])) {
      // For array fields like job_description and section_two
      if (values?.[field].length === 0) {
        newErrors[field] = requiredFields[field];
      }
    } else {
      // For string fields like report_officer and counter_officer
      if (!values?.[field]) {
        newErrors[field] = requiredFields[field];
      }
    }
  });

  return newErrors;
};

const VariationForm = ({ isOpen, setIsOpen }) => {
  const { userData } = useCurrentUser();
  const [selectedTab, setSelectedTab] = useState(0);

  const { data } = useVariationStore();

  const { mutateAsync: mutateCreateVariation, isPending: isCreatingVariation } =
    useCreateVariation();

  const {
    control,
    setValue,
    getValues,
    trigger,
    watch,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      company_id: userData?.data?.COMPANY_ID,
      staff_id: userData?.data?.STAFF_ID,
    },
  });

  useEffect(() => {
    const typeIsStopAllowance = getValues("type") === "Stop Allowance";
    setValue("allowance", [
      ...(data.allowance ?? []).map((item) => ({
        ...item,
        select_type: typeIsStopAllowance ? "manual" : "",
        amount: typeIsStopAllowance ? 0 : "",
      })),
    ]);
  }, [data.allowance, getValues, setValue]);

  const goToNextTab = () => {
    if (selectedTab < tabs.length - 1) {
      setSelectedTab((prevTab) => prevTab + 1);
    }
  };

  const variationIsAnnual =
    watch("variation_name") === "Annual" ||
    watch("variation_name") === "Increment";

  const tabs = useMemo(() => {
    return [
      { title: "Form" },
      !variationIsAnnual && { title: "Allowance" },
    ].filter(Boolean);
  }, [variationIsAnnual]);

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  //=============== submit function ===========

  const handleFinalSubmit = async () => {
    const allowancesData = getValues("allowance");

    const {
      variation_name,
      custom_variation_name,
      staff_type,
      staff_id,
      company_id,
      remark,
      type,
      staff,
      commencement_date,
      grade,
      step,
      new_designation,
    } = getValues();

    const allowances = allowancesData?.map((item) => ({
      allowance_id: item?.allowance_id,
      select_type: item?.select_type,
      amount: item?.select_type === "automatic" ? null : item?.amount,
    }));

    const isAnnualOrPromotion =
      variation_name === "Annual" || variation_name === "Promotion";

    const isAnnual = variation_name === "Annual";

    const json = {
      company_id,
      staff_id,
      staff_type: isAnnualOrPromotion ? null : staff_type, //if contract, disable annual and promotion
      variation_name:
        variation_name === "Other" ? custom_variation_name : variation_name,
      new_designation: new_designation,
      staff:
        variation_name === "Annual" ? null : staff?.map((stf) => stf?.value), //array muxt be empty if annual
      type: isAnnual ? null : type,
      allowance: isAnnual ? null : allowances,
      commencement_date,
      remark,
      step: step || "",
      grade: grade || "",
    };

    const formErrors = validateForm({ ...getValues() });
    if (Object.keys(formErrors).length > 0) {
      const combinedMessage = Object.values(formErrors).join("\n");
      errorToast(combinedMessage);
      return;
    } else {
      try {
        const res = await mutateCreateVariation(json);
        successToast(res?.data?.message);
        handleClose();
      } catch (error) {
        const errMsg = error?.response?.data?.message || error?.message;
        errorToast(errMsg);
      }
    }
  };

  //===================================

  return (
    <>
      <Drawer
        width={tabs[selectedTab]?.title === "Allowance" ? 900 : 800} //620 for shopping and services
        onClose={handleClose}
        open={isOpen}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: "bg-[#F7F7F7]",
          header: "font-helvetica bg-[#F7F7F7]",
        }}
      >
        <>
          <div className="bg-[#f5f7fa] min-h-screen px-5 py-5">
            <h4 className="header_h3 text-2xl mb-3 font-helvetica">
              Variation Form
            </h4>

            <div className="grid grid-cols-1 h-ful md:grid-cols-4 gap-x-7 gap-y-5">
              <div className="my- w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 ">
                {tabs[selectedTab]?.title.toLowerCase() ==
                "form".toLowerCase() ? (
                  <AdvanceForm
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    errors={errors}
                    touchedFields={touchedFields}
                    trigger={trigger}
                    goToNextTab={goToNextTab}
                    setSelectedTab={setSelectedTab}
                    handleFinalSubmit={handleFinalSubmit}
                    isCreatingVariation={isCreatingVariation}
                  />
                ) : (
                  tabs[selectedTab]?.title.toLowerCase() ==
                    "allowance".toLowerCase() && (
                    <AllowanceForm
                      control={control}
                      setValue={setValue}
                      getValues={getValues}
                      watch={watch}
                      errors={errors}
                      touchedFields={touchedFields}
                      trigger={trigger}
                      goToNextTab={goToNextTab}
                      handleClose={handleClose}
                      handleFinalSubmit={handleFinalSubmit}
                      isCreatingVariation={isCreatingVariation}
                    />
                  )
                )}
              </div>
              <div className="flex flex-col border-l-1 border-gray-400 py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-5 md:my-0 md:h-full order-1 md:order-2">
                {tabs?.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`${
                      selectedTab === index ? "font-[500]" : "font-[400]"
                    } relative cursor-pointer font-[13px] leading-[19.5px] text-[rgba(39, 44, 51, 0.7)]`}
                  >
                    {tab?.title}
                    <span
                      className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                        selectedTab === index ? "bg-[#00bcc2]" : "bg-gray-300"
                      }  border-1 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      </Drawer>
    </>
  );
};

export default VariationForm;

VariationForm.propTypes = {
  isOpen: PropTypes.boolean,
  setIsOpen: PropTypes.func,
};
