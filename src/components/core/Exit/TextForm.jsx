/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";
import useFormStore from "./store";
import Label from "../../forms/FormElements/Label";
import dayjs from "dayjs";
import { DatePicker, Select as AntSelect } from "antd";
import { useEffect } from "react";
import { debounce } from "lodash";
import { useGetReason } from "../../../API/exit";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetAllStaff } from "../../../API/memo";
import { User } from "@nextui-org/react";
import { FaUser } from "react-icons/fa6";
import { filePrefix } from "../../../utils/filePrefix";

export default function TextForm({ onNext, is_hr }) {
  const { data: reason_data, isLoading: loadingReason } = useGetReason();

  const { userData } = useCurrentUser();

  const company_id = userData?.data.COMPANY_ID;

  const { data: getStaffs, isPending: isLoadingStaff } =
    useGetAllStaff(company_id);

  const staffs = getStaffs?.map((item) => {
    return {
      ...item,
      value: item?.STAFF_ID,
      label: (
        <User
          avatarProps={{
            icon: <FaUser size={20} className="" />,
            radius: "full",
            src: item?.FILE_NAME ? filePrefix + item?.FILE_NAME : "",
            className:
              "w-8 h-8 my-2 object-cover rounded-full border-default-200 border",
          }}
          name={`${item?.LAST_NAME || ""} ${item?.FIRST_NAME || ""}`}
          classNames={{
            description: "w-48 truncat",
            name: "w-48 font-helvetica text-xs uppercase",
          }}
          css={{
            ".nextui-user-icon svg": {
              color: "red", // Set the color of the default icon
            },
          }}
          description={
            <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
              {item?.DESIGNATION ? (
                <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                  {item?.DESIGNATION?.toLowerCase()}
                  <span>-</span>
                </p>
              ) : null}
              <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                {item?.STAFF_NUMBER}
              </p>
            </div>
          }
        />
      ),
      searchValue: `${item?.LAST_NAME || ""} ${item?.FIRST_NAME || ""} ${
        item?.STAFF_ID
      }`,
    };
  });

  const { updateData, data } = useFormStore();

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      ...data?.data,
    },
  });

  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, []);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    const { reason, date, staff } = values;
    updateData({
      data: { ...data.data, reason, date, staff },
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

  const onSubmit = (value) => {
    const { reason, date, staff } = value;
    updateData({ data: { ...data.data, reason, date, staff } });
    onNext();
  };

  const reasons = reason_data?.map((item) => {
    return {
      ...item,
      value: item?.EXIT_REASON_ID,
      label: item?.DESCRIPTION,
    };
  });

  const handleChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-md borde flex justify-center flex-col gap-4">
          <div className="">
            <Label>Reason for leaving</Label>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="reason"
                    size="large"
                    placeholder="Select leave reason"
                    showSearch
                    optionFilterProp="label"
                    loading={loadingReason}
                    options={reasons}
                    defaultValue={getValues("reason")}
                    status={
                      touchedFields?.directorate && errors?.directorate
                        ? "error"
                        : ""
                    }
                    {...field}
                    value={
                      reasons?.find((opt) => opt.value === field.value)?.label
                    }
                    onChange={(value) => handleChange(value, "reason")}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.reason && errors?.reason?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          {is_hr ? (
            <div className="">
              <Label>Select Staff</Label>
              <Controller
                name="staff"
                control={control}
                render={({ field }) => (
                  <div>
                    <AntSelect
                      aria-label="staff"
                      size="large"
                      placeholder="Select staff"
                      showSearch
                      optionFilterProp="label"
                      loading={isLoadingStaff}
                      options={staffs}
                      defaultValue={getValues("staff")}
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
                      onChange={(value) => handleChange(value, "staff")}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {touchedFields?.directorate &&
                        errors?.directorate?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          ) : null}
          <div className="">
            <Label>Date</Label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <>
                  <DatePicker
                    defaultValue={
                      getValues("date")
                        ? dayjs(getValues("date"), "YYYY-MM-DD")
                        : ""
                    }
                    size={"large"}
                    className="w-full border-gray-300 rounded-md  focus:outline-none"
                    {...field}
                    value={
                      field.value ? dayjs(field.value, "YYYY-MM-DD") : null
                    } // Ensure `value` is properly formatted
                    onChange={(date, dateString) => {
                      field.onChange(dateString); // Call field's onChange
                      handleChange(dateString, "date"); // Trigger your custom onChange if needed
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
        </div>
        <div className="flex justify-end py-3">
          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
