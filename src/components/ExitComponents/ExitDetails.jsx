import PropTypes from "prop-types";
// import { useState } from "react";

const ExitDetails = ({ currentViewedExitDetails, }) => {
// console.log(currentViewedExitDetails);
const formatDate = (date) => {
    const newDate = new Date(date);
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return dateFormatter.format(newDate);
  };

  const Approvals=({approvals})=>{
  return(
  <ul>
  {approvals.map((approval,i)=>(
  <li key={i} className="leading-6">{approval.name}</li>
  ))}
  </ul>
  )
  }

  Approvals.propTypes = {
  approvals: PropTypes.array,
};


  const details = [
    { label: "Name", value: currentViewedExitDetails.name },
    {
      label: "Compnany",
      value: currentViewedExitDetails.company,
    },
    {
      label: "Employment Type",
      value: currentViewedExitDetails.employment_type,
    },
    { label: "Date", value: formatDate(currentViewedExitDetails.date), },
    { label: "Approvals", value: <Approvals approvals={currentViewedExitDetails.approvals} /> },
    { label: "Status", value: "Approved" },
  ];

  return (
    <div className="my-8 px-6 md:mx-8">
      <div className=" py-4 px-6 shadow rounded">
      <h1 className="mb-5">Details</h1>
        <ul className="flex flex-col gap-5 my-4">
          {details.map((detail, i) => (
            <li
              className="grid grid-cols-3 gap-4 border-b border-gray-100"
              key={i}
            >
              <p className="font-medium">{detail.label}</p>
              <span className="text-gray-400 col-span-2">{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExitDetails;
ExitDetails.propTypes = {
  currentViewedExitDetails: PropTypes.object,
  handleSideModal: PropTypes.func,
};
