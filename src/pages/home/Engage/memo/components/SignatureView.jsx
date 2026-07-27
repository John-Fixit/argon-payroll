/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { PiSignatureLight } from "react-icons/pi";
import SignaturePad from "react-signature-canvas";
import Attachments from "../../../../../components/Request&FormComponent/Attachments";
import AttachmentApproval from "../../../../../components/core/approvals/AttachmentApproval";


export default function SignatureView({sigCanvas, clear, save, setUploadData}){
    const [activeTab, setActiveTab] = useState("");


    /// tabs
  const tabData = [
    {
      id: "create",
      label: "Create Signature",
      content: "Requiring Promotion",
    },
    {
      id: "upload",
      label: "Upload Signature",
      content: "Requiring Promotion",
    },
  ];
  const handleTabChange = (item) => {
    setActiveTab(item);
  };



    return(
        <>
            <div className="flex flex-col items-center">
            <div className="w-[65%] flex items-center flex-col">
              <div className="flex w-full flex-col">
                <Tabs
                  aria-label="Dynamic tabs"
                  items={tabData}
                  color="primary"
                  variant="underlined"
                  fullWidth={true}
                  onSelectionChange={handleTabChange}
                  classNames={{
                    tabList:
                      "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-[#22d3ee]",
                    // tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-[#06b6d4]",
                  }}
                >
                  {(item) => (
                    <Tab
                      key={item.id}
                      title={item.label}
                      className="px-0 font-medium font-Exotic text-base leading-3"
                    >
                      {activeTab === tabData[0].id && (
                        <div className="flex justify-center items-center">
                          <PiSignatureLight size={40} />
                          <span className="text-lg font-bold ml-3">
                            Create your signature
                          </span>
                        </div>
                      )}
                    </Tab>
                  )}
                </Tabs>
              </div>
              {activeTab === tabData[0].id ? (
                <>
                  <SignaturePad
                    ref={sigCanvas}
                    canvasProps={{
                      width: 500,
                      height: 200,
                      className: "border border-gray-500",
                      style: {
                        cursor: "grabbing",
                      },
                    }}
                  />
                  {/* Button to trigger save canvas image */}
                  <div className="flex justify-between mt-3 w-full">
                    <Button onClick={clear}>Clear</Button>
                    <Button className=" disabled:cursor-not-allowed " color="primary" onClick={save}>
                      Continue
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <AttachmentApproval setInformation={setUploadData}  />
                </>
              )}
            </div>
          </div>
        </>
    )
}