/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Header from "../../components/AttendanceComponent/Header";
import Separator from "../../components/payroll_components/Separator";
import AdminAttendancePage from "../../components/core/attendance/AdminAttendancePage";
import { useDisclosure } from "@nextui-org/react";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import AttendanceDetails from "../../components/core/attendance/AttendanceDetails";


const AttendanceAdmin = () => {


  return (
    <div className="py-8 font-helvetica">
      <Header header={"HRIS"} />
      <div className="mb-6">
        <Separator separator_text={"Attendance  Today"} />
      </div>

        <div>
        <AdminAttendancePage />
        {/* <ExpandedDrawerWithButton key={currentAttendance} isOpen={isOpen}  onClose={onClose}>
            <AttendanceDetails key={currentAttendance} staffId={currentAttendance}/>
        </ExpandedDrawerWithButton> */}
        </div>
    </div>
  );
};

export default AttendanceAdmin;
