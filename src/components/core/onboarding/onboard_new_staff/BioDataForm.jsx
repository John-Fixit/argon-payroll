/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
import {
  useGetCountry,
  useGetGender,
  useGetLga,
  useGetMaritalStatus,
  useGetState,
  useGetTitle,
} from "../../../../API/profile";
import { useCallback, useEffect } from "react";
import { Input, Select as AntSelect, DatePicker } from "antd";
import Label from "../../../forms/FormElements/Label";
import dayjs from "dayjs";
import { useGetBloodGroup } from "../../../../API/onboard";

export default function BioDataForm({
  getValues,
  control,
  watch,
  errors,
  touchedFields,
  onChange,
  trigger,
  setValue,
}) {

  const { data: getCountry, isLoading: isCountryLoading } = useGetCountry();

  const { data: getGenders, isLoading: isGenderLoading } = useGetGender();
  
  
  const { data: getBloodGroup, isLoading: bloodGroupLoading } = useGetBloodGroup();

  const { data: getTitle, isLoading: isTitleLoading } = useGetTitle();

  const { data: getState, isLoading: isStateLoading } = useGetState(
    watch().nationality
  );

  const { data: getMaritalStatus, isLoading: isMaritalStatusLoading } =
    useGetMaritalStatus();

    const { data: getLga, isLoading: isLgaLoading } = useGetLga(
      watch().state_of_origin
    );

    const { data: getResidentLgas, isLoading: residentLgaLoading } = useGetLga(
      watch().home_state
    );

    const blood_groups = getBloodGroup?.length
    ? getBloodGroup?.map((item) => {
        return {
          ...item,
          value: item?.BLOOD_GROUP_ID,
          label: item?.BLOOD_GROUP_NAME,
        };
      })
    : [];

    const genders = getGenders?.length
    ? getGenders?.map((item) => {
        return {
          ...item,
          value: item?.ID,
          label: item?.NAME,
        };
      })
    : [];

    const titles = getTitle?.length
    ? getTitle?.map((item) => {
        return {
          ...item,
          value: item?.ID,
          label: item?.NAME,
        };
      })
    : [];

    const maritalStatus = getMaritalStatus?.length
    ? getMaritalStatus?.map((item) => {
        return {
          ...item,
          value: item?.MARITAL_ID,
          label: item?.MARITAL_NAME,
        };
      })
    : [];

    const states = getState?.length
    ? getState?.map((item) => {
        return {
          ...item,
          value: item?.STATE_ID,
          label: item?.STATE_NAME,
        };
      })
    : [];

    const countries = getCountry?.length
    ? getCountry?.map((item) => {
        return {
          ...item,
          value: item?.COUNTRY_ID,
          label: item?.COUNTRY_NAME,
        };
      })
    : [];

    const lgas = getLga?.length
    ? getLga?.map((item) => {
        return {
          ...item,
          value: item?.LGA_ID,
          label: item?.LGA_NAME,
        };
      })
    : [];

    const residentLgas = getResidentLgas?.length
    ? getResidentLgas?.map((item) => {
        return {
          ...item,
          value: item?.LGA_ID,
          label: item?.LGA_NAME,
        };
      })
    : [];





  const check_nationality = watch().nationality;

  useEffect(() => {
    if (!getValues("nationality")) {
      setValue("state_of_origin", "");
      setValue("lga", "");
    }
  }, [check_nationality, setValue, getValues]);

  const check_state_origin = watch().state_of_origin;
  useEffect(() => {
    if (!getValues("state_of_origin")) {
      setValue("lga", "");
    }
  }, [check_state_origin, setValue, getValues]);


  const onFieldChange = async (fieldName) => {
    // Trigger validation for the specific field
    await trigger(fieldName);
  };


  const checkSelectedValue= useCallback((data, value)=>{
    const selectedVal = data?.find(item=> item?.value === value)
    if (selectedVal){
      return selectedVal.label
    }

    return null;
  }, [])


  return (
    <div>
      <div className="bg-white rounded-md borde flex justify-center flex-col gap-4">
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
                  loading={isTitleLoading}
                  placeholder="Select your title"
                  optionFilterProp="label"
                  options={titles}
                  status={touchedFields?.title && errors?.title ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "title")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.title && errors?.title?.message}
                </span>
              </div>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>
        <div className="">
          <Label>
            First Name
          </Label>
          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <div>
                <Input
                  aria-label="first_name"
                  size="large"
                  placeholder="Enter first name"
                  status={
                    touchedFields?.first_name && errors?.first_name
                      ? "error"
                      : ""
                  }
                  className="w-full"
                  {...field}
                  onChange={(value) =>onChange(value.target.value, "first_name")
                  }
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
              <>
                <Input
                  aria-label="last_name"
                  size="large"
                  placeholder="Last Name"
                  status={
                    touchedFields?.last_name && errors?.last_name ? "error" : ""
                  }
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
              </>
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
              <>
                <Input
                  aria-label="other_names"
                  size="large"
                  placeholder="Other Name"
                  status={
                    touchedFields?.other_names && errors?.other_names
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => {
                    field.onChange(value.target.value);
                    onFieldChange("other_names");
                  }}
                  className="w-full rounded-md"
                />
                <span className="text-red-500">
                  {touchedFields?.other_names && errors?.other_names?.message}
                </span>
              </>
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
                  loading={isGenderLoading}
                  placeholder="Select your Gender"
                  optionFilterProp="label"
                  options={genders}
                  status={touchedFields?.gender && errors?.gender ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "gender")}
                  className="w-full"
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
                  loading={isMaritalStatusLoading}
                  placeholder="Select marital status"
                  optionFilterProp="label"
                  options={maritalStatus}
                  status={touchedFields?.marital_status && errors?.marital_status ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "marital_status")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.marital_status && errors?.marital_status?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        {
         checkSelectedValue(genders, watch().gender) === "Female" && checkSelectedValue(maritalStatus, watch().marital_status) === 'MARRIED' ? 
          (
            <div>
            <Label>Maiden Name</Label>
            <Controller
              name="maiden_name"
              control={control}
              render={({ field }) => (
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
              )}
              rules={{
                required:
                  watch().gender === "2" && watch().marital_status === "2"
                    ? "Maiden Name is required"
                    : false,
              }}
            />
          </div>
          )
          : null
        }

        {/* <div className="">
          <Label>
            Professional
          </Label>
          <Controller
            name="professional"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="professional"
                  size="large"
                  showSearch
                  placeholder="Select Work Type"
                  optionFilterProp="label"
                  // onSearch={onSearch}
                  options={[
                    {
                      label: "Engineer",
                      value: "Engineer",
                    },
                    {
                      label: "Legal",
                      value: "Legal",
                    },
                    {
                      label: "General",
                      value: "General",
                    },
                  ]}
                  status={
                    touchedFields?.professional && errors?.professional
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "professional")}
                  className="w-full"
                />

                <span className="text-red-500">
                  {touchedFields?.professional && errors?.professional?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div> */}
        <div>
          <Label>Email</Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  aria-label="email"
                  size="large"
                  placeholder="Email"
                  type="email"
                  status={touchedFields?.email && errors?.email ? "error" : ""}
                  {...field}
                  onChange={(value) => {
                    field.onChange(value.target.value);
                    onFieldChange("email");
                  }}
                  className="w-full rounded-md"
                />
                <span className="text-red-500">
                  {touchedFields?.email && errors?.email?.message}
                </span>
              </>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div>
          <Label>Phone</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <>
                <Input
                  aria-label="phone"
                  size="large"
                  placeholder="Enter phone number"
                  status={touchedFields?.phone && errors?.phone ? "error" : ""}
                  {...field}
                  className="w-full rounded-md"
                  onChange={(value) => {
                    field.onChange(value.target.value);
                    onFieldChange("phone");
                  }}
                />
                <span className="text-red-500">
                  {touchedFields?.phone && errors?.phone?.message}
                </span>
              </>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>

        <div className="">
          <Label>
            Blood group
          </Label>
          <Controller
            name="blood_group"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="blood_group"
                  size="large"
                  showSearch
                  placeholder="Find Blood Group Name"
                  optionFilterProp="label"
                  loading={bloodGroupLoading}
                  options={blood_groups}
                  status={
                    touchedFields?.blood_group && errors?.blood_group
                      ? "error"
                      : ""
                  }
                  {...field}
                  onChange={(value) => onChange(value, "blood_group")}
                  className="w-full"
                />

                <span className="text-red-500">
                  {touchedFields?.blood_group && errors?.blood_group?.message}
                </span>
              </div>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>
      
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
                  loading={isCountryLoading}
                  placeholder="Select Nationality"
                  optionFilterProp="label"
                  options={countries}
                  status={touchedFields?.nationality && errors?.nationality ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "nationality")}
                  className="w-full"
                />
                <span className="text-red-500">
                  {touchedFields?.nationality && errors?.nationality?.message}
                </span>
              </div>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>

        {getValues("nationality") && (
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
                   loading={isStateLoading}
                   placeholder="Select State"
                   optionFilterProp="label"
                   options={states}
                   status={touchedFields?.state_of_origin && errors?.state_of_origin ? "error" : ""}
                   {...field}
                   onChange={(value) => onChange(value, "state_of_origin")}
                   className="w-full"
                 />
                 <span className="text-red-500">
                   {touchedFields?.state_of_origin && errors?.state_of_origin?.message}
                 </span>
               </div>
             )}
             rules={{ required: "This field is required" }}
           />
         </div>
        )}
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
                   loading={isLgaLoading}
                   placeholder="Select LGA"
                   optionFilterProp="label"
                   options={lgas}
                   status={touchedFields?.lga && errors?.lga ? "error" : ""}
                   {...field}
                   onChange={(value) => onChange(value, "lga")}
                   className="w-full"
                 />
                 <span className="text-red-500">
                   {touchedFields?.lga && errors?.lga?.message}
                 </span>
               </div>
             )}
             rules={{ required: "This field is required" }}
           />
         </div>
        )}
        {getValues("nationality") && (
           <div className="">
           <Label>Residential State</Label>
           <Controller
             name="home_state"
             control={control}
             render={({ field }) => (
               <div>
                 <AntSelect
                   aria-label="home_state"
                   size="large"
                   showSearch
                   loading={isStateLoading}
                   placeholder="Select Residential State"
                   optionFilterProp="label"
                   options={states}
                   status={touchedFields?.home_state && errors?.home_state ? "error" : ""}
                   {...field}
                   onChange={(value) => onChange(value, "home_state")}
                   className="w-full"
                 />
                 <span className="text-red-500">
                   {touchedFields?.home_state && errors?.home_state?.message}
                 </span>
               </div>
             )}
             rules={{ required: "This field is required" }}
           />
         </div>
        )}
        {getValues("home_state") && (
           <div className="">
           <Label>Residential LGA</Label>
           <Controller
             name="home_lga"
             control={control}
             render={({ field }) => (
               <div>
                 <AntSelect
                   aria-label="home_lga"
                   size="large"
                   showSearch
                   loading={residentLgaLoading}
                   placeholder="Select Residential State"
                   optionFilterProp="label"
                   options={residentLgas}
                   status={touchedFields?.home_lga && errors?.home_lga ? "error" : ""}
                   {...field}
                   onChange={(value) => onChange(value, "home_lga")}
                   className="w-full"
                 />
                 <span className="text-red-500">
                   {touchedFields?.home_lga && errors?.home_lga?.message}
                 </span>
               </div>
             )}
             rules={{ required: "This field is required" }}
           />
         </div>  
        )}
         <div className=''>
          <Label>Residential Address</Label>
        <Controller
          name='home_address'
          control={control}
          render={({ field }) => (
            <>
            <Input.TextArea
            aria-label="address"
            size="large"
            placeholder="Address"
            status={touchedFields?.home_address && errors?.home_address ? "error" : ""}
            {...field}
            className="w-full rounded-md"
              onChange={(value) => {
                    field.onChange(value.target.value);
                    onFieldChange("home_address");
                  }}
            
          />
             <span className="text-red-500">
                  {touchedFields?.home_address && errors?.home_address?.message}
                </span>
            </>
          )}
          rules={{ required: "This field is required" }}
        />
         
        </div>

        <div className="">
          <Label>Date of Birth</Label>
          <Controller
            name="dob"
            control={control}
            render={({field}) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("dob")
                      ? dayjs(getValues("dob"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null} // Ensure `value` is properly formatted
                 
                  onChange={(date, dateString) => {
                    field.onChange(dateString); // Call field's onChange
                    onChange(dateString, "dob"); // Trigger your custom onChange if needed
                  }}
                  status={
                    touchedFields.dob && errors.dob
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.dob &&
                    errors?.dob?.message}
                </span>
              </>
            )}
            // rules={{ required: "This field is required" }}
          />
        </div>

      </div>
      {/* </form> */}
    </div>
  );
}
