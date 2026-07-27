/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import 'react-datepicker/dist/react-datepicker.css'
import { DatePicker } from "antd";
import Label from "../../forms/FormElements/Label";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import moment from "moment";
// import { errorToast, successToast } from "../../../utils/toastMsgPop.js";

export default function LeaveReturnTextForm({
  information,
  startDate,
  setInformation,
  setAntDate,
  antDate,
  goToNextTab,
}) {

  const [dateF, setDateF] = useState("");

  const changeDate = (date, dateString) => {
    setInformation((information) => {
      return { ...information, return_date: dateString };
    });
    setAntDate(date);
  };

  //================= Date to be Disabled ==================
  const disabledDate = (current) => {
    const holidays = ["2024-01-01", "2024-12-25"]; // Add your holiday dates here
    const specificDate = moment(startDate);

    // Disable all dates before "2024-08-16"
    if (current && current < specificDate) {
      return true;
    }

    // Disable the specific date "2024-08-16"
    if (current && current.isSame(specificDate, "day")) {
      return true;
    }

    // Disable weekends (Saturday and Sunday)
    if (current.day() === 0 || current.day() === 6) {
      return true;
    }

    // Disable holidays
    if (holidays.includes(current.format("YYYY-MM-DD"))) {
      return true;
    }

    return false;
  };

  return (
    <div className="grid gap-2 w-full p-8 bg-white rounded shadow">
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
        <Label>Returning date</Label>
        <DatePicker
          disabledDate={disabledDate}
          value={antDate}
          onChange={changeDate}
          className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          className="rounded-md font-medium shadow font-helvetica uppercase"
          color="secondary"
          onClick={goToNextTab}
          // disabled={loading}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
