/* eslint-disable react/prop-types */
// import { Textarea, Button } from '@nextui-org/react'
import { useEffect, useState } from "react";
import {
  useGetProfile,
  useUpdateProfile,
  useViewStaffProfile,
} from "../../API/profile";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../hooks/useCurrentUser";
import useFormStore from "../formRequest/store";
import { Spinner } from "@nextui-org/react";
import Label from "../forms/FormElements/Label";
import { errorToast } from "../../utils/toastMsgPop";
import { debounce } from "lodash";
import { useUpdateOfficial } from "../../API/officials";

const NoteForm = ({ setIsOpen, preview_staff_id, official_edit }) => {
  const updateMutation = official_edit ? useUpdateOfficial : useUpdateProfile;
  const { mutateAsync: updateProfile } = updateMutation();

  const { userData } = useCurrentUser();

  const hook = preview_staff_id ? useViewStaffProfile : useGetProfile;

  const { data: profile } = hook(
    preview_staff_id ?? {
      user: userData?.data,
      path: "/profile/get_profile",
    },
  );

  const package_id = preview_staff_id
    ? profile?.PACKAGE_ID?.contact_information
    : profile?.CONTACT_INFORMATION?.PACKAGE_ID;

  const [isLoading, setIsLoading] = useState(false);

  const { updateData, data, resetState } = useFormStore();

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      notes: data?.contactNote,
    },
  });

  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values) => {
    updateData({ contactNote: values?.notes });
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
    updateData({ contactNote: notes });

    if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(([field]) => {
        const formattedField = formatFieldName(field);
        return `${formattedField} is required.`;
      });

      errorToast(errorMessages.join("\n"));
    } else {
      const payloadData = {
        package_id,
        staff_id: userData?.data.STAFF_ID,
        company_id: userData?.data.COMPANY_ID,
        attachments: data?.attachments,
        request_type: "Contact",
        notes,
        ...data?.contact,
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
          duration: 30000,
        });
      }
    }
  };

  return (
    <div className="">
      {/* <h3 className='header_h3 text-lg capitalize'> note</h3> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-white px-5">
          <Label>Add No</Label>
          <div className="flex items-center w-full flexcol">
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
            {isLoading ? <Spinner color="default" size="sm" /> : ""}
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
