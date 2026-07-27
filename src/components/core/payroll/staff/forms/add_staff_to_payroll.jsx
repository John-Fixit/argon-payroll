/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, DatePicker, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  useGetDepartment,
  useGetDesignation,
  useGetEmploymentType,
  useGetPension,
  useGetRegions,
} from "../../../../../API/officials";
import { useCallback, useEffect, useMemo } from "react";
import useCurrentUser from "../../../../../hooks/useCurrentUser";
import { useGetStaffByType } from "../../../../../API/variation";
import { User } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { filePrefix } from "../../../../../utils/filePrefix";
import { errorToast, successToast } from "../../../../../utils/toastMsgPop";
import { useUpdateStaffPayroll } from "../../../../../API/payroll_staff";
import { useGetState } from "../../../../../API/profile";

const { TextArea } = Input;

const UpdateStaffPayrollForm = ({handleClose}) => {
  const { userData } = useCurrentUser();
  const { data, isPending: isLoadingEmployeeType } = useGetEmploymentType();
  const { data: getOrgDesignation, isPending: isLoadingOrgDesignation } =
    useGetDesignation();
  const { data: getPension, isPending: isLoadingPension } =
    useGetPension();
    const { data: getDepartments, isLoading: departmentLoading } =
      useGetDepartment(userData?.data?.COMPANY_ID);
    const { data: getRegion, isLoading: regionLoading } = useGetRegions(
      userData?.data?.COMPANY_ID
    );
    const { data: getState, isLoading: stateLoading } = useGetState(
     11354
    );

  const { mutateAsync: mutateUpdateStaffPayroll, isPending: isUpdatingStaffPayroll } = useUpdateStaffPayroll();

      const {
        control,
        setValue,
        getValues,
        trigger,
        watch,
        reset,
        handleSubmit,
        formState: { errors, touchedFields },
      } = useForm({
        defaultValues: {
          company_id: userData?.data?.COMPANY_ID,
          staff_id: userData?.data?.STAFF_ID,
        },
      });



  const pensions = useMemo(() =>
      getPension?.data?.data?.map((pension) => ({
        ...pension,
        value: pension?.id,
        label: pension?.name,
      })),
    [getPension?.data?.data]
  );


  console.log(getDepartments);
  
  const departmentData = useMemo(() =>
      getDepartments?.data?.data?.map((item) => {
        return {
          ...item,
          value: item?.DEPARTMENT_ID,
          label: item?.DEPARTMENT_NAME,
        };
      }),
    [getDepartments?.data?.data]
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

    const states = useMemo(
    () =>
    [...(getState?.map((item) => ({
      ...item,
      value: item?.STATE_ID,
      label: item?.STATE_NAME,
    })) || [])],
    [getState]
  );


  const departments = departmentData?.length
    ? departmentData?.map((item) => {
        return {
          ...item,
          value: item?.DEPARTMENT_ID,
          label: item?.DEPARTMENT_NAME,
        };
      })
    : [];

  const handleFinalSubmit = async () => {
    const {
    nhf_no,
    bank,
    account_no,
    designation,
    department,
    pfa,
    pension_no,
    state,
    appointment_date,
    tin_no,
    region
    } = getValues();

    const json = {
    nhf_no,
    bank,
    account_no,
    designation,
    department,
    pfa,
    pension_no,
    state,
    appointment_date,
    tin_no,
    region,
     company_id: userData?.data?.COMPANY_ID,
    };

      try {
        const res = await mutateUpdateStaffPayroll(json);
        successToast(res?.data?.message);
        reset()
        handleClose();
      } catch (error) {
        const errMsg = error?.response?.data?.message || error?.message;
        errorToast(errMsg);
      }
    }
  













  //<<<<<<<<<<<<<<<< Formatting the staff label >>>>>>>>>>>>>>>>>>>>>>>
  const formattedStaffLabel = useCallback(
    (staff) => (
      <User
        avatarProps={{
          icon: <FaUser size={20} className="" />,
          radius: "full",
          src: staff?.FILE_NAME ? filePrefix + staff?.FILE_NAME : "",
          className:
            "w-8 h-8 my-2 object-cover rounded-full border-default-200 border",
        }}
        name={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-helvetica text-xs uppercase">{`${
              staff?.LAST_NAME || ""
            } ${staff?.FIRST_NAME || ""}`}</span>
            {staff?.STAFF_NUMBER && "-"}
            <span className="font-helvetica text-black opacity-30 my-auto capitalize text-xs">
              {`${staff?.STAFF_NUMBER}`}
            </span>
          </div>
        }
        classNames={{
          description: "w-48 truncat",
          name: "",
        }}
        css={{
          ".nextui-user-icon svg": {
            color: "red", // Set the color of the default icon
          },
        }}
        description={
          <div>
            <div className="flex flex-wrap flex-co gap-y-1 justify-cente gap-x-3 m">
              {staff?.DESIGNATION ? (
                <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                  {staff?.DESIGNATION?.toLowerCase()}
                </p>
              ) : null}
              {/* <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                {staff?.STAFF_NUMBER}
              </p> */}
            </div>
            <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
              <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                {staff?.DEPARTMENT?.toLowerCase()}
              </p>
            </div>
            <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
              <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                Grade {staff?.GRADE}
              </p>
              {staff?.GRADE && staff?.STEP && <span>-</span>}
              <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                Step {staff?.STEP}
              </p>
            </div>
          </div>
        }
      />
    ),
    []
  );
  //<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>..

  const staff_type = watch("staff_type");

  const {
    data: getStaff,
    isPending: isGetStaffLoading,
    refetch,
  } = useGetStaffByType({
    company_id: userData?.data?.COMPANY_ID,
    staff_type: staff_type?.toLowerCase(),
  });

  useEffect(() => {
    refetch();
  }, [refetch, staff_type]);

  const employeeType = useMemo(
    () =>
      data?.data?.data?.map((item) => ({
        ...item,
        label: item?.EMPLOYEE_TYPE_NAME,
        value: item?.EMPLOYEE_TYPE_NAME,
      })),
    [data?.data?.data]
  );

  const orgDesignation = useMemo(
    () =>
      getOrgDesignation?.data?.data?.map((item) => ({
        ...item,
        label: item?.DES_NAME,
        value: item?.DES_ID,
      })),
    [getOrgDesignation?.data?.data]
  );

  const staffs = useMemo(
    () =>
      getStaff?.map((item) => ({
        ...item,
        label: formattedStaffLabel(item),
        value: item?.STAFF_ID,
        searchValue: `${item?.LAST_NAME || ""} ${item?.FIRST_NAME || ""} ${
          item?.STAFF_ID
        }`,
      })),
    [getStaff, formattedStaffLabel]
  );


  const onChange = (value, key) => {
    setValue(key, value);
    trigger(key);
  };

  const onChangeStartDate = (date, dateString) => {
    setValue("commencement_date", dateString);
    trigger("commencement_date");
  };





  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)} >
      <div className="bg-white shadow-md p-5 rounded border flex justify-center flex-col gap-4">

        <div className="pb-2">
          <span className="font-bold text-xl font-Helvetica ">Update Staff Payroll</span>
        </div>

           <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Pension Number
            </h5>
            <Controller
              name="pension_no"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="pension_no"
                    size="large"
                    placeholder="Enter pension number"
                    status={
                      touchedFields?.pension_no &&
                      errors?.pension_no
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                    onChange={(e) =>
                      onChange(e.target.value, "pension_no")
                    }
                  />
                  <span className="text-red-500">
                    {touchedFields?.pension_no &&
                      errors?.pension_no?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
           <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              NHF Number
            </h5>
            <Controller
              name="nhf_no"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="nhf_no"
                    size="large"
                    placeholder="Enter nhf number"
                    status={
                      touchedFields?.nhf_no &&
                      errors?.nhf_no
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                    onChange={(e) =>
                      onChange(e.target.value, "nhf_no")
                    }
                  />
                  <span className="text-red-500">
                    {touchedFields?.nhf_no &&
                      errors?.nhf_no?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
            <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              PFA No
            </h5>
            <Controller
              name="pfa_no"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="pfa_no"
                    size="large"
                    showSearch
                    placeholder="Select staff type"
                    optionFilterProp="label"
                    options={pensions}
                    virtual={false}
                    loading={isLoadingPension}
                    status={
                      touchedFields?.pfa_no && errors?.pfa_no
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.pfa_no && errors?.pfa_no?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Department
            </h5>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="department"
                    size="large"
                    showSearch
                    placeholder="Select staff type"
                    optionFilterProp="label"
                    options={departmentData}
                    virtual={false}
                    loading={isLoadingPension}
                    status={
                      touchedFields?.department && errors?.department
                        ? "error"
                        : ""
                    }
                    {...field}
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
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Designation
            </h5>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="designation"
                    size="large"
                    showSearch
                    placeholder="Select Designation"
                    optionFilterProp="label"
                    options={orgDesignation}
                    virtual={false}
                    loading={isLoadingOrgDesignation}
                    status={
                      touchedFields?.designation && errors?.designation
                        ? "error"
                        : ""
                    }
                    {...field}
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
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Region
            </h5>
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="region"
                    size="large"
                    showSearch
                    placeholder="Select Designation"
                    optionFilterProp="label"
                    options={regions}
                    virtual={false}
                    loading={isLoadingOrgDesignation}
                    status={
                      touchedFields?.region && errors?.region
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.region && errors?.region?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              State
            </h5>
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="state"
                    size="large"
                    showSearch
                    placeholder="Select Designation"
                    optionFilterProp="label"
                    options={states}
                    virtual={false}
                    loading={isLoadingOrgDesignation}
                    status={
                      touchedFields?.state && errors?.state
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.state && errors?.state?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
         

           <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Bank
            </h5>
            <Controller
              name="bank"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="bank"
                    size="large"
                    placeholder="Enter pension number"
                    status={
                      touchedFields?.bank &&
                      errors?.bank
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                    onChange={(e) =>
                      onChange(e.target.value, "bank")
                    }
                  />
                  <span className="text-red-500">
                    {touchedFields?.bank &&
                      errors?.bank?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>

           <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Account Number
            </h5>
            <Controller
              name="account_no"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="account_no"
                    size="large"
                    placeholder="Enter pension number"
                    status={
                      touchedFields?.account_no &&
                      errors?.account_no
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                    onChange={(e) =>
                      onChange(e.target.value, "account_no")
                    }
                  />
                  <span className="text-red-500">
                    {touchedFields?.account_no &&
                      errors?.account_no?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>

           <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              TIN Number
            </h5>
            <Controller
              name="tin_no"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="tin_no"
                    size="large"
                    placeholder="Enter pension number"
                    status={
                      touchedFields?.tin_no &&
                      errors?.tin_no
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                    onChange={(e) =>
                      onChange(e.target.value, "tin_no")
                    }
                  />
                  <span className="text-red-500">
                    {touchedFields?.tin_no &&
                      errors?.tin_no?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
















        {watch("variation_name") !== "Annual" && (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Staff Type
            </h5>
            <Controller
              name="staff_type"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="staff_type"
                    size="large"
                    showSearch
                    placeholder="Select staff type"
                    optionFilterProp="label"
                    options={employeeType}
                    virtual={false}
                    loading={isLoadingEmployeeType}
                    status={
                      touchedFields?.staff_type && errors?.staff_type
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.staff_type && errors?.staff_type?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        )}
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
            Variation Name
          </h5>
          <Controller
            name="variation_name"
            control={control}
            render={({ field }) => (
              <div>
                <Select
                  aria-label="variation_name"
                  size="large"
                  showSearch
                  placeholder="Select variation_name"
                  optionFilterProp="label"
                  virtual={false}
                  options={[
                    getValues("staff_type") !== "Contract" && {
                      label: "Annual",
                      value: "Annual",
                    },
                    getValues("staff_type") !== "Contract" && {
                      label: "Promotion",
                      value: "Promotion",
                    },
                    { label: "First Appointment", value: "First Appointment" },
                    { label: "Special promotion", value: "Special promotion" },
                    { label: "Other", value: "Other" },
                  ].filter(Boolean)}
                  status={
                    touchedFields?.variation_name && errors?.variation_name
                      ? "error"
                      : ""
                  }
                  {...field}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.variation_name &&
                    errors?.variation_name?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        {watch("variation_name") === "Promotion" && (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Next Designation
            </h5>
            <Controller
              name="designation"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="new_designation"
                    size="large"
                    showSearch
                    placeholder="Select Next Designation"
                    optionFilterProp="label"
                    options={orgDesignation}
                    virtual={false}
                    loading={isLoadingOrgDesignation}
                    status={
                      touchedFields?.new_designation && errors?.new_designation
                        ? "error"
                        : ""
                    }
                    {...field}
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
        )}
        {watch("variation_name") === "Special promotion" && (
          <>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                Grade
              </h5>
              <Controller
                name="grade"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="grade"
                      size="large"
                      showSearch
                      placeholder="Select grade"
                      optionFilterProp="label"
                      virtual={false}
                      allowClear
                      options={Array.from({ length: 17 }, (_, i) => {
                        return {
                          label: `Grade ${i + 1}`,
                          value: `${i + 1}`,
                        };
                      })}
                      status={
                        touchedFields?.grade && errors?.grade ? "error" : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.grade && errors?.grade?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                Step
              </h5>
              <Controller
                name="step"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="step"
                      size="large"
                      showSearch
                      allowClear
                      placeholder="Select step"
                      optionFilterProp="label"
                      virtual={false}
                      options={Array.from({ length: 15 }, (_, i) => {
                        return {
                          label: `Step ${i + 1}`,
                          value: `${i + 1}`,
                        };
                      })}
                      status={
                        touchedFields?.step && errors?.step ? "error" : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.step && errors?.step?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          </>
        )}
        {watch("variation_name") === "Other" && (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Custom Variation Name
            </h5>
            <Controller
              name="custom_variation_name"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="custom_variation_name"
                    size="large"
                    placeholder="Enter custom variation name"
                    status={
                      touchedFields?.custom_variation_name &&
                      errors?.custom_variation_name
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full"
                    onChange={(e) =>
                      onChange(e.target.value, "custom_variation_name")
                    }
                  />
                  <span className="text-red-500">
                    {touchedFields?.custom_variation_name &&
                      errors?.custom_variation_name?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        )}

        {watch("variation_name") !== "Annual" && (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Staff
            </h5>
            <Controller
              name="staff"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="staff"
                    size="large"
                    showSearch
                    virtual={false}
                    mode="multiple"
                    placeholder="Select staff"
                    optionFilterProp="label"
                    options={staffs}
                    loading={isGetStaffLoading}
                    status={
                      touchedFields?.staff && errors?.staff ? "error" : ""
                    }
                    {...field}
                    filterOption={(input, option) => {
                      const searchValue = option?.searchValue?.toLowerCase();
                      const staffNumber = option?.STAFF_NUMBER?.toLowerCase();
                      return (
                        searchValue?.includes(input.toLowerCase()) ||
                        staffNumber?.includes(input.toLowerCase())
                      );
                    }}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.staff && errors?.staff?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        )}
        {watch("variation_name") !== "Annual" &&
          watch("variation_name") !== "Promotion" && (
            <div className="">
              <h5 className="uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                Type
              </h5>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="type"
                      size="large"
                      showSearch
                      virtual={false}
                      placeholder="Select type"
                      optionFilterProp="label"
                      options={[
                        { label: "Pay Allowance", value: "Pay Allowance" },
                        { label: "Stop Allowance", value: "Stop Allowance" },
                      ]}
                      {...field}
                      className="w-full"
                    />
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          )}
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
            Commencement Date
          </h5>
          <Controller
            name="commencement_date"
            control={control}
            render={() => (
              <div>
                <DatePicker
                  value={
                    getValues("commencement_date")
                      ? dayjs(getValues("commencement_date"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className=" w-full border-gray-300 rounded-md  focus:outline-none"
                  onChange={onChangeStartDate}
                  status={
                    touchedFields?.commencement_date && errors.commencement_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields?.commencement_date &&
                    errors?.commencement_date?.message}
                </span>
              </div>
            )}
            rules={{ required: "Start date is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
            Remarks
          </h5>
          <Controller
            name="remark"
            control={control}
            render={({ field }) => (
              <div>
                <TextArea
                  aria-label="remark"
                  size="large"
                  placeholder="Enter custom variation name"
                  status={
                    touchedFields?.remark && errors?.remark ? "error" : ""
                  }
                  allowClear
                  {...field}
                  className="w-full"
                />
              </div>
            )}
            rules={{ required: "Start date is required" }}
          />
        </div>
         <div className="flex justify-end py-5">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00bcc2",
            },
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdatingStaffPayroll}
            disabled={isUpdatingStaffPayroll}
          >
            Submit
          </Button>
        </ConfigProvider>
      </div>
      </div>
     
    </form>
  );
};

export default UpdateStaffPayrollForm;

UpdateStaffPayrollForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
