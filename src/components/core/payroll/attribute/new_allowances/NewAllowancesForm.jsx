import { Input, Select, Switch, Card } from "antd";
import PropType from "prop-types";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { useGetParentAllowance } from "../../../../../API/allowance";
import useCurrentUser from "../../../../../hooks/useCurrentUser";

const NewAllowancesForm = ({
  control,
  watch,
  getValues,
  touchedFields,
  errors,
}) => {
  const { userData } = useCurrentUser();

  const pay_deduct = watch("pay_deduct");

  const { data: getParentAllowances, isPending: isLoadingParentAllowance } =
    useGetParentAllowance({
      company_id: userData?.data?.COMPANY_ID,
      staff_type: getValues("allowance_type"),
      allowance_type: getValues("pay_deduct"),
    });

  const parentAllowanceOptions = useMemo(
    () =>
      getParentAllowances?.map((item) => ({
        ...item,
        label: item?.name,
        value: item?.id,
      })),
    [getParentAllowances]
  );

  // Organize boolean fields into logical groups

  const statutoryFields = useMemo(
    () => [
      { label: "Is National Housing Fund", key: "is_nhf" },
      { label: "Is Pension", key: "is_pension" },
    ],
    []
  );

  const incomeFields = useMemo(
    () =>
      !pay_deduct
        ? [
            { label: "Is Taxable", key: "is_taxable" },
            { label: "Use as Salary Advance", key: "use_as_salary_advance" },
          ]
        : [],
    [pay_deduct]
  );

  const deductionFields = useMemo(
    () =>
      pay_deduct
        ? [
            { label: "Is Tax", key: "is_tax" },
            { label: "Is Loan", key: "is_loan" },
            { label: "Is Contribution/Union", key: "is_contribution" },
            { label: "Is Cooperative", key: "is_cooperative" },
          ]
        : [],
    [pay_deduct]
  );

  const generalFields = useMemo(() => {
    return [
      { label: "Regular for all Staff", key: "is_regular" },
      { label: "Show On Payroll", key: "show_on_payroll" },
      { label: "Is Arrears", key: "is_arrears" },
      { label: "Use as Thirteenth Month", key: "is_thirteenth_month" },
      { label: "Is Arrearsable", key: "is_arrearsable" },
      ...statutoryFields,
      ...incomeFields,
      ...deductionFields,
    ];
  }, [deductionFields, incomeFields, statutoryFields]);

  const SwitchField = ({ fieldItem }) => (
    <div>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors h-full">
        <div className="flex-1">
          <h6 className="text-sm font-medium text-gray-800">
            {fieldItem?.label}
          </h6>
          <p className="text-xs text-gray-500 font-helvetica opacity-70 font-extralight">
            {getFieldDescription(fieldItem.key)}
          </p>
        </div>
        <Controller
          name={fieldItem.key}
          control={control}
          render={({ field }) => (
            <div
              className="flex flex-col items-end"
              onClick={(e) => e.stopPropagation()}
            >
              <Switch
                checkedChildren="Yes"
                unCheckedChildren="No"
                {...field}
                checked={field.value}
                onChange={(checked) => field.onChange(checked ? 1 : 0)}
                className="mb-1"
              />
              {touchedFields?.[fieldItem?.key] && errors?.[fieldItem?.key] && (
                <span className="text-xs text-red-500">
                  {errors?.[fieldItem?.key]?.message}
                </span>
              )}
            </div>
          )}
          rules={{ required: "This field is required" }}
        />
      </div>
      {watch("is_arrears") && fieldItem?.key === "is_arrears" ? (
        <div className="mt-3">
          <h5 className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] mb-1 font-semibold text-gray-700">
            Pick Arrears Parent
          </h5>
          <Controller
            name="parent_id"
            control={control}
            render={({ field }) => (
              <div>
                <Select
                  aria-label="parent_id"
                  size="large"
                  placeholder="Select referencing arrears"
                  optionFilterProp="label"
                  options={parentAllowanceOptions}
                  loading={isLoadingParentAllowance}
                  {...field}
                  className="w-full"
                />
              </div>
            )}
          />
        </div>
      ) : null}
    </div>
  );
  SwitchField.propTypes = {
    fieldItem: PropType.object.isRequired,
  };

  const getFieldDescription = (key) => {
    const descriptions = {
      is_regular: "Apply this allowance to all staff members",
      show_on_payroll: "Display this item on the payroll",
      is_arrears: "Allow calculation of back payments",
      is_thirteenth_month: "Use for 13th month salary calculations",
      is_nhf: "Designate as National Housing Fund contribution",
      is_pension: "Mark as pension contribution",
      is_taxable: "Subject this income to tax calculations",
      is_arrearsable: "Allow arrears calculation for this income",
      use_as_salary_advance: "Enable as salary advance option",
      is_tax: "Designate as tax deduction",
      is_loan: "Mark as loan deduction",
      is_contribution: "Set as union or contribution deduction",
      is_cooperative: "Designate as cooperative deduction",
    };
    return descriptions[key] || "";
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <h4 className="header_h3 text-2xl font-helvetica">
          New Allowance Form
        </h4>
        {/* Basic Information */}
        <Card className="shadow-sm bg-gray-100 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="">
              <h5 className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[1px] mb-1 font-semibold text-gray-700">
                Payroll Allowance Name
              </h5>
              <Controller
                name="allowance_name"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      aria-label="allowance_name"
                      size="large"
                      placeholder="Enter your allowance name"
                      {...field}
                      status={
                        touchedFields?.allowance_name && errors?.allowance_name
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {touchedFields?.allowance_name &&
                        errors?.allowance_name?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>

            <div className="">
              <h5 className="uppercase text-[0.725rem] tracking-[1px] mb- font-semibold text-gray-700">
                Abbreviation
              </h5>
              <Controller
                name="abbrevation"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      aria-label="abbrevation"
                      size="large"
                      placeholder="Enter your abbreviation"
                      {...field}
                      status={
                        touchedFields?.abbrevation && errors?.abbrevation
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {touchedFields?.abbrevation &&
                        errors?.abbrevation?.message}
                    </span>
                  </>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>

            <div className="">
              <h5 className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] mb-1 font-semibold text-gray-700">
                Staff Type
              </h5>
              <Controller
                name="allowance_type"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="allowance_type"
                      size="large"
                      placeholder="Select Type"
                      optionFilterProp="label"
                      options={[
                        {
                          value: 0,
                          label: "Full time",
                        },
                        { value: 1, label: "Contract" },
                      ]}
                      status={
                        touchedFields?.type && errors?.type ? "error" : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {touchedFields?.type && errors?.type?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>

            <div className="">
              <h5 className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] mb-1 font-semibold text-gray-700">
                Salary/Remuneration Type
              </h5>
              <Controller
                name="pay_deduct"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="pay_deduct"
                      size="large"
                      placeholder="Select pay deduct"
                      optionFilterProp="label"
                      options={[
                        {
                          value: 1,
                          label: "Deduction",
                        },
                        { value: 0, label: "Income" },
                      ]}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {touchedFields?.type && errors?.type?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          </div>
        </Card>

        {/* Configuration Settings */}
        <Card className="shadow-sm bg-gray-100 rounded-xl">
          <div className="mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {generalFields.map((fieldItem, index) => (
                <SwitchField key={`general-${index}`} fieldItem={fieldItem} />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

NewAllowancesForm.propTypes = {
  control: PropType.object,
  setValue: PropType.func,
  getValues: PropType.func,
  watch: PropType.func,
  touchedFields: PropType.object,
  errors: PropType.any,
};

export default NewAllowancesForm;
