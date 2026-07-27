import { IoIosArrowForward } from "react-icons/io"
import Separator from "../../components/payroll_components/Separator"
import { GiCompanionCube } from "react-icons/gi"
import OrganizationalChartView from "../../components/OrganizationComponent/OrganizationalChartView"
import { MdOutlineLocalFireDepartment } from "react-icons/md"
import { useState } from "react"

const Organogram = () => {
const [selectedCard, setSelectedCard] = useState('Company')
 const organogramHistory = [
  {
    type: "Company",
    icon: GiCompanionCube,
    b_color: "bg-amber-100",
    t_color: "text-amber-500",
  },
  {
    type: "Department",
    icon: MdOutlineLocalFireDepartment,
    b_color: "bg-green-100",
    t_color: "text-green-500",
  },
];

const selectTab = (value) => {
  setSelectedCard(value)
  };

  return (
    <div>
    {/* head */}
    <div className="flex justify-between items-center">
              <div>
                <h2 className="font-helvetica font-bold text-3xl">
                  Organogram
                </h2>
                <div >
                  <span className="text-gray-400 uppercase text-xs flex items-center gap-1 font-helvetica">People <IoIosArrowForward className="text-md" /> Self Service</span>
                </div>
              </div>
              
        </div>

        {/* Separator */}
        <div className="mb-6">
        <Separator separator_text={"History"} />
      </div>

{/* HeaderCard */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 my-8">
      {organogramHistory.map((organogram,i)=>(
  <div
              key={i}
               className={`${organogram.type==selectedCard?'bg-slate-50':'bg-white'} py-4 cursor-pointer shadow-sm -top border border-[#dfe2e6] flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3`}
              style={{
                boxShadow: "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)"
              }}
              onClick={() => selectTab(organogram?.type)}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${organogram?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  <organogram.icon
                    size={25}
                    className={`!font-bold ${organogram.t_color}`}
                  />
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                 {organogram.type}
                </span>
              </div>
            </div>
      ))}
      </div>


<OrganizationalChartView/>
    
    </div>
  )
}

export default Organogram