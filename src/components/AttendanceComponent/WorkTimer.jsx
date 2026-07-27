import { useState, useEffect } from 'react';

const WorkdayTimer = () => {
  const [percentage, setPercentage] = useState(0);
  const workdayStart = 8 * 60; // 8:00 AM in minutes
  const workdayEnd = 17 * 60; // 5:00 PM in minutes
  const totalWorkMinutes = workdayEnd - workdayStart;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      const elapsed = Math.max(0, Math.min(currentMinutes - workdayStart, totalWorkMinutes));
      const newPercentage = Math.round((elapsed / totalWorkMinutes) * 100);
      setPercentage(newPercentage);
    }, 1000); // Update every minute 60000

    return () => clearInterval(timer);
  }, []);

  const circumference = 2 * Math.PI * 45; // 45 is the radius of the circle
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[9rem] h-[9rem]">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="45"
            fill="transparent"
          />
          <circle
            className="text-btnColor opacity-45 stroke-current"
            strokeWidth="4"
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-btnColor opacity-45">{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default WorkdayTimer;