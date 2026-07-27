/* eslint-disable react/prop-types */

import { Building } from "lucide-react";
import { useState } from "react";
import { PiAirTrafficControl } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";
import { BsChatSquareText } from "react-icons/bs";
import { MdOutlineApproval, MdPostAdd } from "react-icons/md";
import { FaRegChartBar } from "react-icons/fa";
import { MdOutlineModelTraining } from "react-icons/md";
import { MdOutlineEvent } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GoWorkflow } from "react-icons/go";
import { TbCalendarX } from "react-icons/tb";
// import { CiSquareQuestion } from "react-icons/ci";
import ApplyLeave from "../../../../components/core/leave/ApplyLeave";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import QuickApprovalComponent from "../../../../components/core/approvals/QuickApprovalComponent";
import QuickRequestComponent from "../../../../components/core/requests/QuickRequestComponent";
import AttendanceSetup from "./AttendanceSetup";
import { useDisclosure } from "@nextui-org/react";
import CreatePostDrawer from "../../centerFeed/components/CreatePostDrawer";
import Salary from "../../../../components/profile/Salary";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import { MdOutlinePayment } from "react-icons/md";
import PerformanceDrawer from "../../../Performance/PerformanceDrawer";
import { useGetActivePerformance } from "../../../../API/performance";
import useCurrentUser from "../../../../hooks/useCurrentUser";

