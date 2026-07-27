/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useEffect, useState } from "react";
import { options, reasons } from "./data";
import PropTypes from "prop-types";
import { Button } from "@nextui-org/react";
import { DatePicker } from "antd";
import Input from "../forms/FormElements/Input";
import Select from "react-tailwindcss-select";
import Label from "../forms/FormElements/Label";
import {
  useApplyLeave,
  useDuration,
  useLeaveType,
  useReason,
} from "../../API/leave.js";
import moment from "moment";
import toast from "react-hot-toast";
import { useSaveData } from "./Hooks.js";

const LeaveForm = ({
  leaveInformation,
  setLeaveInformation,
  goToNextTab,
  isOpen,
  setIsOpen,
}) => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [showDuration, setShowDuration] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const { isFetched, data } = useLeaveType({
    company_id: leaveInformation.company_id,
  });
  const { mutate: getDuration } = useDuration();
  const { mutate: getReasons } = useReason();
  const { mutate: applyForLeave } = useApplyLeave();

  const { information: info, keepData } = useSaveData();

  // const handleFromDateChange = (dateData,dateString) => {
  // keepData({start_date:dateData})
  //   setLeaveInformation((prev) => {
  //     return { ...prev, start_date: dateString };
  //   });
  // };
  const handleFromDateChange = (dateString) => {
    setStartDate(dateString);
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    const formattedDate = `${year}-${month}-${day}`;
    keepData({ start_date: formattedDate });

    setLeaveInformation((prev) => {
      return { ...prev, start_date: formattedDate };
    });
  };

  const okay = (date) => {
    // console.log(date.map((current) => moment(current.$d).format("YYYY-MM-DD")));
    setLeaveInformation((prev) => {
      return {
        ...prev,
        multi_date: date.map((current) =>
          moment(current.$d).format("YYYY-MM-DD")
        ),
      };
    });
  };

  useEffect(() => {
  // console.log(leaveInformation);
  
  if (leaveInformation?.start_data !== "" && leaveInformation?.end_date !== "") {
    setShowDuration(true)
  }else{
    setShowDuration(false)
  }
  }, [leaveInformation])
  

  useEffect(() => {
    if (isFetched) {
      // console.log(data);
      setLeaveTypes(
        data?.data?.data?.map((type) => {
          return { ...type, value: type.TYPE_NAME, label: type.TYPE_NAME };
        })
      );
    }
  }, [isFetched, data]);


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
    return (
      current &&
      (current < moment().startOf("day") ||
        isWeekend(current) ||
        isHoliday(current) ||
        isCurrentDateGreater(current))
    );
  };

 
  const handleToDateChange = (dateString, dated) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    // console.log(`${year}-${month}-${day}`);
    const formattedDate = `${year}-${month}-${day}`;
    keepData({ end_date: formattedDate });

    setLeaveInformation((prev) => {
      return { ...prev, end_date: formattedDate };
    });
  };

  useEffect(() => {
    if (
      leaveInformation.leave_type !== "" &&
      leaveInformation.start_date !== "" &&
      leaveInformation.end_date !== ""
    ) {
      const payload = {
        company_id: leaveInformation.company_id,
        start_date: leaveInformation.start_date,
        end_date: leaveInformation.end_date,
        leave_type: leaveInformation.leave_type,
      };
      getDuration(payload, {
        onSuccess: (data) => {
          setLeaveInformation((prev) => {
            return { ...prev, duration: data?.data?.days };
          });
        },
      });
    }
  }, [leaveInformation.leave_type, leaveInformation.start_date, leaveInformation.end_date, leaveInformation.company_id, getDuration, setLeaveInformation]);

  useEffect(() => {
    if (leaveInformation.leave_type !== null) {
      getReasons(
        {
          company_id: leaveInformation.company_id,
        },
        {
          onSuccess: (data) => {
            setReasons(
              data?.data?.data?.map((reason) => {
                return {
                  ...reason,
                  value: reason.REASON_ID,
                  label: reason.REASON_NAME,
                };
              })
            );
          },
        }
      );
    }
  }, [getReasons, leaveInformation.company_id, leaveInformation.leave_type]);

  

  return (
    <Fragment>
      <div className="bg-white w-full p-4 shadow rounded">
        <div className="py-4">
          <div className="my-4 items-center gap-1 border-b pb-4">
            <Label>Leave Type</Label>
            <div className="w-full md:col-span-2">
              <Select
                value={info?.leave_type}
                options={leaveTypes}
                isSearchable={true}
                onChange={(value) => {
                  keepData({ leave_type: value });
                  setLeaveInformation((prev) => {
                    return { ...prev, leave_type: value.TYPE_ID };
                  });
                }}
              />
            </div>
          </div>
          <div className="my-4 items-center gap-1 border-b pb-4">
            <Label htmlFor="reason">Leave Reason</Label>
            <div className="md:col-span-2">
              <Select
                options={reasons}
                isSearchable={true}
                value={info?.reason}
                onChange={(result) => {
                  keepData({ reason: result });
                  setLeaveInformation((prev) => {
                    return { ...prev, reason: result.value };
                  });
                }}
              />
            </div>
          </div>
          {info?.leave_type?.value == "Academics" ? (
            <div className="my-4 items-center gap-1 border-b pb-4">
              <Label>Dates</Label>
              <DatePicker
                multiple
                disabledDate={disabledDate}
                maxTagCount="responsive"
                needConfirm
                onOk={okay}
                className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
              />
            </div>
          ) : (
            <div>
              <div className="my-4 items-center gap-1 border-b pb-4">
                <Label>From</Label>
                <DatePicker
                  disabledDate={disabledDate}
                  disabled={leaveInformation.leave_type==''}
                  onChange={(e) => handleFromDateChange(e)}
                  placeholder={info?.start_date}
                  className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
              </div>

              <div className="my-4 items-center gap-1 border-b pb-4">
                <Label htmlFor="to">To</Label>
                <DatePicker
                  disabledDate={disabledEndDate}
                  disabled={leaveInformation.start_date==''}
                  onChange={(e) => handleToDateChange(e)}
                  placeholder={info?.end_date}
                  className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
                />
              </div>
              {showDuration && (
                  <div className="my-4 items-center gap-1 border-b pb-4">
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      type="text"
                      disabled
                      value={
                        leaveInformation.duration == ""
                          ? ""
                          : leaveInformation?.duration > 1
                          ? `${leaveInformation?.duration} days`
                          : `${leaveInformation?.duration} day`
                      }
                      className="md:col-span-2"
                    />
                  </div>
                )}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            size="sm"
            className="rounded-md font-medium shadow font-helvetica uppercase"
            color="secondary"
            onClick={goToNextTab}
          >
            Next
          </Button>
         
        </div>
      </div>
    </Fragment>
  );
};

export default LeaveForm;

LeaveForm.propTypes = {
  setLeaveInformation: PropTypes.func,
  leaveInformation: PropTypes.object,
  goToNextTab:PropTypes.func,
  // isOpen:PropTypes.bool,
  // setIsOpen: PropTypes.func
};
