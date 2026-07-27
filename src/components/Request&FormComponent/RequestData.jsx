import { Fragment, useEffect, useState } from "react";
import { BsTicketDetailed } from "react-icons/bs";
import PayrollCard from "../payroll_components/PayrollCard";
import Drawer from "./Drawer";
import EducationTextForm from "./EducationForms/EducationTextForm";
import Attachment from "./Attachement";
import Note from "./Note";
import HrFormTable from "./HrFormTable";
import WorkExperienceTextForm from "./WorkExperienceForms/WorkExperienceTextForm";
import CertificationTextForm from "./CertificationForms/CertificationTextForm";
import ProfessionalBodyTextForm from "./ProfessionalBodyForms/ProfessionalBodyTextForm";
import LabourAssociationTextForm from "./LabourAssociationForms/LabourAssociationTextForm";
import CooperativeTextForm from "./CooperativeForms/CooperativeTextForm";
import FamilyTextForm from "./FamilyForms/FamilyTextForm";
import NextofKinTextForm from "./NextofKinForms/NextofKinTextForm";
import LanguagesTextForm from "./LanguagesForms/LanguagesTextForm";
import MedicalTextForm from "./MedicalForms/MedicalTextForm";
import LeaveTextForm from "./LeaveForms/LeaveTextForm";
import LeaveHandOverForm from "./LeaveForms/LeaveHandOverForm";
import LeaveApprovalForm from "./LeaveForms/LeaveApprovalForm";
import LeaveReturnTextForm from "./LeaveReturnForms/LeaveReturnTextForm";
import LeaveReturnApprovalForm from "./LeaveReturnForms/LeaveReturnApprovalForm";
import ExitTextForm from "./ExitForms/ExitTextForm";
import EmbassyTextForm from "./EmbassyForms/EmbassyTextForm";
import ProfilePictureTextForm from "./ProfilePictureForms/ProfilePictureTextForm";
export default function RequestData() {
  const [approvalNotification, setApprovalNotification] = useState({name:'Approval',notification_count: 0})
   const [handOverNotification, setHandOverNotification] = useState({name:'HandOver',notification_count: 0})
  const [isOpen, setIsOpen] = useState(false);
  const [targetedId, setTargetedId] = useState(null);
  const [sideBarNeeded, setsideBarNeeded] = useState(true);
   const [selectedTab, setSelectedTab] = useState(0)

useEffect(() => { 
 setSelectedTab(0)
}, [isOpen])

  const [tabs, setTabs] = useState([
    { title: "Form", sub: "Fill form" },
    {
      title: "Attachments",
      sub: "Upload ",
    },
    { title: "Notes", sub: "Add Note" },
  ]);

  const iconSize = "5vh";
  const iconColor = "#344860";
  const listData = [
    {
      title: "Education",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "HR Forms",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Work Experience",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Certifications",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Professional Bodies",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Labour Associations",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Cooperatives",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Family",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Next of Kin",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Languages",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Medical",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Leave",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Leave Return",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Exit",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Profile Picture",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Performance",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
    {
      title: "Embassy Requests",
      icon: <BsTicketDetailed size={iconSize} color={iconColor} />,
    },
  ];

  const getTarget = (i) => {
    setTargetedId(i);
    setIsOpen(true);
    if (i == 1) {
      setsideBarNeeded(false);
    } else {
      setsideBarNeeded(true);
    }

    if (i == 5|| i == 6 || i == 15 || i == 16) {
      setTabs([
        { title: "Form", sub: "Fill form" },
        { title: "Notes", sub: "Add Note" },
      ]);
    }
    else if(i == 11){
      setTabs([
         { title: "Form", sub: "Fill form",},
  {
    title: "Attachments",
    sub: "Upload ",
  },
  { title: "Notes", sub: "Add Note",},
  {
    title: "HandOver",
    sub: "Upload ",
  },
  {
    title: "Approval",
    sub: "Add Note",
  },
      ]);
    }
    else if(i == 12){
      setTabs([
         { title: "Form", sub: "Fill form",},
  {
    title: "Approval",
    sub: "Add Note",
  },
      ]);
    }
     else {
      setTabs([
        { title: "Form", sub: "Fill form" },
        {
          title: "Attachments",
          sub: "Upload ",
        },
        { title: "Notes", sub: "Add Note" },
      ]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-6 my-3">
        {listData.map((item, index) => {
          return (
            <Fragment key={index}>
              <div onClick={() => getTarget(index)}>
                <PayrollCard icon={item.icon} title={item.title} />
              </div>
            </Fragment>
          );
        })}
        <Drawer
          sideBarNeeded={sideBarNeeded}
           selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        approvalNotification={approvalNotification}
        handOverNotification={handOverNotification}
          tabs={tabs}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        >
        
                  {/* For education forms */}
      {targetedId==0&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<EducationTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For HR table */}
      {targetedId==1&& <HrFormTable/> }

      {/* For work experience forms */}
      {targetedId==2&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<WorkExperienceTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For certification forms */}
      {targetedId==3&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<CertificationTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For professional body forms */}
      {targetedId==4&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<ProfessionalBodyTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For labour association forms */}
      {targetedId==5&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<LabourAssociationTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For cooperative forms */}
      {targetedId==6&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<CooperativeTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For family forms */}
      {targetedId==7&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<FamilyTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For next of kin forms */}
      {targetedId==8&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<NextofKinTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For languages forms */}
      {targetedId==9&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<LanguagesTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For medical forms */}
      {targetedId==10&&<div>
      {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<MedicalTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For leave forms */}
      {targetedId==11&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<LeaveTextForm setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen}/>}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      {tabs[selectedTab].title.toLowerCase()==('Handover').toLowerCase()&&<LeaveHandOverForm handOverNotification={handOverNotification} setHandOverNotification={setHandOverNotification} approvalNotification={approvalNotification} setApprovalNotification={setApprovalNotification} isOpen={isOpen} setIsOpen={setIsOpen}/>}
      {tabs[selectedTab].title.toLowerCase()==('Approval').toLowerCase()&&<LeaveApprovalForm approvalNotification={approvalNotification} setApprovalNotification={setApprovalNotification} setSelectedTab={setSelectedTab} />}
      </div>}

      {/* For leave return forms */}
      {targetedId==12&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<LeaveReturnTextForm setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen}/>}
      {tabs[selectedTab].title.toLowerCase()==('Approval').toLowerCase()&&<LeaveReturnApprovalForm approvalNotification={approvalNotification} setApprovalNotification={setApprovalNotification} setSelectedTab={setSelectedTab} />}
      </div>}

      {/* For exit forms */}
      {targetedId==13&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<ExitTextForm setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen}/>}
        {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For profile picture forms */}
      {targetedId==14&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<ProfilePictureTextForm setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen}/>}
        {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

      {/* For embassy forms */}
      {targetedId==16&&<div>
       {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<EmbassyTextForm setSelectedTab={setSelectedTab} isOpen={isOpen} setIsOpen={setIsOpen}/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
      </div>}

        </Drawer>
      </div>
    </>
  );
}
