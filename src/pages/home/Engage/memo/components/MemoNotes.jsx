/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Avatar } from "@nextui-org/react";
import { Fragment, useState } from "react";


const MemoNotes = ({currentView, role}) => {
  // const [currentTabName, setCurrentTabName] = useState("Leave");

  // const tabs = [{ name: "Leave" }, { name: "Attachments" }, { name: "Note" }];

const formatDate=(dateString)=>{
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    };
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    // Convert the day to the correct ordinal suffix (e.g., 1st, 2nd, 3rd, 4th)
    const day = date.getDate();
    const suffix = ['th', 'st', 'nd', 'rd'];
    const daySuffix = (day % 10 < 4) ? suffix[day % 10] : suffix[0];
    
    return formattedDate.replace(/\d{1,2}(?=,)/, `$&${daySuffix}`);
}

    const data = {
        _id: 3,
       type: "Casual",
        from: "Sun Oct 08 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
        to: "Sat Nov 18 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
        returned_on: "Thu Jun 15 2023 00:00:00 GMT+0100 (West Africa Standard Time)",
        duration: "37",
        reason: "Personal",
        over_shoot: "-3",
        status: "pending",
        hand_over:{ name: "Ajayi Adeosun", role: "Section Head", abbr: "SH", main: false, img: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },

        internal_approval:[
          { name: "Emmanuel Oluwatayese", role: "Section Head", abbr: "SH", main: false, img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg" },
          {
            name: "Adeoye John",
            role: "Head of Department",
            abbr: "HD",
            main: false,
            img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-09.jpg"
          },
        ],
        hr_approval:[
          { name: "Olaitan Okunade", role: "Section Head", abbr: "SH", main: false, img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg" },
          {
            name: "Kayode Adeyinka",
            role: "Head of Department",
            abbr: "HD",
            main: false,
            img: 'https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-05.jpg'
          },
        ],
      };

      const notes = [
        { name: "Emmanuel Oluwatayese", text: "I am pleased to present the quarterly sales review for our company. Despite challenging market conditions, our team has achieved remarkable results.", img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-02.jpg", duration: "2 days ago" },
        {
          name: "John Ngozi",
          text: "continue this momentum and strive for even greater success in the upcoming quarters.",
        
          img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-09.jpg",
          duration: "3 days ago"
        },
        {
          name: "John Doe",
          text: "I wanted to provide an update on our preparations for the upcoming annual conference.",
        
          img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-10.jpg",
          duration: "3 days ago"
        },
        // {
        //   name: "Adelabi Kunde",
        //   text: "I wanted to provide an update on our preparations for the upcoming annual conference.",
        
        //   img: "https://smarthr.dreamstechnologies.com/html/template/assets/img/profiles/avatar-05.jpg",
        //   duration: "3 days ago"
        // },
      ]


  return (
    <Fragment>
 <div className="shadow border rounded p-4 bg-white">
        <div className="my-4 w-full">
       
          <ol className="ms-12 my-4 text-gray-500 border-s-2 border-gray-200 dark:border-gray-700 dark:text-gray-400">
            {
              notes?.map((item, index)=>(
                <li key={index+"___note"} className="mb-10 ms-4 relative group">
                  {/* <p className="font-medium text-xs uppercase">Handover</p> */}
                <div className="border p-2 rounded">
                  <Avatar
                    src={item?.img}
                    size="sm"
                    className="absolute -start-[62px]"
                  />
                  <span className="absolute w-[12px] h-[12px] group-hover:bg-btnColor bg-gray-200 border-2 border-white rounded-full -start-[24px] top-5"></span>
                  <div className="">
                  <div className="flex justify-between items-between">
                    <p className="uppercase font-Lato text-blue-500">
                      {item.name}
                    </p>
                    
                  </div>
                    <p className="text-sm flex flex-col gap-2">
                    <span className="font-Lato">
                      {item?.text}
                    </span>
                    <span>
                      {item?.duration}
                    </span>
                      
                    </p>
                  </div>
                </div>
                </li>
              ))
            }
        
          </ol>
        </div>
      </div>

      
    </Fragment>
  );
};

export default MemoNotes;
