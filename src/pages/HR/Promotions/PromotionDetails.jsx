import PropTypes from "prop-types";
// import { useState } from "react";

const PromotionDetails = ({ currentViewTraining, }) => {
// console.log(currentViewTraining);

  const Employees=({employees})=>{
  return(
  <ul>
  {employees.map((empoyee,i)=>(
  <li key={i} className="leading-6">{empoyee.name}</li>
  ))}
  </ul>
  )
  }

  Employees.propTypes = {
  employees: PropTypes.array,
};


  const details = [
    { label: "Training Type", value: currentViewTraining.type },
    {
      label: "Trainer",
      value: currentViewTraining.trainer,
    },
    {
      label: "Description",
      value: currentViewTraining.description,
    },
    {
      label: "Cost",
      value: currentViewTraining.cost,
    },
    {
      label: "Duration",
      value: currentViewTraining.duration,
    },
    { label: "Employees", value: <Employees employees={currentViewTraining.employees} /> },
    { label: "Status", value: currentViewTraining.status },
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

export default PromotionDetails;
PromotionDetails.propTypes = {
  currentViewTraining: PropTypes.object,
  handleSideModal: PropTypes.func,
};
