/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import {  Spinner } from "@nextui-org/react";
import { Select as AntSelect, Input } from "antd";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "antd";
import {
  useGetCourse,
  useGetDegree,
  useGetDegreeClass,
  useGetInstitution,
  useSetCourse,
  useSetDegree,
  useSetInstutition,
} from "../../API/profile";
import dayjs from "dayjs";
import useFormStore from "../formRequest/store";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";

export default function TextForm({ onNext }) {
  const { updateData, data } = useFormStore();

  const [isLoading, setIsLoading] = useState(false);

  //set function mutation
  const setInstitutionMutation = useSetInstutition();
  const setCourseMutation = useSetCourse();
  const setDegreeMutation = useSetDegree();

  //get details
  const { data: getInstitutions, isLoading: institutionLoading } =
    useGetInstitution();
  const { data: getCourses, isLoading: courseLoading } = useGetCourse();
  const { data: getDegree, isLoading: degreeLoading } = useGetDegree();
  const { data: getDegreeClass, isLoading: degreeClassLoading } =
    useGetDegreeClass();



    const institutions = [
      { label: "OTHER INSTITUTION", value: "other" }, // Add 'Other' first
      ...(getInstitutions
        ?.map((item) => {
          return {
            ...item,
            value: item?.INSTITUTION_ID,
            label: item?.INSTITUTION_NAME,
          };
        }) || [])
    ]


    const courses = [
      { label: "OTHER COURSES", value: "other" }, // Add 'Other' first
      ...(getCourses
        ?.map((item) => {
          return {
            ...item,
            value: item?.COURSE_ID,
            label: item?.COURSE_NAME,
          };
        }) || [])
    ]

    const degree = [
      { label: "OTHER DEGREE", value: "other" }, // Add 'Other' first
      ...(getDegree?.map((item) => ({
        ...item,
        value: item?.DEGREE_ID,
        label: item?.DEGREE_NAME,
      })) || []), // Safely handle undefined getDegree
    ];


  const degreeClasses = getDegreeClass?.map((item) => {
    return {
      ...item,
      value: item?.CLASS_ID,
      label: item?.CLASS_NAME,
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
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      institution_name: data?.education?.institution_name ?? "",
      education_type: data?.education?.education_type ?? "",
      course_name: data?.education?.course_name ?? "",
      degree: data?.education?.degree ?? "",
      degree_class: data?.education?.degree_class ?? "",
      start_date: data?.education?.start_date ?? "",
      end_date: data?.education?.end_date ?? "",
    },
  });




  
  useEffect(() => {
    trigger(undefined, { shouldFocus: false });
  }, [trigger]);

  // Watch all form fields
  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values, errors) => {
    updateData({ education: {...values}, dataError: errors });
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
        institution_name,
        education_type,
        course_name,
        degree,
        degree_class,
        start_date,
        end_date,
      } = data;

      const json = {
        education_type: education_type,
        institution: institution_name,
        course: course_name,
        degree: degree,
        class: degree_class,
        start_date: start_date,
        end_date: end_date,
      };

      if (institution_name === "other") {
        await setInstitutionMutation
          .mutateAsync({
            institution_name: data.new_institution_name,
          })
          .then((res) => {
            const institutionData = res?.data?.data;
            json["institution"] = institutionData;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }

      if (course_name === "other") {
        await setCourseMutation
          .mutateAsync({
            course_name: data.new_course_name,
          })
          .then((res) => {
            const courseData = res?.data?.data;
            json["course"] = courseData;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }

      if (degree === "other") {
        await setDegreeMutation
          .mutateAsync({
            degree_name: data.new_degree,
          })
          .then((res) => {
            const degreeData = res?.data?.data;
            json["degree"] = degreeData;
          })
          .catch((err) => {
            const errMsg = err?.response?.data?.message ?? err?.message;
            errorToast(errMsg);
            throw err;
          });
      }


      setIsLoading(false);
      updateData({ education: {...json} });
      onNext();
    } catch (err) {
      const errMsg = err?.response?.data?.message ?? err?.message;
      errorToast(errMsg);
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
            Institution Name
          </h5>
          <Controller
            name="institution_name"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="institution_name"
                  size="large"
                  showSearch
                  placeholder="Select Institution Name"
                  optionFilterProp="label"
                  loading={institutionLoading}
                  // onSearch={onSearch}
                  options={institutions}
                  status={touchedFields?.institution_name && errors?.institution_name ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "institution_name")}
                  className="w-full"
                />
                {watch("institution_name") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your Institution Name
                    </label>
                    <Input
                      aria-label="new_institution_name"
                      size="large"
                      placeholder="Enter your Course Name"
                      value={getValues("new_institution_name")}
                      {...register("new_institution_name", {
                        required: "Institution name required",
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_institution_name")
                      }
                      className="mt-2"
                      status={touchedFields?.new_institution_name && errors?.new_institution_name ? "error" : ""}
                    />
                    <span className="text-red-500">
                  { touchedFields?.new_institution_name && errors?.new_institution_name?.message}
                </span>
                  </div>
                )}
                <span className="text-red-500">
                  {touchedFields?.institution_name && errors?.institution_name?.message}
                </span>
              </div>
            )}
            rules={{ required: "Institution is required" }}
          />
        </div>

        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Education Type
          </h5>
          <Controller
            name="education_type"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="education_type"
                  size="large"
                  showSearch
                  placeholder="Select Institution Name"
                  optionFilterProp="label"
                  options={[
                    { label: "Primary", value: "Primary" },
                    { label: "Secondary", value: "Secondary" },
                    { label: "Tertiary", value: "Tertiary" },
                    { label: "Post-Tertiary", value: "Post-Tertiary" },
                  ]}
                  status={touchedFields?.education_type && errors?.education_type ? "error" : ""}
                  {...field}
                  className="w-full"
                  onChange={(value) => onChange(value, "education_type")}
                />
                <span className="text-red-500">
                  {touchedFields?.education_type && errors?.education_type?.message}
                </span>
              </div>
            )}
            rules={{ required: "Education type is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Course Name
          </h5>
          <Controller
            name="course_name"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="course_name"
                  size="large"
                  showSearch
                  placeholder="Select Course Name"
                  optionFilterProp="label"
                 loading={courseLoading}
                  options={courses}
                  className="w-full"
                  status={touchedFields?.course_name && errors?.course_name ? "error" : ""}
                  {...field}

                  onChange={(value) => onChange(value, "course_name")}
                />
                {watch("course_name") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your Course Name
                    </label>
                    <Input
                      aria-label="new_course_name"
                      size="large"
                      placeholder="Enter your Course Name"
                      value={getValues("new_course_name")}
                      {...register("new_course_name", {
                        required: "Course Name name required",
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_course_name")
                      }
                      className="mt-2"
                      status={touchedFields?.new_course_name && errors?.new_course_name ? "error" : ""}
                    />
                    <span className="text-red-500">
                  {touchedFields?.new_course_name && errors?.new_course_name?.message}
                </span>
                  </div>
                )}
                <span className="text-red-500">
                  {touchedFields?.course_name && errors?.course_name?.message}
                </span>
              </div>
            )}
            rules={{ required: "Course name required" }}
          />
        </div>

        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Degree Name
          </h5>
          <Controller
            name="degree"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="degree"
                  size="large"
                  showSearch
                  placeholder="Select Course Name"
                  optionFilterProp="label"
                 loading={degreeLoading}
                  options={degree}
                  status={touchedFields?.degree && errors?.degree ? "error" : ""}
                  className="w-full"
                  {...field}


                  onChange={(value) => onChange(value, "degree")}
                />
                {watch("degree") === "other" && (
                  <div className="mt-2">
                    <label
                      htmlFor=""
                      className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] "
                    >
                      Your Degree Name
                    </label>
                    <Input
                      aria-label="new_degree"
                      size="large"
                      placeholder="Enter your Degree Name"
                      value={getValues("new_degree")}
                      {...register("new_degree", {
                        required: "Degree name required",
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_degree")
                      }
                      className="mt-2"
                      status={touchedFields?.degree && errors?.new_degree ? "error" : ""}
                    />
                    <span className="text-red-500">
                  {(touchedFields?.new_degree && errors?.new_degree?.message)}
                </span>
                  </div>
                )}
                <span className="text-red-500">
                  {(touchedFields?.degree && errors?.degree?.message)}
                </span>
              </div>
            )}
            rules={{ required: "Degree is required" }}
          />
        </div>
        <div className="">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Degree Class
          </h5>
          <Controller
            name="degree_class"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="degree_class"
                  size="large"
                  showSearch
                  placeholder="Select Course Name"
                  optionFilterProp="label"
                 loading={degreeClassLoading}
                  // onSearch={onSearch}
                  options={degreeClasses}
                  className="w-full"
                  status={touchedFields?.degree_class && errors?.degree_class ? "error" : ""}
                  {...field}
                  onChange={(value) => onChange(value, "degree_class")}
                />
                <span className="text-red-500">
                  {touchedFields?.degree_class && errors?.degree_class?.message}
                </span>
              </div>
            )}
            rules={{ required: "Degree class required" }}
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
                  status={touchedFields?.start_date && errors.start_date ? "error" : ""}
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
                  onChange={onChangeEndDate}
                  status={touchedFields?.end_date && errors?.end_date ? "error" : ""}
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
