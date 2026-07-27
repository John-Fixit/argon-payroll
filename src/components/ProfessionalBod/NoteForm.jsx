/* eslint-disable react/prop-types */
// import { Textarea, Button } from '@nextui-org/react'
import { useEffect, useState } from "react";
import { useGetProfile, useUpdateProfile } from "../../API/profile";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import useFormStore from "../formRequest/store";
import { API_URL } from "../../API/api_urls/api_urls";
import { Spinner } from "@nextui-org/react";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";

const NoteForm = ({ setIsOpen, restartStep }) => {
  const { mutateAsync: updateProfile } = useUpdateProfile();
  
  const { updateData, data, updateDataGroup, data_group, resetState } = useFormStore();
  
  const { register, handleSubmit, getValues, watch } = useForm({
    defaultValues: {
      notes: data?.professionNote
    }
  });


  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values) => {
    updateData({ professionNote: values?.notes });
  }, 500); // Adjust the delay as needed

  useEffect(() => {
    // Only update when form values change
    debouncedUpdateData(formValues);

    // Cleanup debounce on component unmount
    return () => {
      debouncedUpdateData.cancel();
    };
  }, [debouncedUpdateData, formValues]);

  const [isLoading, setIsLoading] = useState(false)

  const { userData } = useCurrentUser();
  const { data: profession } = useGetProfile({
    path: API_URL.getProfession,
    key: "profession",
  });

  const package_id = profession?.data?.package_id;
  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;


  const formatFieldName = (fieldName) => {
    // Replace underscores with spaces and capitalize the first letter
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter
  };


  const onSubmit = async (formData) => {
    const { notes } = formData;


    updateData({ professionNote: notes });
      if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(
        ([field]) => {
          const formattedField = formatFieldName(field);
          return `${formattedField} is required.`;
        }
      );

      errorToast(errorMessages.join("\n"));
    } else {
      const json = {
        package_id,
        staff_id,
        company_id,
        attachments: data?.attachments,
        data_group: data_group?.length
          ? [...data_group, { ...data?.profession, attachments: data?.attachments, notes }]
          : null,
        notes,
        is_grouped: data_group?.length ? 1 : 0,
        action: "add",
        ...data?.profession,
      };

  
  setIsLoading(true)
  
      try {
        const res = await updateProfile(json)
        if (res.data.status) {
          toast.success(res.data.message, {
            style: {
              background: 'green',
              color: '#fff',
              border: '2px solid #fff',
            },
           position: 'top-right',
            duration: 30000,
          })
          setIsOpen(false)
          resetState()
        }
      } catch (error) {
       setIsLoading(false)
        toast.error(error.response?.data?.message ?? error.message, {
          style: {
            background: 'red',
            color: '#fff',
            border: '2px solid #fff',
          },
          position: 'top-right',
          duration: 30000,
        })
      }


    }

  };

  const addToLIST = () => {
    if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(
        ([field]) => {
          const formattedField = formatFieldName(field);
          return `${formattedField} is required.`;
        }
      );

      errorToast(errorMessages.join("\n"));
    } else {
      const json = {
        attachments: data?.attachments,
        notes: getValues().notes,
        ...data?.profession,
      };
  
      updateDataGroup(json)
      updateData({ profession: {}, professionNote: ""});
  
      restartStep();

    }
  };

  return (
    <div className="">
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
        <div className="flex  justify-between py-3">
          <button
            type="button"
            onClick={addToLIST}
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            Add to list
          </button>
          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none  text-white rounded hover:bg-btnColor/70 flex items-center"
          >
              {
                isLoading? (
                  <Spinner color="default" size="sm"/>
                ): null
              }
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
