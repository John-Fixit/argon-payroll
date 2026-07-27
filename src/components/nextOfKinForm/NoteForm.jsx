/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Textarea, Button } from '@nextui-org/react'
import { useEffect, useState } from "react";
import { useGetProfile, useUpdateProfile } from "../../API/profile";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import useFormStore from "../formRequest/store";
import { Spinner } from "@nextui-org/react";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";

const NoteForm = ({ setIsOpen, restartStep }) => {
  const { mutateAsync: updateProfile } = useUpdateProfile();


  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useCurrentUser();
  const { data: profile } = useGetProfile({
    user: userData?.data,
    path: "/profile/get_profile",
  });
  const package_id = profile?.NEXT_OF_KIN?.PACKAGE_ID;
  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const { updateData, data, resetState } =
    useFormStore();



    const { register, handleSubmit, getValues, watch } = useForm({
      defaultValues: {
        notes: data?.nextOfKinNote
      }
    });
  
  
    const formValues = watch();
  
    // Debounced function to update data
    const debouncedUpdateData = debounce((values) => {
      updateData({ nextOfKinNote: values?.notes });
    }, 500); // Adjust the delay as needed
  
    useEffect(() => {
      // Only update when form values change
      debouncedUpdateData(formValues);
  
      // Cleanup debounce on component unmount
      return () => {
        debouncedUpdateData.cancel();
      };
    }, [formValues]);




     const formatFieldName = (fieldName) => {
      
    // Replace underscores with spaces and capitalize the first letter
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter
  };

  const onSubmit = async (formData) => {
    const { notes } = formData;
    updateData({ nextOfKin: notes });

  if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(
        ([field, error]) => {
          const formattedField = formatFieldName(field);
          return `${formattedField} is required.`;
        }
      );

      errorToast(errorMessages.join("\n"));
    } else {

      setIsLoading(true);
  
      // console.log()
  
  
  
      const json = {
        package_id,
        staff_id,
        company_id,
        attachments: data?.attachments,
        notes,
        action: "add",
        first_name: data?.first_name,
        last_name: data?.last_name,
        relationship: data?.relationship,
        address: data?.kinAddress,
        phone: data?.phone,
        "'email": data?.email,
        date_of_birth: data?.date_of_birth,
        picture: data?.picture,
        marriage_date: "",
      };

      // console.log(json)
  
      try {
        const res = await updateProfile(json);
        setIsLoading(false);
        if (res.data.status) {
          toast.success(res.data.message, {
            style: {
              background: "green",
              color: "#fff",
              border: "2px solid #fff",
            },
            position: "top-right",
            duration: 30000,
          });
          setIsOpen(false);
          resetState();
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response?.data?.message ?? error.message, {
          style: {
            background: "red",
            color: "#fff",
            border: "2px solid #fff",
          },
          position: "top-right",
          duration: 30000,
        });
      }


    }
  };

  return (
    <div className="">
      {/* <h3 className='header_h3 text-lg capitalize'> note</h3> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="header_h3 pb-4 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Add Note
          </label>
          <div className="flex items-center w-full flexcol">
            <textarea
              // name='notes'
              {...register("notes")}
              className={`border rounded-md flex-1 bg-[#f1f1f1] border-blue-200 focus:outline-none focus:ring-2  focus:border-transparent px-2 py-2 `}
            />
          </div>
        </div>
        <div className="flex  justify-end py-3">
   
          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            {isLoading ? <Spinner color="default" size="sm" /> : null}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
