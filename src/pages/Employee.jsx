import DataTable1 from "../components/DataTable1";
import { IoMdGrid } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import InputEmployee from "../components/InputEmployee";
import { useState } from "react";
import EmployeeList from "../components/EmployeeList";

const Employee = () => {

    const [isGridMode, setisGridMode] = useState(false)



  return (
    <div className="mt-5">
      <div className="flex justify-between flex-wrap gap-y-2">
        <div>
          <div className=" text-3xl font-bold">Employee</div>
          <div className="flex text-gray-700 gap-1">
            <div className="text-gray-800 font-bold">Dashboard</div>
            <div>/</div>
            <div>Employee</div>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap" >
          <div onClick={()=>setisGridMode(true)} className="w-10 h-10 bg-white p-3  px-5 flex items-center justify-center border  rounded-lg shadow-md hover:cursor-pointer">
            <div>
              <IoMdGrid  color={isGridMode ?  "gray" : "black"} size={23} />
            </div>
          </div>
          <div  onClick={()=>setisGridMode(false)} className="w-10 h-10 bg-white p-3  px-5 flex items-center justify-center border  rounded-lg shadow-md hover:cursor-pointer">
            <div>
              <IoMenu  color={!isGridMode ?  "gray" : "black"} size={23} />
            </div>
          </div>
          <div className="w-40 h-10 bg-btnColor text-white p-3  px-5 flex items-center  border  rounded-3xl shadow hover:cursor-pointer justify-between outline-none hover:shadow-lg">
            {" "}
            <span className="font-bold  text-xl">+</span>Add Employee
          </div>
        </div>
      </div>



      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6  lg:grid-cols-4 lg:gap-8 my-10">

        <InputEmployee tag={'Employee ID'}/>
        <InputEmployee tag={'Employee Name'}/>
        <select name="" id="" className="relative block overflow-hidden rounded-md border border-gray-200 px-4 py-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-white">
            <option value="select Designation" >Select Designation</option>
            <option value="Web Developer">Web Developer</option>
            <option value="Web Developer">Web Designer</option>
            <option value="Web Developer">Adroid Developer</option>
            <option value="Web Developer">Ios Developer</option>
        </select>
        <div className="w-40 h-12 bg-green-500 hover:bg-green-700 text-white p-3  px-5 flex items-center justify-center  border  rounded-md shadow hover:cursor-pointer  outline-none hover:shadow-lg">
           
            SEARCH
          </div>

       
     </div>

      <div className="flex py-3 gap-2 items-center">
        <div>Show</div>
        <div>
            <select name="" id="" className="rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 bg-white flex ">
                <option value="100">100</option>
                <option value="50">50</option>
                <option value="30">30</option>
                <option value="10">10</option>
            </select>
        </div>
        <div>entries</div>
      </div>


{
    isGridMode ?  <DataTable1 /> : <EmployeeList/>
}
    
    </div>
  );
};

export default Employee;
