/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
import { useGetOrganisationDesignation } from "../../../../API/profile";
import { useMemo } from "react";
import { DatePicker, Select as AntSelect } from "antd";
import dayjs from "dayjs";
import Label from "../../../forms/FormElements/Label";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import {
  useGetDepartment,
  useGetDirectorate,
  useGetEmploymentType,
  useGetGrades,
  useGetRegions,
  useGetSteps,
  useGetUnits,
} from "../../../../API/officials";

export default function OfficialForm({
  getValues,
  control,
  watch,
  errors,
  touchedFields,
  onChange,
}) {
  const { userData } = useCurrentUser();

  const { data: getOrganisationDesignation, isLoading: designationLoading } =
    useGetOrganisationDesignation();

  const { data: getDirectorate, isLoading: directorateLoading } =
    useGetDirectorate(userData?.data.COMPANY_ID);

  const { data: getDepartments, isLoading: departmentLoading } =
    useGetDepartment(userData?.data?.COMPANY_ID);

  const { data: getUnit, isLoading: unitLoading } = useGetUnits(
    userData?.data.COMPANY_ID
  );

  const { data: getGrade, isLoading: gradeLoading } = useGetGrades(
    userData?.data.COMPANY_ID
  );

  const { data: getSteps, isLoading: stepsLoading } = useGetSteps({
    grade: watch().grade,
  });

  const { data: getEmployeeType, isLoading: employeeTypeLoading } =
    useGetEmploymentType();

  const { data: getRegion, isLoading: regionLoading } = useGetRegions(
    userData?.data?.COMPANY_ID
  );

  const directorateData = getDirectorate?.data?.data;

  const unitData = getUnit?.data?.data;

  const gradeData = getGrade?.data?.data;

  const stepData = getSteps?.data?.data;

  const departmentData = getDepartments?.data?.data;

  const organisationDesignation = getOrganisationDesignation?.length
    ? getOrganisationDesignation?.map((item) => {
        return {
          ...item,
          value: item?.DESIGNATION_ID,
          label: item?.DESIGNATION_NAME,
        };
      })
    : [];

  const departments = departmentData?.length
    ? departmentData?.map((item) => {
        return {
          ...item,
          value: item?.DEPARTMENT_ID,
          label: item?.DEPARTMENT_NAME,
        };
      })
    : [];

  const directorates = directorateData?.length
    ? directorateData?.map((item) => {
        return {
          ...item,
          value: Number(item?.DIRECTORATE_ID),
          label: item?.DIRECTORATE_NAME,
        };
      })
    : [];
  const units = unitData?.length
    ? unitData?.map((item) => {
        return {
          ...item,
          value: Number(item?.UNIT_ID),
          label: item?.UNIT_NAME,
        };
      })
    : [];

  const grades = gradeData?.length
    ? gradeData?.map((item) => {
        return {
          ...item,
          value: item?.GRADE,
          label: item?.GRADE,
        };
      })
    : [];

  const steps = stepData?.length
    ? stepData?.map((item) => {
        return {
          ...item,
          value: item?.STEP,
          label: item?.STEP,
        };
      })
    : [];

  const employmentType = useMemo(
    () =>
      getEmployeeType?.data?.data?.map((item) => ({
        ...item,
        value: item?.EMPLOYEE_TYPE_ID,
        label: item?.EMPLOYEE_TYPE_NAME,
      })),
    [getEmployeeType]
  );

  const regions = useMemo(
    () =>
      getRegion?.data?.data?.map((item) => ({
        ...item,
        value: item?.REGION_ID,
        label: item?.REGION_NAME,
      })),
    [getRegion]
  );

  // console.log(directorates, getValues("directorate"), directorates.find(item=>item.value === String(getValues("directorate"))))

  return (
    <div>
      <div className="bg-white rounded-md borde flex justify-center flex-col gap-4">
        <div className="">
          <Label>Directorate</Label>
          <Controller
            name="directorate"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="directorate"
                  size="large"
                  loading={directorateLoading}
                  placeholder="Select directorate"
                  optionFilterProp="label"
                  options={directorates}
                  status={
                    touchedFields?.directorate && errors?.directorate
                      ? "error"
                      : ""
                  }
                  {...field}
                  value={
                    directorates.find((opt) => opt.value === field.value)?.label
                  }
                  onChange={(value) => onChange(value, "directorate")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.directorate && errors?.directorate?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="">
          <Label>Department</Label>
          <Controller
            name="department"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="department"
                  size="large"
                  showSearch
                  loading={departmentLoading}
                  placeholder="Select department"
                  optionFilterProp="label"
                  options={departments}
                  status={
                    touchedFields?.department && errors?.department
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "department")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.department && errors?.department?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="">
          <Label>Units</Label>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="unit"
                  size="large"
                  showSearch
                  loading={unitLoading}
                  placeholder="Select unit"
                  optionFilterProp="label"
                  options={units}
                  status={touchedFields?.unit && errors?.unit ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "unit")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.unit && errors?.unit?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="">
          <Label>Designation</Label>
          <Controller
            name="designation"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="designation"
                  size="large"
                  showSearch
                  loading={designationLoading}
                  placeholder="Select designation"
                  optionFilterProp="label"
                  options={organisationDesignation}
                  status={
                    touchedFields?.designation && errors?.designation
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "designation")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.designation && errors?.designation?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>

        <div className="">
          <Label>Grade Level</Label>
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="grade"
                  size="large"
                  showSearch
                  loading={gradeLoading}
                  placeholder="Select grade"
                  optionFilterProp="label"
                  // onSearch={onSearch}
                  options={grades}
                  status={touchedFields?.grade && errors?.grade ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "grade")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.grade && errors?.grade?.message}
                </span>
              </div>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>
        {getValues("grade") && (
          <div className="">
            <Label>Step</Label>
            <Controller
              name="step"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="step"
                    size="large"
                    showSearch
                    loading={stepsLoading}
                    placeholder="Select step"
                    optionFilterProp="label"
                    options={steps}
                    status={touchedFields?.step && errors?.step ? "error" : ""}
                    {...field}
                    onChange={(value) => onChange(value, "step")}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.step && errors?.step?.message}
                  </span>
                </div>
              )}
              // rules={{ required: "This field is required" }}
            />
          </div>
        )}

        <div className="">
          <Label>Employee Type</Label>
          <Controller
            name="employment_type"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="employment_type"
                  size="large"
                  showSearch
                  loading={employeeTypeLoading}
                  placeholder="Select employment_type"
                  optionFilterProp="label"
                  options={employmentType}
                  status={
                    touchedFields?.employment_type && errors?.employment_type
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "employment_type")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.employment_type &&
                    errors?.employment_type?.message}
                </span>
              </div>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>

        <div className="">
          <Label>Date of First Appointment</Label>
          <Controller
            name="first_appointment_date"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("first_appointment_date")
                      ? dayjs(getValues("first_appointment_date"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null} // Ensure `value` is properly formatted
                  onChange={(date, dateString) => {
                    field.onChange(dateString); // Call field's onChange
                    onChange(dateString, "first_appointment_date"); // Trigger your custom onChange if needed
                  }}
                  status={
                    touchedFields.first_appointment_date &&
                    errors.first_appointment_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.first_appointment_date &&
                    errors?.first_appointment_date?.message}
                </span>
              </>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>
        <div className="">
          <Label>Date of first arrival</Label>
          <Controller
            name="first_arrival_date"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("first_arrival_date")
                      ? dayjs(getValues("first_arrival_date"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null} // Ensure `value` is properly formatted
                  onChange={(date, dateString) => {
                    field.onChange(dateString); // Call field's onChange
                    onChange(dateString, "first_arrival_date"); // Trigger your custom onChange if needed
                  }}
                  status={
                    touchedFields.first_arrival_date &&
                    errors.first_arrival_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.first_arrival_date &&
                    errors?.first_arrival_date?.message}
                </span>
              </>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>
        <div className="">
          <Label>Current Appointment Date</Label>
          <Controller
            name="current_appointment_date"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("current_appointment_date")
                      ? dayjs(
                          getValues("current_appointment_date"),
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null} // Ensure `value` is properly formatted
                  onChange={(date, dateString) => {
                    field.onChange(dateString); // Call field's onChange
                    onChange(dateString, "current_appointment_date"); // Trigger your custom onChange if needed
                  }}
                  status={
                    touchedFields.current_appointment_date &&
                    errors.current_appointment_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.current_appointment_date &&
                    errors?.current_appointment_date?.message}
                </span>
              </>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>

        <div className="">
          <Label>Office Region</Label>
          <Controller
            name="region_office"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="region_office"
                  size="large"
                  showSearch
                  loading={regionLoading}
                  placeholder="Select region"
                  optionFilterProp="label"
                  options={regions}
                  status={
                    touchedFields?.region_office && errors?.region_office
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "region_office")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.region_office &&
                    errors?.region_office?.message}
                </span>
              </div>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>
      </div>
    </div>
  );
}
