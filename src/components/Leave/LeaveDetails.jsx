/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// import moment from "moment";
import { Chip } from "@nextui-org/react";
import { useGetRequest_Detail } from "../../API/api_urls/my_approvals";
import { toStringDate } from "../../utils/utitlities";

const LeaveDetails = ({ currentView }) => {
  const { data, isPending, isError } = useGetRequest_Detail(
    currentView?.REQUEST_ID
  );

  const request_detail = data?.data?.data;


  let filtered_details = {};

  if (request_detail?.data?.SELECTED_DATES) {
    // Delete START_DATE and END_DATE keys
    const { START_DATE, END_DATE, ...rest } = request_detail?.data;
    filtered_details = rest; // Return the new object without START_DATE and END_DATE
  } else {
    filtered_details = request_detail?.data;
  }

  // console.log(filtered_details)

  const details = {
    data: filtered_details,
    approvers: request_detail?.approvers,
    notes: request_detail?.notes,
    attachments: request_detail?.attachments,
    isLoading: isPending,
    isError: isError,
  };

  // console.log(request_detail);

  const formatDates = (datesString) => {
    // const datesString = "2024-08-23,2024-08-26,2024-08-27,2024-08-29,2024-09-02";

    // Function to get the ordinal suffix for a day
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th"; // Special case for teens
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    // Function to format a single date
    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      const dayWithSuffix =
        parseInt(day, 10) + getOrdinalSuffix(parseInt(day, 10));
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return {
        day: dayWithSuffix,
        month: monthNames[parseInt(month, 10) - 1],
        year,
      };
    };

    // Split the string into an array of dates and format them
    const formattedDatesArray = datesString.split(",").map(formatDate);

    // Group dates by month
    const groupedByMonth = formattedDatesArray.reduce((acc, date) => {
      const key = `${date.month} ${date.year}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(date.day);
      return acc;
    }, {});

    // Create the formatted output string
    let formattedDates = "";
    for (const [key, days] of Object.entries(groupedByMonth)) {
      if (formattedDates) {
        formattedDates += ", and ";
      }
      if (days.length > 1) {
        formattedDates +=
          days.slice(0, -1).join(", ") + " and " + days[days.length - 1];
      } else {
        formattedDates += days[0];
      }
      formattedDates += ` of ${key}`;
    }
    return formattedDates;
    // console.log(formattedDates);
  };

  return (
    <div className="shadow border rounded p-4 bg-white w-full">
      {/* <h4 className="text-lg font-medium">Leave Details</h4> */}

      {details?.isLoading ? (
        <p>Loading...</p>
      ) : details?.isError ? (
        <p>Error...</p>
      ) : (
        <ul className="flex flex-col gap-5 my-4">
          {Object.entries(details?.data)
            ?.filter(([key]) => key !== "FILE_NAME" && key !== "REQUEST_ID")
            ?.map(([key, value], i) => (
              <li className="grid grid-cols-3 gap-4 border-b-1 pb-2" key={i}>
                <p className="font-medium font-helvetica uppercase">
                  {key.replace(/_/g, " ")}
                </p>
                {/* <span className="text-gray-400 col-span-2">{((key.includes('DATE')) || (key.includes('Date')) ) ? (value ? toStringDate(value) : "N/A" ) : (value !== null ? value : 'N/A')}</span> */}
                <span className="text-gray-400 col-span-2 font-helvetica !font-thin">
                  {key == "REQUEST_DATE"
                    ? value
                      ? `${toStringDate(value)}`
                      : "N/A"
                    : key == "START_DATE"
                    ? value
                      ? toStringDate(value)
                      : "N/A"
                    : key == "END_DATE"
                    ? value
                      ? toStringDate(value)
                      : "N/A"
                    : // :key=='SELECTED_DATES'?(value?formatDates(value):'N/A')
                    key == "SELECTED_DATES"
                    ? value?.split(",")?.map((el, i) => (
                        <Chip
                          key={i}
                          color="primary"
                          className="m-1"
                          size="sm"
                          variant="flat"
                        >
                          {toStringDate(el) || ""}
                        </Chip>
                      ))
                    : value}
                </span>
              </li>
            ))}
        </ul>
      )}

      {/* <ul className="flex flex-col gap-5 my-4">
          {details?.map((detail, i) => (
            <li className="grid grid-cols-3 gap-4" key={i}>
              <p className="font-medium">{detail.label}</p>
              <span className="text-gray-400 col-span-2">{detail.value}</span>
            </li>
          ))}
        </ul> */}
    </div>
  );
};

export default LeaveDetails;
