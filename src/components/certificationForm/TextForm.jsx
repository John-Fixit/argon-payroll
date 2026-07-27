/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import { Spinner } from "@nextui-org/react";
import { Select as AntSelect, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "antd";
import {
  useGetCertification,
  useGetCertificationAuthority,
  useGetCertificationType,
  useSetCertification,
  useSetCertificationAuthority,
} from "../../API/profile";
import useFormStore from "../formRequest/store";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";
import dayjs from "dayjs";

export default function TextForm({ onNext }) {
  const { updateData, data } = useFormStore();

  const [isLoading, setIsLoading] = useState(false);

  //set function mutation
  const setCertificationMutation = useSetCertification();
  const setAuthorityMutation = useSetCertificationAuthority();

  //get details
  const { data: getCertification, isLoading: certificationLoading } =
    useGetCertification();
  const { data: getAuthority, isLoading: authorityLoading } =
    useGetCertificationAuthority();
  const { data: getCertificationType, isLoading: certificateTypeLoading } =
    useGetCertificationType();


    const certification = [
      {label: "OTHER CERTIFICATE", value: "other"},
      ...(getCertification?.length ? getCertification
        .map((item) => {
          return {
            ...item,
            value: item?.CERTIFICATE_ID,
            label: item?.CERTIFICATE_NAME,
          };
        }) : [])
    ]



  const certificationType = getCertificationType?.length
    ? getCertificationType?.map((item) => {
        return {
          ...item,
          value: item?.TYPE_ID,
          label: item?.TYPE_NAME,
        };
      })
    : [];



    const certificationAuthority = [
      {label: "OTHER AUTHORITY", value: "other"},
      ...(getAuthority?.length ? getAuthority
        .map((item) => {
          return {
            ...item,
            value: item?.ID,
            label: item?.NAME,
          };
        }) : [])
    ]


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
      certification_type: data?.certification?.certification_type ?? "",
      certification_name: data?.certification?.certification_name ?? "",
      certification_authority:
        data?.certification?.certification_authority ?? "",
      acquired_through_company:
        data?.certification?.acquired_through_company ?? "",
      company_acquired_type: data?.certification?.company_acquired_type ?? "",
      license: data?.certification?.license_number ?? "",
      url_number: data?.certification?.url ?? "",
      start_date: data?.certification?.start_date ?? "",
      end_date: data?.certification?.end_date ?? "",
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
      certification_name,
      certification_type,
      acquired_through_company,
      company_acquired_type,
      license,
      url_number,
      certification_authority,
      start_date,
      end_date,
    } = values;

    const json = {
      certification_type: certification_type,
      certification_name: certification_name,
      certification_authority: certification_authority,
      acquired_through_company: acquired_through_company,
      company_acquired_type: company_acquired_type,
      license_number: license,
      url: url_number,
      start_date: start_date,
      end_date: end_date,
    };
    updateData({ certification: { ...json }, dataError: errors });
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
        certification_name,
        certification_type,
        license,
        url_number,
        certification_authority,
        start_date,
        end_date,
      } = data;

      const json = {
        certification_type: certification_type,
        certification_name: certification_name,
        certification_authority: certification_authority,
        license_number: license,
        url: url_number,
        start_date: start_date,
        end_date: end_date,
      };

      // console.log(json)

      if (certification_name === "other") {
        await setCertificationMutation
          .mutateAsync({
            certification_name: data.new_certification_name,
          })
          .then((res) => {
            const certificationRes = res?.data?.data;
            json["certification_name"] = certificationRes;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }

      if (certification_authority === "other") {
        await setAuthorityMutation
          .mutateAsync({
            authority_name: data.new_certification_authority,
          })
          .then((res) => {
            const authorityRes = res?.data?.data;
            json["certification_authority"] = authorityRes;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }

      setIsLoading(false);
      updateData({ certification: { ...json } });
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
            Certification Type
          </h5>
          <Controller
            name="certification_type"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="certification_type"
                  size="large"
                  showSearch
                  placeholder="Select Certification Type"
                  optionFilterProp="label"
                  loading={certificateTypeLoading}
                  options={certificationType}
                  status={
                    touchedFields?.certification_type &&
                    errors?.certification_type
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "certification_type")}
                  className="w-full"
                />

                <span className="text-red-500">
                  {touchedFields?.certification_type &&
                    errors?.certification_type?.message}
                </span>
              </div>
            )}
            rules={{ required: "Certification type is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Certification Name
          </h5>
          <Controller
            name="certification_name"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="certification_name"
                  size="large"
                  showSearch
                  loading={certificationLoading}
                  placeholder="Select Certification Name"
                  optionFilterProp="label"
                  // onSearch={onSearch}
                  options={certification}
                  status={
                    touchedFields?.certification_name &&
                    errors?.certification_name
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "certification_name")}
                  className="w-full"
                />
                {watch("certification_name") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your Certification
                    </label>
                    <Input
                      aria-label="new_certification_name"
                      size="large"
                      placeholder="Enter your certification Name"
                      value={getValues("new_certification_name")}
                      {...register("new_certification_name", {
                        required: "Certification Name required",
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_certification_name")
                      }
                      className="mt-2"
                      status={
                        touchedFields?.new_certification_name &&
                        errors?.new_certification_name
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.new_certification_name &&
                        errors?.new_certification_name?.message}
                    </span>
                  </div>
                )}
                <span className="text-red-500">
                  {touchedFields?.certification_name &&
                    errors?.certification_name?.message}
                </span>
              </div>
            )}
            rules={{ required: "Certification Name is required" }}
          />
        </div>

        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Certification Authority
          </h5>
          <Controller
            name="certification_authority"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="certification_authority"
                  size="large"
                  showSearch
                  loading={authorityLoading}
                  placeholder="Select Authority Name"
                  optionFilterProp="label"
                  {...field}
                  onChange={(value) =>
                    onChange(value, "certification_authority")
                  }
                  // onSearch={onSearch}
                  options={certificationAuthority}
                  className="w-full"
                  status={
                    touchedFields?.certification_authority &&
                    errors?.certification_authority
                      ? "error"
                      : ""
                  }
                />
                {watch("certification_authority") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your Certification Authority
                    </label>
                    <Input
                      aria-label="new_certification_authority"
                      size="large"
                      placeholder="Enter your Certification Authority"
                      value={getValues("new_certification_authority")}
                      {...register("new_certification_authority", {
                        required: "Certification authority required",
                      })}
                      onChange={(value) =>
                        onChange(
                          value?.target.value,
                          "new_certification_authority"
                        )
                      }
                      className="mt-2"
                      status={
                        touchedFields?.new_certification_authority &&
                        errors?.new_certification_authority
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.new_certification_authority &&
                        errors?.new_certification_authority?.message}
                    </span>
                  </div>
                )}
                <span className="text-red-500">
                  {touchedFields?.certification_authority &&
                    errors?.certification_authority?.message}
                </span>
              </div>
            )}
            rules={{ required: "Certification authority is required" }}
          />
        </div>


        {
          //==================== I removed the acwuired through company and company acquired type ====================
          <>
          {/* <div className="">
            <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
              Acquired through company
            </h5>
            <Controller
              name="acquired_through_company"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="acquired_through_company"
                    size="large"
                    showSearch
                    placeholder="Select..."
                    optionFilterProp="label"
                    {...field}
                    onChange={(value) =>
                      onChange(value, "acquired_through_company")
                    }
                    // onSearch={onSearch}
                    options={[
                      { label: "Yes", value: 1 },
                      { label: "No", value: 0 },
                    ]}
                    className="w-full"
                    status={
                      touchedFields?.acquired_through_company &&
                      errors?.acquired_through_company
                        ? "error"
                        : ""
                    }
                  />
  
                  <span className="text-red-500">
                    {touchedFields?.acquired_through_company &&
                      errors?.acquired_through_company?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          {watch("acquired_through_company") ? (
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Company Acquired type
              </h5>
              <Controller
                name="company_acquired_type"
                control={control}
                render={({ field }) => (
                  <div>
                    <AntSelect
                      aria-label="company_acquired_type"
                      size="large"
                      showSearch
                      placeholder="Select Company Acquired type"
                      optionFilterProp="label"
                      {...field}
                      onChange={(value) =>
                        onChange(value, "company_acquired_type")
                      }
                      // onSearch={onSearch}
                      options={[
                        { label: "Local", value: "Local" },
                        { label: "Foreign", value: "Foreign" },
                      ]}
                      className="w-full"
                      status={
                        touchedFields?.company_acquired_type &&
                        errors?.company_acquired_type
                          ? "error"
                          : ""
                      }
                    />
  
                    <span className="text-red-500">
                      {touchedFields?.company_acquired_type &&
                        errors?.company_acquired_type?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          ) : null} */}
        
          </>
        }


        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            License
          </h5>
          <Controller
            name="license"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  aria-label="license"
                  size="large"
                  placeholder="Enter License Number"
                  {...field}
                  onChange={(value) => onChange(value.target.value, "license")}
                  status={
                    touchedFields?.license && errors?.license ? "error" : ""
                  }
                  className="w-full"
                />

                <span className="text-red-500">
                  {touchedFields?.license && errors?.license?.message}
                </span>
              </div>
            )}
            rules={{ required: "License Number is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            URL Number
          </h5>
          <Controller
            name="url_number"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  aria-label="url_number"
                  size="large"
                  placeholder="Enter URL"
                  {...field}
                  onChange={(value) =>
                    onChange(value.target.value, "url_number")
                  }
                  status={
                    touchedFields?.url_number && errors?.url_number
                      ? "error"
                      : ""
                  }
                  className="w-full"
                />

                <span className="text-red-500">
                  {touchedFields?.url_number && errors?.url_number?.message}
                </span>
              </div>
            )}
            rules={{ required: "URL Number is required" }}
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
                  //
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
                  //
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
