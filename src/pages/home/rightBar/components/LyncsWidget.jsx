/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useEffect, useRef, useState } from "react";

const LyncsWidget = ({ isOpen, options }) => {
  const containerRef = useRef();
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setLoading(true);
      window.LyncsWidget.open({
        key: "a3a2d99285894aa88b4340436fb7733151cffe74dc6870c214ecc0",
        path: "/flights/local-flight",
        onReady: () => {
          setLoading(false);
        },
        data: {
          name: "Seun Suleman",
          company: "Lyncs Africa",
          phone: "2348123456789",
          dateOfBirth: "1990-01-01",
          email: "sulemanseun@gmail.com",
          maxLoanAmount: 150000,
        },
      });
    };

    //   handleOpen()
  }, []);

  if (!isOpen) return null;

  return (
    <div id="widget-container" className="w-[700]" ref={containerRef}></div>
  );
};
export default LyncsWidget;
