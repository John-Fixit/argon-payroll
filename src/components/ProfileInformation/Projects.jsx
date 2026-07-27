// import React from 'react'

import ProjectCard from "./ProjectCard"



export const Projects = () => {
const projectData=[
{
title:'Marketing',
description:'Every Marketing Plan Needs',
status:'Pending',
textColor:'text-red-500',
bulletColor:'bg-red-500',
bgColor:'bg-red-100',
date:'21 Jun, 2021',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'Website Design',
description:'Creating the design and layout of a website.',
status:'Completed',
textColor:'text-green-500',
bulletColor:'bg-green-500',
bgColor:'bg-green-100',
date:'13 Aug, 2021',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar2.png"]
},
{
title:'UI / UX Design',
description:'Plan and onduct user research and analysis',
status:'Progress',
textColor:'text-yellow-500',
bulletColor:'bg-yellow-500',
bgColor:'bg-yellow-100',
date:'08 Sep, 2021',
avatars:["https://bootdey.com/img/Content/avatar/avatar3.png","https://bootdey.com/img/Content/avatar/avatar5.png","https://bootdey.com/img/Content/avatar/avatar6.png"]
},
{
title:'Testing',
description:'The procurement specifications should describe',
status:'Pending',
textColor:'text-red-500',
bulletColor:'bg-red-500',
bgColor:'bg-red-100',
date:'20 Sep, 2021',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'UI / UX Design',
description:'Plan and onduct user research and analysis',
status:'Completed',
textColor:'text-green-500',
bulletColor:'bg-green-500',
bgColor:'bg-green-100',
date:'08 Sep, 2021',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar5.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
]
  return (
     <div  className="relative flex flex-col min-w-0 rounded break-words border bg-white shadow">
            <div  className="tab-content p-6">
                <div  className="tab-pane active opacity-100 block" id="projects-tab" role="tabpanel">
                    <div  className="flex items-center">
                        <div  className="flex-1">
                            <h4  className="mb-4 text-[20.889px] font-[500] text-[rgb(33,37,41)]">Projects</h4>
                        </div>
                    </div>
                    <div  className="grid grid-cols-1 md:grid-cols-2 gap-8 " id="all-projects">
                    {projectData?.map((item,i)=>(
                    <ProjectCard key={i} data={item}/>
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
