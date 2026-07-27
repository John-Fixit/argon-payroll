/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const ReformateDate = ({dateString}) => {
    const [date, setDate] = useState('');


    useEffect(() => {
        // Input date string
        // var inputDateStr = "2024-02-22 00:00:00.000";

        // Parse input date string into a Date object
        var inputDate = new Date(dateString);

        // Define month names array
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Extract day, month, and year from the Date object
        var day = inputDate.getDate();
        var monthIndex = inputDate.getMonth();
        var year = inputDate.getFullYear();

        // Format the extracted components into the desired output format
        var outputDateStr = day + ' ' + monthNames[monthIndex] + ' ' + year;

        setDate(outputDateStr)
       // console.log(outputDateStr); // Output: 22 Feb 2024
    }, [dateString]);

    
      return <span>{date}</span>;
}

export default ReformateDate




