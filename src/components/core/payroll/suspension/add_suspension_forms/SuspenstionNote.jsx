/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";

const SuspensionNote = ({ setValue, getValues, isLoading, handleSubmit }) => {
  //   const [notes, setNotes] = useState([])
  const [note, setNote] = useState("");

  const handleInputChange = (e) => {
    if (setValue) {
      setValue("notes", e.target.value);
    } else {
      setNote(e.target.value);
      setValue("notes", e.target.value);
    }
  };

  return (
    <div>
      <h5 className="font-helvetica uppercase text-[0.825rem] leading-[1.5] tracking-[2px] ">
        Add Note
      </h5>
      <div>
        <Textarea
          minRows={6}
          defaultValue={getValues("notes")}
          onChange={handleInputChange}
          labelPlacement="outside"
          placeholder="Write something"
          className="col-span-12 md:col-span-6 mb-6 md:mb-0 my-2"
          radius="sm"
          classNames={{
            inputWrapper:
              "outline-1 border-[1px] shadow-none rounded-[0.375rem] bg-white hover:bg-white focus-within:outline-blue-500 outline-offset-0 focus-within:!bg-white",
            label: "font-helvetica tracking-5",
          }}
        />
        <div className=" flex justify-end gap-x-5 p-2 mt-4">
          <button
            // onClick={isLoading ? null : handleSubmit}
            className="bg-btnColor px-4 font-helvetica py-1 outline-none  text-white rounded hover:bg-btnColor/70"
          >
            {isLoading ? (
              <p className="flex items-center gap-2">
                <Spinner color="default" size="sm" /> <span>Saving</span>
              </p>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspensionNote;
