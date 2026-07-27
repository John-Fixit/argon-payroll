/* eslint-disable react/prop-types */
// import { Input, Button } from '@nextui-org/react'
import { Controller, useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetProfile, useViewStaffProfile } from "../../API/profile";
import useFormStore from "../formRequest/store";
import Label from "../forms/FormElements/Label";
import { Input } from "antd";
import { useEffect } from "react";
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
    formState: { errors, touchedFields },
    control,
    reset,
    watch,
    trigger,
  } = useForm({
    defaultValues: {
      // c_name: contactInfo?.FIRST_NAME,
      official_email:
        data?.contact?.official_email ??
        profile?.CONTACT_INFORMATION?.EMAIL ??
        "",
      primary_phone:
        data?.contact?.primary_phone ??
        profile?.CONTACT_INFORMATION?.PHONE ??
        "",
      other_email:
        data?.contact?.other_email ??
        profile?.CONTACT_INFORMATION?.OTHER_EMAIL ??
        "",
      other_phones:
        data?.contact?.other_phones ??
        profile?.CONTACT_INFORMATION?.OTHER_PHONES ??
        "",
    },
  });

  useEffect(() => {
    reset({
      // c_name: contactInfo?.FIRST_NAME,
      official_email:
        data?.contact?.official_email ??
        profile?.CONTACT_INFORMATION?.EMAIL ??
        "",
      primary_phone:
        data?.contact?.primary_phone ??
        profile?.CONTACT_INFORMATION?.PHONE ??
        "",
      other_email:
        data?.contact?.other_email ??
        profile?.CONTACT_INFORMATION?.OTHER_EMAIL ??
        "",
      other_phones:
        data?.contact?.other_phones ??
        profile?.CONTACT_INFORMATION?.OTHER_PHONES ??
        "",
    });
  }, [
    data?.contact?.official_email,
    data?.contact?.other_email,
    data?.contact?.other_phones,
    data?.contact?.primary_phone,
    profile?.CONTACT_INFORMATION?.EMAIL,
    profile?.CONTACT_INFORMATION?.OTHER_EMAIL,
    profile?.CONTACT_INFORMATION?.OTHER_PHONES,
    profile?.CONTACT_INFORMATION?.PHONE,
    reset,
  ]);

  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, []);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    updateData({ contact: values, dataError: errors });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues, errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues, errors]);

  const onSubmit = (data) => {
    updateData({ contact: data });
    onNext();
  };

  const onFieldChange = async (fieldName) => {
    // Trigger validation for the specific field
    await trigger(fieldName);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-5 shadow-m rounded border flex justify-center flex-col gap-4 ">
          <div>
            <Label>Officail Email</Label>
            <Controller
              name="official_email"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    aria-label="official_email"
                    size="large"
                    placeholder="Official email"
                    status={
                      touchedFields.official_email && errors?.official_email
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full rounded-md"
                    onChange={(value) => {
                      field.onChange(value.target.value);
                      onFieldChange("official_email");
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.official_email &&
                      errors?.official_email?.message}
                  </span>
                </>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div>
            <Label>Primary Phone</Label>
            <Controller
              name="primary_phone"
              control={control}
              render={({ field }) => (
                <>
                  <Input
                    aria-label="primary_phone"
                    size="large"
                    placeholder="Primary Phone"
                    status={
                      touchedFields?.primary_phone && errors?.primary_phone
                        ? "error"
                        : ""
                    }
                    {...field}
                    className="w-full rounded-md"
                    onChange={(value) => {
                      field.onChange(value.target.value);
                      onFieldChange("primary_phone");
                    }}
                  />
                  <span className="text-red-500">
                    {touchedFields?.primary_phone &&
                      errors?.primary_phone?.message}
                  </span>
                </>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
          <div>
            <Label>Other Email</Label>
            <Controller
              name="other_email"
              control={control}
              render={({ field }) => (
                <Input
                  aria-label="other_email"
                  size="large"
                  placeholder="Enter your other email"
                  status={errors?.other_email ? "error" : ""}
                  {...field}
                  className="w-full rounded-md"
                />
              )}
              // rules={{ required: "" }}
            />
          </div>
          <div>
            <Label>Other Phone</Label>
            <Controller
              name="other_phones"
              control={control}
              render={({ field }) => (
                <Input
                  aria-label="other_phones"
                  size="large"
                  placeholder="Other Phone"
                  status={errors?.other_phones ? "error" : ""}
                  {...field}
                  className="w-full rounded-md"
                />
              )}
              rules={{ required: false }}
            />
          </div>
          <div className="grid grid-cols-2 w-full flex-wrap  mb-6 md:mb-0 gap-4">
            {/* <Input
            size='sm'
            type='number'
            className='rounded-sm '
            label='Primary Phone'
            labelPlacement='outside'
            placeholder=' Phone'
            name='primary_phone'
            defaultValue={profile?.CONTACT_INFORMATION?.PHONE}
            {...register('primary_phone', { required: true })}
            error={errors?.primary_phone?.message}
          />
          <Input
            size='sm'
            labelPlacement='outside'
            placeholder='email'
            type='email'
            className='rounded-sm'
            label='Official Email'
            name='official_email'
            defaultValue={profile?.CONTACT_INFORMATION?.EMAIL}
            {...register('official_email', {})}
          />
          <Input
            size='sm'
            type='number'
            className='rounded-sm '
            label='Alternative  Phone'
            labelPlacement='outside'
            placeholder=' phone'
            name='other_phones'
            defaultValue={profile?.CONTACT_INFORMATION?.OTHER_PHONES}
            {...register('other_phones', {})}
          />
          <Input
            size='sm'
            labelPlacement='outside'
            placeholder='email'
            type='email'
            className='rounded-sm'
            label='Alternative  Email'
            name='other_email'
            defaultValue={profile?.CONTACT_INFORMATION?.OTHER_EMAIL}
            {...register('other_email', {})}
          /> */}
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
