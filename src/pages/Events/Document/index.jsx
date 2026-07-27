/* eslint-disable no-unused-vars */
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import PageHeader from "../../../components/payroll_components/PageHeader";
import { FaFile } from "react-icons/fa";
import Separator from "../../../components/payroll_components/Separator";
import DocumentTable from "./DocumentTable";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";

const data = [
  {
    _id: 1,
    title: "Document Title",
    desc: "ASSUMPTION OF DUTY CERTIFICATE",
    startDate: "12-01-2024",
    endDate: "12-01-2024",
  },
  {
    _id: 2,
    title: "Document Title",
    desc: "cHANGE OF NEXT OF KIN FORM",
    startDate: "12-01-2024",
    endDate: "12-01-2024",
  },
  {
    _id: 3,
    title: "Document Title",
    desc: "EMPLOYMENT APPLICATION FORM",
    startDate: "12-01-2024",
    endDate: "12-01-2024",
  },
  {
    _id: 4,
    title: "Document Title",
    desc: "EXIT INTERVIEW FORM",
    startDate: "12-01-2024",
    endDate: "12-01-2024",
  },
  {
    _id: 5,
    title: "Document Title",
    desc: "RECRUITMENT INTERVIEW EVALUATION SCORE SHEET",
    startDate: "12-01-2024",
    endDate: "12-01-2024",
  },
  {
    _id: 6,
    title: "Document Title",
    desc: "SALARY ADVANCY FORM",
    startDate: "12-01-2024",
    endDate: "12-01-2024",
  },
  {
    _id: 7,
    title: "Document Title",
    desc: "SUBMISSION OF ACCOUNT DETAILS",
    startDate: "12-01-2024",
    endDate: "12-01-2024",
  },
];

const grade = ['6', '50', '5', '4', '17', '2', '3', '0', '1', '60', '7', '8', '9'];
const directorate = [
  "DG OFFICE",
  "DIRECTORATE OF AERODOME & AIRSPACE STANDARDS",
  "DIRECTORATE OF AIR TRANSPORT REGULATION",
  "DIRECTORATE OF AIRWORTHINESS STANDARD",
  "DIRECTORATE OF AVIATION SECURITY",
];
const department = [
  "AIR NAV STANDARD",
  "LEGAL SERVICES",
  "ACCA",
  "ACCA",
  "ACCOUNTANTS",
  "ADMINISTRATION",
  "AERODOMES STANDARDS",
  "AEROMEDICAL STANDARD",
];

const Document = () => {
  const [allData, setAllData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [belongsTo, setBelongsTo] = useState("");
  // useForm from react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const formValues = getValues();

  // funtion to add new document
  const handleAddData = (values) => {
    const { attachment } = values;
    const newAttachment = attachment ?? URL.createObjectURL(attachment[0]);
    setAllData([
      ...allData,
      { ...values, attachment: newAttachment, _id: allData?.length },
    ]);
    reset();
    setSelectedFile('')
  };

  // function for download the document
  const handleDownloadDoc=(file)=>{
    // const link = document.createElement('a');
    // link.href = file;
    // link.download = 'filename';
    // document.body.appendChild(link);
    // link.click();

    // // Remove the anchor from the body
    // document.body.removeChild(link);
  }

  //function to delete document
  const handleDelete=(id)=>{
    const newData = allData.filter(item=>item._id !== id);
    setAllData(newData);
  }

  return (
    <>
      <div className="py-4 pr-5">
        <div className="shadow-sm w-full">
          <PageHeader header_text={"Add New Document"} btnAvailable={false} />
          <form onSubmit={handleSubmit(handleAddData)} className="p-4">
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="">
                <Input
                  type="text"
                  label="Title"
                  variant="bordered"
                  placeholder="title"
                  labelPlacement="outside"
                  {...register("title")}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="">
                <Textarea
                  variant={"bordered"}
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter your description"
                  {...register("description")}
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="">
                <RadioGroup
                  label="Select your favorite city"
                  orientation="horizontal"
                  {...register("belongsTo")}
                  onChange={(e) => setBelongsTo(e.target.value)}
                >
                  <Radio value="All">All</Radio>
                  <Radio value="grade">Grade</Radio>
                  <Radio value="directorate">Directorate</Radio>
                  <Radio value="department">Department</Radio>
                </RadioGroup>
                {!!belongsTo && belongsTo !== "All" ? (
                  <div className="my-2">
                    <label htmlFor="" className="capitalize">
                      Choose {belongsTo}
                    </label>
                    <Select
                      variant={"bordered"}
                      className=""
                      labelPlacement="outside2"
                      aria-label={"belongs to"}
                    >
                      { belongsTo === "grade"&& 
                      grade.map((item, index) => (
                            <SelectItem key={index + "_"} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                      {belongsTo === "directorate" &&
                        directorate.map((directorate) => (
                          <SelectItem key={directorate} value={directorate}>
                            {directorate}
                          </SelectItem>
                        ))}
                      {belongsTo === "department" &&
                        department.map((item, index) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                ) : (
                  ""
                )}
                {/* <div className="border h-48 overflow-y-auto  my-3 flex flex-col p-3 gap-1 -webkit-scrollbar:w-[3px]">
                  {formValues?.belongsTo === "grade" &&
                    grade.map((item, index) => (
                      <span
                        key={index}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  {formValues?.belongsTo === "directorate" &&
                    directorate.map((item, index) => (
                      <span
                        key={index}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  {formValues?.belongsTo === "department" &&
                    department.map((item, index) => (
                      <span
                        key={index}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        {item}
                      </span>
                    ))}
                  <p>AIR NAV STANDARD</p>
                </div> */}
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <div className="">
                <Input
                  type="date"
                  label="Start Date"
                  variant="bordered"
                  placeholder="Enter the Start Date"
                  labelPlacement="outside"
                  {...register("startDate")}
                />
              </div>
              <div className="">
                <Input
                  type="date"
                  label="End Date"
                  variant="bordered"
                  placeholder="Enter the End Date"
                  labelPlacement="outside"
                  {...register("endDate")}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 col-span-3 gap-4 my-4">
              <label
                htmlFor="fileAttachment"
                className={`flex gap-2 cursor-pointer ${
                  selectedFile ? "text-success" : ""
                }`}
              >
                <span className="my-auto">
                  {selectedFile ? <FaCheck color="green" /> : <FaFile />}
                </span>
                Add Attachment
              </label>
              <input
                type="file"
                id="fileAttachment"
                className="hidden"
                {...register("attachment")}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
            </div>
            <div className="flex justify-en space-x-3">
              <Button
                size="md"
                className="bg-[#00bcc2] text-white"
                type="submit"
              >
                Add Document
              </Button>
            </div>
          </form>
        </div>

        {allData?.length > 0 && (
          <>
            <Separator separator_text={"Document List"} />
            <DocumentTable rows={allData} handleDelete={handleDelete} handleDownloadDoc={handleDownloadDoc}/>
          </>
        )}
      </div>
    </>
  );
};

export default Document;
