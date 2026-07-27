
import MoreDropdown from "./MoreDropdown";
import employee_data from "./employee_data";

const EmployeeList = () => {
    const employeeData =employee_data;


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-8 my-10">
        {
            employeeData?.map(empl=>(
                <div key={empl.name} className="relative flex flex-row gap-2 bg-white items-center justify-center py-10 shadow rounded-md">
                    <div className="absolute right-0 top-2"> 
                        <MoreDropdown/>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <img
                        src={empl.image}
                        alt="User"
                        className="rounded-full w-[5rem] h-[5rem]"
                        />

                        <div><span>{empl.name}</span></div>
                        <div className=" text-gray-600 text-sm">{empl.role}</div>
                    </div>
                
                </div>
            ))
        }
    </div>
  )
}

export default EmployeeList
