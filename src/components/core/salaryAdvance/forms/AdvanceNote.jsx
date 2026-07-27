/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { Card } from '@nextui-org/react/dist'
import { useState } from "react";
import { Card, CardBody, Textarea, Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useSaveData } from "../../../Leave/Hooks";

// import { PlusCircle, Trash2Icon } from 'lucide-react'

const AdvanceNote = ({
  setValue,
  getValues,
  isLoading,
  handleSubmit,
}) => {
  //   const [notes, setNotes] = useState([])
  const [note, setNote] = useState("");
  const { information: info, keepData } = useSaveData();


  const handleInputChange = (e) => {
    if (setValue) {
      setValue("notes", e.target.value);
    } else {
      setNote(e.target.value);
      keepData({ note: e.target.value });
      setValue("notes", e.target.value);
    }
  };



  //   const handleAddNote = () => {
  //     if (note.trim() !== '') {
  //       setNotes([...notes, note])
  //       setNote('')
  //     }
  //   }

  //   const handleDeleteNote = (index) => {
  //     const updatedNotes = notes.filter((_, i) => i !== index)
  //     setNotes(updatedNotes)
  //   }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // Logic to submit notes goes here
  //   // For example, you might want to send notes to an API, save them in the database, etc.
  //    setInformation((information)=>{
  // return {...information,note}
  // })
  // setSelectedTab(0)
  //   console.log('Submitted Note:', note)
  //   setNote('')
  // }

  return (
    <div className="p-8 bg-white shadow rounded">
      {/* <form onSubmit={handleSubmit}> */}
      <div>
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
              type="button"
              className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[25px] uppercase active:bg-btnColor/50 `}
              onClick={isLoading ? null : handleSubmit}
            >
              {" "}
              {isLoading ? (
                <p className="flex items-center gap-2">
                  <Spinner color="default" size="sm" /> <span>Submitting</span>
                </p>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceNote;
