import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useHook } from './Hooks'
import { toStringDate } from '../../utils/utitlities'
import { Tooltip } from 'antd'
// import { useState } from 'react'


const MySchedule = () => {
// const [information, setinformation] = useState(JSON.parse(sessionStorage.getItem('scheduleInformation'))??events)

const {data} = useHook()

// console.log(data)

function renderEventContent(eventInfo) {
  // console.log(eventInfo)
      return (
        
          <>
              <Tooltip
        title={
          <>
            <div>
              <h5 className="font-helvetica font-medium">
                {eventInfo?.event?.extendedProps?.FIRST_NAME} {eventInfo?.event?.extendedProps?.LAST_NAME}
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
       
      )
    }

    const handleEventClick=(eventInfo)=>{
      // console.log(eventInfo);
    }

  return (
    <div className='my-6 max-h-[30rem]'>
       <FullCalendar
            // datesSet={ (date) => setDate(date.start) }
            showNonCurrentDates={ false }
            plugins={ [dayGridPlugin, timeGridPlugin, listPlugin] }
            headerToolbar={{
                left: 'prev,next, today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay, listMonth'
              }}
            initialView='dayGridMonth'
            events={ data }
            eventContent={ renderEventContent }
            buttonText={ { today: 'Today' } }
            eventClick={handleEventClick}
            height={ '400px' }
        />
    </div>
  )
}

export default MySchedule