const QuickLink2 = ({ clickedTab, isLastTab = false }) => {
  const [currentLinksGroup, setCurrentLinksGroup] = useState(0);
  const {
    isOpen: isCreatePostOpen,
    onOpen: openCreate,
    onOpenChange: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  const [openLeaveDrawer, setOpenLeaveDrawer] = useState(false);

  const [isOpen, setIsOpen] = useState({ state: false, type: "" });

  const [openPerformanceDrawer, setOpenPerformanceDrawer] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [aperData, setAperData] = useState(null);

  const { userData } = useCurrentUser();

  const { data: period } = useGetActivePerformance(userData?.data?.COMPANY_ID);

  const handleOpenDrawer = (type) => {
    if (type === "performance") {
      setOpenPerformanceDrawer(true);
    } else {
      setIsOpen({ state: true, type: type });
    }
  };

  const handleCloseDrawer = () => {
    setIsOpen({ state: false, type: "" });
  };

  const nextGroup = () => {
    if (currentLinksGroup === 1) {
      setCurrentLinksGroup(0);
    } else {
      setCurrentLinksGroup(1);
    }
  };

  return (
    <>
      <div className="rounded-lg bg-white py-2 shadow-sm">
        <div className="text-sm flex flex-col relative">
          <div className="flex  px-[1.8rem] items-start">
            <span className="text-gray-700  font-semibold text-lg">
              Quick Linkss
            </span>
          </div>

          <div className="grid grid-cols-3 gap-x-[1.5rem]  gap-y-1 place-items-center  pt-2 h-full ">
            <AttendanceSetup>
              <div
                className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
                // onClick={() => clickedTab("attendance")}
              >
                <div className="rounded-full  bg-[#322742]  w-[50px] h-[50px] flex justify-center items-center">
                  {/* bg-green-300 */}
                  <PiAirTrafficControl
                    size={22}
                    className="!font-bold text-white"
                  />
                  {/* text-green-900 */}
                </div>

                <div className=" w-[70px] text-center truncate  text-xs">
                  Attendance
                </div>
              </div>
            </AttendanceSetup>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() =>
                isLastTab ? openCreate() : setOpenLeaveDrawer(true)
              }
            >
              <div className="rounded-full bg-[#322742]   w-[50px] h-[50px] flex justify-center items-center">
                {/* bg-purple-300 */}
                {isLastTab ? (
                  <MdPostAdd size={22} className="!font-bold text-white " />
                ) : (
                  <TbCalendarX size={22} className="!font-bold text-white " />
                )}
                {/* <PiTreePalmThin size={25} className="!font-bold text-white " /> */}
                {/* text-purple-600 */}
              </div>
              <div className=" w-[70px] text-center truncate  text-xs">
                {isLastTab ? "Create Post" : "Leave"}
              </div>
            </div>

            <div
              className=" rounded-lg p-[0.5rem] flex flex-col justify-center items-center  cursor-pointer  opacity-90 text-gray-600 w-[85px] gap-y-1 "
              onClick={() => handleOpenDrawer("approvals")}
            >
              <div className="rounded-full  bg-[#322742] w-[50px] h-[50px] flex justify-center items-center">
                {/* red */}
                <MdOutlineApproval
                  size={22}
                  className="!font-bold text-white "
                />
              </div>

              <div className=" w-[70px] text-center mxauto  truncate  text-xs">
                {/* Training */} Approvals
              </div>
            </div>

            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
              // onClick={() => clickedTab("performance")}
              onClick={() => handleOpenDrawer("performance")}
            >
              <div className="rounded-full bg-[#322742]   w-[50px] h-[50px] flex justify-center items-center">
                <FaRegChartBar size={22} className="!font-bold text-white " />
              </div>

              <div className=" w-[70px] text-center truncate  text-xs">
                Performance
              </div>
            </div>
            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => handleOpenDrawer("payslip")}
            >
              <div className="rounded-full bg-[#322742]    w-[50px] h-[50px] flex justify-center items-center">
                {/* bg-green-200 */}
                {/* <CiSquareQuestion
                  size={22}
                  strokeWidth={1.2}
                  className="!font-bold text-white "
                /> */}
                <MdOutlinePayment size={22} className="!font-bold text-white" />
              </div>
              {/* text-green-500 */}
              <div className=" w-[70px] text-center truncate  text-xs">
                Payslip
              </div>
            </div>

            <div
              className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
              onClick={() => clickedTab("profile")}
            >
              <div className="rounded-full bg-[#322742]   w-[50px] h-[50px] flex justify-center items-center">
                {/* bg-orange-200 */}
                <CgProfile size={22} className="!font-bold text-white " />
              </div>
              {/* text-orange-500 */}
              <div className=" w-[70px] text-center truncate  text-xs">
                Edit Profile
              </div>
            </div>

            {/* <div
            className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
            onClick={() => clickedTab("forms")}
          >
            <div className="rounded-full bg-[#322742]    w-[50px] h-[50px] flex justify-center items-center">
        
              <Aperture size={25} className="!font-bold text-white " />
            </div>
         
            <div className=" w-[70px] text-center truncate  text-xs">
              Request
            </div>
          </div> */}
          </div>
          {currentLinksGroup === 1 && (
            <AnimatePresence>
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { duration: 0.7 } }}
                exit={{ x: 100, opacity: 0.5, transition: { duration: 0.7 } }}
              >
                <div className="grid grid-cols-3 gap-x-4   gap-y-1 place-items-center  pt-2 h-full ">
                  <div
                    className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1 "
                    onClick={() => clickedTab("chat")}
                  >
                    <div className="rounded-full bg-[#322742]  w-[50px] h-[50px] flex justify-center items-center">
                      {/* bg-yellow-200  */}
                      <BsChatSquareText
                        size={20}
                        className="!font-bold text-white"
                      />
                    </div>
                    {/* text-yellow-500 */}
                    <div className=" w-[70px] text-center truncate  text-xs">
                      {/* Salary */} Chat
                    </div>
                  </div>

                  <div
                    className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
                    onClick={() => clickedTab("courses")}
                  >
                    <div className="rounded-full bg-[#322742]   w-[50px] h-[50px] flex justify-center items-center">
                      {/* bg-purple-300 */}
                      <MdOutlineModelTraining
                        size={23}
                        className="!font-bold text-white "
                      />
                      {/* text-purple-600 */}
                    </div>
                    <div className=" w-[70px] text-center truncate  text-xs">
                      Courses
                    </div>
                  </div>
                  <div
                    className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1 "
                    onClick={() => clickedTab("events")}
                  >
                    <div className="rounded-full bg-[#322742]  w-[50px] h-[50px] flex justify-center items-center">
                      {/* bg-yellow-200  */}
                      <MdOutlineEvent
                        size={22}
                        className="!font-bold text-white"
                      />
                    </div>
                    {/* text-yellow-500 */}
                    <div className=" w-[70px] text-center truncate  text-xs">
                      Events
                    </div>
                  </div>

                  <div
                    className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
                    onClick={() => clickedTab("loan")}
                  >
                    <div className="rounded-full bg-[#322742]   w-[50px] h-[50px] flex justify-center items-center">
                      {/* bg-orange-200 */}
                      <Building size={22} className="!font-bold text-white " />
                    </div>
                    {/* text-orange-500 */}
                    <div className=" w-[70px] text-center truncate  text-xs">
                      Get Loan
                    </div>
                  </div>
                  <div
                    className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
                    onClick={() => clickedTab("bills")}
                  >
                    <div className="rounded-full  bg-[#322742]  w-[50px] h-[50px] flex justify-center items-center">
                      {/* bg-green-300 */}
                      <FaMoneyBillTrendUp
                        size={20}
                        className="!font-bold text-white"
                      />
                      {/* text-green-900 */}
                    </div>

                    <div className=" w-[70px] text-center truncate  text-xs">
                      Pay Bills
                    </div>
                  </div>

                  <div
                    className=" rounded-lg p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1"
                    onClick={() => clickedTab("memos")}
                  >
                    <div className="rounded-full bg-[#322742]    w-[50px] h-[50px] flex justify-center items-center">
                      {/* bg-green-200 */}
                      <GoWorkflow
                        size={22}
                        className="!font-bold text-white "
                      />
                      {/* <Aperture size={25} className="!font-bold text-white " /> */}
                    </div>
                    {/* text-green-500 */}
                    <div className=" w-[70px] text-center truncate  text-xs">
                      Memos
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {
            <div className="flex flex-col my-3">
              <div className="flex items-center justify-center">
                <button
                  className="border border-gray-400 px-4 py-2 w-[60%] mx-10 rounded-full text-[0.9rem] hover:shadow active:border-gray-600"
                  onClick={nextGroup}
                >
                  View {currentLinksGroup === 0 ? "More" : "Less"}
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      <ApplyLeave isOpen={openLeaveDrawer} setIsOpen={setOpenLeaveDrawer} />

      <ExpandedDrawerWithButton
        isOpen={isOpen.state}
        onClose={handleCloseDrawer}
        maxWidth={isOpen.type === "approvals" ? 900 : 700}
      >
        {isOpen.type === "approvals" ? (
          <QuickApprovalComponent />
        ) : isOpen.type === "requests" ? (
          <QuickRequestComponent />
        ) : isOpen.type === "payslip" ? (
          <>
            <PageHeader
              header_text={"Salary"}
              breadCrumb_data={[{ name: "Self Service" }, { name: "Profile" }]}
            />
            <Salary />
          </>
        ) : null}
      </ExpandedDrawerWithButton>

      <PerformanceDrawer
        isOpen={openPerformanceDrawer}
        setIsOpen={setOpenPerformanceDrawer}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        aperData={aperData}
        setAperData={setAperData}
        period={period}
      />

      <div className="z-[55]">
        <CreatePostDrawer
          isOpen={isCreatePostOpen}
          onOpenChange={() => onCreateOpen()}
          onClose={() => onCreateClose()}
        />
      </div>
    </>
  );
};

export default QuickLink2;
