/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const TimeAgo = ({ timestamp }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date().getTime() / 1000; // Convert milliseconds to seconds
      const secondsAgo = now - timestamp;

      if (secondsAgo < 60) {
        setTimeAgo('Just now');
      } else if (secondsAgo < 3600) {
        const minutes = Math.floor(secondsAgo / 60);
        setTimeAgo(`${minutes} minute${minutes === 1 ? '' : 's'} ago`);
      } else if (secondsAgo < 86400) {
        const hours = Math.floor(secondsAgo / 3600);
        setTimeAgo(`${hours} hour${hours === 1 ? '' : 's'} ago`);
      } else if (secondsAgo < 2592000) {
        const days = Math.floor(secondsAgo / 86400);
        setTimeAgo(`${days} day${days === 1 ? '' : 's'} ago`);
      } else if (secondsAgo < 31536000) {
        const months = Math.floor(secondsAgo / 2592000);
        setTimeAgo(`${months} month${months === 1 ? '' : 's'} ago`);
      } else {
        const years = Math.floor(secondsAgo / 31536000);
        setTimeAgo(`${years} year${years === 1 ? '' : 's'} ago`);
      }
    };

    updateTimeAgo(); // Update immediately

    // Update every minute (60 seconds)
    const intervalId = setInterval(updateTimeAgo, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [timestamp]);

  return <span className='text-xs'>{timeAgo}</span>;
};


export default TimeAgo