
import { useCallback, useEffect, useState } from "react";
import DrawerSideBar from "../Request&FormComponent/DrawerSideBar";
import PendingRequest from "./PendingRequest";
import MyCalendar from "./MyCalendar";
import Select from "react-tailwindcss-select";
import { IoArrowBackCircle } from "react-icons/io5";
import DirectorateSchedule from "./DirectorateSchedule.jsx";
import MySchedule from "./MySchedule";
import { useGetProfile } from "../../API/profile";
import { useGetLeaveBalance, useGetLeaveSchedules } from "../../API/leave";
import DepartmentSchedule from "./DepartmentSchedule";
import profileImage from "../../assets/images/user_profile.png";
import { useHook } from "./Hooks.js";
import moment from "moment";
import { filePrefix } from "../../utils/filePrefix.js";
import PropTypes from "prop-types"
import StarLoader from "../core/loaders/StarLoader.jsx";



const LeaveInformation = ({
  pendingRequest,
  userData,
}) => {
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [componentToRender, setComponentToRender] = useState(null);

  const { updateData } = useHook();

  const [tabs, ] = useState([
    { title: "Current Request" },
    {
      title: "Schedules",
    },
  ]);

  const { data: profile } = useGetProfile({ user: userData?.data });

  const { data: response, isLoading: leaveBalanceLoading } = useGetLeaveBalance({
    company_id: userData?.data?.COMPANY_ID,
    staff_id: userData?.data?.STAFF_ID,
  });
  const { mutateAsync: getSchedules } = useGetLeaveSchedules();

  const [selectedOption, setSelectedOption] = useState({
    value: "Request",
    label: "Request",
  });
  const [options, setOptions] = useState([
    { value: "Request", label: "Request" },
    { value: "My Calendar", label: "My Calendar" },
  ]);

  useEffect(() => {
    setSelectedTab(0);
  }, []);


  const changeSchedule = useCallback(async (schedule) => {
    setSelectedOption(schedule);

   await getSchedules(
      {
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
        type: schedule.value,
      },
      {
        onSuccess: (data) => {
          let newData = [];

          if (schedule.value == "personal") {
            newData = data?.data?.data?.map((schedule) => {
              return {
                id: schedule?.LEAVE_ID+"_"+schedule?.REQUEST_ID,
                title: schedule?.TYPE_NAME,
                start: schedule?.START_DATE,
                end: moment(schedule?.END_DATE).add(1, "days").format("YYYY-MM-DD"),
                date:moment(schedule?.END_DATE).add(1, "days").format("YYYY-MM-DD"),
                type: schedule?.TYPE_NAME,
                ...schedule
              };
            });
          } else {
            newData = data?.data?.data?.map((schedule) => {
              return {
                id: schedule?.LEAVE_ID+"_"+schedule?.REQUEST_ID,
                title: `${schedule?.FIRST_NAME} ${schedule?.LAST_NAME}`,
                start: schedule?.START_DATE,
                end: moment(schedule?.END_DATE).add(1, "days").format("YYYY-MM-DD"),
                date:moment(schedule?.END_DATE).add(1, "days").format("YYYY-MM-DD"),
                type: schedule?.TYPE_NAME,
                ...schedule
              };
            });
          }

          updateData(newData);
        },
      }
    );
  }, [getSchedules, updateData, userData?.data?.COMPANY_ID, userData?.data?.STAFF_ID]);






  useEffect(() => {
    if (selectedTab == 1) {
      setSideBarNeeded(false);
      setSelectedOption({ value: "personal", label: "My Schedule" });
      changeSchedule({ value: "personal", label: "My Schedule" });
      setOptions([
        { value: "personal", label: "My Schedule" },
        { value: "department", label: "Department Schedule" },
        { value: "directorate", label: "Directorate Schedule" },
      ]);
    } else {
      setSelectedOption({ value: "Request", label: "Request" });
      setOptions([
        { value: "Request", label: "Request" },
        { value: "My Calendar", label: "My Calendar" },
      ]);
      setSideBarNeeded(true);
    }
  }, [selectedTab, changeSchedule]);

  useEffect(() => {
    switch (selectedOption.value) {
      case "Request":
        setComponentToRender(
          <PendingRequest pendingRequest={pendingRequest} />
        );
        break;
      case "My Calendar":
        setComponentToRender(<MyCalendar />);
        break;
      case "personal":
        setComponentToRender(<MySchedule />);
        break;
      case "directorate":
        setComponentToRender(<DirectorateSchedule />);
        break;
      case "department":
        setComponentToRender(<DepartmentSchedule />);
        break;
      default:
        setComponentToRender(null);
        break;
    }
  }, [selectedOption, pendingRequest]);

  const back = () => {
    setSelectedOption({ value: "Request", label: "Request" });
    setOptions([
      { value: "Request", label: "Request" },
      { value: "My Calendar", label: "My Calendar" },
    ]);
    setSelectedTab(0);
    setSideBarNeeded(true);
  };

  


  return (
    <div>
      <div className="my-8 grid md:grid-cols-4 gap-6">
        <div className="bg-white max-h-[24.5rem] rounded shadow-md">
          <h3 className="px-4 border-b text-medium font-medium pt-5 pb-2 font-helvetica uppercase">
            Profile
          </h3>
          <div className="py-6 px-4 relative flex flex-col items-center">
            <div className="w-[10rem] h-[10rem] my-4 rounded-full border-2 border-gray-200 mx-auto overflow-auto bg-gray-50">
              <img
                src={
                  profile?.PROFILE_PICTURE?.FILE_NAME
                    ? filePrefix + profile?.PROFILE_PICTURE.FILE_NAME
                    : profileImage
                }
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="absolute w-[4rem] h-[4rem] top-[9.5rem] rounded-full border-2 border-green-500 mx-auto flex justify-center items-center bg-gray-50">
              <div className="text-xl font-medium">
                {
                  leaveBalanceLoading? (
                    <StarLoader />
                  ): (
                    response?.data?.leave_balance
                  )
                }
              </div>
            </div>
            <p className="my-4 text-center font-medium tracking-wider text-medium font-helvetica">
              {userData?.data?.FIRST_NAME} {userData?.data?.LAST_NAME}
            </p>
          </div>
        </div>
        <div className="bg-white rounded shadow-md md:col-span-3">
          <div className="px-4 border-b py-2 flex items-center justify-between">
            <h3 className="text-medium font-medium pt-4 font-helvetica uppercase">
              Leave Schedule
            </h3>
            <div className="w-[12rem]">
              <Select
                value={selectedOption}
                options={options}
                isSearchable={true}
                onChange={changeSchedule}
              />
            </div>
          </div>
          <div
            className={`pointer-events-auto ${
              sideBarNeeded && "md:min-h-[50vh]"
            } w-full flex flex-col md:flex-row-reverse gap-4 md:gap-6`}
          >
            {sideBarNeeded && (
              <DrawerSideBar
                tabs={tabs}
                setSelectedTab={setSelectedTab}
                selectedTab={selectedTab}
              />
            )}
            <div
              className={`w-full relative ${
                sideBarNeeded ? "md:w-3/4 " : "w-full"
              }`}
            >
              {!sideBarNeeded && (
                <IoArrowBackCircle
                  onClick={back}
                  size={25}
                  className="absolute top-2 text-gray-400 left-2 cursor-pointer"
                />
              )}
              <div className="p-4">{componentToRender}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


LeaveInformation.propTypes = {
  pendingRequest: PropTypes.any,
  userData: PropTypes.any,
}

export default LeaveInformation;
