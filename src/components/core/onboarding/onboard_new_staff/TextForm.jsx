/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import { Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { debounce } from "lodash";
import useFormStore from "../../../formRequest/store";
import { errorToast } from "../../../../utils/toastMsgPop";
import Stepper from "../../../ApprovalComponents/Stepper";
import OfficialForm from "./OfficialForm";
import BioDataForm from "./BioDataForm";

export default function TextForm({ onNext }) {
  const [currentStep, setCurrentStep] = useState(1);

  const { updateData, data } = useFormStore();

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      ...data?.onboard,
    },
  });

  // console.log(data?.onboard);

  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, []);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = useCallback(
    debounce((values, errors) => {
      const json = {
        ...values,
      };
      updateData({
        onboard: { ...json },
        dataError: errors,
      });
    }, 1000), // Adjust the delay as needed
    []
  );

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues, errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues, errors, debouncedUpdateData]);

  const onChangeStep = (nextStep) => {
    setCurrentStep(nextStep < 1 ? 1 : nextStep > 3 ? 3 : nextStep);
  };

  const onNextStep = () => onChangeStep(currentStep + 1);
  const onPrevious = () => onChangeStep(currentStep - 1);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const json = {
        ...data,
      };

      setIsLoading(false);
      updateData({ onboard: { ...json } });
      onNext();
    } catch (err) {
      const errMsg = err?.response?.data?.message ?? err?.message;
      errorToast(errMsg);
      setIsLoading(false);
    }
  };

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shado p-5 rounded border flex justify-center flex-col gap-4">
        <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
        {currentStep === 1 ? (
          <BioDataForm
            getValues={getValues}
            control={control}
            watch={watch}
            errors={errors}
            touchedFields={touchedFields}
            onChange={onChange}
            trigger={trigger}
            setValue={setValue}
          />
        ) : (
          <OfficialForm
            getValues={getValues}
            control={control}
            watch={watch}
            errors={errors}
            touchedFields={touchedFields}
            onChange={onChange}
            trigger={trigger}
            setValue={setValue}
          />
        )}
      </div>
      <div className="flex justify-between py-3">
        <button
          className="border border-btnColor/70 px-6 py-2 header_h3 outline-none text-btnColor rounded disabled:text-gray-300 disabled:border-gray-300"
          disabled={currentStep === 1}
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type={currentStep === 3 ? "submit" : "button"}
          className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          onClick={onNextStep}
        >
          {isLoading ? <Spinner color="default" size="sm" /> : null}
          Next
        </button>
      </div>
    </form>
  );
}
