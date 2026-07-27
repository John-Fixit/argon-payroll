/* eslint-disable no-unused-vars */
import {
  Avatar,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useRef, useState } from "react";

import { Input } from "@nextui-org/react";
import { PlusIcon,} from "lucide-react";
import { IoIosClose,} from "react-icons/io";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import Attachments from "./Attachments";

const Attachment = () => {
  const fileInputRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleNameInputChange = (e) => {
    setAttachmentName(e.target.value);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    // setAttachmentName(file.name)
    setAttachmentFile(file);
    // setSelectedFile(URL.createObjectURL(file)) // Create a URL for preview
    setSelectedFile(attachmentFile); // Create a URL for preview
  };

  const handleAddAttachment = () => {
    if (attachmentName.trim() !== "" && attachmentFile) {
      setAttachments([
        ...attachments,
        { name: attachmentName, file: attachmentFile },
      ]);
      setAttachmentName("");
      setAttachmentFile(null);
      setSelectedFile(null); // Clear the selected file preview
    }
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit attachments goes here
    // For example, you might want to send attachments to an API, save them in the database, etc.
    // console.log("Submitted Attachments:", attachments);
    setAttachments([]);
  };

  const previewImage = (image) => {
    if (image) {
      return URL.createObjectURL(image);
    }
  };

  return (
    <div className="px-8 py-4">
      {/* <h3 className="font-serif text-lg capitalize">add attachment</h3> */}
      {/* <form onSubmit={handleSubmit}>
        <div>
          <div className="">
            <div
              className="bg-gray-100 p-1 rounded-lg flex justify-between items-center hover:bg-gray-200 cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <input
                type="file"
                className="hidden"
                id="fileInput"
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <p className="ms-2">{attachmentFile?.name}</p>
              <Button
                size="sm"
                className="bg-blue-400 hover:bg-blue-500 text-white rounded-md shadow font-medium"
              >
                Browse
              </Button>
            </div>
          </div>
          <Input
            type="text"
            size="md"
            value={attachmentName}
            label="Attachment Name"
            labelPlacement="outside"
            onChange={handleNameInputChange}
            className=" bgwhite w-ful my-2 ring-0 rounded-md "
          />
          <div className="flex justify-end">
            <Button
              color="primary"
              size="sm"
              className="my-4 rounded font-normal hover:-translate-y-1 ease-in-out duration-300"
              onClick={handleAddAttachment}
              startContent={<PlusIcon size={15} />}
            >
              {attachments.length > 0 ? "Add more" : "Add"}
            </Button>
          </div>
        </div>
        <div>
          <div className="my-4">
            {attachments.map((attachment, index) => (
              <Card key={index} className=" my-2 shadow">
                <CardBody className="flex flex-row justify-between items-center gap-3 bg-slate-50">
                  <div className="flex gap-2 items-center">
                    {attachment.file.name.toLowerCase().endsWith(".png") ||
                      attachment.file.name.toLowerCase().endsWith(".jpeg") ||
                      (attachment.file.name.toLowerCase().endsWith(".jpg") && (
                        <Avatar
                          src={attachment.file && previewImage(attachment.file)}
                        />
                      ))}
                    {attachment.file.name.toLowerCase().endsWith(".pdf") && (
                      <BsFileEarmarkPdfFill
                        size={30}
                        className="text-red-500"
                      />
                    )}
                    <div>
                      <div className="text-[#444] font-medium">
                        Name: {attachment.name}
                      </div>
                      <div>
                        {" "}
                        <span className="font-semibold">File:</span>{" "}
                        {attachment.file.name}
                      </div>
                    </div>
                  </div>
                  <IoIosClose
                    size={25}
                    className="cursor-pointer hover:bg-slate-100"
                    onClick={() => handleDeleteAttachment(index)}
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        {attachments.length > 0 && (
          <div className="flex justify-end">
            <Button
              size="sm"
              type="submit"
              color="success"
              className="my-4 text-white rounded font-medium"
            >
              Submit
            </Button>
          </div>
        )}
      </form> */}
<Attachments/>
    </div>
  );
};

export default Attachment;
