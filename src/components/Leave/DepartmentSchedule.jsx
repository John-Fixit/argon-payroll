/* eslint-disable react/prop-types */
// import React from 'react'

import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useHook } from "./Hooks.js";
import { useRef, useState } from "react";
import { Popover } from "@nextui-org/react";
import { Tooltip } from "antd";
import { toStringDate } from "../../utils/utitlities.js";
// import { PopoverContent, Popover } from "@nextui-org/react";

const DepartmentSchedule = () => {
  const { data } = useHook();

  const [openPopUp, setOpenPopUp] = useState({ data: "", state: false });
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [popoverContent, setPopoverContent] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef(null);


  // console.log(data)

  const renderEventContent = (eventInfo) => {
    return (
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
    );
  };
  //   [data]
  // );

  const handleEventClick = (clickInfo) => {
    // console.log("Description:", clickInfo.event.extendedProps);

    setOpenPopUp({ data: clickInfo.event.extendedProps, state: true });
    // setPopoverPosition({
    //   left: clickInfo.jsEvent.pageX,
    //   top: clickInfo.jsEvent.pageY,
    // });

    setPopoverContent(
      <div>
        <h4>{clickInfo.event.title}</h4>
        <p>Description: {clickInfo.event.extendedProps.description}</p>
        <p>Location: {clickInfo.event.extendedProps.location}</p>
      </div>
    );

    // Set the position of the popover to be near the clicked event
    setPopoverPosition({
      top: clickInfo.jsEvent.pageY,
      left: clickInfo.jsEvent.pageX,
    });

    setPopoverVisible(true);
  };

  return (
    <div className="my-6 max-h-[30rem] relative">
      <Popover
        isOpen={popoverVisible}
        onOpenChange={setPopoverVisible}
        content={popoverContent}
        placement="top"
        ref={popoverRef}
        css={{
          position: "absolute",
          top: popoverPosition.top,
          left: popoverPosition.left,
          transform: "translate(-50%, -100%)", // Adjust for centering and positioning
        }}
      />

      <FullCalendar
        key={data?.length} 
        // datesSet={ (date) => setDate(date.start) }
        showNonCurrentDates={false}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: "prev, next, today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay, listMonth",
        }}
        initialView="dayGridMonth"
        events={[...data]}
        eventContent={renderEventContent}
        buttonText={{ today: "Today" }}
        height={"400px"}
        eventClick={handleEventClick}
        eventClassNames={"cursor-pointer"}
        eventDidMount={(info) => {
          // console.log('Event mounted:', info?.event?.title);
        }}

      />

      {/* 
<Popover isOpen={openPopUp?.state} onOpenChange={handleEventClick}>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Popover Content</div>
            <div className="text-tiny">This is the popover content</div>
          </div>
        </PopoverContent>
      </Popover> */}

      {openPopUp?.state}
    </div>
  );
};

export default DepartmentSchedule;
