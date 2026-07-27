/* eslint-disable no-unused-vars */

import { useContext, useEffect, useRef, useState } from "react";
import { dashboardContext } from "../../../../context/Dashboard";

import { motion } from "framer-motion";
import Body from "./components/Body";
import ReviewMemo from "./components/ReviewMemo";
import Header from "./components/Header";
import Form from "./components/Form";
import EditMemo from "./components/EditMemo";
import Sidebar from "./components/Sidebar";
import { useMediaQuery } from "react-responsive";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";
import Training_UploadForm from "./components/Training_UploadForm";
import ExpenseForm from "./components/ExpenseForm";
import TravelForm from "./components/TravelForm";
import InvoiceForm from "./components/InvoiceForm";
import AccessForm from "./components/AccessForm";
import SignMemo from "./components/SignMemo";


const Memo = () => {

  const { toggleSideBar } = useContext(dashboardContext);

  const [showSearchInp, setShowSearchInp] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showComposeBtn, setShowComposeBtn] = useState(false);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [open, setOpen] = useState({status: false, role: null});

  let isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  let isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  const sidebarRef = useRef();

  const sidebarWidth = "23rem";

  const selectConversation = () => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    }
  };

  const handleOpenDrawer=(role)=>{
    setOpen({status: true, role: role});
  }
  const handleCloseDrawer=()=>{
    setOpen({status: false});
  }
  const openDrawerFn=()=>{
    setOpenDrawer(true);
  }
  const closeDrawerFn=()=>{
    setOpenDrawer(false);
  }

  const sidebar_animation = isSmallScreen
    ? {
        open: {
          x: 0,
          width: sidebarWidth,
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -350,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : isMediumScreen
    ? {
        //medium //
      }
    : {
        open: {
          x: "16rem",
          width: sidebarWidth,
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "0rem",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (isSmallScreen) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isSmallScreen]);

  return (
    <>
    <div className="flex h-screen flex-col overflow-y-clip font-Exotic ">
      <div
        onClick={() => setSidebarOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[50] bg-chatoverlay cursor-pointer ${
          sidebarOpen ? "block" : "hidden"
        } `}
      ></div>

      <div className="px-0 h-screen">
        <div className="relative  h-screen flex-1  flex">
          {/* {`w-full min-h-[93vh] ${ (sidebarMinimized) ?  'lg:ml-[7.5rem]'  : (sidebarOpen) ? 'lg:ml-64' : (!sidebarMinimized &&!sidebarOpen) &&'lg:ml-0'}`} */}

          {/* the drawer sidebar */}

          <motion.div
            ref={sidebarRef}
            variants={sidebar_animation}
            initial={{ x: isSmallScreen ? 350 : 0 }}
            animate={sidebarOpen ? "open" : "closed"}
            className={`shadow-sidebar group md:z-[40] z-[60] max-w-[23rem] w-[${sidebarWidth}] 
                    fixed top-[4.5rem] left-0
                h-[100vh]`}
          >
            <Sidebar
              sidebarWidth={sidebarWidth}
              setShowComposeBtn={setShowComposeBtn}
              handleOpenDrawer={openDrawerFn}
            />
          </motion.div>

          {/* the drawer side end */}

          <div
            className={`h-full flex-1 flex flex-col w-full  ${
              sidebarOpen
                ? `md:ml-[23rem]`
                : !sidebarOpen && "md:ml-0"
            }`}
          >
            <Header
              toggleSideBar={toggleSideBar}
              showDrawer={() => setSidebarOpen(!sidebarOpen)}
              sidebarOpen={sidebarOpen}
              handleOpenDrawer={handleOpenDrawer}
              compose={open}
              showComposeBtn={showComposeBtn}
            />
            <Body showEditBtn={showComposeBtn} handleOpenDrawer={handleOpenDrawer}/>
            {/* <Body showEditBtn={showComposeBtn} handleOpenDrawer={openDrawerFn}/> */}
           
          </div>
        </div>
      </div>
    </div>
    <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
      >
          <FormDrawer tabs={ open.role === 'compose_memo'?
          (
            [
              {title: "Compose Memorandom"},
              {title: "Training upload", component: <Training_UploadForm />},
              {title: "Expense", component: <ExpenseForm />},
              {title: "Travel", component: <TravelForm />},
              {title: "Invoice", component: <InvoiceForm />},
              {title: "Access", component: <AccessForm />},
              // description, date and amount
            ]
          ) : 
          open.role==='review'?(
            [
              {title: "Content"},
              {title: `Approval(${3})`},
              {title: `Notes(${3})`},
              {title: `Attachment(2)`},
            ]
          )
          :(
            [
              {title: "Edit Memo"},
              {title: "Content"},
              {title: `Approval(${3})`},
              {title: `Notes(${3})`},
              {title: `Attachment(2)`},
            ]
          )
            }>
            {
              open.role==='edit_memo'? (<EditMemo />) : open.role==='compose_memo'?(<Form />): open.role==='review'?(<ReviewMemo showEditBtn={showComposeBtn} handleOpenDrawer={openDrawerFn} />) : null
            }
          </FormDrawer>
      </ExpandedDrawerWithButton>




      <ExpandedDrawerWithButton
        isOpen={openDrawer}
        onClose={closeDrawerFn}
      >
        <div className="mt-5 mb-5">
          <SignMemo />
        </div>
      </ExpandedDrawerWithButton>

    </>
  );
};

export default Memo;