/* eslint-disable react/prop-types */
import { Avatar, Select, SelectItem, Spinner } from "@nextui-org/react";

import { useGetRelationship } from "../../API/profile";
import { useEffect, useState } from "react";
import { CameraIcon } from "lucide-react";
import { DatePicker } from "antd";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import useFormStore from "../formRequest/store";
import axios from "axios";
import useCurrentUser from "../../hooks/useCurrentUser";
import { errorToast } from "../../utils/toastMsgPop";
import Label from "../forms/FormElements/Label";
import { Input, Select as AntSelect } from "antd";
import { debounce } from "lodash";
import dayjs from "dayjs";
import { baseURL } from "../../utils/filePrefix";

export default function TextForm({ onNext }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });

  const { updateData, data } = useFormStore();

  const { userData } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const { data: getRelationship, isLoading: isRelationshipLoading } =
    useGetRelationship();


    const relationship = [
      ...(getRelationship?.map((item) => ({
        ...item,
        value: item?.RELATIONSHIP_ID,
        label: item?.DESCRIPTION,
      })) || []), // Safely handle undefined getDegree
    ];

  const [previewImage, setPreviewImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields },
    trigger,
    watch,
    getValues
  } = useForm({
    defaultValues: {
      relationship: data?.family?.relationship ?? "",
      first_name: data?.family?.first_name ?? "",
      last_name: data?.family?.last_name ?? "",
      address: data?.family?.address ?? "",
      phone: data?.family?.phone ?? "",
      email: data?.family?.email ?? "",
      date_of_birth: data?.family?.date_of_birth ?? "",
    },
  });

  // console.log(data?.profile_picture_url)



  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, []);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    updateData({ family: {...values}, dataError: errors });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues, errors);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues, errors]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData(() => {
        return { ...formData, image: file };
      });
      updateData({
        family: {...data?.family},
        profile_picture_url: URL.createObjectURL(file),
        dataError: errors,
      });
      setPreviewImage(() => {
        return URL.createObjectURL(file);
      });
    }
  };
  const uploadFile = async (formData) => {
    try {
      const res = await axios({
        method: "post",
        url:baseURL +"attachment/addChatFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: userData?.token,
        },
      });

      if (res) {
        return res.data;
      }
    } catch (err) {
      errorToast(err?.response?.data?.message ?? err?.message);

      throw err;
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const fileFormData = new FormData();

      fileFormData.append("file", formData?.image);

      let res;
      if (formData?.image) {
        res = await uploadFile(fileFormData);
      }

      updateData({ family: {...data,  picture: res?.file_url_id}, profile_picture_url: res?.file_url});

      onNext();

      // Perform the submission logic here
      // You can send formData to your server or process it as needed

      // Reset the form after submission
      setFormData({
        name: "",
        description: "",
        image: null,
      });
      setPreviewImage(null);
    } catch (err) {
      setIsLoading(false);
      errorToast(err?.response?.data?.message ?? err?.message);
    }
  };



  const onFieldChange = async (fieldName) => {
    // Trigger validation for the specific field
    await trigger(fieldName);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white shado rounded borde flex justify-center flex-col gap-4">
            <div className="">
              <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
                Photo
              </h5>
              <div className="">
                <label
                  htmlFor="family_image"
                  className="cursor-pointer  text-white py2 px-4 rounded-md"
                >
                  <CameraIcon className="w-8 h-8 text-red-500" />
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif, .pdf"
                    size="sm"
                    className="rounded-sm hidden"
                    label="Image"
                    placeholder="image"
                    id="family_image"
                    name="image"
                    onChange={handleImageChange} // Add the desired file types
                  />
                </label>

                {(previewImage ?? data?.profile_picture_url) && (
                  <>
                    <Avatar
                      src={previewImage ?? data?.profile_picture_url}
                      alt="User Image"
                      className="h-36 w-36 rounded-full"
                    />
                  </>
                )}
              </div>
            </div>
            <div className="">
              {/* <h5 className='header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] '>
                Relationship
              </h5> */}
              <Label>Relationship</Label>
              <Controller
                name="relationship"
                control={control}
                render={({ field }) => (
                  <AntSelect
                  aria-label="relationship"
                  size="large"
                  showSearch
                  placeholder="Select Relationship"
                  optionFilterProp="label"
                  loading={isRelationshipLoading}
                  options={relationship}
                  status={touchedFields?.relationship && errors?.relationship ? "error" : ""}
                  className="w-full"
                  {...field}

                  onChange={(value) => {
                    field.onChange(value);
                    onFieldChange("relationship");
                  }}
                />
                  // <Select
                  //   aria-label="relationship"
                  //   variant="bordered"
                  //   placeholder="Relationship"
                  //   // size='sm'
                  //   isDisabled={isRelatoinshipLoading}
                  //   selectedKeys={field.value ? [field.value] : []}
                  //   {...field}
                  //   tabIndex="0"
                  //   aria-expanded="false"
                  //   classNames={{
                  //     trigger:
                  //       "text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus:outline-none bg-white hover:border-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/20",
                  //   }}
                  //   errorMessage={errors?.relationship?.message}
                  //   onChange={(value) => {
                  //     field.onChange(value);
                  //     onFieldChange("relationship");
                  //   }}
                  // >
                  //   {relationship?.map((item) => (
                  //     <SelectItem
                  //       key={item.RELATIONSHIP_ID}
                  //       value={item.RELATIONSHIP_ID}
                  //     >
                  //       {item.DESCRIPTION}
                  //     </SelectItem>
                  //   ))}
                  // </Select>
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
                  <>
                    <Input
                      aria-label="first_name"
                      size="large"
                      placeholder="First name"
                      status={
                        touchedFields?.first_name && errors?.first_name
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full rounded-md"
                      onChange={(value) => {
                        field.onChange(value.target.value);
                        onFieldChange("first_name");
                      }}
                    />
                    <span className="text-red-500">
                      {touchedFields?.first_name && errors?.first_name?.message}
                    </span>
                  </>
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
                      placeholder="Last mame"
                      status={
                        touchedFields?.last_name && errors?.last_name
                          ? "error"
                          : ""
                      }
                      {...field}
                      className="w-full rounded-md"
                      onChange={(value) => {
                        field.onChange(value.target.value);
                        onFieldChange("last_name");
                      }}
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
              <Label>Address</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <>
                    <Input
                      aria-label="address"
                      size="large"
                      placeholder="Enter your address"
                      status={
                        touchedFields?.address && errors?.address ? "error" : ""
                      }
                      {...field}
                      className="w-full rounded-md"
                      onChange={(value) => {
                        field.onChange(value.target.value);
                        onFieldChange("address");
                      }}
                    />
                    <span className="text-red-500">
                      {touchedFields?.address && errors?.address?.message}
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
                      status={
                        touchedFields?.phone && errors?.phone ? "error" : ""
                      }
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
              />
            </div>

            <div>
              <Label>Email</Label>
              <Controller
                name="email"
                control={control}
                 render={({ field }) => (
                  <>
                    <Input
                      aria-label="email"
                      type="email"
                      size="large"
                      placeholder="Enter email"
                      status={
                        touchedFields?.email && errors?.email ? "error" : ""
                      }
                      {...field}
                      className="w-full rounded-md"
                      onChange={(value) => {
                        field.onChange(value.target.value);
                        onFieldChange("email");
                      }}
                    />
                    <span className="text-red-500">
                      {touchedFields?.email && errors?.email?.message}
                    </span>
                  </>
                )}
                rules={{required: "This field is required"}}
              />
            </div>

            <div className="">
              <Label>Date of Birth</Label>
              <Controller
                name="date_of_birth"
                control={control}
                   render={({ field }) => (
                  <>
                    <DatePicker
                      defaultValue={
                        getValues("date_of_birth")
                          ? dayjs(getValues("date_of_birth"), "MM/DD/YYYY")
                          : ""
                      }
                      size={"large"}
                      className="w-full border-gray-300 rounded-md  focus:outline-none"
                      format="MM/DD/YYYY"
                      onChange={(value) => {
                        field.onChange(moment(value).format("L"));
                        onFieldChange("date_of_birth");
                      }}
                      status={touchedFields?.date_of_birth && errors.date_of_birth ? "error" : ""}
                    />
                    <span className="text-red-500">
                      {touchedFields?.date_of_birth && errors?.date_of_birth?.message}
                    </span>
                  </>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          </div>
          <div className="flex justify-end py-3">
            <button
              type="submit"
              className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex items-center"
            >
              {isLoading ? <Spinner color="default" size="sm" /> : null}
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
