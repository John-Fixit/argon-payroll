/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { Card } from '@nextui-org/react/dist'
import { useEffect, useMemo, useState } from "react";
import { Card, CardBody, Textarea, Button } from "@nextui-org/react";
import ActionButton from "../forms/FormElements/ActionButton";
import Label from "../forms/FormElements/Label";
import Input from "../forms/FormElements/Input";
import Select from "react-tailwindcss-select";
import { feedBackComplaint, patients } from "./data";
import { DatePicker } from "antd";
// import { Rating } from "flowbite-react";
// import { PlusCircle, Trash2Icon } from 'lucide-react'
import { Flex, Rate, Select as AntSelect } from "antd";
import { Controller, useForm, useWatch } from "react-hook-form";
import { errorToast, successToast } from "../../utils/toastMsgPop";
import { useAddHospitalReview, useGetProfile } from "../../API/profile";
import useCurrentUser from "../../hooks/useCurrentUser";
import { API_URL } from "../../API/api_urls/api_urls";

const desc = ["Poor", "Bad", "Good", "Very Good", "Excellent"];

const Comment = ({ setIsOpen, hospitalID }) => {
  const [commentInformation, setCommentInformation] = useState({
    complaint: null,
    patient: "",
    date: "",
    performance: "",
    rating: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const addHospitalReview = useAddHospitalReview();

  const { userData } = useCurrentUser();

  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const { data: getFamily, isLoading: familyLoading } = useGetProfile({
    key: "family",
    path: API_URL.getFamily,
  });

  const family_data = getFamily?.data?.map((item) => {
    return {
      ...item,
      value: item?.STAF_FAMILY_ID,
      label: `${item?.STAFF_FAMILY_FIRST_NAME} ${item?.STAFF_FAMILY_LAST_NAME}`,
    };
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    register,
    reset,
    formState: { errors },
  } = useForm({});

  const watchRating = useWatch({ control, name: "rating" })

  const onSubmit = async (data) => {

      const { patient, family, visit_date, comment, rating, review_type } = data;

      const json = {
        staff_id,
        company_id,
        rating,
        visit_date,
        comment,
        family: patient ? family : 0,
        hospital_id: hospitalID,
        review_type
      };

      addHospitalReview.mutate(json, {
        onSuccess:(data)=>{
          const resMsg = data?.data?.message;

          successToast(resMsg)

          reset()
          setIsOpen(false);
        },
        onError:(error)=>{
          const errMsg = error.response?.data?.message ?? error.message;
          errorToast(errMsg);
        },
      })
  };



  const textColor = useMemo(() => {
    switch (desc[watchRating - 1]) {
      case "Poor":
        return "text-red-500";
      case "Bad":
        return "text-yellow-500";
      case "Good":
        return "text-blue-500";
      case "Very Good":
        return "text-purple-500";
      case "Excellent":
        return "text-green-500";
      default:
        return "";
    }
  }, [watchRating]);

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const onChangeDate = (date, dateString) => {
    setValue("visit_date", dateString);
    trigger("visit_date");
  };

  return (
    <div className="p-8 bg-white shadow rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
            <Label>Review Type</Label>
            <div className="w-full md:col-span-2">
              <Controller
                name="review_type"
                control={control}
                render={({ field }) => (
                  <div>
                    <AntSelect
                      aria-label="review_type"
                      size="large"
                      placeholder="Select Review Type"
                      optionFilterProp="label"
                      onChange={(value) => onChange(value, "review_type")}
                      // onSearch={onSearch}
                      options={[
                        { label: "Appraisal", value: "Appraisal" },
                        { label: "Complaint", value: "Complaint" },
                      ]}
                      status={errors?.review_type ? "error" : ""}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {errors?.review_type?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
            <Label>Patient</Label>
            <div className="w-full md:col-span-2">
              <Controller
                name="patient"
                control={control}
                render={({ field }) => (
                  <div>
                    <AntSelect
                      aria-label="patient"
                      size="large"
                      showSearch
                      placeholder="Select patient..."
                      optionFilterProp="label"
                      onChange={(value) => onChange(value, "patient")}
                      // onSearch={onSearch}
                      options={[
                        { label: "Myself", value: 0 },
                        { label: "Family", value: 1 },
                      ]}
                      status={errors?.patient ? "error" : ""}
                      {...field}
                      className="w-full"
                    />
                    <span className="text-red-500">
                      {errors?.patient?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "This field is required" }}
              />
            </div>
          </div>
          {watch("patient") ? (
            <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
              <Label>Family</Label>
              <div className="w-full md:col-span-2">
                <Controller
                  name="family"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <AntSelect
                        aria-label="family"
                        size="large"
                        showSearch
                        loading={familyLoading}
                        placeholder="Select family..."
                        optionFilterProp="label"
                        onChange={(value) => onChange(value, "family")}
                        options={family_data}
                        status={errors?.family ? "error" : ""}
                        {...field}
                        className="w-full"
                      />
                      <span className="text-red-500">
                        {errors?.family?.message}
                      </span>
                    </div>
                  )}
                  rules={{ required: "This field is required" }}
                />
              </div>
            </div>
          ) : null}
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
            <Label>Date visited</Label>
            <div className="w-full md:col-span-2">
              <Controller
                name="visit_date"
                control={control}
                render={({field}) => (
                  <div>
                    <DatePicker
                      size={"large"}
                      className="w-full border-gray-300 rounded-md  focus:outline-none"
                      // format="DD/MM/YYYY"
                      onChange={onChangeDate}
                      {...field}
                      status={errors.visit_date ? "error" : ""}
                    />
                    <span className="text-red-500">
                      {errors?.visit_date?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Date Visited is required" }}
              />

            </div>
          </div>

          <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-1 border-b pb-4">
            <Label>Comment</Label>
            <div className="w-full md:col-span-2">
              <Controller
                name="comment"
                control={control}
                render={({field}) => (
                  <div>
                    <Textarea
                      minRows={5}
                      onChange={(e) => onChange(e.target.value, "comment")}
                      className="md:col-span-2"
                      classNames={{
                        inputWrapper:
                          "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",

                        label: "z-1",
                      }}
                      {...field}
                    />

                    <span className="text-red-500">
                      {errors?.comment?.message}
                    </span>
                  </div>
                )}
                rules={{ required: "Comment is required" }}
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
            <Label htmlFor="duration">Rating</Label>
            <div className="w-full md:col-span-2">
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <div>
                    <Flex gap="middle" className="md:col-span-2">
                      <Rate
                        tooltips={desc}
                        onChange={(value) => onChange(value, "rating")}
                        value={getValues("rating")}
                      />
                      {watch("rating") ? (
                        <span className={textColor}>
                          {desc[getValues("rating") - 1]}
                        </span>
                      ) : null}
                    </Flex>
                  </div>
                )}
              />

            </div>
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              type="submit"
              className="mt-4 font-helvetica text-white bg-btnColor shadow uppercase rounded-md"
                isLoading={addHospitalReview?.isPending}
           >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comment;
