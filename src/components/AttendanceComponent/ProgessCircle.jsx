/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
const ProgressCircle = ({ startHour, endHour }) => {
    const [percentage, setPercentage] = useState(0);
    const totalWorkHours = endHour - startHour;
  
    const calculatePercentage = () => {
      const now = new Date();
      const currentTime = now.getHours() + now.getMinutes() / 60;
      const workStartTime = startHour;
      const workEndTime = endHour;
  
      if (currentTime < workStartTime) {
        return 0;
      }
      if (currentTime > workEndTime) {
        return 100;
      }
      return ((currentTime - workStartTime) / totalWorkHours) * 100;
    };
  
    useEffect(() => {
      const updatePercentage = () => {
        setPercentage(calculatePercentage());
      };
  
      updatePercentage();
      const intervalId = setInterval(updatePercentage, 1000); // Update every second
  
      return () => clearInterval(intervalId);
    }, [startHour, endHour]);
  
    const degrees = (percentage / 100) * 360;
  
    return (
      <div className="relative w-40 h-40 my-4 mx-auto flex justify-center items-center">
        <div className="relative w-full h-full">
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-8"
            style={{
              borderColor: 'gray',
              borderStyle: 'solid',
              clip: 'rect(0px, 80px, 80px, 40px)',
            }}
          ></div>
          <div
            className="absolute top-0 left-0 w-full h-full rounded-full border-8"
            style={{
              borderColor: 'green',
              borderStyle: 'solid',
              clip: 'rect(0px, 40px, 80px, 0px)',
              transform: `rotate(${degrees}deg)`,
            }}
          ></div>
          {degrees > 180 && (
            <div
              className="absolute top-0 left-0 w-full h-full rounded-full border-8"
              style={{
                borderColor: 'green',
                borderStyle: 'solid',
                clip: 'rect(0px, 80px, 80px, 40px)',
                transform: `rotate(180deg)`,
              }}
            ></div>
          )}
        </div>
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 rounded-full">
          <p className="text-blue-500 text-2xl font-bold">{percentage.toFixed(0)}%</p>
        </div>
      </div>
    );
  };

export default ProgressCircle