/* eslint-disable react/prop-types */

import { formatDateToDateandTimeAMPM } from '../../utils/utitlities';
const DateFormatter = ({ dateString }) => {
  const formattedDateTime = formatDateToDateandTimeAMPM(dateString);
  return (
    <span>
      {formattedDateTime}
    </span>
  );
};
export default DateFormatter;
