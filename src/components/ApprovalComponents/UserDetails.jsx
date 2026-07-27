
import PropTypes from 'prop-types'
import { useState } from 'react';
import Stepper from './Stepper';
import RejectModal from './RejectModal';


const UserDetails = ({user,handleSideModal}) => {
const [isOpen, setIsOpen] = useState(false);
 const [currentStep, setCurrentStep] = useState(1);
  const onChange = nextStep => {
    setCurrentStep(nextStep < 1 ? 1 : nextStep > 2 ? 2 : nextStep);
  };

  const onNext = () => onChange(currentStep + 1);
  const onPrevious = () => onChange(currentStep - 1);


  const first_page_details = [
    { label: "Title", value: "Mr" },
    { label: "Full Name", value: `${user.lastName} ${user.firstName}` },
    { label: "Email", value: "fixit@gmail.com" },
    { label: "Phone Number", value: "07034758697" },
    { label: "Address", value: "No 4. ABC, Oxford Street" },
    { label: "Marital Status", value: "Married" },
    { label: "Blood Group", value: "B+" },
    { label: "Profession", value: "Engineering" },
    { label: "Nationality", value: "Nigeria" },
    { label: "State of Origin", value: "Oyo State" },
    { label: "Local Government", value: "Ogbomoso North" },
    { label: "Residential State", value: "Lagos State" },
    { label: "Residential LGA", value: "Alimosho LGA" },
    { label: "Residential Address", value: "No 4. ABC, Oxford Street" },
  ];
  const second_page_details = [
    { label: "Directorate", value: "Directorates of aviation security" },
    { label: "Department", value: "Licensing" },
    { label: "Unit", value: "ATC" },
    { label: "Designation", value: "AGM (ATM)" },
    { label: "Grade Level", value: "15" },
    { label: "Step", value: "10" },
    { label: "Employee Type", value: "Full Time" },
    { label: "Date of First Appointment", value: "2008-04-07" },
    { label: "Date of First Arrival", value: "2022-06-27" },
    { label: "Current Appointment Date", value: "2019-01-01" },
    { label: "Date of Birth", value: "2019-01-01" },
    { label: "Status", value: user.status.toUpperCase() },
  ];
 
  return (
    <div className="">
      <div className=" py-4 px-6 shadow rounded bg-white">
  <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
     {currentStep==1?
     <div>
      <ul className='flex flex-col gap-5 my-4'>
        {first_page_details.map((detail, i) => (
          <li className="grid grid-cols-3 gap-4 border-b border-gray-100" key={i}>
            <p className="font-medium">{detail.label}</p>
            <span className="text-gray-400 col-span-2">{detail.value}</span>
          </li>
        ))}
      </ul>
     </div>
      : 
      <div>
       <ul className='flex flex-col gap-5 my-4'>
        {second_page_details.map((detail, i) => (
          <li className="grid grid-cols-3 gap-4 border-b border-gray-100" key={i}>
            <p className="font-medium">{detail.label}</p>
            <span className="text-gray-400 col-span-2">{detail.value}</span>
          </li>
        ))}
        {user.status=='rejected'&&
         <li className="grid grid-cols-3 gap-4 border-b border-gray-100">
            <p className="font-medium">Reason for rejection</p>
            <span className="text-gray-400 col-span-2">There is something wrong</span>
          </li>
        }
      </ul>
      </div> }
        <div className="flex justify-end gap-4">
        <button className={`bg-gray-400 hover:bg-gray-500 transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 ${currentStep==1&&'hidden'}`} onClick={onPrevious}>Previous</button>
        <button className={`bg-[#00BCC2] hover:bg-[#00979C] transition-all text-xs rounded-[4px] text-white font-medium px-4 py-2 ${currentStep==2&&'hidden'}`} onClick={onNext}>Next</button>
        </div>
      </div>
       {user.status=='pending'&& <div className="flex item-center gap-4 justify-center my-4">
        <button className="border hover:border-transparent hover:bg-gray-400 transition-all rounded-[4px] hover:text-white font-medium px-4 py-2" onClick={()=>setIsOpen(true)}>Reject</button>
        <button className="bg-green-500 hover:bg-green-600 transition-all rounded-[4px] text-white font-medium px-4 py-2" onClick={()=>handleSideModal(false)}>Accept</button>
        </div>}
        <RejectModal isOpen={isOpen} setIsOpen={setIsOpen} handleSideModal={handleSideModal} />
    </div>
  );
};

export default UserDetails;
UserDetails.propTypes={
user:PropTypes.object,
handleSideModal:PropTypes.func,
}
