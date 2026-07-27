/* eslint-disable react/prop-types */
import {Tabs, Tab} from "@nextui-org/react";
import {LineChart, Newspaper, } from "lucide-react";
import { useState } from "react";
import { GrAnnounce } from "react-icons/gr";
// import { useGetAnouncement } from "../../../../API/announcement";
// import useCurrentUser from "../../../../hooks/useCurrentUser";

export default function InfoTab({step}) {
  // const {userData} = useCurrentUser()
  // const { data } = useGetAnouncement({
  //   company_id: userData?.data?.COMPANY_ID,
  //   staff_id: userData?.data?.STAFF_ID,
  //   start_date: '',
  //   end_date: '',
  // });

const [current, setCurrent] = useState('timeline')


  const tabbing = (e)=>{
    switch (e) {
      case 'posts':
        step(1)
        setCurrent('posts')
        break;
    case 'notices':
      step(2)
      setCurrent('notices')
      break;
    case 'news':
      // step(3)
      // setCurrent('news')
      break;
      default:
        break;
    }
  }

  return (
    <div className="flex w-full flex-col">
      <Tabs onSelectionChange={tabbing} size={'md'} fullWidth  variant="underlined" aria-label="Content Option Tab"
      classNames={{tabList:'rounded-md bg-tablistcolor gap-0 p-0 bg-opacity-100 shadow-sm', tabContent: 'font-bold bg-opacity-100 tracking-widest group-data-[selected=true]:text-gray-700 text-tablistUnselectedcolor ',  cursor: 'bg-tabcursorcolor  h-[0.35rem] top-0 w-full', tab: 'h-16 border border-[1.2px] border-tablistbordercolor shadow-none bg-opacity-100', }}>
        <Tab
          key="posts"
          className={` ${current === 'posts' && 'bg-white'} `}
          title={
            <div className="flex items-center space-x-2">
              <LineChart size={15}/>
              <span>Posts</span>
            </div>
          }
        />
        <Tab
          key="notices"
          className={` ${current === 'notices' && 'bg-white'} `}
          title={
            <div className="flex items-center space-x-2">
              <GrAnnounce size={15}/>
              <span>Notices</span>
                {/* <span className={cn('flex items-center justify-center text-xs font-bold text-white bg-btnColor px-2 py-[0.3px] rounded-lg', {'hidden': !data })}>{data?.data?.data?.length || ''} </span> */}
            </div>
          }
        />
        <Tab
          key="news"
          className={` ${current === 'news' && 'bg-white'} `}
          title={
            <div className="flex items-center space-x-2">
             <Newspaper size={15}/>
              <span>News</span>
            </div>
          }
        />
      </Tabs>
    </div>  
  );
}
