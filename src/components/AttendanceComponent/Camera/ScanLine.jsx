/* eslint-disable react/prop-types */

import './ScannerLine.css'; // CSS file for styling

function ScanLine({ color, isFailed }) {
  return (

    <>
    {
      isFailed ?  <div className={`scan-lines ${color}`} />  :
    <div className={`scan-line ${color}`} />
    }
    </>
  );
}

export default ScanLine;