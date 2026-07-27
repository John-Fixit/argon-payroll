/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Drawer } from "antd";
import { useMemo, useState } from "react";
import AddSuspensionForm from "./add_suspension_forms/AddSuspensionForm";
import SuspensionAttachment from "./add_suspension_forms/SuspensionAttachment";
import { useForm } from "react-hook-form";
import SuspensionNote from "./add_suspension_forms/SuspenstionNote";
import Benefits from "./add_suspension_forms/Benefits";
import PropTypes from "prop-types";

const SuspensionDrawer = ({ setIsOpen, isOpen }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = useMemo(
    () => [
      {
        title: "Form",
      },
      {
        title: "Benefits",
      },
      {
        title: "Attachments",
      },
      { title: "Notes" },
    ],
    []
  );

  const goToNextTab = () => {
    if (selectedTab < tabs.length - 1) {
      setSelectedTab((prevTab) => prevTab + 1);
    }
  };

  const { register, setValue, getValues, watch } = useForm();

  const handleSubmit = () => {};

  return (
    <>
      <Drawer
        width={750} //620 for shopping and services
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: "bg-[#F7F7F7]",
          header: "font-helvetica bg-[#F7F7F7]",
        }}
      >
        <>
          <div className="bg-[#f5f7fa] min-h-screen px-5 py-5">
            <h4 className="header_h3 text-2xl mb-3 font-helvetica">
              Add Suspension
            </h4>

            <div className="grid grid-cols-1 h-ful md:grid-cols-4 gap-x-7 gap-y-5">
              <div className="my- w-full p-5 overflow-y-auto col-span-3 shadow-xl bg-white rounded-[0.25rem] mb-[1rem] form_drawer_body_container order-2 md:order-1 ">
                {tabs[selectedTab]?.title.toLowerCase() == "form" && (
                  <AddSuspensionForm
                    // control={control}
                    // setValue={setValue}
                    // getValues={getValues}
                    // watch={watch}
                    // errors={errors}
                    // touchedFields={touchedFields}
                    // trigger={trigger}
                    // qualifyLoanData={qualifyLoanData}
                    // qualifyLoanError={qualifyLoanError}
                    // qualifyLoanLoading={qualifyLoanLoading}
                    // isQualifyLoanError={isQualifyLoanError}
                    goToNextTab={goToNextTab}
                  />
                )}
                {tabs[selectedTab]?.title?.toLowerCase() == "benefits" && (
                  <Benefits
                    goToNextTab={goToNextTab}
                    setValue={setValue}
                    watch={watch}
                    getValues={getValues}
                  />
                )}
                {tabs[selectedTab].title.toLowerCase() == "attachments" && (
                  <SuspensionAttachment
                    setValue={setValue}
                    getValues={getValues}
                    watch={watch}
                    goToNextTab={goToNextTab}
                  />
                )}
                {tabs[selectedTab].title.toLowerCase() ==
                  "Notes".toLowerCase() && (
                  <SuspensionNote
                    handleSubmit={handleSubmit}
                    setValue={setValue}
                    getValues={getValues}
                    // isLoading={isPending}
                  />
                )}
              </div>
              <div className="flex flex-col border-l-1 border-gray-400 py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-5 md:my-0 md:h-full order-1 md:order-2">
                {tabs?.map((tab, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`${
                      selectedTab === index ? "font-[600]" : "font-[400]"
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
        </>
      </Drawer>
    </>
  );
};

SuspensionDrawer.propType = {
  setIsOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default SuspensionDrawer;
