/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import Label from "../../../../components/forms/FormElements/Label";
import Input from "../../../../components/forms/FormElements/Input";
import { Select, DatePicker } from "antd";
import ReactQuill from "react-quill";
import { useSaveAnnouncement } from "../../../../components/Leave/Hooks";
import { useSaveAnnouncement_One } from "../../../../API/announcement";
import moment from "moment";
import { errorToast, successToast } from "../../../../utils/toastMsgPop";

function AnnouncementForm({
  setInformation,
  information,
  handleSubmit,
  loading,
  setLoading,
  reload,
}) {
  const {
    information: announcementInfo,
    keepAnnoucementData,
    clearData,
  } = useSaveAnnouncement();
  const { mutate: saveAnnouncement } = useSaveAnnouncement_One();
  const quillRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(null);

  //   state
  const [body, setbody] = useState("");
  const [doc, setDoc] = useState("");

  const isCurrentDateGreater = (currentDate) => {
    // Disable dates before the selected start date
    if (!startDate) {
      return false;
    }
    return currentDate && currentDate <= startDate;
  };

  // Define the list of holidays
  const holidays = [
    moment("2024-12-25"), // Christmas
    moment("2024-01-01"), // New Year's Day
    // Add more holidays as needed
  ];

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6; // Disable Sundays (0) and Saturdays (6)
  };

  const isHoliday = (date) => {
    return holidays.some((holiday) => date.isSame(holiday, "day"));
  };

  const disabledDate = (current) => {
    // Disable past dates, weekends, and holidays
    return (
      current &&
      (current < moment().startOf("day") ||
        isWeekend(current) ||
        isHoliday(current))
    );
  };
  const disabledEndDate = (current) => {
    // Disable past dates, weekends, and holidays
    return disabledDate(current) || isCurrentDateGreater(current);
  };

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

  //  keepAnnoucementData({start_date:data})
  //                   setInformation((prev) => {
  //                     return { ...prev, start_date: data.value };
  //                   })

  const handleFromDateChange = (dateData, dateString) => {
    setStartDate(dateData);
    keepAnnoucementData({ start_date: dateString });
    setInformation((prev) => {
      return { ...prev, start_date: dateString };
    });
  };
  const handleToDateChange = async (dateData, dateString) => {
    keepAnnoucementData({ end_date: dateString });
    setInformation((prev) => {
      return { ...prev, end_date: dateString };
    });
  };

  const change = (value) => {
    // console.log(value)
    keepAnnoucementData({ message: value });
    setInformation((prev) => {
      return { ...prev, message: value };
    });
  };

  return (
    <div>
      <div className={`flex flex-col border shadow-xl bg-white rounded-md`}>
        <div className="flex flex-col px-4 py-3">
          <div className="flex-col sm:flex-row gap-2  sm:gap-6 justify-between ">
            <Label htmlFor="notes">Subject</Label>
            <Input
              placeholder="announcement subject"
              value={announcementInfo?.subject}
              onChange={(e) => {
                // console.log(e.target.value);
                keepAnnoucementData({ subject: e.target.value });
                setInformation((prev) => {
                  return { ...prev, subject: e.target.value };
                });
              }}
            />
          </div>
        </div>
        <div className="flex flex-col px-4 py-3 ">
          <div className="flex-col sm:flex-row gap-2  sm:gap-6 justify-between ">
            <Label htmlFor="notes">Document Type</Label>
            <Select
              size={"large"}
              mode="tag"
              value={announcementInfo?.document_type}
              className="border-1 border-gray-300 rounded-md"
              style={{
                width: "100%",
              }}
              variant="borderless"
              options={[
                { label: "General", value: "1" },
                { label: "HR Form", value: "2" },
              ]}
              onChange={(value) => {
                keepAnnoucementData({ document_type: value });
                setInformation((prev) => {
                  return { ...prev, document_type: value };
                });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col px-4 py-3 pb-6 border-b border-gray-300">
          <div className="flex flex-col sm:flex-row gap-2  sm:gap-6  justify-between ">
            <div className="w-full">
              <Label htmlFor="notes">Start Date</Label>
              <DatePicker
                disabledDate={disabledDate}
                disabled={information.document_type == ""}
                placeholder={announcementInfo?.start_date}
                className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                onChange={handleFromDateChange}
              />
            </div>
            <div className="w-full">
              <Label htmlFor="notes">End Date</Label>
              <DatePicker
                disabledDate={disabledEndDate}
                disabled={information.start_date == ""}
                placeholder={announcementInfo?.end_date}
                className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                onChange={handleToDateChange}
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
              // value={body}
              value={announcementInfo?.message}
              placeholder="Write Something Here..."
              // onChange={setbody}
              onChange={change}
              style={{ height: "500px" }}
              className="flex-1 border-none h-[280px] rounded-md w-full"
              modules={quillModules}
            />
          </div>
        </div>
        <div className=" flex justify-end gap-x-5 p-2">
          <button
            className={`header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[25px] uppercase active:bg-btnColor/50 `}
            onClick={handleSubmit}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementForm;
