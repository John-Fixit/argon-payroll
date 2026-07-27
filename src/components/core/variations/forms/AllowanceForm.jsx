import { Button, ConfigProvider, InputNumber, Select } from "antd";
import { Controller, useFieldArray } from "react-hook-form";
import PropTypes from "prop-types";
import { Plus, Trash2 } from "lucide-react";
import useVariationStore from "../../../../hooks/useVariationStore";
import { useEffect, useMemo } from "react";
import { useGetAllowances } from "../../../../API/variation";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const AllowanceForm = ({
  getValues,
  control,
  watch,
  handleFinalSubmit,
  isCreatingVariation,
}) => {
  const { updateAllowanceData } = useVariationStore();

  const { userData } = useCurrentUser();

  const parentValue = getValues();

  const { data: getAllowances, isPending: isLoadingAllowance } =
    useGetAllowances({
      company_id: userData?.data?.COMPANY_ID,
      staff_type: parentValue?.staff_type?.toLowerCase(),
    });

  const allowancesOptionList = useMemo(() => {
    return getAllowances?.map((eq) => ({
      ...eq,
      label: eq?.name,
      value: eq?.id,
    }));
  }, [getAllowances]);

  const typeIsStopAllowance = parentValue.type === "Stop Allowance";

  const defaultRow = {
    allowance_id: "",
    select_type: typeIsStopAllowance ? "manual" : "",
    amount: typeIsStopAllowance ? 0 : "",
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "allowance",
  });

  useEffect(() => {
    return () => {
      updateAllowanceData(getValues("allowance"));
    };
  }, [getValues, updateAllowanceData]);

  return (
    <>
      <div className="bg-white p-5 rounded border flex justify-center flex-col gap-4">
        <div>
          <h5 className="uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
            Allowances
          </h5>
          <div className="my-3 space-y-3">
            {fields.map((item, index) => {
              return (
                <div
                  key={index + "___allowances"}
                  className="p-3 border rounded-lg"
                >
                  <div className="flex gap-x-4 gap-y-2 flex-wrap w-full">
                    <div className="">
                      <h5 className="uppercase text-[0.65rem] font-medium leading-[1.5] tracking-[2px]">
                        Name
                      </h5>
                      <Controller
                        name={`allowance.${index}.allowance_id`}
                        control={control}
                        render={({ field }) => (
                          <div>
                            <Select
                              aria-label="allowance_id"
                              size="middle"
                              showSearch
                              optionFilterProp="label"
                              className="min-w-44"
                              options={allowancesOptionList}
                              loading={isLoadingAllowance}
                              value={field.value || undefined}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              ref={field.ref}
                              placeholder="Select allowance"
                            />
                          </div>
                        )}
                        rules={{ required: "This field is required" }}
                      />
                    </div>
                    <div className="">
                      <h5 className="uppercase text-[0.65rem] font-medium leading-[1.5] tracking-[2px] ">
                        Select Type
                      </h5>
                      <Controller
                        name={`allowance.${index}.select_type`}
                        control={control}
                        render={({ field }) => (
                          <div>
                            <Select
                              aria-label="select_type"
                              size="middle"
                              showSearch
                              placeholder="Select type"
                              optionFilterProp="label"
                              options={[
                                {
                                  label: "Manual",
                                  value: "manual",
                                },
                                {
                                  label: "Automatic",
                                  value: "automatic",
                                },
                              ]}
                              className="w-[7.5rem]"
                              {...field}
                              disabled={typeIsStopAllowance}
                            />
                          </div>
                        )}
                        rules={{ required: "This field is required" }}
                      />
                    </div>
                    <div className="">
                      <h5 className="uppercase text-[0.65rem] font-medium leading-[1.5] tracking-[2px] ">
                        Amount
                      </h5>
                      <Controller
                        name={`allowance.${index}.amount`}
                        control={control}
                        render={({ field }) => (
                          <div>
                            <InputNumber
                              aria-label="amount"
                              size="middle"
                              placeholder="Enter custom variation name"
                              {...field}
                              value={
                                watch(`allowance.${index}.select_type`) ===
                                "automatic"
                                  ? null
                                  : field.value
                              }
                              className="w-[7.5rem]"
                              disabled={
                                typeIsStopAllowance ||
                                getValues(`allowance.${index}.select_type`) ===
                                  "automatic"
                              }
                            />
                          </div>
                        )}
                        rules={{ required: "This field is required" }}
                      />
                    </div>
                  </div>
                  {fields.length > 1 && (
                    <div className="flex justify-end mt-1">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="px-2 py-1  bg-red-600 text-white  text-sm hover:bg-red-600 transition-colors rounded-xl flex items-center gap-x-2"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 justify-between">
            <button
              type="button"
              onClick={() => append(defaultRow)}
              className="px-1.5 py-1.5 border border-btnColor/70 text-btnColor/70 rounded-md text-[0.85rem]transition-colors flex items-center gap-x-1"
            >
              <Plus size={16} /> More Item
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end py-3">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00bcc2",
            },
          }}
        >
          <Button
            onClick={handleFinalSubmit}
            type="primary"
            loading={isCreatingVariation}
          >
            Submit
          </Button>
        </ConfigProvider>
      </div>
    </>
  );
};

export default AllowanceForm;

AllowanceForm.propTypes = {
  control: PropTypes.any,
  watch: PropTypes.func,
  setValue: PropTypes.func,
  getValues: PropTypes.func,
  errors: PropTypes.any,
  touchedFields: PropTypes.any,
  trigger: PropTypes.func,
  goToNextTab: PropTypes.func,
  handleClose: PropTypes.func,
  handleFinalSubmit: PropTypes.func,
  isCreatingVariation: PropTypes.func,
};
