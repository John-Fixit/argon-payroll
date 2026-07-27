/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
  Button,

} from "@nextui-org/react";
import ReactQuill from "react-quill";

export default function AddNote() {
  const [memo_body, setMemo_body] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [multipleRecipient, setMultipleRecipient] = useState(0);

  const quillRef = useRef(null);

  const recipients = ["CEO", "HR", "Product Manager", "COO", "CTO"];
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

  // handle pick attachment file
  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    // console.log(file);
  };

  const handleSubmitMemo = () => {
    setIsLoading(true);
    // console.log(to, subject, memo_body);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
  }, []);

  return (
    <>
      <div  >
        <form className="my-4 py-20 pt-10 bg-white p-2 px-4 shadow-lg rounded">
        <h2 className="mb-5 text-[1rem] my-auto font-[600] font-helvetica text-[#444e4e] capitalize">Confirm Rejection</h2>
          {/* <div className="_compose_to">
            <Input
              type="text"
              variant="underlined"
              label="Subject"
              onChange={(e) => setSubject(e.target.value)}
              classNames={{
                inputWrapper: [
                  "outline-none",
                  'border-b-2',
                  'shadow-none'
                ]
              }}
            />
            
          </div> */}
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
          <div className="_compose_submit flex justify-between mt-3">
            {/* <div className="attach my-auto">
              <Tooltip
                placement="bottom"
                showArrow={true}
                content="Attach file"
              >
                <label htmlFor="attachFile" className="cursor-pointer">
                  <MdOutlineAttachment size={"2rem"} />
                  <input type="file" id="attachFile" className="hidden" />
                </label>
              </Tooltip>
            </div> */}
            <Button
              color="danger"
              radius="sm"
              isLoading={isLoading}
              className="px-3 font-helvetica bg-red-500"
              onClick={handleSubmitMemo}
            >
              Continue
            </Button>
            {/* <Button
              variant="outlined"
              radius="sm"
              isLoading={isLoading}
              className="px-3 font-Exotic border border-1 text-blue-500"
              onClick={handleSubmitMemo}
            >
              Save as Draft
            </Button> */}
          </div>
        </form>
      </div>
    </>
  );
}
