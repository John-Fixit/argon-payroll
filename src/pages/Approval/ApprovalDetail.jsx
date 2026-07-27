// import React from 'react'

const ApprovalDetail = () => {
  const details = [
    { label: "Leave Type", value: "Casual" },
    { label: "Leave Start Date", value: "Jan 26, 2024" },
    { label: "Resumption Date", value: "Feb 5, 2024" },
    { label: "Reason", value: "Personal" },
    { label: "No of days", value: "10 days" },
    { label: "Hand over", value: "John Fixit" },
    { label: "Status", value: "Approved"},
  ];

  return (
    <>
      <div className="shadow border rounded p-4 bg-white w-full">
        <h4 className="text-lg font-medium font-helvatica">Leave details</h4>
        <ul className="flex flex-col gap-5 my-4">
          {details.map((detail, i) => (
            <li className="grid grid-cols-3 gap-4" key={i}>
              <p className="font-medium">{detail.label}</p>
              <span className="text-gray-400 col-span-2">{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>
   
    </>
  );
}

export default ApprovalDetail