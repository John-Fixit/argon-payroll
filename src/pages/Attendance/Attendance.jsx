/* eslint-disable no-unused-vars */
import React from "react";
import AttendanceChart from "../../components/AttendanceComponent/AttendanceChart";
import Header from "../../components/AttendanceComponent/Header";
import Separator from "../../components/payroll_components/Separator";
import AttendanceTable from "../../components/AttendanceComponent/AttendanceTable";


const Attendance = () => {

  return (
    <div className="py-8 font-helvetica">
      <Header />
      <div className="mb-6">
        <Separator separator_text={"History"} />
      </div>
      <AttendanceChart />
      <AttendanceTable />
    </div>
  );
};

export default Attendance;
