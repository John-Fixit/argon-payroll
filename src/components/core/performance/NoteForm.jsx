/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react";
import { Input } from "antd";

const NoteForm = ({
  register,
  setValue,
  watch,
  saveAsDraft,
  formState,
  isDraft,
  isPending,
  isApprovalPage,
  view,
}) => {
  return (
    <>
      <div>
        <h5 className="header_h3 uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
          Note
        </h5>
        <Input.TextArea
          placeholder="Add Note...."
          status={formState.errors.note ? "error" : ""}
          value={watch("note")}
          {...register("note")}
          onChange={(e) => setValue("note", e.target.value)}
        />
      </div>

      {!isApprovalPage && (
        <div className="flex justify-between gap-3">
          <Button
            size="sm"
            className="my-4 bg-[#00bcc2] text-white rounded"
            onClick={saveAsDraft}
            isLoading={isDraft && isPending}
            disabled={isPending}
          >
            Save as draft
          </Button>
          <Button
            size="sm"
            color="success"
            className="my-4  text-white rounded"
            type="submit"
            isLoading={!isDraft && isPending}
            disabled={isPending}
          >
            {view === "form" ? "Submit" : "Send to Reporting Officer"}
          </Button>
        </div>
      )}
    </>
  );
};

export default NoteForm;
