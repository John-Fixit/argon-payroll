/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
  Button,

} from "@nextui-org/react";
import ReactQuill from "react-quill";

export default function QuilInput({handleConfirm, handleCancel, initialValue, loading}) {
  const [memo_body, setMemo_body] = useState(initialValue);



  const quillRef = useRef(null);
  const quillModules = {
    // Add any custom modules if needed
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ],
  };


  const handleSubmit = () => {
    handleConfirm(memo_body)
    setMemo_body("")
  };
  const handleCancelInp = () => {
    handleCancel()
    setMemo_body("")
  };

  useEffect(() => {
    // Access the Quill instance
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        // Set the height of the editor
        editor.root.style.minHeight = "150px"; // Adjust the height as needed
      }
    }

    // return ()=> {
    //   setMemo_body("")
    // } 
  }, []);

  return (
    <>
      <div  className="flex flex-col">

          <div className="_compose_body my-4">
            <div className="flex flex-col rounded mt-2 mb-4">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={memo_body}
                placeholder="Add reason for rejection of the request..."
                onChange={setMemo_body}
                className={`flex-1 border-none rounded-md w-full`}
                modules={quillModules}
              />
            </div>
          </div>
          <div className="_compose_submit flex gap-6 mt-3">
            <Button
              variant="bordered"
              radius="sm"
              disabled={loading}
              className="px-3 font-helvetica  disabled:cursor-not-allowed disabled:bg-gray-100"
              onClick={handleCancelInp}
            >
              Cancel
            </Button>
            <Button
              radius="sm"
              disabled={loading}
              className="px-3 font-helvetica bg-btnColor disabled:cursor-not-allowed disabled:bg-gray-300"
              onClick={handleSubmit}
            >
              Edit
            </Button>
          </div>
      </div>
    </>
  );
}
