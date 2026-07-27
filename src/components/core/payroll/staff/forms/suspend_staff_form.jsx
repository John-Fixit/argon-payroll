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
import { useSuspendStaffPayroll, useUpdateStaffPayroll } from "../../../../../API/payroll_staff";
import { useGetState } from "../../../../../API/profile";
import { has } from "lodash";
import { is } from "date-fns/locale";

const { TextArea } = Input;

const SuspendStaffPayrollForm = ({handleClose}) => {
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

  const { mutateAsync: suspendStaff, isPending: isSuspending } = useSuspendStaffPayroll();

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
          remark: ''
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

    const suspensionType = [
    { label: "Suspension", value: "suspension" },
    { label: "Retirement", value: "retirement" },
    { label: "Study Leave", value: "Study Leave" },
    { label: "Resignation/Withdrawal", value: "Resignation" },
    { label: "Secondment", value: "secondment" },
    { label: "Deceased", value: "deceased" },
  ];

    const expire = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ];

  
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




  const handleFinalSubmit = async (d) => {
    const {
     staff,
     expiry_date,
     has_expiry,
     remark,
     suspension_type

    } = getValues();

    const json = {
    company_id: userData?.data?.COMPANY_ID,
     staff_id: staff,
     comment:remark,
     suspension_type,
     has_expiry,
     expiry_date: has_expiry === "1" ? expiry_date : null,
    };


      try {
        console.log(json);
        
        const res = await suspendStaff(json);
        successToast(res?.data?.message || "successful!");
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


  const onChangeDate = (date, dateString) => {
    setValue("appointment_date", dateString);
    trigger("appointment_date");
  };




  return (
    <form onSubmit={handleSubmit(handleFinalSubmit)}>
      <div className="bg-white shadow-md p-5 rounded border flex justify-center flex-col gap-4">

        <div className="pb-2">
          <span className="font-bold text-xl font-Helvetica ">Suspend Staff Form</span>
        </div>


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
                            // mode="multiple"
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

              <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                Suspension Type
              </h5>
              <Controller
                name="suspension_type"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="suspension_type"
                      size="large"
                      showSearch
                      placeholder="Select staff type"
                      optionFilterProp="label"
                      options={suspensionType}
                      virtual={false}
                      loading={isLoadingPension}
                      status={
                        touchedFields?.suspension_type && errors?.suspension_type
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.suspension_type && errors?.suspension_type?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>

              <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                Does the suspension has an expiry date?
              </h5>
              <Controller
                name="has_expiry"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      aria-label="suspension_type"
                      size="large"
                      showSearch
                      placeholder="Select staff type"
                      optionFilterProp="label"
                      options={expire}
                      virtual={false}
                      loading={isLoadingPension}
                      status={
                        touchedFields?.has_expiry && errors?.has_expiry
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.has_expiry && errors?.has_expiry?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          

                {
                    watch("has_expiry") === "1" && (
                        <div className="">
                            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                                Expiry Date
                            </h5>
                            <Controller
                                name="expiry_date"
                                control={control}
                                render={() => (
                                <div>
                                    <DatePicker
                                    value={
                                        getValues("expiry_date")
                                        ? dayjs(getValues("expiry_date"), "YYYY-MM-DD")
                                        : ""
                                    }
                                    size={"large"}
                                    className=" w-full border-gray-300 rounded-md  focus:outline-none"
                                    onChange={onChangeDate}
                                    status={
                                        touchedFields?.expiry_date && errors.expiry_date
                                        ? "error"
                                        : ""
                                    }
                                    />
                                    <span className="text-red-500">
                                    {touchedFields?.expiry_date &&
                                        errors?.expiry_date?.message}
                                    </span>
                                </div>
                                )}
                                rules={{ required: "Start date is required" }}
                            />
                            </div>
                    )
                    
                }

          
   

             <div className="">
                      <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
                        Remarks
                      </h5>
                      <Controller
                        name="remark"
                        defaultValue=""
                        control={control}
                        render={({ field }) => (
                          <div>
                            <TextArea
                              aria-label="remark"
                              size="large"
                              placeholder="Enter comment here"
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
            // onClick={handleFinalSubmit}
            loading={isSuspending}
            disabled={isSuspending}
          >
            Submit
          </Button>
        </ConfigProvider>
      </div>
      </div>
     
    </form>
  );
};

export default SuspendStaffPayrollForm;

SuspendStaffPayrollForm.propTypes = {
    handleClose: PropTypes.func.isRequired,
};
