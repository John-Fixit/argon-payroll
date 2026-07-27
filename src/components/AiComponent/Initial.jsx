/* eslint-disable react/no-unescaped-entities */
import { Avatar } from "@nextui-org/react";
import chatBot from "../../assets/images/robot.gif";
import { useState } from "react";
const Initial = () => {
const [selected, setselected] = useState(0)
const items=[
{
avatar:chatBot,
title:'Have you common cold?',
desc:'Get the appropriate cure for common cold',
},
{
avatar:chatBot,
title:'Gastroenteritis',
desc:'Get the appropriate cure for Gastroenteritis',
},
{
avatar:chatBot,
title:'Influenza(Flu)',
desc:'Get the appropriate cure for Influenza(flu)',
},
{
avatar:chatBot,
title:'Headaches/Migraines',
desc:'Get the appropriate cure for Headaches/Migraines',
},
]
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full">
        <img src={chatBot} alt="" height={200} width={200} />
        <p className="m-0 text-2xl font-medium">
          I'm Spark! How can I help you?
        </p>
        <span className="py-1 px-3 rounded-full bg-green-200 text-green-500 text-xs my-2">
          Get some common fever? Click to get the right medication
        </span>
      </div>
      <div className="grid md:grid-cols-2 gap-4 my-8">
      {items.map((item,i)=>(
      <div key={i} className={`${selected==i&&'bg-blue-500'} rounded-md border flex items-center gap-2 p-2 cursor-pointer`} onClick={()=>setselected(i)}>
      <Avatar src={item.avatar}/>
        <div className={`flex flex-col`}>
          <span className={`font-medium ${selected==i&&'text-white'}`}>{item.title}</span>
          <span className={`text-xs ${selected==i?'text-gray-200':'text-gray-400'}`}>{item.desc}</span>
        </div>
      </div>
      ))}
      </div>
    </div>
  );
};

export default Initial;
