import { Input, Select } from "antd";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo } from "react";
import StarLoader from "../../loaders/StarLoader";

const AdvanceForm = ({
  control,
  setValue,
  getValues,
  watch,
  touchedFields,
  errors,
  trigger,
  qualifyLoanData,
  qualifyLoanError,
  qualifyLoanLoading,
  isQualifyLoanError,
  goToNextTab,
}) => {


  //===============Transformed the data to an array of objects containing label, value and max_amount==========
  const transformedDurationData = useMemo(() => {
    if (qualifyLoanData) {
      return Object?.entries(qualifyLoanData).map(([key, value]) => ({
        label: key,
        value: parseInt(key.split(" ")[0]),
        max_amount: value,
      }));
    }
    return [];
  }, [qualifyLoanData]);
  //============================================

  //=============This triggers the validation of form==================
  useEffect(() => {
    trigger(undefined, { shouldFocus: false }); // Trigger validation for all fields without focusing
  }, [trigger]);
  //====================

  //============= Onchange function to set the value of the input field and trigger validation==================
  const onChange = (value, key) => {
    setValue(key, value);
    trigger(key);
  };
  //=========================================

  //==================Function to calculate the repayment amount=======================
  const calculateRepaymentAmount = useCallback((amount, duration) => {
    return Number(Number(amount / duration)?.toFixed(2))?.toLocaleString(
      "en-US"
    );
  }, []);
  //=====================

  const handleSelectAmount = (val) => {
    setValue("amount", val?.max_amount);
    setValue("duration", val?.value);
    setValue("possibleAmountSelected", true);
  };

  const handleRepickAmount = () => {
    setValue("possibleAmountSelected", false);
  };

  const handleContinueClick = () => {
    setValue("amount", "");
    setValue("duration", "");
    setValue("possibleAmountSelected", true);
  };

  return (
    <>
      {watch("possibleAmountSelected") ? (
        <main>
          <div className="bg-white shado p-5 rounded border flex justify-center flex-col gap-4">
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Amount
              </h5>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      aria-label="amount"
                      size="large"
                      placeholder="Enter your Amount"
                      {...field}
                      onChange={(e) => onChange(e?.target.value, "amount")}
                      className="mt-2"
                      status={
                        touchedFields?.amount && errors?.amount ? "error" : ""
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.amount && errors?.amount?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Duration
              </h5>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="duration"
                      size="large"
                      showSearch
                      placeholder="Select Institution Name"
                      optionFilterProp="label"
                      
                      options={transformedDurationData || []}
                      status={
                        touchedFields?.duration && errors?.duration
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full"
                      onChange={(value) => onChange(value, "duration")}
                      onBlur={() => trigger("duration")}
                    />
                    <span className="text-red-500">
                      {touchedFields?.duration && errors?.duration?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
            <div>
              {getValues("amount") && getValues("duration") && (
                <h4 className="text-center font-helvetica">
                  Monthly Repayment: ₦{" "}
                  {calculateRepaymentAmount(
                    getValues("amount"),
                    getValues("duration")
                  )}
                </h4>
              )}
            </div>
          </div>
          <div className="flex justify-between py-3">
            <button
              onClick={handleRepickAmount}
              className="bg-btnColor px-3 py-1.5 outline-none  text-white rounded hover:bg-btnColor/70"
            >
              Loan Calculator
            </button>
            <button
              onClick={goToNextTab}
              className="bg-btnColor px-3 py-1.5 outline-none  text-white rounded hover:bg-btnColor/70"
            >
              Next
            </button>
          </div>
        </main>
      ) : (
        <main>
          <h1 className="font-semibold text-center font-helvetica">
            Loan Calculator
          </h1>
          <div className="flex flex-col mt-5">
            {qualifyLoanLoading ? (
              <div className="flex justify-center">
                <StarLoader />
              </div>
            ) : isQualifyLoanError? (
              <div className="flex justify-center">
                <h3 className="font-helvetica text-red-500">{qualifyLoanError?.response?.data?.message}</h3>
              </div>
            ) : (
              transformedDurationData?.map((duration, index) => (
                <div
                  key={index + "___possible_salary_advance" + duration?.label}
                  className="rounded p-3 shadow py-2 flex justify-between items-center hover:bg-cyan-50 transition-colors duration-200"
                >
                  <div className="flex flex-col md:flex-col gap-x-1">
                    <h3 className="font-helvetica text-sm capitalize">
                      {duration?.value} Month :{" "}
                    </h3>
                    <div className="grid grid-cols-[auto_1fr] gap-x-2 text-sm">
                      <div className="font-helvetica opacity-50">
                        Maximum principal:
                      </div>
                      <div className="font-helvetica opacity-50">
                        ₦{duration?.max_amount?.toLocaleString("en-US")}
                      </div>

                      <div className="font-helvetica opacity-50">
                        Monthly Repayment:
                      </div>
                      <div className="font-helvetica opacity-50">
                        ₦
                        {calculateRepaymentAmount(
                          duration?.max_amount,
                          duration?.value
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSelectAmount(duration)}
                    className="bg-btnColor px-2 outline-none  text-white rounded hover:bg-btnColor/70"
                  >
                    Select
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="mt-4">
            {
              transformedDurationData?.length ? (
            <button
              onClick={handleContinueClick}
              className="bg-btnColor w-full px-3 py-2 outline-none  text-white rounded hover:bg-btnColor/70 disabled:bg-gray-400"
            >
              Don&apos;t want options above
            </button>
              ): null
            }
          </div>
        </main>
      )}
    </>
  );
};

export default AdvanceForm;

AdvanceForm.propTypes = {
  control: PropTypes.any,
  setValue: PropTypes.func,
  getValues: PropTypes.func,
  watch: PropTypes.func,
  errors: PropTypes.any,
  touchedFields: PropTypes.any,
  trigger: PropTypes.func,
  goToNextTab: PropTypes.func,
  qualifyLoanData: PropTypes.any,
  qualifyLoanError: PropTypes.any,
  qualifyLoanLoading: PropTypes.bool,
  isQualifyLoanError: PropTypes.bool,

};
