import { Button, ConfigProvider, DatePicker, Input, Select } from "antd";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  useGetCompanyDesignation,
  useGetEmploymentType,
} from "../../../../API/officials";
import { useCallback, useEffect, useMemo, useState } from "react";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import {
  useGetStaffByType,
  useMutateGetStaffByType,
} from "../../../../API/variation";
import { User } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import { filePrefix } from "../../../../utils/filePrefix";

const { TextArea } = Input;

const AdvanceForm = ({
  control,
  setValue,
  getValues,
  touchedFields,
  errors,
  trigger,
  watch,
  goToNextTab,
  handleFinalSubmit,
  isCreatingVariation,
}) => {
  const { userData } = useCurrentUser();
  const { data, isPending: isLoadingEmployeeType } = useGetEmploymentType();
  const { data: getCompanyDesignation, isPending: isLoadingOrgDesignation } =
    useGetCompanyDesignation(userData?.data?.COMPANY_ID);

  const [searchText, setSearchText] = useState("");

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

  // const {
  //   data: getStaff,
  //   isPending: isGetStaffLoading,
  //   refetch,
  // } = useGetStaffByType({
  //   company_id: userData?.data?.COMPANY_ID,
  //   staff_type: staff_type?.toLowerCase(),
  //   name: searchText,
  // });

  const {
    data: getStaff,
    isPending: isGetStaffLoading,
    mutateAsync: mutateGetStaff,
  } = useMutateGetStaffByType();

  useEffect(() => {
    if (searchText !== "") {
      // refetch();
      mutateGetStaff({
        company_id: userData?.data?.COMPANY_ID,
        staff_type: staff_type?.toLowerCase(),
        name: searchText,
      });
    }
  }, [mutateGetStaff, searchText, staff_type, userData?.data?.COMPANY_ID]);

  const employeeType = useMemo(
    () =>
      data?.data?.data?.map((item) => ({
        ...item,
        label: item?.EMPLOYEE_TYPE_NAME,
        value: item?.EMPLOYEE_TYPE_NAME,
      })),
    [data?.data?.data]
  );
  const companyDesignation = useMemo(
    () =>
      getCompanyDesignation?.data?.data?.map((item) => ({
        ...item,
        label: item?.DESIGNATION_NAME,
        value: item?.DESIGNATION_ID,
      })),
    [getCompanyDesignation?.data?.data]
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

  const variationIsAnnualOrPromotion =
    getValues("variation_name") === "Annual" ||
    getValues("variation_name") === "Increment" ||
    getValues("variation_name") === "Promotion";

  const isAnnual =
    getValues("variation_name") === "Annual" ||
    getValues("variation_name") === "Increment";

  const handleContinue = () => {
    if (isAnnual) {
      handleFinalSubmit();
    } else {
      goToNextTab();
    }
  };

  console.log(getValues("staff"));

  return (
    <>
      <div className="bg-white shado p-5 rounded border flex justify-center flex-col gap-4">
        {watch("variation_name") !== "Annual" &&
          watch("variation_name") !== "Increment" && (
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
                      label: "Increment",
                      value: "Increment",
                    },
                    getValues("staff_type") !== "Contract" && {
                      label: "Promotion",
                      value: "Promotion",
                    },
                    getValues("staff_type") !== "Contract" && {
                      label: "Advancement",
                      value: "Advancement",
                    },
                    { label: "First Appointment", value: "First Appointment" },
                    { label: "Special promotion", value: "Special promotion" },
                    { label: "Upgrade", value: "Upgrade" },
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
        {(watch("variation_name") === "Promotion" ||
          watch("variation_name") === "Advancement" ||
          watch("variation_name") === "First Appointment" ||
          watch("variation_name") === "Upgrade" ||
          watch("variation_name") === "Special promotion") && (
          <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] font-medium leading-[1.5] tracking-[2px] ">
              Next Designation
            </h5>
            <Controller
              name="new_designation"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="new_designation"
                    size="large"
                    showSearch
                    placeholder="Select Next Designation"
                    optionFilterProp="label"
                    options={companyDesignation}
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
                    {touchedFields?.staff_type && errors?.staff_type?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        )}
        {(watch("variation_name") === "Special promotion" ||
          watch("variation_name") === "Upgrade") && (
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
                    onSearch={(value) => {
                      setSearchText(value);
                    }}
                    filterOption={false}
                    mode="multiple"
                    placeholder="Select staff"
                    optionFilterProp="label"
                    options={staffs}
                    loading={isGetStaffLoading}
                    status={
                      touchedFields?.staff && errors?.staff ? "error" : ""
                    }
                    labelInValue
                    {...field}
                    // filterOption={(input, option) => {
                    //   const searchValue = option?.searchValue?.toLowerCase();
                    //   const staffNumber = option?.STAFF_NUMBER?.toLowerCase();
                    //   return (
                    //     searchValue?.includes(input.toLowerCase()) ||
                    //     staffNumber?.includes(input.toLowerCase())
                    //   );
                    // }}
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
          watch("variation_name") !== "Increment" &&
          watch("variation_name") !== "Promotion" &&
          watch("variation_name") !== "Advancement" && (
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
            onClick={handleContinue}
            type="primary"
            loading={isCreatingVariation}
          >
            {isAnnual ? "Submit" : "Continue"}
          </Button>
        </ConfigProvider>
      </div>
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
  handleFinalSubmit: PropTypes.func,
  isCreatingVariation: PropTypes.bool,
};
