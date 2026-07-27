// import ActionButton from "../forms/FormElements/ActionButton";
import FullCalendar from "@fullcalendar/react"
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';

const MyCalendar = () => {
// const data = [
// {
// type:'Maternity leave',
// date:'June 28 - June 8',
// },
// {
// type:'Casual leave',
// date:'June 20 - July 1',
// },
// {
// type:'Compassionate leave',
// date:'June 20 - July 1',
// },
// ]

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
            buttonText={ { today: 'Today' } }
            
            height={ '400px' }
        />
    </div>
  // <div>
  //   <ol className="relative ms-4 my-4 text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
  //           {data.map((item,id)=>(
  //           <li className="mb-10 ms-8 border-b pb-4 md:w-[20rem]" key={id}>
  //             <span className="absolute w-[10px] h-[10px] border-2 border-btnColor bg-white rounded-full -start-[5.8px]"></span>
  //             <h3 className="font-medium leading-tight">{item?.date}</h3>
  //             <div className="flex gap-2 justify-between items-center text-gray-400 font-normal mt-4">
  //               <p className="">{item?.type}</p>
  //               <ActionButton className='shadow'>Action</ActionButton>
  //             </div>
  //           </li>
  //           ))}
  //         </ol>
  // </div>
  );
};

export default MyCalendar;
