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

const NoteForm = ({ setIsOpen }) => {
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const [isLoading, setIsLoading] = useState(false);

  const { updateData, data, resetState } = useFormStore();
  
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      notes: data?.residentialNote
    }
  });


  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values) => {
    updateData({ residentialNote: values?.notes });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [formValues]);

  const { userData } = useCurrentUser();
  const { data: profile } = useGetProfile({ user: userData?.data, path: "/profile/get_profile" });


const formatFieldName = (fieldName) => {
    // Replace underscores with spaces and capitalize the first letter
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter
  };




  const onSubmit = async (formData) => {
    const { notes } = formData;
    updateData({ residentialNote: notes });

      if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(
        ([field]) => {
          const formattedField = formatFieldName(field);
          return `${formattedField} is required.`;
        }
      );

      errorToast(errorMessages.join("\n"));
    } else {

      const payloadData = {
        package_id: profile?.RESIDENTIAL_INFORMATION?.PACKAGE_ID,
        staff_id: userData?.data.STAFF_ID,
        company_id: userData?.data.COMPANY_ID,
        attachments: data?.attachments,
        request_type: "Residential",
        notes,
        ...data?.address,
      };
  
      try {
        setIsLoading(true);
        const res = await updateProfile(payloadData);
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
      resetState()
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
    <div className="py8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-white shadow-md rounded border gap-10 gap-y-5 items-center py-3 px-5">
          <label className="header_h3 pb-4 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
            Add Note
          </label>
          <div className="flex items-center mt-1 w-full flexcol">
            <textarea
              // name='notes'
              {...register("notes")}
              className={`border rounded-md flex-1 bg-[#f1f1f1] border-blue-200 focus:outline-none focus:ring-2  focus:border-transparent px-2 py-2 `}
            />
          </div>
        </div>
        <div className="flex justify-end py-3">
          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            {isLoading && <Spinner color="default" size="sm" />}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
