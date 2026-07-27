/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

const UtilityModal = ({ isOpen, options }) => {
  const containerRef = useRef();


  useEffect(() => {
    if (isOpen && window.MyReactWidget && options?.user_data?.name) {
      // console.log(options)
      window.MyReactWidget(containerRef.current.id, options);
    }
  }, [isOpen, options]);

  if (!isOpen) return null;

  return (
        <div id="widget-container" className='w-[700]' ref={containerRef}></div>
  );
};
export default UtilityModal;