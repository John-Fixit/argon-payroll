/* eslint-disable react/prop-types */
// import 'react-datepicker/dist/react-datepicker.css'
import { Spinner } from "@nextui-org/react";
import { Select as AntSelect, Input } from "antd";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "antd";
import {
    useGetCertification,
  useGetCertificationAuthority,
  useSetCertification,
  useSetCertificationAuthority,
} from "../../API/profile";
import useFormStore from "../formRequest/store";
import { errorToast } from "../../utils/toastMsgPop";


const { TextArea } = Input;

export default function TextForm({onNext}) {
  

  const { updateData } = useFormStore()


  const [isLoading, setIsLoading] = useState(false)


  //set function mutation
  const setCertificationMutation = useSetCertification();


  //get details
  const { data: getInstitutions, isLoading: certificationLoading } =
    useGetCertification();
  const association_type_data = getInstitutions
    ?.map((item) => {
      return {
        ...item,
        value: item?.INSTITUTION_ID,
        label: item?.INSTITUTION_NAME,
      };
    })
    ?.concat({ label: "Other", value: "other" });



  const {
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    trigger,
    register,
    formState: { errors },
  } = useForm({});


  const onSubmit = async (data) => {
    setIsLoading(true);
  
    try {
      const { association_type, name, date_joined } = data;
  
      const json = {
        association_type: association_type,
        name: name,
        date_joined: date_joined,
      };

      // console.log(json)
  
      // if (association_type === "other") {
      //   await setCertificationMutation.mutateAsync({
      //     association_type: data.new_association_type
      //   }).then(res => {
      //     const certificationRes = res?.data?.data;
      //     json["association_type"] = certificationRes;
      //   }).catch(err => {
      //     const errMsg = err?.response?.data?.message ?? err?.message;
      //     errorToast(errMsg);
      //     throw err;
      //   });
      // }
  
      // setIsLoading(false);
      // updateData({ ...data });
      // onNext();
    } catch (err) {
      const errMsg = err?.response?.data?.message ?? err?.message;
      errorToast(errMsg);
      setIsLoading(false)
    }
  };
  

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const onChangeDate = (date, dateString) => {
    setValue("date_joined", dateString);
    trigger("date_joined");
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-white shadow-md rounded border flex justify-center flex-col gap-4">
        {/* <h2 className='text-[22px] font-normal text-[#212529] '>Education</h2> */}
        <div className="py-3 border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center p-5">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Association Type
          </h5>
          <Controller
            name="association_type"
            control={control}
            render={({ field }) => (
              <div>
                <AntSelect
                  aria-label="association_type"
                  size="large"
                  showSearch
                  placeholder="Select Association type"
                  optionFilterProp="label"
                  onChange={(value) => onChange(value, "association_type")}
                  // onSearch={onSearch}
                  options={[
                    {
                        label: 'Full-time',
                        value: 'Full-time',
                      },
                      {
                        label: 'Part-time',
                        value: 'Part-time',
                      },
                      {
                        label: 'Contract ',
                        value: 'Contract ',
                      },
                      {
                        label: 'Temporary ',
                        value: 'Temporary ',
                      },
                      {
                        label: 'Freelance/self-employed',
                        value: 'Freelance/self-employed',
                      },
                  ]}
                  status={errors?.association_type ? "error" : ""}
                  {...field}
                  className="w-full"
                />
                 {
                  watch("association_type") ==="other" && (
                    <div className="mt-2">
                    <label htmlFor="" className="header_h3 uppercase text-[0.725rem] leading-[1.5] tracking-[2px] ">Your Certification</label>
                    <Input
                      aria-label="new_association_type"
                      size="large"
                      placeholder="Enter your Work Type"
                      value={getValues("new_association_type")}
                      {...register("new_association_type", {
                        required: "Work type required"
                      })}
                      onChange={(value) =>
                        onChange(value?.target.value, "new_association_type")
                      }
                      className="mt-2"
                      status={errors?.new_association_type ? "error" : ""}
                    />
                    
                    </div>
                  )
                }
                <span className="text-red-500">
                  {errors?.association_type?.message || errors?.new_association_type?.message}
                </span>
              </div>
            )}
            rules={{ required: "Association type is required" }}
          />
        </div>
        <div className="py-3 border-b grid md:grid-cols-[1fr_28rem] gap-x-10 gap-y-5 items-center p-5">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
          Name
          </h5>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div>
               <Input
                        aria-label="name"
                        size="large"
                        placeholder="Enter your Organisation Name"
                        // value={getValues("name")}
                        // {...register("name", {
                        //   required: "Course Name name required"
                        // })}
                        {...field}
                        onChange={(value) =>
                          onChange(value?.target.value, "name")
                        }
                        className="mt-2"
                        status={errors?.name ? "error" : ""}
                      />
                <span className="text-red-500">
                  {errors?.name?.message}
                </span>
              </div>
            )}
            rules={{ required: "Name is required" }}
          />
        </div>
       
      
        <div className="py-3 border-b grid md:grid-cols-[1fr_28rem] gap-10 gap-y-5 items-center px-5">
          <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Date Joined
          </h5>
          <Controller
            name="date_joined"
            control={control}
            render={() => (
              <div>
                <DatePicker
                  size={"large"}
                  className=" w-full border-gray-300 rounded-md  focus:outline-none"
                  // format="DD/MM/YYYY"
                  onChange={onChangeDate}
                  // {...field}
                  status={errors.date_joined ? "error" : ""}
                />
                <span className="text-red-500">
                  {errors?.date_joined?.message}
                </span>
              </div>
            )}
            rules={{ required: "Joined Date is required" }}
          />
        </div>
      </div>
      <div className="flex justify-end py-3">
        <button
          type="submit"
          className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
        >
           {
                isLoading? (
                  <Spinner color="default" size="sm"/>
                ): null
              }
          Next
        </button>
      </div>
    </form>
  );
}
