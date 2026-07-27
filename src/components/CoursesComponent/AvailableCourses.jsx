/* eslint-disable no-unused-vars */
// import React from 'react'
// import women from '../../../../assets/images/women-on-laptops-around-table.jpg'
import women from '../../../public/assets/images/women-on-laptops-around-table.jpg'

import { useState } from "react";
import Drawer from "../Request&FormComponent/Drawer";
import Course from "./Course";
import { courses } from "./data";
import { Button, button } from "@nextui-org/react";
import { MdOutlineStar } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import SelectedCourse from './SelectedCourse';
import PageHeader from '../payroll_components/PageHeader';
import Separator from '../payroll_components/Separator';

import { MoreHorizontal } from 'lucide-react';
import TopCards from '../../pages/SelfService/Training/TrainingDashboard/TopCards';


const AvailableCourses = () => {
  const [open, setOpen] = useState(false)
const [isOpen, setIsOpen] = useState(false)
const [selectedCourse, setSlectedCourse] = useState({})
const [selectedCategory, setselectedCategory] = useState('Popular')

const [selected, setSelected] = useState(  {
  name: "Open",
  progress: 14,
  total: 4,
  stroke: 'stroke-amber-500',
  bg: 'bg-amber-500',
},)


const categories=['Popular','Technology','Business','Diploma']

  const handleClick=(course)=>{
  setIsOpen(true)
  setSlectedCourse(course)
  }

  const handleOpen=()=>{
    setOpen(true)
}
const handleSeleted = (item)=>{
  setSelected(item)
}

  return (
    <div className="font-poppins">
   <main>
        <PageHeader
          header_text={"Courses"}
          breadCrumb_data={[{ name: "Self Service" }, { name: "Courses" }]}
          buttonProp={[{ button_text: "New Courses", fn: handleOpen }]}
        />
        <div className="mt-5">
          {/* <hr /> */}
        </div>
        <>
          <Separator separator_text={"OVERVIEW"} />
          <TopCards setSelected={handleSeleted}/>
        </>
        
       
                  

          {/* <div className='bg-white rounded-lg border mt-8'>
   
              <div className="w-full bg-white flex flex-col border-b-4 p-3 rounded-t-md relative overflow-">
                  <div className="flex gap-5">
                      <span className="font-semibold">{selected?.name}</span>
                      <MoreHorizontal className="text-gray-400"/> 
                      <span className="text-gray-300 font-semibold">{selected?.total}</span>

                  </div>
                      <div className={`w-32 h-1 absolute -bottom-1 left-[0.2px] ${selected?.bg}`}></div>
              </div>
          </div> */}
      </main>



















    {/* <h1 className=" text-2xl md:text-[25px] font-semibold my-2">explore our courses</h1> */}
    {/* <div
        className="rounded-md h-[14rem] sm:h-[16rem] md:h-[20rem]"
      >
      <img src={women} alt="" className='object-cover w-full h-full rounded-md' />
      </div> */}
    <div className="flex items-center gap-4 my-6">
    {categories.map(category=>(
    <Button className={`${selectedCategory==category?'bg-blue-500 text-white font-medium':'bg-white text-black'} px-3 py-1 rounded shadow-sm`} key={category} onClick={()=>setselectedCategory(category)}>{category}</Button>
    ))}
    </div>
    
      <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 sm:px-0">
       {courses.map((course,i)=>(
       <div key={i} onClick={()=>handleClick(course)}>
          <Course course={course}/>
       </div>
          ))}
      </div>

      <Drawer sideBarNeeded={false} isOpen={isOpen} setIsOpen={setIsOpen} drawerWidth={'40rem'}>
   <SelectedCourse selectedCourse={selectedCourse}/>
      </Drawer>
    </div>
  );
};

export default AvailableCourses;
