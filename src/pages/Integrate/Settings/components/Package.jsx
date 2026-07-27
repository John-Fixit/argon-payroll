/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { PackageCheck, Settings } from "lucide-react"
import ExpandedDrawer2 from "./ExpandedDrawer2"



const Package = ({name, icon, desc}) => {
  return (
    <div className="flex flex-col justify-between shadow-sm bg-[#638bb8] h-[240px] rounded-md  p-4">

        <div className="flex flex-col gap-4 ">
            <div className="w-14 h-14 bg-white rounded flex items-center justify-center">
                <PackageCheck size={40} />
            </div>
            <div className="">
                <span className="text-white font-bold tracking-wider font-apple-system">{name}</span>
            </div>
        </div>
        <div className="">
            <span className="text-white text-[0.84rem] font-Lato line-clamp-2">{desc}</span>
        </div>
        <div className="flex  justify-end items-end">

            <ExpandedDrawer2 name={name}>
                    <button className=" outline-none bg-neutral-800 text-white rounded-lg border-dotted  border-2 border-stone-400 px-4 py-1 flex gap-2 items-center hover:bg-neutral-700 active:bg-neutral-800/20">

                        <Settings size={12}/>
                        <span>start setting</span>
                    </button>

            </ExpandedDrawer2>
        </div>

    </div>
  )
}

export default Package
