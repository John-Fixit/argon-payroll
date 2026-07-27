/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import { Spinner } from "@nextui-org/react";
import { Select as AntSelect, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "antd";
import { useGetProfessionBody, useSetProfessionBody } from "../../API/profile";
import useFormStore from "../formRequest/store";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";
import dayjs from "dayjs";

const { TextArea } = Input;

export default function TextForm({ onNext }) {
  const { updateData, data } = useFormStore();

  const [isLoading, setIsLoading] = useState(false);

  //set function mutation
  const setProfessionBodyMutation = useSetProfessionBody();

  //get details
  const { data: getProfession, isLoading: professionLoading } =
    useGetProfessionBody();

  const professionBody = [
    { label: "OTHER PROFESSION", value: "other" },
    ...(getProfession?.length
      ? getProfession.map((item) => {
          return {
            ...item,
            value: item?.PROFESSIONAL_ID,
            label: item?.PROFESSIONAL_NAME,
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
      professional_name: data?.profession?.name ?? "",
      body_number: data?.profession?.body_number ?? "",
      reason: data?.profession?.reason ?? "",
      start_date: data?.profession?.start_date ?? "",
    },
  });

  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, [trigger]);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    const { professional_name, body_number, reason, start_date } = values;

    const json = {
      name: professional_name,
      body_number: body_number,
      reason: reason,
      start_date: start_date,
    };
    updateData({ profession: { ...json }, dataError: errors });
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
      const { professional_name, body_number, reason, start_date } = data;

      const json = {
        name: professional_name,
        body_number: body_number,
        reason: reason,
        start_date: start_date,
      };

      if (professional_name === "other") {
        await setProfessionBodyMutation
          .mutateAsync({
            professional_name: data.new_professional_name,
          })
          .then((res) => {
            const professionRes = res?.data?.data;
            json["name"] = professionRes;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }

      setIsLoading(false);
      updateData({ profession: { ...json } });
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

  const onChangeDate = (date, dateString) => {
    setValue("start_date", dateString);
    trigger("start_date");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shado p-5 rounded border flex justify-center flex-col gap-4">
        {/* <h2 className='text-[22px] font-normal text-[#212529] '>Education</h2> */}
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Profession Name
          </h5>
          <Controller
            name="professional_name"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="professional_name"
                  size="large"
                  showSearch
                  loading={professionLoading}
                  placeholder="Select profession name"
                  optionFilterProp="label"
                  // onSearch={onSearch}
                  options={professionBody}
                  status={
                    touchedFields?.professional_name &&
                    errors?.professional_name
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "professional_name")}
                  className="w-full"
                />
                {watch("professional_name") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your Profession Name
                    </label>
                    <Input
                      aria-label="new_professional_name"
                      size="large"
                      placeholder="Enter your Profession name"
                      value={getValues("new_professional_name")}
                      {...register("new_professional_name", {
                        required: "Profession name required",
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_professional_name")
                      }
                      className="mt-2"
                      status={
                        touchedFields?.new_professional_name &&
                        errors?.new_professional_name
                          ? "error"
                          : ""
                      }
                    />
                    <span className="text-red-500">
                      {touchedFields?.new_professional_name &&
                        errors?.new_professional_name?.message}
                    </span>
                  </div>
                )}
                <span className="text-red-500">
                  {touchedFields?.professional_name &&
                    errors?.professional_name?.message}
                </span>
              </div>
            )}
            rules={{ required: "Profession name is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Body Number
          </h5>
          <Controller
            name="body_number"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  aria-label="body_number"
                  size="large"
                  placeholder="Enter your Body Number"
                  {...field}
                  onChange={(value) =>
                    onChange(value?.target.value, "body_number")
                  }
                  className="mt-2"
                  status={
                    touchedFields?.body_number && errors?.body_number
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields?.body_number && errors?.body_number?.message}
                </span>
              </div>
            )}
            rules={{ required: "Body number is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Reason
          </h5>
          <Controller
            name="reason"
            control={control}
            render={({ field }) => (
              <div>
                <TextArea
                  aria-label="reason"
                  size="large"
                  placeholder="Enter Reason"
                  status={
                    touchedFields?.reason && errors?.reason ? "error" : ""
                  }
                  className="w-full"
                  {...field}
                  onChange={(value) => onChange(value.target.value, "reason")}
                />
                <span className="text-red-500">
                  {touchedFields?.reason && errors?.reason?.message}
                </span>
              </div>
            )}
            rules={{ required: "Reason is required" }}
          />
        </div>

        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Date Joined
          </h5>
          <Controller
            name="start_date"
            control={control}
            render={({ field }) => (
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

                  // onChange={onChangeDate}

                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null} // Ensure `value` is properly formatted
                  onChange={(date, dateString) => {
                    field.onChange(dateString); // Call field's onChange
                    onChangeDate("_", dateString);
                  }}
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
            rules={{ required: "Start Date is required" }}
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
