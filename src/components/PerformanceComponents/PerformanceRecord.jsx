import { Button } from "@nextui-org/react"


const PerformanceRecord = () => {
const records=[
{
title:'Overview',
num:'92',
sub_title:'Total Posts',
frequency:'13 this week',
},
{
title:'Engagement',
num:'2,211',
sub_title:'Total Views',
frequency:'1.3k today',
},
{
title:'',
num:'+3',
sub_title:'Today',
frequency:'published',
},
{
title:'',
num:'113',
sub_title:'Comments',
frequency:'',
},
]


  return (
    <div>  <div>
      <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow-md">
          <h3 className="px-4 border-b text-medium font-medium py-2">Profile</h3>
          <div className="py-6 px-4">
            <div className="w-[12rem] h-[12rem] my-4 rounded-full border-2 border-gray-200 mx-auto overflow-auto bg-gray-50">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <p className="my-4 text-center font-medium tracking-wider">
              Adeyemi Aderinto
            </p>
            <div className="flex justify-center">
              <Button
                className="px-6 py-2 bg-btnColor hover:bg-[#44bec2] rounded-full text-white font-medium"
                //  onClick={add}
              >
                Action
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded shadow-md md:col-span-2">
           <h3 className="px-4 border-b text-medium font-medium py-2">Records</h3>
           <div className="grid grid-cols-1 md:grid-cols-2">
{records.map((record,i)=>(
<div key={i} className={`border-b p-6 ${i % 2 == 0 ? 'md:border-r' : ''}`}>
<h3 className="text-medium mb-4 text-gray-400 font-helvetica">{record?.title}</h3>
<h1 className="text-3xl font-helvetica">{record?.num}</h1>
<p className="font-medium mt-2">{record?.sub_title}</p>
<p className="text-gray-400">{record?.frequency}</p>
</div>
))}
           </div>
        </div>
      </div>
    </div></div>
  )
}

export default PerformanceRecord