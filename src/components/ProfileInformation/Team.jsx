// import React from 'react'

import TeamCard from "./TeamCard"



export const Team = () => {
const projectData=[
{
title:'Marketing',
no_of_projects:'4 Projects',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'Blog Template',
no_of_projects:'5 Projects',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar2.png"]
},
{
title:'Multipurpose Landing',
no_of_projects:'2 Projects',
avatars:["https://bootdey.com/img/Content/avatar/avatar3.png","https://bootdey.com/img/Content/avatar/avatar5.png","https://bootdey.com/img/Content/avatar/avatar6.png"]
},
{
title:'Brand Logo Design',
no_of_projects:'5 Projects',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'Landing Page',
no_of_projects:'3 Projects',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar5.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'New Create Admin UI',
no_of_projects:'1 Project',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar5.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
{
title:'Creating Dashboard UI Kit',
no_of_projects:'6 Projects',
avatars:["https://bootdey.com/img/Content/avatar/avatar1.png","https://bootdey.com/img/Content/avatar/avatar5.png","https://bootdey.com/img/Content/avatar/avatar1.png"]
},
]
  return (
     <div  className="relative flex flex-col min-w-0 rounded break-words border bg-white shadow">
            <div  className="tab-content p-6">
                <div  className="tab-pane active opacity-100 block" id="projects-tab" role="tabpanel">
                    <div  className="flex items-center">
                        <div  className="flex-1">
                            <h4  className="mb-4 text-[20.889px] font-[500] text-[rgb(33,37,41)]">Team</h4>
                        </div>
                    </div>
                    <div  className="grid grid-cols-1 md:grid-cols-3 gap-8 " id="all-projects">
                    {projectData?.map((item,i)=>(
                    <TeamCard key={i} data={item}/>
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
