/* eslint-disable react/prop-types */
// import { Textarea, Button } from '@nextui-org/react'
import { useEffect, useState } from "react";
import {
  useGetProfile,
  useUpdateProfile,
  useViewStaffProfile,
} from "../../API/profile";
import toast from "react-hot-toast";
import useFormStore from "./store";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Spinner } from "@nextui-org/react";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";
import { useLocation, useParams } from "react-router-dom";
import { useUpdateOfficial } from "../../API/officials";

const NoteForm = ({ setIsOpen, staff_id }) => {
  const location = useLocation().pathname;

  const preview_staff_id = useParams()?.staff_id;
  const official_edit =
    preview_staff_id && location.includes("/people/self/profile_details");

  const updateMutation = official_edit ? useUpdateOfficial : useUpdateProfile;
  const { mutateAsync: updateProfile } = updateMutation();

  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useCurrentUser();

  const hook = staff_id ? useViewStaffProfile : useGetProfile;

  const { data: profile } = hook(
    staff_id ?? {
      user: userData?.data,
      path: "/profile/get_profile",
    },
  );

  const { updateData, data, resetState } = useFormStore();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      notes: data?.bioDataNote,
    },
  });

  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values) => {
    updateData({ bioDataNote: values?.notes });
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

  const package_id = staff_id
    ? profile?.PACKAGE_ID?.personal_information
    : profile?.BIODATA?.PACKAGE_ID;

  const onSubmit = async (formData) => {
    const { notes } = formData;
    updateData({ bioDataNote: notes });

    if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(([field]) => {
        const formattedField = formatFieldName(field);
        return `${formattedField} is required.`;
      });

      errorToast(errorMessages.join("\n"));
    } else {
      // Proceed to submit data to backend
      const payloadData = {
        package_id,
        staff_id: userData?.data?.STAFF_ID,
        company_id: userData?.data?.COMPANY_ID,
        request_type: "Personal",
        attachments: data?.attachments,
        notes,
        ...data?.bioData,
      };

      if (official_edit) {
        payloadData["preview_staff_id"] = preview_staff_id;
      }

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
          duration: 10000,
        });
      }
    }
  };

  return (
    <div className="">
      {/* <h3 className='header_h3 text-lg capitalize'> note</h3> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <div className='w-full mx-auto'>
          <Textarea
            {...register('notes')}
            variant='bordered'
            className='mb-6 md:mb-0 my-2 w-[18.5rem] md:w-full md:w[22rem]'
            labelPlacement='outside'
            placeholder='Enter your note'
          />
        </div> */}

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

        {/* <div className='flex items-center my-6 justifybetween justify-end'>
          <Button
            color='primary'
            onClick={onPrev}
            className='my-4 text-white rounded'
          >
            Prev
          </Button>
          <Button
            type='submit'
            color='success'
            className='my-4 text-white rounded'
          >
            Submit
          </Button>
        </div> */}
        <div className="flex justify-end py-3">
          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none flex gap-2 text-white rounded hover:bg-btnColor/70"
          >
            {isLoading ? <Spinner color="default" size="sm" /> : ""}
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
