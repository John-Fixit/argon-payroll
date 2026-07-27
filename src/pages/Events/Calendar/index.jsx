// import { formatDate } from '@fullcalendar/core'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { events } from './events'
import './events.css'



function renderEventContent(eventInfo) {
      return (
        
          <>
            <b >{eventInfo.timeText}</b>
              <i >{eventInfo.event.title}</i>
          
          </>
       
      )
    }











const Calendar = () => {
  return (
    <div>
       <div className='px-5 pr-10'> 
        
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
            events={ events }
            eventContent={ renderEventContent }
            buttonText={ { today: 'Today' } }
            
            height={ '650px' }
        />
    
    </div>
    </div>
  )
}

export default Calendar
