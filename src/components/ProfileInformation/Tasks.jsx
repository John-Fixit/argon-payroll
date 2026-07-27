// import React from 'react'

import TaskCard from "./TaskCard"



export const Tasks = () => {
const projectData=[
{
title:'Create a New Landing',
status:'Progress',
textColor:'text-yellow-500',
bgColor:'bg-yellow-100',
rate:'4/8',
avatars:["https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar4.png","https://bootdey.com/img/Content/avatar/avatar2.png"]
},
{
title:'Create a Layout Design',
status:'Progress',
textColor:'text-yellow-500',
bgColor:'bg-yellow-100',
rate:'8/12',
avatars:["https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar4.png","https://bootdey.com/img/Content/avatar/avatar2.png"]
},
{
title:'Create a Blog Template UI',
status:'Pending',
textColor:'text-red-500',
bgColor:'bg-red-100',
rate:'0/6',
avatars:["https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar4.png","https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'Chat App Pages',
status:'Completed',
textColor:'text-green-500',
bgColor:'bg-green-100',
rate:'3/3',
avatars:["https://bootdey.com/img/Content/avatar/avatar4.png","https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'Components Pages',
status:'Pending',
textColor:'text-red-500',
bgColor:'bg-red-100',
rate:'7/17',
avatars:["https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar4.png","https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'Create a Gallery Pages',
status:'completed',
textColor:'text-green-500',
bgColor:'bg-green-100',
rate:'7/17',
avatars:["https://bootdey.com/img/Content/avatar/avatar2.png","https://bootdey.com/img/Content/avatar/avatar4.png"]
},
]
  return (
     <div  className="relative flex flex-col min-w-0 rounded break-words border bg-white shadow">
            <div  className="tab-content p-6">
                <div  className="tab-pane active opacity-100 block" id="projects-tab" role="tabpanel">
                    <div  className="flex items-center">
                        <div  className="flex-1">
                            <h4  className="mb-4 text-[20.889px] font-[500] text-[rgb(33,37,41)]">Tasks</h4>
                        </div>
                    </div>
                    <div  className="flex flex-col gap-8 " id="all-projects">
                    {projectData?.map((item,i)=>(
                    <TaskCard key={i} data={item}/>
                    ))}
                        {/* <!-- end col --> */}
                    </div>
                    {/* <!-- end row --> */}
                </div>
                {/* <!-- end tab pane --> */} 
            </div>
        </div>
  )
}
