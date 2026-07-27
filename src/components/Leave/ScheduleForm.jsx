/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import listPlugin from '@fullcalendar/list'
import { DatePicker } from "antd";
import Label from "../forms/FormElements/Label";
import Select from "react-tailwindcss-select";
import { options } from "./data";
import { Button } from "@nextui-org/react";
// import { fetchLeaveEvents, saveLeaveEvent } from './api';
import { useEffect, useState } from "react";
import moment from "moment";
const ScheduleForm = ({ information, setInformation,goToNextTab }) => {
  //   const [events, setEvents] = useState([]);

  //   const [information, setInformation] = useState({type:'', dates:[]});
  const [eventDates, setEventDates] = useState([]);

  //   useEffect(() => {
  //     fetchLeaveEvents().then(data => setEvents(data));
  //   }, []);

  //  const handleEventAdd = (eventInfo) => {
  //     const newEvent = { title: eventInfo.title, start: eventInfo.startStr, end: eventInfo.endStr };
  //     saveLeaveEvent(newEvent).then(savedEvent => {
  //       setEvents([...events, savedEvent]);
  //     });
  //   };

//   const onChange = (date, dateString) => {
//     //   setEventDates(dateString)
//     console.log(date, dateString);
//     //   console.log(eventDates);
//     setInformation((prev) => {
//       // return { ...prev, dates: [...information.dates,...eventDates] };
//       return { ...prev, dates: dateString };
//     });
//   };


  const okay = (date) => {
    console.log(date.map((current)=>moment(current.$d).format('YYYY-MM-DD')) );
    setInformation((prev) => {
      return { ...prev, dates: date.map((current)=>moment(current.$d).format('YYYY-MM-DD')) };
    });
  };

  // const handleSubmit = () => {
  //   let info=JSON.parse(sessionStorage.getItem('scheduleInformation'));
  //   if (info?.length>0) {
  //       info=[...info,information]
  //       sessionStorage.setItem('scheduleInformation',JSON.stringify(info));
  //   }else{
  //       sessionStorage.setItem('scheduleInformation',JSON.stringify([information]));
  //   }
  //   console.log(information);

  // };

  return (
    <div>
      {/* <FullCalendar
            initialView="dayGridMonth"
             plugins={ [dayGridPlugin, timeGridPlugin, listPlugin] }
            headerToolbar={{
                left: 'prev,next, today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay, listMonth'
              }}
            events={[
                { title: 'Event 1', date: '2024-04-01' },
                { title: 'Event 2', date: '2024-04-02' },
            ]}
            eventClick={(info) => console.log('event clicked', info)}
        dateClick={(info) => console.log('date clicked', info)}
        select={(info) => console.log('date range selected', info)}
        eventAdd={handleEventAdd}
    /> */}

      <div className="bg-white w-full p-4 shadow rounded">
        <div className="py-4">
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
            <Label>Leave Type</Label>
            <div className="w-full md:col-span-2">
              <Select
                value={information.type}
                options={options}
                isSearchable={true}
                onChange={(value) => {
                  setInformation((prev) => {
                    return { ...prev, type: value };
                  });
                }}
              />
            </div>
          </div>
          <div className="my-4 grid grid-cols-1 md:grid-cols-3 items-center gap-1 border-b pb-4">
            <Label>Dates</Label>
            <DatePicker
              multiple
            //   onChange={onChange}
              maxTagCount="responsive"
              needConfirm
              onOk={okay}
              className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          {/* <Button
            type="submit"
            size="sm"
            className="rounded-md font-medium shadow font-helvetica uppercase"
            color="secondary"
            onClick={handleSubmit}
          >
            Submit
          </Button> */}
          <Button
            type="submit"
            size="sm"
            className="rounded-md font-medium shadow font-helvetica uppercase"
            color="secondary"
            onClick={goToNextTab}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
