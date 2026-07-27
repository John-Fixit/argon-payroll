/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Drawer, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import Label from "../../../../components/forms/FormElements/Label";
import Input from "../../../../components/forms/FormElements/Input";

const options = ["Create Announcement"];

const CreateAnouncementPopup = ({ open, onClose }) => {
  // const [open, setOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState("Create Announcement");
  const quillRef = useRef(null);

  //   state
  const [body, setbody] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [doc, setDoc] = useState("");





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



  const CloseModal = () => {
    onClose();
    setCurrentOption("Create Announcement");
  };

  const selectOption = (opt) => {
    setCurrentOption(opt);
  };






useEffect(() => {
    const Qref = quillRef.current
//   console.log(quillRef.current)
// Access the Quill instance
if (Qref) {
  const editor = quillRef.current.getEditor();
  if (editor) {
    // Set the height of the editor
    editor.root.style.height = "150px"; // Adjust the height as needed
    // editor.root.style.overflowY = "auto";
  }
}
}, [open]);







  return (
    <Drawer
      title={``}
      placement="right"
      size={"large"}
      style={{ background: "#f7f7f7" }}
      onClose={CloseModal}
      open={open}
      extra={
        <Space>
          <Button onClick={CloseModal}>Cancel</Button>
        </Space>
      }
    >
      <div className="flex flex-col gap-5  px-4 ">
        <div className="flex flex-col font-Roboto">
          <div className="text-2xl font-bold">{currentOption} </div>
          <div className="text-gray-400 font-medium">
            {/* You can add as many as 10 members to this group */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px]  gap-7 h-full">
          <div className={`flex flex-col border shadow-xl bg-white rounded-md`}>
            <div className="flex flex-col px-4 py-3">
              <div className="flex-col sm:flex-row gap-2  sm:gap-6 justify-between ">
                <Label htmlFor="notes">Subject</Label>
                <Input
                  placeholder="announcement subject"
                  onChange={(e) => {}}
                />
              </div>
            </div>
            <div className="flex flex-col px-4 py-3 ">
              <div className="flex-col sm:flex-row gap-2  sm:gap-6 justify-between ">
                <Label htmlFor="notes">Document Type</Label>
                <Select
                  onChange={setDoc}
                  size={"large"}
                  mode="tag"
                  className="border-1 border-gray-300 rounded-md"
                  style={{
                    width: "100%",
                  }}
                  variant="borderless"
                  options={[
                    { label: "general", value: "general" },
                    { label: "HR Form", value: "HR Form" },
                  ]}
                />
              </div>
            </div>

            <div className="flex flex-col px-4 py-3 pb-6 border-b border-gray-300">
              <div className="flex flex-col sm:flex-row gap-2  sm:gap-6  justify-between ">
                <div className="w-full">
                  <Label htmlFor="notes">Start Date</Label>
                  <Input
                    type={"date"}
                    placeholder="announcement subject"
                    onChange={(e) => {}}
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="notes">End Date</Label>
                  <Input
                    type={"date"}
                    placeholder="announcement subject"
                    onChange={(e) => {}}
                  />
                </div>
              </div>
            </div>
            <div className="_compose_notes my-4 p-4 pb-0">
              <Label htmlFor="notes">Notes</Label>
              <div className="flex flex-col rounded mt-2 mb-4">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={body}
                  placeholder="Write Something Here..."
                  onChange={setbody}
                  style={{ height: "500px" }}
                  className="flex-1 border-none h-[280px] rounded-md w-full"
                  modules={quillModules}
                />
              </div>
            </div>
            <div className=" flex justify-end gap-x-5 p-2">
              <button
                className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[25px] uppercase active:bg-btnColor/50 `}
                onClick={() => {}}
              >
                Save
              </button>
            </div>
          </div>

          <div className="h-[100px] sm:h-[300px]">
            <div className=" h-full border-l-1 border-gray-400  ">
              <div className="flex flex-col py-5 md:py-10 text-sm gap-3 ml-2 ">
                {options?.map((pk) => (
                  <div
                    key={pk}
                    className={`${
                      currentOption === pk && "font-bold"
                    } relative cursor-pointer`}
                    onClick={() => selectOption(pk)}
                  >
                    <span className=" ml-3 flex items-start">{pk}</span>

                    <span
                      className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                        currentOption === pk ? "bg-green-700/80" : "bg-gray-300"
                      }  border-1 border-gray-400 absolute -left-[0.9rem] top-1 duration-200 transition-all`}
                    ></span>
                    {/* )} */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CreateAnouncementPopup;
