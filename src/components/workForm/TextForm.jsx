/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import { Spinner } from "@nextui-org/react";
import { Select as AntSelect, Checkbox, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "antd";
import {
  useGetOrganisation,
  useGetOrganisationDesignation,
  useSetOrganisation,
  useSetOrganisationDesignation,
} from "../../API/profile";
import useFormStore from "../formRequest/store";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function TextForm({ onNext }) {
  const { updateData, data } = useFormStore();

  const [isLoading, setIsLoading] = useState(false);

  //set function mutation
  const setOrganisationMutation = useSetOrganisation();
  const setDesignationMutation = useSetOrganisationDesignation();

  //get details
  const { data: getOrganisation, isLoading: organisationLoading } =
    useGetOrganisation();
  const { data: getOrganisationDesignation, isLoading: designationLoading } =
    useGetOrganisationDesignation();

  const organisations = [
    { label: "OTHER ORGANIZATION", value: "other" },
    ...(getOrganisation?.length
      ? getOrganisation.map((item) => {
          return {
            ...item,
            value: item?.ORGANIZATION_ID,
            label: item?.ORGANIZATION_NAME,
          };
        })
      : []),
  ];

  const organisationDesignation = [
    { label: "OTHER DESIGNATION", value: "other" },
    ...(getOrganisationDesignation?.length
      ? getOrganisationDesignation.map((item) => {
          return {
            ...item,
            value: item?.DESIGNATION_ID,
            label: item?.DESIGNATION_NAME,
          };
        })
      : []),
  ];

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      work_type: data?.work?.work_type ?? "",
      organisation: data?.work?.organisation ?? "",
      designation: data?.work?.designation ?? "",
      description: data?.work?.description ?? "",
      leave_reason: data?.work?.leave_reason ?? "",
      arm_of_service: data?.work?.arm_of_service ?? "",
      service_number: data?.work?.service_number ?? "",
      last_unit: data?.work?.last_unit ?? "",
      armedforce: data?.armedforce ?? "",
      start_date: data?.work?.start_date ?? "",
      end_date: data?.work?.end_date ?? "",
    },
  });

  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, [trigger]);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    const {
      work_type,
      organisation,
      designation,
      description,
      leave_reason,
      arm_of_service,
      service_number,
      last_unit,
      start_date,
      end_date,
      armedforce,
    } = values;

    const json = {
      work_type: work_type,
      organisation: organisation,
      designation: designation,
      description: description,
      leave_reason: leave_reason,
      arm_of_service: armedforce ? arm_of_service : "",
      service_number: armedforce ? service_number : "",
      last_unit: armedforce ? last_unit : "",
      start_date: start_date,
      end_date: end_date,
    };
    updateData({
      work: { ...json },
      armedforce: armedforce,
      dataError: errors,
    });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues, errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues, errors, debouncedUpdateData]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const {
        work_type,
        organisation,
        designation,
        description,
        leave_reason,
        arm_of_service,
        service_number,
        last_unit,
        start_date,
        end_date,
        armedforce,
      } = data;

      const json = {
        work_type: work_type,
        organisation: organisation,
        designation: designation,
        description: description,
        leave_reason: leave_reason,
        arm_of_service: armedforce ? arm_of_service : "",
        service_number: armedforce ? service_number : "",
        last_unit: armedforce ? last_unit : "",
        start_date: start_date,
        end_date: end_date,
      };

      if (organisation === "other") {
        await setOrganisationMutation
          .mutateAsync({
            organisation_name: data.new_organisation,
          })
          .then((res) => {
            const organisationRes = res?.data?.data;
            json["organisation"] = organisationRes;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }
      if (designation === "other") {
        await setDesignationMutation
          .mutateAsync({
            designation_name: data.new_designation,
          })
          .then((res) => {
            const designationRes = res?.data?.data;
            json["designation"] = designationRes;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }

      setIsLoading(false);
      updateData({ work: { ...json }, armedforce: armedforce });
      onNext();
    } catch (err) {
      const errMsg = err?.response?.data?.message ?? err?.message;
      errorToast(errMsg);
      setIsLoading(false);
    }
  };

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const onChangeStartDate = (date, dateString) => {
    setValue("start_date", dateString);
    trigger("start_date");
  };
  const onChangeEndDate = (date, dateString) => {
    setValue("end_date", dateString);
    trigger("end_date");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shado p-5 rounded border flex justify-center flex-col gap-4">
        {/* <h2 className='text-[22px] font-normal text-[#212529] '>Education</h2> */}
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Work Type
          </h5>
          <Controller
            name="work_type"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="work_type"
                  size="large"
                  showSearch
                  placeholder="Select Work Type"
                  optionFilterProp="label"
                  options={[
                    {
                      label: "Regular",
                      value: "Regular",
                    },
                    {
                      label: "Armed Forces",
                      value: "Armed forces",
                    },
                  ]}
                  status={
                    touchedFields?.work_type && errors?.work_type ? "error" : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "work_type")}
                  className="w-full"
                />

                <span className="text-red-500">
                  {touchedFields?.work_type && errors?.work_type?.message}
                </span>
              </div>
            )}
            rules={{ required: "Work type is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Organization
          </h5>
          <Controller
            name="organisation"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="organisation"
                  size="large"
                  showSearch
                  loading={organisationLoading}
                  placeholder="Select Organisation"
                  optionFilterProp="label"
                  options={organisations}
                  status={
                    touchedFields?.organisation && errors?.organisation
                      ? "error"
                      : ""
                  }
                  {...field}
                  className="w-full"
                  onChange={(value) => onChange(value, "organisation")}
                />
                {watch("organisation") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your Organisation
                    </label>
                    <Input
                      aria-label="new_organisation"
                      size="large"
                      placeholder="Enter your organisation"
                      value={getValues("new_organisation")}
                      {...register("new_organisation", {
                        required: "Organisation required",
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_organisation")
                      }
                      className="mt-2"
                      status={
                        touchedFields?.organisation && errors?.new_organisation
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.new_organisation &&
                        errors?.new_organisation?.message}
                    </span>
                  </div>
                )}
                <span className="text-red-500">
                  {touchedFields?.organisation && errors?.organisation?.message}
                </span>
              </div>
            )}
            rules={{ required: "Organisation name is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Designation
          </h5>
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
                  placeholder="Select organisation designation"
                  optionFilterProp="label"
                  // onSearch={onSearch}
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
                {watch("designation") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your organisation designation
                    </label>
                    <Input
                      aria-label="new_designation"
                      size="large"
                      placeholder="Enter your organisation designation"
                      value={getValues("new_designation")}
                      {...register("new_designation", {
                        required: "Organisation designation required",
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_designation")
                      }
                      className="mt-2"
                      status={
                        touchedFields?.new_designation &&
                        errors?.new_designation
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.new_designation &&
                        errors?.new_designation?.message}
                    </span>
                  </div>
                )}
                <span className="text-red-500">
                  {touchedFields?.designation && errors?.designation?.message}
                </span>
              </div>
            )}
            rules={{ required: "Designation is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Job Description
          </h5>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div>
                <TextArea
                  rows={4}
                  aria-label="description"
                  size="large"
                  placeholder="Enter Job Description"
                  status={
                    touchedFields?.description && errors?.description
                      ? "error"
                      : ""
                  }
                  className="w-full"
                  {...field}
                  onChange={(value) =>
                    onChange(value.target.value, "description")
                  }
                />
                <span className="text-red-500">
                  {touchedFields?.description && errors?.description?.message}
                </span>
              </div>
            )}
            rules={{ required: "Job description is required" }}
          />
        </div>

        {watch("work_type") === "Armed forces" && (
          <div className="my-3">
            <Controller
              name="armedforce"
              control={control}
              render={() => (
                <div>
                  <Checkbox
                    checked={getValues("armedforce")}
                    onChange={(value) =>
                      onChange(value.target.checked, "armedforce")
                    }
                  >
                    Armed Forces
                  </Checkbox>
                </div>
              )}
            />
          </div>
        )}

        {watch("armedforce") && (
          <>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Arm of service
              </h5>
              <Controller
                name="arm_of_service"
                control={control}
                render={({ field }) => (
                  <div>
                    <AntSelect
                      aria-label="arm_of_service"
                      size="large"
                      showSearch
                      placeholder="Select Arm of service"
                      optionFilterProp="label"
                      options={[
                        {
                          label: "Army",
                          value: "Army",
                        },
                        {
                          label: "Navy",
                          value: "Navy",
                        },
                        {
                          label: "Airforce",
                          value: "Airforce",
                        },
                      ]}
                      status={
                        touchedFields?.arm_of_service && errors?.arm_of_service
                          ? "error"
                          : ""
                      }
                      {...field}
                      onChange={(value) => onChange(value, "arm_of_service")}
                      className="w-full"
                    />

                    <span className="text-red-500">
                      {touchedFields?.arm_of_service &&
                        errors?.arm_of_service?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Arm of service is required" }}
              />
            </div>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Service Number
              </h5>
              <Controller
                name="service_number"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      aria-label="service_number"
                      size="large"
                      placeholder="Enter Service number"
                      status={
                        touchedFields?.service_number && errors?.service_number
                          ? "error"
                          : ""
                      }
                      className="w-full"
                      {...field}
                      onChange={(value) =>
                        onChange(value.target.value, "service_number")
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.service_number &&
                        errors?.service_number?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Service number is required" }}
              />
            </div>
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Last Unit
              </h5>
              <Controller
                name="last_unit"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      aria-label="last_unit"
                      size="large"
                      placeholder="Enter Last Unit"
                      status={
                        touchedFields?.last_unit && errors?.last_unit
                          ? "error"
                          : ""
                      }
                      className="w-full"
                      {...field}
                      onChange={(value) =>
                        onChange(value.target.value, "last_unit")
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.last_unit && errors?.last_unit?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Last unit is required" }}
              />
            </div>
          </>
        )}

        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Reason for leaving
          </h5>
          <Controller
            name="leave_reason"
            control={control}
            render={({ field }) => (
              <div>
                <TextArea
                  rows={4}
                  aria-label="leave_reason"
                  size="large"
                  placeholder="Enter Reason for leaving"
                  status={
                    touchedFields?.leave_reason && errors?.leave_reason
                      ? "error"
                      : ""
                  }
                  className="w-full"
                  {...field}
                  onChange={(value) =>
                    onChange(value.target.value, "leave_reason")
                  }
                />
                <span className="text-red-500">
                  {touchedFields?.leave_reason && errors?.leave_reason?.message}
                </span>
              </div>
            )}
            rules={{ required: "Reason for leaving is required" }}
          />
        </div>

        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Start Date
          </h5>
          <Controller
            name="start_date"
            control={control}
            render={() => (
              <div>
                <DatePicker
                  defaultValue={
                    getValues("start_date")
                      ? dayjs(getValues("start_date"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className=" w-full border-gray-300 rounded-md  focus:outline-none"
                  // format="DD/MM/YYYY"
                  onChange={onChangeStartDate}
                  // {...field}
                  status={
                    touchedFields?.start_date && errors.start_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields?.start_date && errors?.start_date?.message}
                </span>
              </div>
            )}
            rules={{ required: "Start date is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            End Date
          </h5>
          <Controller
            name="end_date"
            control={control}
            render={() => (
              <div>
                <DatePicker
                  defaultValue={
                    getValues("end_date")
                      ? dayjs(getValues("end_date"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className=" w-full border-gray-300 rounded-md  focus:outline-none"
                  // format="DD/MM/YYYY"
                  onChange={onChangeEndDate}
                  // {...field}
                  status={
                    touchedFields?.end_date && errors?.end_date ? "error" : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields?.end_date && errors?.end_date?.message}
                </span>
              </div>
            )}
            rules={{ required: "End date is required" }}
          />
        </div>
      </div>
      <div className="flex justify-end py-3">
        <button
          type="submit"
          className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
        >
          {isLoading ? <Spinner color="default" size="sm" /> : null}
          Next
        </button>
      </div>
    </form>
  );
}
