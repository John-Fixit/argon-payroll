/* eslint-disable react/prop-types */
import { useState } from "react";
import ExpandedDrawer from "../../modals/ExpandedDrawer";
import TextForm from "../../residentialForm/TextForm";
import AttachmentForm from "../../residentialForm/AttarchmentForm";
import NoteForm from "../../residentialForm/NoteForm";
import { Drawer } from "antd";

export default function ResidentailInformationDrawer({ isOpen, setIsOpen }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      title: "Details",
      sub: "Fill form",
      content: (
        <TextForm
          onPrev={() => setSelectedTab(0)}
          onNext={() => setSelectedTab(1)}
        />
      ),
    },
    {
      title: "Attachments",
      sub: "Upload ",
      content: (
        <AttachmentForm
          onPrev={() => setSelectedTab(0)}
          onNext={() => setSelectedTab(2)}
        />
      ),
    },
    {
      title: "Notes",
      sub: "Add Note",
      content: (
        <NoteForm setIsOpen={setIsOpen} onPrev={() => setSelectedTab(1)} />
      ),
    },
  ];
  // const onChangeTab = () => {
  //   if (selectedTab === 2) return
  //   setSelectedTab(selectedTab + 1)
  // }
  return (
    <>
      <Drawer
        // maskClosable={maskClosable}
        // closable={closable}
        // title={"Who you be"}
        width={620} //620 for shopping and services
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: "bg-[#F7F7F7]",
          header: "font-helvetica bg-[#F7F7F7]",
        }}
      >
        <div className="h-full mx-3">
          <div className="bg-[#f5f7fa] min-h-screen px-5 py-5">
            <h4 className="header_h3 text-2xl mb-3">Residential Information</h4>
            {/* <div className=' pt-8 grid grid-cols-1 md:grid-cols-[1fr_160px] min-h-full md:gap-20 lg:gap-8'>
            {tabs[selectedTab].content}

            <div className='border-0 md:border-l-2 mt16  h-auto relative px-5 font-Exo text-gray-500'>
              <div className='flex flex-col py-5 md:py28 text-sm gap-3'>
                {tabs?.map((pk, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedTab === pk?.title && 'font-bold'
                    } relative cursor-pointer`}
                    onClick={() => setSelectedTab(index)}
                  >
                    {pk?.title}
                    <span
                      className={`w-3 h-3 rounded-full  ${
                        selectedTab === index ? 'bg-blue-500/80' : 'bg-gray-300'
                      }  border-2 border-white absolute -left-[1.7rem] top-1 duration-200 transition-all`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
            <div className="grid grid-cols-1 h-ful md:grid-cols-4 gap-4">
              <div className="my- w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 ">
                {tabs[selectedTab].content}
              </div>

              <div className="flex flex-col border-l-1 border-gray-400 py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-5 md:my-0 md:h-full order-1 md:order-2">
                {tabs?.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`${
                      selectedTab === index ? "font-[500]" : "font-[400]"
                    } relative cursor-pointer font-[13px] leading-[19.5px] text-[rgba(39, 44, 51, 0.7)]`}
                  >
                    {tab?.title}
                    <span
                      className={`w-[0.7rem] h-[0.7rem] rounded-full  ${
                        selectedTab === index ? "bg-[#00bcc2]" : "bg-gray-300"
                      }  border-1 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {/* <ExpandedDrawer isOpen={isOpen} onClose={setIsOpen}>
      
        <div className='bg-[#f5f7fa] min-h-screen  p-10'>
          <h4 className='header_h3 text-2xl'>Residential Information</h4>
          <div className=' pt-8 grid grid-cols-1 md:grid-cols-[1fr_160px] min-h-full gap-7 md:gap-20 lg:gap-8'>
            {tabs[selectedTab].content}

            <div className='border-0 md:border-l-2 mt16  h-auto relative px-5 font-Exo text-gray-500'>
              <div className='flex flex-col py-5 md:py28 text-sm gap-3'>
                {tabs?.map((pk, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedTab === pk?.title && 'font-bold'
                    } relative cursor-pointer`}
                    onClick={() => setSelectedTab(index)}
                  >
                    {pk?.title}
                    <span
                      className={`w-3 h-3 rounded-full  ${
                        selectedTab === index ? 'bg-blue-500/80' : 'bg-gray-300'
                      }  border-2 border-white absolute -left-[1.7rem] top-1 duration-200 transition-all`}
                    ></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ExpandedDrawer> */}
    </>
  );
}

// const Tab = ({ children }) => {
//   return <div className='h-full md:w-[35rem] mx-auto  p-4'>{children}</div>
// }
