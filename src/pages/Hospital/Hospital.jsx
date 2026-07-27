/* eslint-disable no-unused-vars */
// import React from 'react'
import { Tab, Tabs } from "@nextui-org/react";
import HospitalStaffHistory from "../../components/Hospital/HospitalStaffHistory";
import HistoryTable from "../../components/Hospital/HistoryTable";
import Drawer from "../../components/Request&FormComponent/Drawer";
import { useEffect, useMemo, useState } from "react";
import FeedBack from "../../components/Hospital/FeedBack";
import Comment from "../../components/Hospital/Comment";
import HospitalForm from "../../components/Hospital/HospitalForm";
import { useGetProfile } from "../../API/profile";
import { API_URL } from "../../API/api_urls/api_urls";
import TabCard from "../../components/profile/profileDrawer/tabs/TabCard";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaUser } from "react-icons/fa";

const Hospital = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [whatTodo, setWhatTodo] = useState("");
  const [sideBarNeeded, setSideBarNeeded] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerWidth, setDrawerWidth] = useState(null);
  const [drawerHeader, setDrawerHeader] = useState({});

  const [stepper, setStepper] = useState(0);
  const [currentHospitalID, setCurrentHospitalID] = useState(null);

  const [tabs, setTabs] = useState([
    { title: "Make Comment" },
    {
      title: "Feed Back",
    },
  ]);

  const hospitalTabs = useMemo(
    () => [
      {
        id: 0,
        label: "Staff",
        content: HospitalStaffHistory,
        icon: FaUser,
        b_color: "bg-amber-100",
        t_color: "text-amber-500",
      },
      {
        id: 1,
        label: "Family",
        content: HistoryTable,
        icon: MdOutlineFamilyRestroom,
        b_color: "bg-green-100",
        t_color: "text-green-500",
      },
    ],
    []
  );

  useEffect(() => {
    setSelectedTab(0);
  }, [isOpen]);

  useEffect(() => {
    if (whatTodo.toLowerCase() == "add hospital".toLowerCase()) {
      setDrawerHeader({
        title: "Hospital Form",
        description: "Fill in the required data",
      });
    } else if (whatTodo.toLowerCase() == "feedback".toLowerCase()) {
      setDrawerHeader({
        title: "Feed Back",
        description: "This is the feedback information",
      });
    } else if (whatTodo.toLowerCase() == "comment".toLowerCase()) {
      if (
        tabs[selectedTab].title.toLowerCase() == "Make Comment".toLowerCase()
      ) {
        setDrawerHeader({ title: "Comment", description: "Make comment" });
      } else if (
        tabs[selectedTab].title.toLowerCase() == "Feed Back".toLowerCase()
      ) {
        setDrawerHeader({
          title: "Feed Back",
          description: "This is the feedback information",
        });
      }
    }
  }, [whatTodo, tabs, selectedTab]);

  const addHospital = () => {
    setIsOpen(true);
    setWhatTodo("add hospital");
    setSideBarNeeded(false);
    setDrawerWidth(700);
  };

  const seeFeedBack = (hospitalID) => {
    setIsOpen(true);
    setWhatTodo("feedback");
    setSideBarNeeded(false);
    setDrawerWidth(600);
    setCurrentHospitalID(hospitalID);
  };
  const makeComment = (hospitalID) => {
    setSideBarNeeded(true);
    setIsOpen(true);
    setDrawerWidth(720);
    setWhatTodo("comment");
    setCurrentHospitalID(hospitalID);
  };

  const { data: hospital_data } = useGetProfile({
    path: API_URL.getHospital,
    key: "staff_hospital",
  });

  const currentTab = useMemo(() => {
    return hospitalTabs[stepper];
  }, [hospitalTabs, stepper]);

  return (
    <div>
      <div className="flex w-full flex-col pb-10 my-8">
        <TabCard
          data={hospitalTabs}
          stepper={stepper}
          setstepper={setStepper}
        />

        <currentTab.content
          add={addHospital}
          seeFeedBack={seeFeedBack}
          makeComment={makeComment}
        />
      </div>

      <Drawer
        tabs={tabs}
        setSelectedTab={setSelectedTab}
        selectedTab={selectedTab}
        drawerWidth={drawerWidth}
        header={drawerHeader}
        sideBarNeeded={sideBarNeeded}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {whatTodo == "add hospital" && <HospitalForm setIsOpen={setIsOpen} />}
        {whatTodo == "feedback" && <FeedBack hospitalID={currentHospitalID} />}
        {whatTodo == "comment" && (
          <div>
            {tabs[selectedTab].title.toLowerCase() ==
              "Make Comment".toLowerCase() && (
              <Comment setIsOpen={setIsOpen} hospitalID={currentHospitalID} />
            )}
            {tabs[selectedTab].title.toLowerCase() ==
              "Feed Back".toLowerCase() && (
              <FeedBack hospitalID={currentHospitalID} />
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Hospital;
