/* eslint-disable no-unused-vars */
import { Tooltip } from "antd";
import React from "react";
import Separator from "../payroll_components/Separator";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useHook } from "./Hooks";
import { toStringDate } from "../../utils/utitlities";

const DirectorateSchedule = () => {
  // const data=[
  // {
  // month:'May',
  // employees:[
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
  //       name: "Adeyemi Aderinto",
  //       leave_balance: 4,
  //     },
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
  //       name: "Kayode Adeyinka",
  //       leave_balance: 2,
  //     },
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
  //       name: "Olaitan Okunade",
  //       leave_balance: 8,
  //     },
  // ]
  // },
  // {
  // month:'June',
  // employees:[
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
  //       name: "Kayode Adeyinka",
  //       leave_balance: 2,
  //     },
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
  //       name: "Adeyemi Aderinto",
  //       leave_balance: 4,
  //     },
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCmURjNWc5I_ZPQ5oeOt9_ORibdIrpdZf-lQ&usqp=CAU",
  //       name: "Adeoye John",
  //       leave_balance: 6,
  //     },
  // ]
  // },
  // {
  // month:'July',
  // employees:[
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAFCQIxLqrUR2InTM_dPyFHaz15V14TieeEQ&usqp=CAU",
  //       name: "Adeyemi Aderinto",
  //       leave_balance: 4,
  //     },
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVus6O1IqRwbOBSl91PWQ5biucI0mRvP0tit_2hoxeqVYrPZtgzN7X7uvrgeVT1TCJ81o&usqp=CAU",
  //       name: "Kayode Adeyinka",
  //       leave_balance: 2,
  //     },
  // {
  //       profile_image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_wufnbZqmr8QYd5Q5UjFgDkmizutxojyTWg&usqp=CAU",
  //       name: "Olaitan Okunade",
  //       leave_balance: 8,
  //     },
  // ]
  // },
  // ]

  const { data } = useHook();

  // console.log(data);

  function renderEventContent(eventInfo) {
  // console.log(eventInfo);
  
    return (
      <>
           <Tooltip
        title={
          <>
            <div>
              <h5 className="font-helvetica font-medium">
                {eventInfo?.event?.title}
              </h5>
              <p className="font-helvetica font-medium">
                {eventInfo?.event?.extendedProps?.STAFF_NUMBER}
              </p>
              <p className="font-helvetica">
                Duration:{" "}
                <span className="opacity-70 font-helvetica text-sx">
                  {eventInfo?.event?.extendedProps?.DURATION}
                </span>
              </p>
              <p className="font-helvetica">
                Leave Type:{" "}
                <span className="opacity-70 font-helvetica text-sx">
                  {eventInfo?.event?.extendedProps?.TYPE_NAME}
                </span>
              </p>
              <p className="font-helvetica">
                Start Date:{" "}
                <span className="opacity-70 font-helvetica text-sx">
                  {toStringDate(eventInfo?.event?.extendedProps?.START_DATE)}
                </span>
              </p>
              <p className="font-helvetica">
                End Date:{" "}
                <span className="opacity-70 font-helvetica text-sx">
                  {toStringDate(eventInfo?.event?.extendedProps?.END_DATE)}
                </span>
              </p>
            </div>
          </>
        }
        arrow={true}
      >
        <p>
          <i>{eventInfo?.event?.title}</i>
        </p>
      </Tooltip>
      </>
    );
  }
  return (
    <>
      <div className="my-6 max-h-[30rem]">
        <FullCalendar
          // datesSet={ (date) => setDate(date.start) }
          showNonCurrentDates={false}
          plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
          headerToolbar={{
            left: "prev,next, today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay, listMonth",
          }}
          initialView="dayGridMonth"
          events={data}
          eventContent={renderEventContent}
          buttonText={{ today: "Today" }}
          height={"400px"}
        />
      </div>
    </>
    // <div className=' flex flex-col gap-6 py-4'>
    // {data.map((item,i)=>(
    // <div key={i} className='flex flex-col md:flex-row items-center gap-4'>
    //         <div className='w-80'>
    //           <Separator separator_text={item.month} />
    //           <p>{item.employees[0].name} and {item.employees.length-1} others are going on leave this month</p>
    //         </div>

    //         <div className='flex flex-wrap gap-6 justify-center'>
    //           {item.employees.map((employee, i) => (
    //             <Tooltip
    //             showArrow={true}
    //               key={i}
    //               content={employee.name}
    //             >
    //              <div className='inline-flex relative flex-col items-center'>
    //              <Avatar
    //              isBordered
    //                 style={{
    //                   width: 80,
    //                   height: 80,
    //                 }}
    //                 className='cursor-pointer'
    //                 src={employee.profile_image}
    //               />
    //               <div className="absolute w-[2rem] h-[2rem] top-14 rounded-full border-2 border-red-500 mx-auto flex justify-center items-center bg-gray-50">
    //         <p className="">{employee.leave_balance}</p>
    //         </div>
    //               </div>
    //             </Tooltip>
    //           ))}
    //         </div>
    //       </div>
    // ))}
    // </div>
  );
};

export default DirectorateSchedule;
