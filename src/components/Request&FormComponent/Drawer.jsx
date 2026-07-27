/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import DrawerSideBar from "./DrawerSideBar";
import { Drawer as AntdDrawer } from "antd";
import { ChatMessageCard } from "../core/shared/ChatMessageCard";

const Drawer = ({
  handleSubmit,
  submitButtonNeeded,
  isOpen,
  setIsOpen,
  children,
  tabs,
  sideBarNeeded,
  selectedTab,
  setSelectedTab,
  approvalNotification,
  handOverNotification,
  header,
  drawerWidth,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  // controlling scroll
  const drawerContentRef = useRef(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleKeyDown = (event) => {
    if (drawerContentRef.current) {
      switch (event.key) {
        case "ArrowUp":
          drawerContentRef.current.scrollTop -= 50; // Adjust the value as needed
          break;
        case "ArrowDown":
          drawerContentRef.current.scrollTop += 50; // Adjust the value as needed
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      // Store the current scroll position
      // Fix the body at the current scroll position
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
      setScrollPosition(window.scrollY);
    } else {
      // Restore the scroll position
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollPosition);
    }
  }, [isOpen, scrollPosition]);

  const closeModal = () => {
    setRefreshKey((oldKey) => oldKey + 1);
    setIsOpen(false);
  };

  return (
    <div>
      <AntdDrawer
        width={drawerWidth ?? 720}
        onClose={closeModal}
        open={isOpen}
        className="bg-[#F5F7FA]"
        classNames={{
          body: "bg-[#F5F7FA]",
        }}
      >

            <div className="flex  w-full mb-5" onClick={()=>{
                    setIsOpen(false);
                  }}>
                    <ChatMessageCard isOther={true}/>
            </div>


        <div
          className={`pointer-events-auto ${
            sideBarNeeded && "md:h-[82vh]"
          } w-full flex flex-col md:flex-row-reverse gap-4 md:gap-6`}
        >
          
          {sideBarNeeded && (
            <DrawerSideBar
              submitButtonNeeded={submitButtonNeeded ?? true}
              handleSubmit={handleSubmit}
              tabs={tabs}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              setSelectedTab={setSelectedTab}
              selectedTab={selectedTab}
              handOverNotification={handOverNotification}
              approvalNotification={approvalNotification}
            />
          )}
          
          <div
            className={`drawer_container w-full ${
              sideBarNeeded ? "md:w-3/4 " : "w-full"
            }`}
          >


         
           
            <div className="mb-4">
              <h4 className="text-xl font-helvetica font-medium m-0 uppercase">
                {header?.title}
              </h4>
              <p className="m-0 text-gray-400 text-sm">{header?.description}</p>
            </div>
            <div
              className="h-[75vh] overflow-y-scroll modal-contents"
              ref={drawerContentRef}
            >
              {children}
            </div>
          </div>
        </div>
      </AntdDrawer>
      {/* <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed  inset-0 bg-black bg-opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className={`pointer-events-auto w-full md:w-[50rem] grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#F5F7FA]`}>
               
                  <div className={`absolute cursor-pointer hover:bg-slate-50 ${sideBarNeeded?'top-12':'top-3'} md:top-3 right-8 z-50  border border-slate-400 rounded-full`}>
                  <IoIosClose
                  className="text-slate-400 font-thin"
                    size={22}
                    onClick={() => setIsOpen(!isOpen)}
                  />
                  </div>
                  <div className={`w-full ${sideBarNeeded?'md:col-span-3':'md:col-span-4'}`}>
                    {children}
                  </div>
                     {sideBarNeeded && (
                    <DrawerSideBar
                      tabs={tabs}
                      isOpen={isOpen}
                      setIsOpen={setIsOpen}
                      setSelectedTab={setSelectedTab}
                      selectedTab={selectedTab}
                      handOverNotification={handOverNotification}
                      approvalNotification={approvalNotification}
                    />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root> */}
    </div>
  );
};

export default Drawer;

Drawer.propTypes = {
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  sideBarNeeded: PropTypes.bool,
  tabs: PropTypes.array,
  selectedTab: PropTypes.number,
  setSelectedTab: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitButtonNeeded: PropTypes.bool,
  approvalNotification: PropTypes.object,
  handOverNotification: PropTypes.object,
  header: PropTypes.object,
  drawerWidth: PropTypes.number,
  children: PropTypes.any,
};
