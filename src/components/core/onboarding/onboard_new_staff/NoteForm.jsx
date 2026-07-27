/* eslint-disable react/prop-types */
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Spinner } from "@nextui-org/react";
import { debounce } from "lodash";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useFormStore from "../../../formRequest/store";
import { errorToast } from "../../../../utils/toastMsgPop";
import {
  useOnboardStaff,
  useRecreateOnboard,
  useSaveOnboardAsDraft,
} from "../../../../API/onboard";

const NoteForm = ({ setIsOpen }) => {
  //external hooks
  const { userData } = useCurrentUser();

  const { updateData, data, resetState } = useFormStore();

  const is_draft = data?.onboard?.is_draft;

  const { mutateAsync: onboardStaff, isPending: onboardLoading } =
    useOnboardStaff(is_draft);

  const { mutateAsync: recreateOnboard, isPending: recreateLoading } =
    useRecreateOnboard();

  const { mutateAsync: onboardAsDraft, isPending: draftLoading } =
    useSaveOnboardAsDraft();

  const staff_id = userData?.data.STAFF_ID;
  const company_id = userData?.data.COMPANY_ID;

  const stripHtml = (html) => {
    if (!html) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const { register, handleSubmit, getValues, watch, reset } = useForm({
    defaultValues: {
      notes: stripHtml(data?.onboardNote)?.trim() || "",
    },
  });

  const formValues = watch();

  // Debounced function to update data
  const debouncedUpdateData = debounce((values) => {
    updateData({ onboardNote: values?.notes });
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

    updateData({ onboardNote: notes });

    if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(([field]) => {
        const formattedField = formatFieldName(field);
        return `${formattedField} is required.`;
      });

      errorToast(errorMessages.join("\n"));
    } else {
      const { draft_id, declinedOnboard, ...onboardData } = data?.onboard || {};
      // delete data?.onboard.is_draft
      const json = {
        staff_id,
        company_id,
        attachments: data?.attachments,
        notes,
        ...onboardData,

        draft_id,
      };

      console.log(json);

      try {
        // console.log(json);
        const res = await (declinedOnboard
          ? recreateOnboard(json)
          : onboardStaff(json));
        if (res?.data?.status) {
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
          reset();
        }
      } catch (error) {
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

  const saveAsDraft = async () => {
    const notes = getValues().notes;

    updateData({ onboardNote: notes });

    if (Object.keys(data.dataError).length > 0) {
      const errorMessages = Object.entries(data.dataError).map(([field]) => {
        const formattedField = formatFieldName(field);
        return `${formattedField} is required.`;
      });

      errorToast(errorMessages.join("\n"));
    } else {
      const json = {
        staff_id,
        company_id,
        attachments: data?.attachments,
        notes,
        ...data?.onboard,
      };

      try {
        // console.log(json);
        const res = await onboardAsDraft(json);
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
          reset();
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "An Unexpected error occurred!!",
          {
            style: {
              background: "red",
              color: "#fff",
              border: "2px solid #fff",
            },
            position: "top-right",
            duration: 30000,
          }
        );
      }
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
              {...register("notes")}
              className={`border rounded-md flex-1 bg-[#f1f1f1] border-blue-200 focus:outline-none focus:ring-2  focus:border-transparent px-2 py-2 `}
            />
          </div>
        </div>
        <div className="flex  justify-between flex-end py-3">
          {!is_draft ? (
            <button
              type="button"
              onClick={saveAsDraft}
              className="text-btnColor px-6 py-2 header_h3 outline-noe font-helvetica border-1 border-btnColor  bg-white rounded hover:text-white transition-all hover:bg-btnColor/70 flex items-center gap-2"
            >
              {draftLoading ? <Spinner color="default" size="sm" /> : null}
              Save as Draft
            </button>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="bg-btnColor px-6 py-2 header_h3 outline-none font-helvetica  text-white rounded hover:bg-btnColor/70 flex items-center gap-2"
            disabled={onboardLoading || recreateLoading}
          >
            {onboardLoading || recreateLoading ? (
              <Spinner color="default" size="sm" />
            ) : null}
            {is_draft ? "Convert to Onboard" : "Onboard"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
