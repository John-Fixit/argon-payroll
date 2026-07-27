/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// import moment from 'moment';
import {  useEffect, useState } from 'react';

const ChatTime = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  const updateTimeAgo = (times) => {
        // Create a new Date object with the timestamp
        let date = new Date(times);

      //  const t = moment(date).format("A")
      //  print(t)
      //  console.log(date)


        // Extract hours and minutes
    // Extract hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format hours to have leading zero if necessary
    const formattedHours = hours < 10 ? `0${hours}` : hours;

    // Format minutes to have leading zero if necessary
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Determine if it's AM or PM
    const period = hours < 12 ? 'am' : 'pm';



        // Adjust hours if greater than 12
        const displayHours = hours % 12 || 12;

        // Concatenate the formatted time
        const formattedTime = `${displayHours}:${formattedMinutes} ${period}`;

        setTimeAgo(formattedTime)

  };

  useEffect(() => {
         updateTimeAgo(timestamp)
  }, [timestamp]);

  return <span className='text-xs'>{timeAgo}</span>;
};


export default ChatTime