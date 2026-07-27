/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { Tab, Tabs } from "@nextui-org/react";
import MemoBox from "./MemoBox";
import clsx from "clsx";
import { MdCancel, MdFilterList } from "react-icons/md";
//Tabs data;
//memos
const templates = [
  {
    name: "Name of the first template creator",
    title: "The subject of the memos",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "Name of the second template creator",
    title: "The subject of the memos",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "Name of the third template creator",
    title: "The subject of the memos",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "Sherri J. Cardenas",
    title: "ICT Department",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "Name of the template creator",
    title: "The subject of the memos",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "Name of the template creator",
    title: "The subject of the memos",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "Name of the template creator",
    title: "The subject of the memos",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "Name of the template creator",
    title: "The subject of the memos",
    created_at: "01/02/2024",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
];
//memos
const memos = [
  {
    name: "ICT Department",
    title: "Memo for submission of DTA in the terim for...",
    created_at: "2d ago",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "ICT Department",
    title: "Memo for submission",
    created_at: "2d ago",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
  {
    name: "ICT Department",
    title: "Memo for submission of DTA in the terim for...",
    created_at: "2d ago",
    body: (
      <>
        <div className="body_of_memo font-Exotic text-base">
          <p className="indent-6">
            I trust this letter finds you well. We would like to inform you of
            the outcomes of our recent annual warehouse physical inventory
            observation, conducted on [Date] at [Warehouse Location].{" "}
          </p>
          <p className="indent-6">
            The purpose of this annual inventory check was to ensure accuracy
            and accountability in our inventory management processes.{" "}
          </p>
          <p className="indent-6">
            We are pleased to report that the physical inventory count aligned
            closely with our recorded inventory levels, demonstrating a high
            level of accuracy in our tracking systems. Our dedicated team worked
            diligently to conduct thorough checks, reconcile discrepancies, and
            address any issues promptly.
          </p>
          <br />
          <p>Kind regards,</p>
          <span className="text-[rgba(39, 44, 51, 0)]">[Your Name]</span>
        </div>
      </>
    ),
  },
];
const Sidebar = ({ sidebarWidth, setShowComposeBtn, handleOpenDrawer }) => {

  const [selectedItem, setSelectedItem] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [data, setData] = useState(memos);

  const selectMemo = (index) => {
    setSelectedItem(index);
  };

  const handleUserFilter = (e) => {

    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data?.filter((item) => {
        const startsWith = item?.name
          ?.toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = item?.name
          ?.toLowerCase()
          .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  let tabs = [
    {
      id: "memos",
      label: "Memos",
      content: memos,
    },
    {
      id: "templates",
      label: "Templates",
      content: templates,
    },
  ];


  const handleTabChange = (item) => {
    setSearchValue("");
    if(item==='memos'){
      setData(memos)
      setShowComposeBtn(false)
    }
    if(item==='templates'){
      setData(templates)
      setShowComposeBtn(true)
    }
  };

  return (
    <div className={`h-full`}>
      <div className="py-[0.7rem] flex items-center bg-white">
        <div className="flex w-full flex-col">
          <Tabs
            aria-label="Dynamic tabs"
            items={tabs}
            fullWidth={true}
            onSelectionChange={handleTabChange}
            classNames={{
              tabList: "mx-3",
            }}
          >
            {(item) => (
              <Tab key={item.id} title={item.label} className="px-0">
                <div className="py-[0.7rem] w-full text-gray-400   flex items-center px-5 bg-white">
                  
                  <div className={`m-0 w-full`}>
                    <div
                      className={`flex gap-x-2 items-center h-10 border border-sidebarInpColor/10 rounded-md px-4 relative`}
                    >
                      <div className="mr-auto h-full  items-center  cursor-pointer">
                        <button className="pl-3  outline-none rounded flex items-center justify-center">
                            <MdFilterList
                              className=" text-gray-700 text-center  absolute top-[0.75rem] left-4"
                              size={14}
                            />
                        </button>
                      </div>
                      <input
                      type="search"
                        name=""
                        id=""
                        className={` outline-none border-none bg-transparent  px-2 w-full 
              placeholder:text-[0.80rem]  transition-all duration-700 placeholder:text-sidebarInptextColor  text-gray-500`}
                        onChange={(e) => handleUserFilter(e, item?.content)}
                        placeholder={`Filter ${item?.id}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="py-0">
                  <div className="flex flex-col space-y-1">
                    {/* max-h-[550px] */}
                    <div className=" max-h-[67vh] overflow-y-auto mb-12 scrollbar-thin scrollbar-thumb-gray scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent">
                      {(searchValue? filteredData : item?.content)?.map((user, index) => (
                        <div
                          key={user?.id}
                          className={clsx(
                            "flex justify-between max-h-26 overflow-y-clip w-full items-start cursor-pointer hover:bg-slate-50 p-3 px-5 border-b-[0.5px] border-slate-200",
                            selectedItem === index
                              ? "border-l-[3px] border-l-[#4aa2ee]"
                              : ""
                          )}
                          onClick={() => selectMemo(index)}
                        >
                          <>
                            <MemoBox data={user} index={index} handleOpenDrawer={handleOpenDrawer}/>
                          </>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Tab>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
