import  { useState, useEffect } from 'react';

const WorkdayTimer = () => {
  const [totalWorkedMinutes, setTotalWorkedMinutes] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const punchInTime = 10 * 60; // 10:00 AM in minutes
  const expectedWorkMinutes = 8 * 60; // 8 hours in minutes
  const break1 = 20; // 20 minutes
  const break2 = 60 + 0.5; // 1 hour 30 seconds in minutes

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      // Calculate worked time
      let workedMinutes = Math.max(0, currentMinutes - punchInTime - break1 - break2);
      workedMinutes = Math.min(workedMinutes, expectedWorkMinutes);

      setTotalWorkedMinutes(workedMinutes);
      const newPercentage = Math.round((workedMinutes / expectedWorkMinutes) * 100);
      setPercentage(newPercentage);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-80 h-80">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="10"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          />
          <circle
            className="text-blue-500 stroke-current"
            strokeWidth="10"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-bold text-blue-500">{percentage}%</span>
          <span className="text-lg font-semibold mt-2">Worked: {formatTime(totalWorkedMinutes)}</span>
          <span className="text-sm mt-1">of {formatTime(expectedWorkMinutes)}</span>
        </div>
      </div>
    </div>
  );
};

export default WorkdayTimer;

