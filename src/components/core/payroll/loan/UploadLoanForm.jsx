import { Select, Button, InputNumber, ConfigProvider } from "antd";
import PropType from "prop-types";
import { Controller, useFieldArray } from "react-hook-form";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { Download, Plus, Trash2 } from "lucide-react";
import { exportExcel } from "../../../../utils/exportReportAsExcel";
import { useGetLoansAllowance } from "../../../../API/payroll";
import { useGetAllPayrollStaff } from "../../../../API/payroll_staff";

const UploadLoanForm = ({
  control,
  watch,
  touchedFields,
  errors,
  register,
  handleSubmit,
}) => {
  const { userData } = useCurrentUser();

  const { data: getPayrollLoans, isPending: isLoadingPayrollLoans } =
    useGetLoansAllowance({
      company_id: userData?.data?.COMPANY_ID,
      allowance_type: watch("staff_type") || 0,
    });

  const payrollLoans = getPayrollLoans?.map((item) => ({
    ...item,
    label: item?.name,
    value: item?.id,
  }));

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="shadow-sm">
          <div className="w-full bg-btnColor shadow border border-btnColor px-4 py-3 rounded-t-lg">
            <h3 className="text-lg font-semibold uppercase text-white"></h3>
          </div>

          <div className="px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="">
              <h5 className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[1px] mb-1 font-semibold text-gray-700">
                Staff Type
              </h5>
              <Controller
                name="staff_type"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      virtual={false}
                      showSearch
                      aria-label="staff_type"
                      size="large"
                      placeholder="Select Allowance"
                      optionFilterProp="label"
                      options={[
                        { value: 0, label: "Fulltime" },
                        {
                          value: 1,
                          label: "Contract",
                        },
                      ]}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {touchedFields?.staff_type && errors?.staff_type?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[1px] mb-1 font-semibold text-gray-700">
                Allowance
              </h5>
              <Controller
                name="allowance_id"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="allowance_id"
                      size="large"
                      virtual={false}
                      showSearch
                      placeholder="Select Allowance"
                      optionFilterProp="label"
                      options={payrollLoans}
                      loading={isLoadingPayrollLoans}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500 text-xs mt-1">
                      {touchedFields?.allowance_id &&
                        errors?.allowance_id?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="col-span-2 space-y-6 mt-3">
              <ExportStaffLoanSampleButton />

              <StaffLoanFields
                control={control}
                watch={watch}
                register={register}
                touchedFields={touchedFields}
                errors={errors}
              />
            </div>
          </div>
          <div className="flex justify-end py-3">
            <Button
              className="bg-btnColor hover:bg-btnColor text-white px-7 py-4"
              //   loading={uploadLoading || isPending}
              size="large"
              htmlType="submit"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const StaffLoanFields = ({ control, watch, touchedFields, errors }) => {
  const defaultRow = {
    staff_id: "",
    principal: "",
    duration: "",
  };

  const { userData } = useCurrentUser();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "staff_loans",
  });

  const { data: getStaff, isPending: isLoadingStaff } = useGetAllPayrollStaff({
    company_id: userData?.data?.COMPANY_ID,
    staff_type: watch("staff_type") || 0,
  });

  const staffList = getStaff?.map((staff) => ({
    ...staff,
    label: staff?.fullname,
    value: staff?.staff_id,
  }));

  return (
    <div className="border bg-[#f8fafb] rounded-xl">
      <div className="w-full bg-[#2a3549] px-4 py-3 rounded-t-xl">
        <h3 className="text-lg font-semibold uppercase text-white">
          Staff Loans
        </h3>
      </div>
      <div className="px-4 py-6">
        <div className="space-y-3">
          {fields.map((field, index) => {
            return (
              <div key={field.id} className="border p-4 rounded-xl bg-white">
                <div className="flex justify-between">
                  <h4 className="font-semibold tracking-wider">
                    Staff Member #{index + 1}
                  </h4>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="px-2 bg-red-600 text-white  text-[0.85rem] hover:bg-red-600 transition-colors rounded-xl"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
                {/* Overall header for each row */}

                {/* Fields container – flex wraps on smaller screens */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="flex flex-col flex-1">
                    <label className="px-1 py-0.5 text-xs font-medium uppercase">
                      Staff
                    </label>
                    <Controller
                      name={`staff_loans.${index}.staff_id`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <Select
                            allowClear
                            showSearch
                            virtual={false}
                            placeholder="Select Staff"
                            optionFilterProp="label"
                            options={staffList}
                            loading={isLoadingStaff}
                            {...field}
                            className="w-full !h-8 !p-0 !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                          />
                        </>
                      )}
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <label className="px-1 py-0.5 text-xs font-medium uppercase">
                      Principal
                    </label>
                    <Controller
                      name={`staff_loans.${index}.principal`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <InputNumber
                            aria-label="duration"
                            min={1}
                            placeholder="Enter Principal"
                            className="w-full"
                            {...field}
                            status={
                              touchedFields?.staff_loans?.[index]?.principal &&
                              errors?.staff_loans?.[index]?.principal
                                ? "error"
                                : ""
                            }
                          />
                        </>
                      )}
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <label className="px-1 py-0.5 text-xs font-medium uppercase">
                      Duration
                    </label>
                    <Controller
                      name={`staff_loans.${index}.duration`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <InputNumber
                            aria-label="duration"
                            placeholder="Enter duration"
                            className="w-full"
                            min={1}
                            {...field}
                            status={
                              touchedFields?.staff_loans?.[index]?.duration &&
                              errors?.staff_loans?.[index]?.duration
                                ? "error"
                                : ""
                            }
                          />
                        </>
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls to add new items and submit */}
        <div className="flex items-center gap-4 justify-center mt-3">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#2a3549",
              },
            }}
          >
            <Button
              type="primary"
              onClick={() => append(defaultRow)}
              className=""
            >
              <Plus size={16} /> More Staff
            </Button>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

const ExportStaffLoanSampleButton = () => {
  const handleExportAsExcel = () => {
    const excelData = [
      {
        "Staff Number": "P211",
        Principal: "1000000",
        Duration: "6",
      },
    ];
    exportExcel({ excelData, fileName: "Staff Loans Sample" });
  };

  return (
    <div className="flex justify-end items-end mb-2">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "red",
          },
        }}
      >
        <button
          onClick={() => handleExportAsExcel()}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Download className="w-4 h-4" />
          Export Loan Sample
        </button>
      </ConfigProvider>
    </div>
  );
};

UploadLoanForm.propTypes = {
  control: PropType.object,
  setValue: PropType.func,
  getValues: PropType.func,
  watch: PropType.func,
  register: PropType.any.isRequired,
  touchedFields: PropType.object,
  errors: PropType.any,
  handleSubmit: PropType.func,
};
StaffLoanFields.propTypes = {
  control: PropType.object,
  setValue: PropType.func,
  getValues: PropType.func,
  watch: PropType.func,
  register: PropType.any.isRequired,
  touchedFields: PropType.object,
  errors: PropType.any,
};

export default UploadLoanForm;
