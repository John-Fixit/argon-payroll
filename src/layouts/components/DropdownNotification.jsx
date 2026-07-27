import { useEffect, useMemo, useRef, useState } from "react";
import { BsBellFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import { Avatar } from "antd";
import { Check, User } from "lucide-react";
import { Button, cn, useDisclosure } from "@nextui-org/react";
import { ImCancelCircle } from "react-icons/im";
import { BiQuestionMark } from "react-icons/bi";
import ExpandedDrawerWithButton from "../../components/modals/ExpandedDrawerWithButton";
import { useGetRequestDetail } from "../../API/api_urls/my_approvals";
import LeaveDetail from "../../pages/Approval/LeaveDetail";
import AttachmentDetailsApproval from "../../components/core/approvals/AttachmentDetailsApproval";
import NoteDetailsApproval from "../../components/core/approvals/NoteDetailsApproval";
import BioDataDetail from "../../pages/Approval/BioDataDetail";
import SignMemo from "../../pages/home/Engage/memo/components/SignMemo";
import AcademicDetail from "../../pages/Approval/AcademicDetail";
import DefaultDetails from "../../pages/Approval/DefaultDetails";
import FormDrawer from "../../components/payroll_components/FormDrawer";
import ApprovalHistory from "../../pages/Approval/ApprovalHistory";
import ProfileDetail from "../../pages/Approval/ProfileDetails";
import { toStringDate } from "../../utils/utitlities";
import useGetNotificationData from "../../hooks/useGetNotificationData";
import { useSeenNotification } from "../../API/notification";
import useCurrentUser from "../../hooks/useCurrentUser";
import LeaveReturnDetails from "../../pages/Approval/LeaveReturn";
import PerformanceApprovalDrawer from "../../pages/Approval/AperApprovalView";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data } = useNotification();
  const { mutateAsync: getDetails } = useGetRequestDetail();
  const [isOpen, setIsOpen] = useState({ type: "", status: false, role: "" });
  const [details, setDetails] = useState({
    approvers: [],
    attachments: [],
    data: null,
    notes: [],
    requestID: null,
  });

  // for aper
  const [selectedTab, setSelectedTab] = useState(0);
  const [viewMode, setViewMode] = useState(false);
  const {isOpen:isAperOpen, onOpen:onAperOpen, onClose:onAperClose} = useDisclosure()

  const { getAvailableNotification } = useGetNotificationData();
  const { mutateAsync: seenNotification } = useSeenNotification();
  const { userData } = useCurrentUser();
  const { treated_requests, awaiting_approval } = data || {
    data: { treated_requests: [], awaiting_approval: [] },
  };

  const treated = useMemo(() => {
    const datas = treated_requests?.map((app) => {
      app.dateTreated = app?.DATE_TREATED
        ? toStringDate(app?.DATE_TREATED)
        : null;
      app.title = app?.IS_APPROVED
        ? `${app?.PACKAGE_NAME} Request Approved`
        : `${app?.PACKAGE_NAME} Request Declined`;
      app.isAwaiting = false;
      return app;
    });

    return datas;
  }, [treated_requests]);

  const awaiting = useMemo(() => {
    const datas = awaiting_approval?.map((app) => {
      app.title = `${app?.PACKAGE_NAME} Request`;
      app.isAwaiting = true;
      app.requestDate = app?.REQUEST_DATE
        ? toStringDate(app?.REQUEST_DATE)
        : null;
      return app;
    });

    return datas;
  }, [awaiting_approval]);

  const openDrawer = async (id, type, action) => {
    await getDetails(
      { request_id: id },
      {
        onSuccess: (data) => {
          const value = data?.data?.data;
          const approvers = value?.approvers;
          const attachments = value?.attachments;
          const requestData = value?.data;
          const notes = value?.notes;

          setDetails({
            ...details,
            approvers,
            attachments,
            notes,
            data: requestData,
            requestID: id,
          });


          if(type === "Performance"){
           onAperOpen()
          }else{
            setIsOpen({ type: type, status: true, role: action });
            setViewMode(action === "request")
          }

          if (action === "request") {
            handleSeen(id);
          }
        },
        onError: (err) => {
          console.log(err);
          setIsOpen({ type: type, status: false, role: action });
        },
      }
    );
  };

  const handleSeen = async (reqId) => {
    const json = {
      request_id: reqId,
      staff_id: userData?.data?.STAFF_ID,
      company_id: userData?.data?.COMPANY_ID,
    };
    try {
      const res = await seenNotification(json);
      if (res) {
        console.log(res);
        getAvailableNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (refreshSignnal) => {
    setIsOpen({ type: "", status: false, role: "" });
    setDetails({
      approvers: [],
      attachments: [],
      data: null,
      notes: [],
      requestID: null,
    })
    if (refreshSignnal === "refresh") {
      getAvailableNotification();
      setSelectedTab(0)
    }

  };

  const tabs = !isOpen?.status
    ? []
    : isOpen?.type === "Leave"
    ? [
        {
          title: "Leave",
          component: (
            <LeaveDetail
              details={details}
              role={isOpen.role}
              handleClose={handleClose}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "Leave Return"
    ? [
        {
          title: "Leave Return",
          component: (
            <LeaveReturnDetails
              details={details}
              role={isOpen.role}
              handleClose={handleClose}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type?.includes("Profile")
    ? [
        {
          title: "Profile",
          component: (
            <ProfileDetail
              details={details}
              role={isOpen.role}
              handleClose={handleClose}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "Biodata"
    ? [
        {
          title: "Bio Data",
          component: (
            <BioDataDetail
              details={details}
              role={isOpen.role}
              handleClose={handleClose}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "Memo"
    ? [
        {
          title: "Memo",
          component: (
            <SignMemo
              role={isOpen.role}
              memo={{ ...details?.data, APPROVALS_DETAILS: details?.approvers }}
              details={details}
              handleClose={handleClose}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : isOpen?.type === "academics" ||
      isOpen?.type === "Certifications" ||
      isOpen?.type === "Education" ||
      isOpen?.type === "Professional Bodies" ||
      isOpen?.type === "Work Experience"
    ? [
        {
          title: isOpen?.type,
          component: (
            <AcademicDetail
              title={isOpen?.type}
              details={details}
              handleClose={handleClose}
              role={isOpen.role}
            />
          ),
        },
        { 
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ]
    : [
        {
          title: isOpen?.type || "Details",
          component: (
            <DefaultDetails
              title={isOpen?.type}
              details={details}
              role={isOpen.role}
              handleClose={handleClose}
            />
          ),
        },
        {
          title: "Attachment",
          component: <AttachmentDetailsApproval details={details} />,
        },
        { title: "Note", component: <NoteDetailsApproval details={details} /> },
      ];

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative text-gray-600">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className=" relative"
      >
        <div className="p-1 flex items-center rounded-lg cursor-pointer">
          <BsBellFill
            color="grey"
            size={21}
            className="font-medium text-gray-100"
          />
          <div className={cn(" absolute h-3 w-5 rounded-full bg-btnColor flex items-center justify-center -right-2 top-[0.4rem] border border-gray-100",(treated_requests?.length + awaiting_approval?.length) === 0 && "hidden")}>
            <span className="flex items-center justify-center text-[0.57rem] font-bold text-white">
              {treated_requests?.length + awaiting_approval?.length}
            </span>
          </div>
        </div>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute md:-right-27 right-0 z-[555]  mt-2.5 flex h-96 max-h-90 w-[19rem] flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto px-2">
          {treated?.map((tappr) => (
            <li key={tappr?.REQUEST_ID}>
              <div className="flex flex-col border-t px-4.5 py-3 ">
                <div className="flex gap-2 justify-between items-start">
                  {tappr?.IS_APPROVED ? (
                    <Avatar icon={<Check />} className="bg-green-500" />
                  ) : (
                    <Avatar icon={<ImCancelCircle />} className="bg-red-400" />
                  )}
                  <div className="flex flex-col flex-1 truncate">
                    <span className="truncate font-bold">{tappr?.title}</span>
                    <span className=" text-default-400 text-xs">
                      {tappr?.dateTreated}
                    </span>
                  </div>
                  <Button
                    onClick={() =>
                      openDrawer(
                        tappr?.REQUEST_ID,
                        tappr?.PACKAGE_NAME,
                        "request"
                      )
                    }
                    size="sm"
                    className="bg-btnColor text-white"
                  >
                    View
                  </Button>
                </div>
              </div>
            </li>
          ))}
          {awaiting?.map((tappr) => (
            <li key={tappr?.REQUEST_ID}>
              <div className="flex flex-col border-t px-4.5 py-3 ">
                <div className="flex gap-2 justify-between items-start">
                  <Avatar
                    icon={<BiQuestionMark />}
                    className="bg-default-600"
                  />
                  <div className="flex flex-col flex-1 truncate">
                    <span className="truncate font-bold">{tappr?.title}</span>
                    <span className=" text-default-400 text-xs">
                      {tappr?.requestDate}
                    </span>
                    <div className="flex gap-1 mt-1">
                      <User size={14} />
                      <span className=" text-default-500 text-xs">
                        {tappr?.LAST_NAME} {tappr?.FIRST_NAME}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      openDrawer(
                        tappr?.REQUEST_ID,
                        tappr?.PACKAGE_NAME,
                        "approval"
                      )
                    }
                    size="sm"
                    className="bg-btnColor text-white"
                  >
                    Treat
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {treated_requests?.length + awaiting_approval?.length ? (
          <div className="flex flex-col  mt-auto py-2">
            <div className="flex items-center justify-center">
              <Link
                to={"people/self/approvals"}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <button className="border border-gray-400 px-10 py-1  mx-10 rounded-full text-[0.9rem] hover:shadow active:border-gray-800 flex items-center gap-2 justify-center">
                  <span> View More</span>
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
      <ExpandedDrawerWithButton maxWidth={isOpen.type == "Variation" ? 1100 :  920} isOpen={isOpen.status} onClose={handleClose}>
        <FormDrawer
          title={""}
          tabs={[
            ...tabs,
            {
              title: "Approval history",
              component: <ApprovalHistory details={details} />,
            },
          ]}
        ></FormDrawer>
      </ExpandedDrawerWithButton>

      <PerformanceApprovalDrawer
        isOpen={isAperOpen}
        setIsOpen={()=>onAperClose()}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        incomingData={details}
        handleClose={handleClose}
        viewMode={viewMode}
      />
    </div>
  );
};

export default DropdownNotification;
