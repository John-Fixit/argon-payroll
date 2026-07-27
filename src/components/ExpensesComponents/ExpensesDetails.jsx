import PropTypes from "prop-types";
// import { useState } from "react";

const ExpensesDetails = ({ currentViewExpenses, }) => {
// console.log(currentViewExpenses);
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
    { label: "Item", value: currentViewExpenses.item },
    {
      label: "Description",
      value: currentViewExpenses.description,
    },
    {
      label: "Purchased from",
      value: currentViewExpenses.purchased_from,
    },
    {
      label: "Purchased by",
      value: currentViewExpenses.purchased_by,
    },
    {
      label: "Paid by",
      value: currentViewExpenses.paid_by,
    },
    { label: "Amount", value: currentViewExpenses.amount, },
    { label: "Date", value: formatDate(currentViewExpenses.date), },
    { label: "Approvals", value: <Approvals approvals={currentViewExpenses.approvals} /> },
    { label: "Status", value: currentViewExpenses.status },
  ];

  return (
      <div className="bg-white py-4 px-6 shadow rounded">
      {/* <h1 className="mb-5">Details</h1> */}
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
  );
};

export default ExpensesDetails;
ExpensesDetails.propTypes = {
  currentViewExpenses: PropTypes.object,
  handleSideModal: PropTypes.func,
};
