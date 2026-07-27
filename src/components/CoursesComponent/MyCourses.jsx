import { useState } from "react"
import IndividualCourse from "./IndividualCourse"
import { my_courses } from "./data"
import Drawer from "../Request&FormComponent/Drawer"
import ViewCourse from "./ViewCourse"

const MyCourses = () => {
const [isOpen, setIsOpen] = useState(false)
const [selectedCourse, setSlectedCourse] = useState({})
  const handleClick=(course)=>{
  setIsOpen(true)
  setSlectedCourse(course)
  }
  return (
    <div>
    <h1>My Courses</h1>
     <div className="my-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 sm:px-0">
       {my_courses.map((course,i)=>(
       <div key={i}>
          <IndividualCourse handleClick={handleClick} course={course}/>
       </div>
          ))}
      </div>
         <Drawer sideBarNeeded={false} isOpen={isOpen} setIsOpen={setIsOpen} drawerWidth={'40rem'}>
   <ViewCourse selectedCourse={selectedCourse}/>
      </Drawer>
    </div>
  )
}

export default MyCourses