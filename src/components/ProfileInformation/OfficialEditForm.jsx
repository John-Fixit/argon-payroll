/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'

import { DatePicker, Input, Select } from "antd";
import Label from "../forms/FormElements/Label";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  useGetDepartment,
  useGetDesignation,
  useGetDirectorate,
  useGetEmploymentType,
  useGetGrades,
  useGetPension,
  useGetRegions,
  useGetSteps,
  useGetUnits,
  useUpdateOfficial,
} from "../../API/officials";
import { useEffect, useMemo, useState } from "react";
import { useSaveToEditInformation } from "../Leave/Hooks";
import { Controller } from "react-hook-form";
import { Spinner } from "@nextui-org/react";
import { useViewStaffProfile } from "../../API/profile";
import dayjs from "dayjs";

const OfficialEditForm = ({
  setValue,
  handleSubmit,
  control,
  watch,
  getValues,
  errors,
  register,
  trigger,
  setIsOpen,
  reset,
  staff_id,
  goToNextTab,
}) => {
  const { userData } = useCurrentUser();
  // const [units, setUnits] = useState([]);

  const { data, isLoading } = useViewStaffProfile(staff_id);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const grade = watch("grade");

  const { data: result_1, isLoading: directorateLoading } = useGetDirectorate(
    userData?.data?.COMPANY_ID,
  );
  const { data: result_2, isLoading: unitLoading } = useGetUnits(
    userData?.data?.COMPANY_ID,
  );
  const { data: result_3, isLoading: departmentLoading } = useGetDepartment(
    userData?.data?.COMPANY_ID,
  );
  const { data: result_4, isLoading: regionLoading } = useGetRegions(
    userData?.data?.COMPANY_ID,
  );
  const { data: result_5, isLoading: gradeLoading } = useGetGrades();
  const { data: result_6, isLoading: designationLoading } = useGetDesignation();
  const { data: result_7, isLoading: pensionLoading } = useGetPension();
  const { data: result_8, isLoading: employmentTypeLoading } =
    useGetEmploymentType();
  const { data: result_9, isLoading: stepLoading } = useGetSteps({
    grade: grade,
  });

  // console.log(toEditInformation)

  const pensions = useMemo(
    () =>
      result_7?.data?.data?.map((pension) => ({
        ...pension,
        value: pension?.id,
        label: pension?.name,
      })),
    [result_7],
  );

  const employmentType = useMemo(
    () =>
      result_8?.data?.data?.map((item) => ({
        ...item,
        value: item?.EMPLOYEE_TYPE_ID,
        label: item?.EMPLOYEE_TYPE_NAME,
      })),
    [result_8],
  );

  const grades = useMemo(
    () =>
      result_5?.data?.data?.map((item) => ({
        ...item,
        value: item?.GRADE,
        label: item?.GRADE,
      })),
    [result_5],
  );

  const steps = useMemo(
    () =>
      result_9?.data?.data?.map((item) => ({
        ...item,
        value: item?.STEP,
        label: item?.STEP,
      })),
    [result_9],
  );

  const designations = useMemo(
    () =>
      result_6?.data?.data?.map((item) => ({
        ...item,
        value: item?.DESIGNATION_ID,
        label: item?.DESIGNATION_NAME,
      })),
    [result_6],
  );

  const regions = useMemo(
    () =>
      result_4?.data?.data?.map((item) => ({
        ...item,
        value: item?.REGION_ID,
        label: item?.REGION_NAME,
      })),
    [result_4],
  );

  const departments = useMemo(
    () =>
      result_3?.data?.data?.map((item) => ({
        ...item,
        value: item?.DEPARTMENT_ID,
        label: item?.DEPARTMENT_NAME,
      })),
    [result_3],
  );

  const units = useMemo(
    () =>
      result_2?.data?.data?.map((item) => ({
        ...item,
        value: item?.UNIT_ID,
        label: item?.UNIT_NAME,
      })),
    [result_2],
  );

  const directorates = useMemo(
    () =>
      result_1?.data?.data?.map((item) => ({
        ...item,
        value: item?.DIRECTORATE_ID,
        label: item?.DIRECTORATE_NAME,
      })),
    [result_1],
  );

  useEffect(() => {
    if (
      data &&
      !directorateLoading &&
      !unitLoading &&
      !departmentLoading &&
      !regionLoading &&
      !gradeLoading &&
      !designationLoading &&
      !pensionLoading &&
      !employmentTypeLoading &&
      !stepLoading &&
      isInitialLoad
    ) {
      // Reset the form with the updated data when it arrives
      reset({
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        preview_staff_id: staff_id,
        directorate: directorates?.find(
          (item) => item?.DIRECTORATE_NAME === data?.BIODATA?.DIRECTORATE,
        )?.DIRECTORATE_ID,
        department: departments?.find(
          (item) => item?.DEPARTMENT_NAME === data?.BIODATA?.DEPARTMENT,
        )?.DEPARTMENT_ID,
        unit: units?.find((item) => item?.UNIT_NAME === data?.BIODATA?.UNIT)
          ?.UNIT_ID,
        current_appointment_date: data?.BIODATA.CURRENT_APPOINTMENT_DATE,
        employment_type: employmentType?.find(
          (item) => item?.EMPLOYEE_TYPE_NAME === data?.BIODATA?.EMPLOYEE_TYPE,
        )?.EMPLOYEE_TYPE_ID, //data?.BIODATA.EMPLOYEE_TYPE,
        region: regions?.find(
          (item) => item?.REGION_NAME === data?.BIODATA?.REGION_OFFICE,
        )?.REGION_ID, // data?.BIODATA.REGION_OFFICE,
        pension_company: pensions?.find(
          (item) => item?.name === data?.BIODATA?.PENSION_NAME,
        )?.id, // data?.BIODATA.PENSION_NAME,
        designation: designations?.find(
          (item) =>
            item?.DESIGNATION_NAME == data?.BIODATA?.DESIGNATION?.trim(),
        )?.DESIGNATION_ID, // data?.BIODATA.DESIGNATION,
        grade: data?.BIODATA.GRADE,
        step: data?.BIODATA.STEP,
        date_of_birth: data?.BIODATA?.DATE_OF_BIRTH,
      });
      setIsInitialLoad(false);
    }
  }, [
    data,
    reset,
    staff_id,
    directorates,
    departments,
    units,
    employmentType,
    regions,
    pensions,
    designations,
    grades,
    steps,
    directorateLoading,
    unitLoading,
    departmentLoading,
    regionLoading,
    gradeLoading,
    designationLoading,
    pensionLoading,
    employmentTypeLoading,
    stepLoading,
    isInitialLoad,
    userData?.data?.COMPANY_ID,
    userData?.data?.STAFF_ID,
  ]);

  const onSubmit = (data) => {
    goToNextTab();
  };

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col border shadow-xl bg-white rounded-md p-8`}
      >
        <div className="flex flex-col gap-4">
          {data?.SETTINGS?.HAS_DIRECTORATE ? (
            <div>
              <Label>Directorate</Label>
              <Controller
                name="directorate"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="directorate"
                      size="large"
                      defaultValue={getValues("directorate")}
                      showSearch
                      placeholder="Select Directorate"
                      optionFilterProp="label"
                      onChange={(value) => onChange(value, "directorate")}
                      options={directorates}
                      status={errors?.directorate ? "error" : ""}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {errors?.directorate?.message ||
                        errors?.new_directorate?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Directorate is required" }}
              />
            </div>
          ) : null}
          {data?.SETTINGS?.HAS_DEPARTMENT ? (
            <div>
              <Label>Department</Label>
              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="department"
                      size="large"
                      defaultValue={getValues("department")}
                      showSearch
                      placeholder="Select Department"
                      optionFilterProp="label"
                      onChange={(value) => onChange(value, "department")}
                      options={departments}
                      status={errors?.department ? "error" : ""}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {errors?.department?.message ||
                        errors?.new_department?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Department is required" }}
              />
            </div>
          ) : null}
          {data?.SETTINGS?.HAS_UNIT ? (
            <div>
              <Label>Unit</Label>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="unit"
                      size="large"
                      defaultValue={getValues("unit")}
                      showSearch
                      placeholder="Select Unit"
                      optionFilterProp="label"
                      onChange={(value) => onChange(value, "unit")}
                      // onSearch={onSearch}
                      options={units}
                      status={errors?.unit ? "error" : ""}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {errors?.unit?.message || errors?.new_unit?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Unit is required" }}
              />
            </div>
          ) : null}
          {data?.SETTINGS?.HAS_DESIGNATION ? (
            <div>
              <Label>Designation</Label>
              <Controller
                name="designation"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="designation"
                      size="large"
                      defaultValue={getValues("designation")}
                      showSearch
                      placeholder="Select Designation"
                      optionFilterProp="label"
                      onChange={(value) => onChange(value, "designation")}
                      // onSearch={onSearch}

                      options={designations}
                      loading={designationLoading}
                      status={errors?.designation ? "error" : ""}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {errors?.designation?.message ||
                        errors?.new_designation?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "designation is required" }}
              />
            </div>
          ) : null}

          <div>
            <Label>Pension Company</Label>
            <Controller
              name="pension_company"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="pension_company"
                    size="large"
                    defaultValue={getValues("pension_company")}
                    showSearch
                    placeholder="Select pension company"
                    optionFilterProp="label"
                    onChange={(value) => onChange(value, "pension_company")}
                    // onSearch={onSearch}

                    options={pensions}
                    loading={pensionLoading}
                    status={errors?.pension_company ? "error" : ""}
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {errors?.pension_company?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Pension company is required" }}
            />
          </div>
          {data?.SETTINGS?.HAS_GRADING ? (
            <div>
              <Label>Grade</Label>
              <Controller
                name="grade"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="grade"
                      size="large"
                      defaultValue={getValues("grade")}
                      showSearch
                      placeholder="Select grade"
                      optionFilterProp="label"
                      onChange={(value) => onChange(value, "grade")}
                      // onSearch={onSearch}

                      options={grades}
                      loading={gradeLoading}
                      status={errors?.grade ? "error" : ""}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {errors?.grade?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "grade is required" }}
              />
            </div>
          ) : null}
          {data?.SETTINGS?.HAS_STEPS ? (
            watch("grade") ? (
              <div>
                <Label>Step</Label>
                <Controller
                  name="step"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Select
                        aria-label="step"
                        size="large"
                        defaultValue={getValues("step")}
                        showSearch
                        placeholder="Select step"
                        optionFilterProp="label"
                        onChange={(value) => onChange(value, "step")}
                        // onSearch={onSearch}

                        options={steps}
                        loading={stepLoading}
                        status={errors?.step ? "error" : ""}
                        {...field}
                        className="w-full"
                      />
                      <span className="text-red-500">
                        {errors?.step?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "step is required" }}
                />
              </div>
            ) : (
              ""
            )
          ) : null}

          <div>
            <Label>Employment Type</Label>
            <Controller
              name="employment_type"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="employment_type"
                    size="large"
                    defaultValue={getValues("employment_type")}
                    showSearch
                    placeholder="Select employment type"
                    optionFilterProp="label"
                    onChange={(value) => onChange(value, "employment_type")}
                    // onSearch={onSearch}
                    options={employmentType}
                    loading={employmentTypeLoading}
                    status={errors?.employment_type ? "error" : ""}
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {errors?.employment_type?.message ||
                      errors?.new_employment_type?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Employment type is required" }}
            />
          </div>
          <div>
            <Label>Region</Label>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="region"
                    size="large"
                    defaultValue={getValues("region")}
                    showSearch
                    placeholder="Select region"
                    optionFilterProp="label"
                    onChange={(value) => onChange(value, "region")}
                    // onSearch={onSearch}
                    options={regions}
                    status={errors?.region ? "error" : ""}
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {errors?.region?.message || errors?.new_region?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Region is required" }}
            />
          </div>
          <div>
            <Label>Pension Number</Label>
            <Controller
              name="pension_no"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="pension_no"
                    size="large"
                    placeholder="Enter Pension Numner"
                    status={errors?.pension_no ? "error" : ""}
                    {...field}
                    onChange={(value) => {
                      field.onChange(value.target.value);
                      trigger("pension_no");
                    }}
                    className="w-full rounded-md"
                  />

                  <span className="text-red-500">
                    {errors?.pension_no?.message ||
                      errors?.new_pension_no?.message}
                  </span>
                </div>
              )}
              rules={{ required: "Pension number is required is required" }}
            />
          </div>

          <div>
            <Label>Current Appointment Date</Label>
            <Controller
              name="current_appointment_date"
              control={control}
              render={({ field }) => (
                <div>
                  <DatePicker
                    defaultValue={
                      data?.BIODATA?.CURRENT_APPOINTMENT_DATE
                        ? dayjs(
                            data?.BIODATA?.CURRENT_APPOINTMENT_DATE,
                            "YYYY-MM-DD",
                          )
                        : ""
                    }
                    className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                    onChange={(date, dateString) =>
                      onChange(dateString, "current_appointment_date")
                    }
                  />
                  <span className="text-red-500">
                    {errors?.current_appointment_date?.message}
                  </span>
                </div>
              )}
              rules={{
                required: "Current appoitment date is required is required",
              }}
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Controller
              name="date_of_birth"
              control={control}
              render={({ field }) => (
                <div>
                  <DatePicker
                    defaultValue={dayjs(getValues("date_of_birth"))}
                    value={dayjs(getValues("date_of_birth"))}
                    className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                    onChange={(date, dateString) =>
                      onChange(dateString, "date_of_birth")
                    }
                  />
                  <span className="text-red-500">
                    {errors?.date_of_birth?.message}
                  </span>
                </div>
              )}
              rules={{
                required: false,
              }}
            />
          </div>
        </div>
        <div className=" flex justify-end gap-x-5 p-2 mt-4">
          <button
            type="submit"
            className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[25px] uppercase active:bg-btnColor/50 `}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfficialEditForm;
