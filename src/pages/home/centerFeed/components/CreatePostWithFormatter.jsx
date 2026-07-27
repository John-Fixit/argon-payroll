/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";

const CreatePostWithFormatter = ({desc, setDesc, setFile, file }) => {

  const quillRef = useRef(null);
  const quillModules = {
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

  useEffect(() => {
    // Access the Quill instance
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      if (editor) {
        // Set the height of the editor
        editor.root.style.minHeight = '150px'; // Adjust the height as needed
      }
    }
  }, []);

  return (
    <div className="flex flex-col rounded-md  space-y-3  bg-white dark:bg-cardDarkColor">
      <div className="flex justify-between ">

        <div className=" space-x-6 flex"></div>
      </div>

      <div>
        <div className="flex items-center bg-xinputLight rounded">
          <ReactQuill
            theme="snow"
            ref={quillRef}
            // style={{ height: '100%' }}
            value={desc}
            placeholder="Write Something Here..."
            onChange={setDesc}
            className="flex-1 border-none"
            modules={quillModules}
          />
        </div>
      </div>     
    </div>
  );
};

export default CreatePostWithFormatter;
