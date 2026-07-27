/* eslint-disable react/prop-types */
import { Controller, useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  useGetCountry,
  useGetGender,
  useGetLga,
  useGetMaritalStatus,
  useGetProfile,
  useGetState,
  useGetTitle,
  useViewStaffProfile,
} from "../../API/profile";
import useFormStore from "./store";
import { useEffect } from "react";
import { Input, Select as AntSelect } from "antd";
import Label from "../forms/FormElements/Label";
import { debounce } from "lodash";

export default function TextForm({ onNext, staff_id }) {
  const { userData } = useCurrentUser();

  const hook = staff_id ? useViewStaffProfile : useGetProfile;

  const { data: profile } = hook(
    staff_id ?? {
      user: userData?.data,
      path: "/profile/get_profile",
    },
  );

  const { updateData, data } = useFormStore();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      first_name:
        data?.bioData?.first_name ?? profile?.BIODATA?.FIRST_NAME ?? "",
      last_name: data?.bioData?.last_name ?? profile?.BIODATA?.LAST_NAME ?? "",
      title: data?.bioData?.title ?? profile?.BIODATA?.TITLE ?? "",
      other_names:
        data?.bioData?.other_names ?? profile?.BIODATA?.OTHER_NAMES ?? "",
      maiden_name:
        data?.bioData?.maiden_name ?? profile?.BIODATA?.MAIDEN_NAME ?? "",
      date_of_birth:
        data?.bioData?.date_of_birth ?? profile?.BIODATA?.DATE_OF_BIRTH ?? "",
      marital_status:
        data?.bioData?.marital_status ?? profile?.BIODATA?.MARITAL_STATUS ?? "",
      state_of_origin:
        data?.bioData?.state_of_origin ??
        profile?.BIODATA?.STATE_OF_ORIGIN ??
        "",
      lga: data?.bioData?.lga ?? profile?.BIODATA?.LGA ?? "",
      nationality:
        data?.bioData?.nationality ?? profile?.BIODATA?.NATIONALITY ?? "",
      gender: data?.bioData?.gender ?? profile?.BIODATA?.GENDER,
    },
  });

  const { data: getCountry, isLoading: isCountryLoading } = useGetCountry();
  const { data: getStates, isLoading: isStateLoading } = useGetState(
    watch().nationality || 11354,
  );
  const { data: getTitle, isLoading: isTitleLoading } = useGetTitle();
  const { data: getGender, isLoading: isGenderLoading } = useGetGender();
  const { data: getMaritalStatus, isLoading: isMaritalStatusLoading } =
    useGetMaritalStatus();
  const { data: getLga, isLoading: isLgaLoading } = useGetLga(
    watch().state_of_origin,
  );

  const countries = [
    ...(getCountry?.map((item) => ({
      ...item,
      value: item?.COUNTRY_ID,
      label: item?.COUNTRY_NAME,
    })) || []),
  ];
  const states = [
    ...(getStates?.map((item) => ({
      ...item,
      value: item?.STATE_ID,
      label: item?.STATE_NAME,
    })) || []),
  ];
  const lgas = [
    ...(getLga?.map((item) => ({
      ...item,
      value: item?.LGA_ID,
      label: item?.LGA_NAME,
    })) || []),
  ];
  const titles = [
    ...(getTitle?.map((item) => ({
      ...item,
      value: item?.ID,
      label: item?.NAME,
    })) || []),
  ];
  const maritalStatus = [
    ...(getMaritalStatus?.map((item) => ({
      ...item,
      value: item?.MARITAL_ID,
      label: item?.MARITAL_NAME,
    })) || []),
  ];
  const genders = [
    ...(getGender?.map((item) => ({
      ...item,
      value: item?.ID,
      label: item?.NAME,
    })) || []),
  ];

  const check_nationality = watch().nationality;

  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, [trigger]);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    updateData({ bioData: values, dataError: errors });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues, errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues, errors, debouncedUpdateData]);

  useEffect(() => {
    if (!getValues("nationality")) {
      setValue("state_of_origin", "");
      setValue("lga", "");
    }
  }, [check_nationality, getValues, setValue]);

  const check_state_origin = watch().state_of_origin;
  useEffect(() => {
    if (!getValues("state_of_origin")) {
      setValue("lga", "");
    }
  }, [check_state_origin, getValues, setValue]);

  const onSubmit = (data) => {
    updateData({ bioData: data });
    onNext();
  };

  const onFieldChange = async (fieldName) => {
    // Trigger validation for the specific field
    await trigger(fieldName);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-5 shadow-m rounded-md borde flex justify-center flex-col gap-4">
          <div className="">
            <Label>Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="title"
                    size="large"
                    showSearch
                    placeholder="Select Title"
                    optionFilterProp="label"
                    loading={isTitleLoading}
                    options={titles}
                    status={
                      touchedFields?.title && errors?.title ? "error" : ""
                    }
                    className="w-full"
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      onFieldChange("title");
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.title && errors?.title?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div>
            <Label>First Name</Label>
            <Controller
              name="first_name"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="first_name"
                    size="large"
                    placeholder="Address"
                    status={errors?.first_name ? "error" : ""}
                    {...field}
                    onChange={(value) => {
                      field.onChange(value.target.value);
                      onFieldChange("first_name");
                    }}
                    className="w-full rounded-md"
                  />
                  <span className="text-red-500">
                    {touchedFields?.first_name && errors?.first_name?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>

          <div>
            <Label>Last Name</Label>
            <Controller
              name="last_name"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    aria-label="last_name"
                    size="large"
                    placeholder="Last Name"
                    status={errors?.last_name ? "error" : ""}
                    {...field}
                    onChange={(value) => {
                      field.onChange(value.target.value);
                      onFieldChange("last_name");
                    }}
                    className="w-full rounded-md"
                  />
                  <span className="text-red-500">
                    {touchedFields?.last_name && errors?.last_name?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div>
            <Label>Other Names</Label>
            <Controller
              name="other_names"
              control={control}
              render={({ field }) => (
                <Input
                  aria-label="other_names"
                  size="large"
                  placeholder="Other Name"
                  status={errors?.other_names ? "error" : ""}
                  {...field}
                  onChange={(value) => {
                    field.onChange(value.target.value);
                    onFieldChange("other_names");
                  }}
                  className="w-full rounded-md"
                />
              )}
              rules={{ required: false }}
            />
          </div>

          <div className="">
            <Label>Gender</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="gender"
                    size="large"
                    showSearch
                    placeholder="Select gender"
                    optionFilterProp="label"
                    loading={isGenderLoading}
                    options={genders}
                    status={
                      touchedFields?.gender && errors?.gender ? "error" : ""
                    }
                    className="w-full"
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      onFieldChange("gender");
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.gender && errors?.gender?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div className="">
            <Label>Marital Status</Label>
            <Controller
              name="marital_status"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="marital_status"
                    size="large"
                    showSearch
                    placeholder="Select Marital Status"
                    optionFilterProp="label"
                    loading={isMaritalStatusLoading}
                    options={maritalStatus}
                    status={
                      touchedFields?.marital_status && errors?.marital_status
                        ? "error"
                        : ""
                    }
                    className="w-full"
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      onFieldChange("marital_status");
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.marital_status &&
                      errors?.marital_status?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          {watch().gender === "2" && watch().marital_status === "2" ? (
            <div>
              <Label>Maiden Name</Label>
              <Controller
                name="maiden_name"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      aria-label="maiden_name"
                      size="large"
                      placeholder="Enter your maiden name"
                      status={
                        touchedFields.maiden_name && errors?.maiden_name
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full rounded-sm"
                      onChange={(value) => {
                        field.onChange(value);
                        onFieldChange("maiden_name");
                      }}
                    />
                    <span className="text-red-500">
                      {touchedFields?.maiden_name &&
                        errors?.maiden_name?.message}
                    </span>
                  </div>
                )}
                rules={{
                  required:
                    watch().gender === "2" && watch().marital_status === "2"
                      ? "Maiden Name is required"
                      : false,
                }}
              />
            </div>
          ) : null}

          <div className="">
            <Label>Nationality</Label>
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="nationality"
                    size="large"
                    showSearch
                    placeholder="Select Nationality"
                    optionFilterProp="label"
                    loading={isCountryLoading}
                    options={countries}
                    status={
                      touchedFields?.nationality && errors?.nationality
                        ? "error"
                        : ""
                    }
                    className="w-full"
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      onFieldChange("nationality");
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.nationality && errors?.nationality?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          {/* {getValues("nationality") && ( */}
          <div className="">
            <Label>State of Origin</Label>
            <Controller
              name="state_of_origin"
              control={control}
              render={({ field }) => (
                <div>
                  <AntSelect
                    aria-label="state_of_origin"
                    size="large"
                    showSearch
                    placeholder="Select State of origin"
                    optionFilterProp="label"
                    loading={isStateLoading}
                    options={states}
                    status={
                      touchedFields?.state_of_origin && errors?.state_of_origin
                        ? "error"
                        : ""
                    }
                    className="w-full"
                    {...field}
                    onChange={(value) => {
                      field.onChange(value);
                      onFieldChange("state_of_origin");
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.state_of_origin &&
                      errors?.state_of_origin?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          {/* )} */}
          {getValues("state_of_origin") && (
            <div className="">
              <Label>LGA</Label>
              <Controller
                name="lga"
                control={control}
                render={({ field }) => (
                  <div>
                    <AntSelect
                      aria-label="lga"
                      size="large"
                      showSearch
                      placeholder="Select LGA"
                      optionFilterProp="label"
                      loading={isLgaLoading}
                      options={lgas}
                      status={touchedFields?.lga && errors?.lga ? "error" : ""}
                      className="w-full"
                      {...field}
                      onChange={(value) => {
                        field.onChange(value);
                        onFieldChange("lga");
                      }}
                    />
                    <span className="text-red-500">
                      {touchedFields?.lga && errors?.lga?.message}
                    </span>
                  </div>
                )}
              />
            </div>
          )}
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
