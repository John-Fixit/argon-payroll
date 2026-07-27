/* eslint-disable no-unused-vars */

import { Button, Card, Input, Select } from "antd";
import PropType from "prop-types";
import { Controller } from "react-hook-form";
import RateGroup from "./grouping/RateGroup";
import { Spinner } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { useGetCompanyRankGradeLevel } from "../../../../../API/allowance";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
const AllowanceGrouping = ({
  control,
  setValue,
  getValues,
  watch,
  touchedFields,
  errors,
  onSubmit,
  isLoading,
}) => {
  const { userData } = useCurrentUser();

  const {
    data: companyRankGradeLevel,
    isPending: companyRankGradeLevelLoading,
  } = useGetCompanyRankGradeLevel({
    company_id: userData?.data?.COMPANY_ID,
  });

  const flat_rate = watch("payment_type");

  const grouped = getValues("is_grouped");
  const groupedWithStep = grouped && getValues("custom_step");
  const prevFlatRate = useRef(flat_rate);

  useEffect(() => {
    if (flat_rate !== prevFlatRate.current) {
      if (groupedWithStep) {
        setValue("allowances_values", null);
      } else if (grouped) {
        setValue("allowances_values", null);
      }
    }
    prevFlatRate.current = flat_rate;
  }, [flat_rate]);

  const onChange = (value, name) => {
    setValue(name, value);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <h4 className="header_h3 text-2xl font-helvetica">Calculations</h4>
        <Card className="shadow-sm bg-gray-100 rounded-xl">
          <div className="flex flex-col gap-3">
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Payment Type
              </h5>
              <Controller
                name="payment_type"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="payment_type"
                      size="large"
                      placeholder=""
                      optionFilterProp="label"
                      options={[
                        {
                          value: "flat",
                          label: "Flat",
                        },
                        { value: "rate", label: "Rate" },
                      ]}
                      status={
                        touchedFields?.flat_rate && errors?.flat_rate
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.flat_rate && errors?.flat_rate?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Grouped?
                <small className="capitalize">
                  (No if rate or flat value is same for all grade levels)
                </small>
              </h5>
              <Controller
                name="is_grouped"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="is_grouped"
                      size="large"
                      placeholder=""
                      optionFilterProp="label"
                      options={[
                        {
                          value: 0,
                          label: "No",
                        },
                        { value: 1, label: "Yes" },
                      ]}
                      status={
                        touchedFields?.is_grouped && errors?.is_grouped
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full"
                      onChange={(value) => onChange(value, "is_grouped")}
                    />
                    <span className="text-red-500">
                      {touchedFields?.is_grouped && errors?.is_grouped?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
            {!!watch("is_grouped") && (
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Group Type
                </h5>
                <Controller
                  name="group_type"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="group_type"
                        size="large"
                        placeholder=""
                        optionFilterProp="label"
                        value={watch("group_type")}
                        options={[
                          {
                            value: "grade",
                            label: "Grade",
                          },
                          { value: "rank", label: "Rank" },
                        ]}
                        status={
                          touchedFields?.group_type && errors?.group_type
                            ? "error"
                            : ""
                        }
                        {...field}
                        onChange={(value) => {
                          field.onChange(value);
                          if (value === "rank") setValue("custom_step", 0);
                        }}
                        className="w-full"
                      />
                      <span className="text-red-500">
                        {touchedFields?.group_type &&
                          errors?.group_type?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            )}
            {!!watch("is_grouped") && watch("group_type") === "grade" && (
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Has Steps?
                </h5>
                <Controller
                  name="custom_step"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="custom_step"
                        size="large"
                        placeholder=""
                        optionFilterProp="label"
                        value={watch("custom_step")}
                        options={[
                          {
                            value: 0,
                            label: "No",
                          },
                          { value: 1, label: "Yes" },
                        ]}
                        status={
                          touchedFields?.custom_step && errors?.custom_step
                            ? "error"
                            : ""
                        }
                        {...field}
                        className="w-full"
                        onChange={(value) => onChange(value, "custom_step")}
                      />
                      <span className="text-red-500">
                        {touchedFields?.custom_step &&
                          errors?.custom_step?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            )}

            <div className="">
              {watch("payment_type") && (
                <RateGroup
                  watch={watch}
                  setValue={setValue}
                  getValues={getValues}
                  companyRankGradeLevel={companyRankGradeLevel}
                  control={control}
                  companyRankGradeLevelLoading={companyRankGradeLevelLoading}
                />
              )}
            </div>

            <div className="flex justify-end gap-x-5 p-2">
              <Button
                className="bg-btnColor/70 hover:bg-btnColor text-white px-7 py-4"
                loading={isLoading}
                size="large"
                onClick={onSubmit}
              >
                Submit
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

AllowanceGrouping.propTypes = {
  control: PropType.object,
  setValue: PropType.func,
  getValues: PropType.func,
  watch: PropType.func,
  touchedFields: PropType.object,
  errors: PropType.any,
  isLoading: PropType.bool,
  onSubmit: PropType.func,
};

export default AllowanceGrouping;
