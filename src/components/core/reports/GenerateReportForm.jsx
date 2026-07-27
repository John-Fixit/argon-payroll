import { useMemo } from "react";
import PropTypes from "prop-types";
import { Spinner } from "@nextui-org/react";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { useGetEmploymentType } from "../../../API/officials";
import { useGenerateReport } from "../../../API/reports";
import { errorToast } from "../../../utils/toastMsgPop";
import useCurrentUser from "../../../hooks/useCurrentUser";

const GenerateReportForm = ({ setReportData, closeDrawer }) => {
  const mutation = useGenerateReport();

  const { userData } = useCurrentUser();

  const company_id = userData?.data.COMPANY_ID;

  const { data: getEmployeeType, isLoading: employeeTypeLoading } =
    useGetEmploymentType();

  const employmentType = useMemo(
    () =>
      getEmployeeType?.data?.data?.map((item) => ({
        ...item,
        value: item?.EMPLOYEE_TYPE_ID,
        label: item?.EMPLOYEE_TYPE_NAME,
      })),
    [getEmployeeType]
  );

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, touchedFields },
  } = useForm({});

  const onSubmit = (data) => {
    const json = {
      company_id,
      employee_type: data?.employee_type,
      category: data?.category,
      report_date: data?.report_date,
      report_type: data?.report_type,
      group_by: data?.group_by,
      order_by: data?.order_by,
    };

    const is_grouped = data?.group_by ? true : false;

    const is_nominal_report = data?.category === "Nominal Roll Report";
    mutation.mutate(json, {
      onSuccess: (data) => {
        const resData = data?.data?.data;
        const isObject = !Array.isArray(resData);
        setReportData({
          data: resData,
          is_grouped: isObject || is_grouped,
          is_nominal_report,
        });
        closeDrawer();
      },
      onError: (error) => {
        errorToast(error?.response?.data?.message);
      },
    });
  };

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
        <div className="bg-white shado p-5 rounded border flex justify-center flex-col gap-4">
          <h2 className="text-[22px] font-helvetica text-[#212529] ">
            Generate Reports
          </h2>
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px]">
              Employee Type
            </h5>
            <Controller
              name="employee_type"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="employee_type"
                    size="large"
                    mode="multiple"
                    placeholder="Select Work Type"
                    optionFilterProp="label"
                    loading={employeeTypeLoading}
                    options={employmentType}
                    status={
                      touchedFields?.employee_type && errors?.employee_type
                        ? "error"
                        : ""
                    }
                    {...field}
                    onChange={(value) => onChange(value, "employee_type")}
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
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Report Category
            </h5>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="category"
                    size="large"
                    placeholder="Select Organisation"
                    optionFilterProp="label"
                    options={[
                      {
                        label: "Comprehensive Report",
                        value: "Comprehensive Report",
                      },
                      {
                        label: "Nominal Roll Report",
                        value: "Nominal Roll Report",
                      },
                      { label: "Region", value: "Region" },
                      { label: "Gender", value: "Gender" },
                      { label: "Directorate", value: "Directorate" },
                      { label: "Department", value: "Department" },
                      { label: "State of Origin", value: "State of Origin" },
                      { label: "Grade", value: "Grade" },
                    ]}
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
          {(watch("category") === "Comprehensive Report" ||
            watch("category") === "Nomimal Roll Report") && (
            <>
              {watch("category") !== "Comprehensive Report" && (
                <div className="">
                  <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                    Group By
                  </h5>
                  <Controller
                    name="group_by"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Select
                          aria-label="group_by"
                          size="large"
                          mode="multiple"
                          placeholder="Group By"
                          optionFilterProp="label"
                          options={[
                            { label: "Directorate", value: "Directorate" },
                            { label: "Department", value: "Department" },
                            { label: "Region", value: "Region" },
                          ]}
                          status={
                            touchedFields?.group_by && errors?.group_by
                              ? "error"
                              : ""
                          }
                          {...field}
                          className="w-full"
                          onChange={(value) => onChange(value, "group_by")}
                        />
                        <span className="text-red-500">
                          {touchedFields?.group_by && errors?.group_by?.message}
                        </span>
                      </div>
                    )}
                    // rules={{ required: "This field is required" }}
                  />
                </div>
              )}
              <div className="">
                <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                  Order By
                </h5>
                <Controller
                  name="order_by"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="order_by"
                        size="large"
                        placeholder="Order By"
                        optionFilterProp="label"
                        options={[
                          { label: "Last Name ASC", value: "Last Name ASC" },
                          { label: "Last Name Desc", value: "Last Name Desc" },
                          { label: "Grade ASC", value: "Grade ASC" },
                          { label: "Grade DESC", value: "Grade DESC" },
                        ]}
                        status={
                          touchedFields?.order_by && errors?.order_by
                            ? "error"
                            : ""
                        }
                        {...field}
                        className="w-full"
                        onChange={(value) => onChange(value, "order_by")}
                      />
                      <span className="text-red-500">
                        {touchedFields?.order_by && errors?.order_by?.message}
                      </span>
                    </div>
                  )}
                  // rules={{ required: "This field is required" }}
                />
              </div>
            </>
          )}
          {watch("category") !== "Comprehensive Report" &&
            watch("category") !== "Nomimal Roll Report" &&
            watch("employee_type") !== "Promotion" && (
              <>
                <div className="">
                  <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                    Report Type
                  </h5>
                  <Controller
                    name="report_type"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Select
                          aria-label="report_type"
                          size="large"
                          showSearch
                          placeholder="Report Type"
                          optionFilterProp="label"
                          options={[
                            { label: "Summary", value: "Summary" },
                            { label: "Full Report", value: "Full Report" },
                          ]}
                          status={
                            touchedFields?.report_type && errors?.report_type
                              ? "error"
                              : ""
                          }
                          {...field}
                          className="w-full"
                          onChange={(value) => onChange(value, "report_type")}
                        />
                        <span className="text-red-500">
                          {touchedFields?.report_type &&
                            errors?.report_type?.message}
                        </span>
                      </div>
                    )}
                    rules={{ required: "This field is required" }}
                  />
                </div>
                {watch("report_type") !== "Summary" && watch("report_type") && (
                  <>
                    <div className="">
                      <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                        Order By
                      </h5>
                      <Controller
                        name="order_by"
                        control={control}
                        render={({ field }) => (
                          <div>
                            <Select
                              aria-label="order_by"
                              size="large"
                              showSearch
                              placeholder="Order By"
                              optionFilterProp="label"
                              options={[
                                {
                                  label: "Last Name ASC",
                                  value: "Last Name ASC",
                                },
                                {
                                  label: "Last Name Desc",
                                  value: "Last Name Desc",
                                },
                                { label: "Grade ASC", value: "Grade ASC" },
                                { label: "Grade DESC", value: "Grade DESC" },
                              ]}
                              status={
                                touchedFields?.order_by && errors?.order_by
                                  ? "error"
                                  : ""
                              }
                              {...field}
                              className="w-full"
                              onChange={(value) => onChange(value, "order_by")}
                            />
                            <span className="text-red-500">
                              {touchedFields?.order_by &&
                                errors?.order_by?.message}
                            </span>
                          </div>
                        )}
                        rules={{ required: "This field is required" }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          {watch("employee_type") !== "Promotion" && (
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Report Date
              </h5>
              <Controller
                name="report_date"
                control={control}
                render={() => (
                  <div>
                    <DatePicker
                      value={
                        getValues("report_date")
                          ? dayjs(getValues("report_date"), "YYYY-MM-DD")
                          : ""
                      }
                      size={"large"}
                      className=" w-full border-gray-300 rounded-md  focus:outline-none"
                      // format="DD/MM/YYYY"
                      onChange={onChangeStartDate}
                      // {...field}
                      status={
                        touchedFields?.report_date && errors.report_date
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.report_date &&
                        errors?.report_date?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Start date is required" }}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end py-3">
          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex items-center gap-x-3"
          >
            {mutation.isPending ? <Spinner color="default" size="sm" /> : null}
            Generate Report
          </button>
        </div>
      </form>
    </>
  );
};
GenerateReportForm.propTypes = {
  setReportData: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
};
export default GenerateReportForm;
