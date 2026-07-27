/* eslint-disable no-unused-vars */
import { useMemo, useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import PageHeader from "../../../../components/payroll_components/PageHeader";
import Separator from "../../../../components/payroll_components/Separator";
import Attachement from "../../../../components/Request&FormComponent/Attachement";
import OverviewCards from "./components/OverviewCards";

import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import FormDrawer from "../../../../components/payroll_components/FormDrawer";

import Form from "./components/Form.jsx";

import { data } from "./memoDoomyData.js";
import AddNote from "./components/AddNote.jsx";
import MemoCard from "./components/MemoCard.jsx";
import MemoAttachment from "./components/MemoAttachment.jsx";
import MemoApproval from "./components/MemoApproval.jsx";

import MemoApprovalHistory from "./components/MemoApprovalHistory.jsx";
import MemoNotes from "./components/MemoNotes.jsx";
import SignMemoByJohn from "./components/SignMemoByJohn.jsx";

export default function MemoDashByJohn() {
  const [open, setOpen] = useState({ status: false, role: null, memo: null });
  const [openDrawer, setOpenDrawer] = useState({ status: false, type: null });
  const [selectedMemo, setSelectedMemo] = useState("");

  // const {
  //   register,
  //   handleSubmit,

  // } = useForm()

  const handleOpenDrawer = (role, memo) => {
    setOpen({ status: true, role: role });
    setSelectedMemo(memo);
  };
  const handleCloseDrawer = () => {
    setOpen({ status: false });
  };

  //second drawer
  const openDrawerFn = (type, memo) => {
    // setSelectedMemo(memo);
    setOpenDrawer({ ...openDrawer, status: true, type: type });
  };
  const closeDrawerFn = () => {
    setOpenDrawer({ ...openDrawer, status: false });
  };

  const [selected, setSelected] = useState("all");

  const modifiedData = useMemo(() => {
    if (selected === "all") {
      return data;
    } else if (selected === "draft") {
      return data?.filter(
        (memo) => memo?.created_by === "me" && memo?.status === "draft"
      );
    } else if (selected === "approval") {
      return data?.filter((memo) => memo?.created_by !== "me");
    } else if (selected === "pending") {
      return data?.filter((memo) => memo?.created_by === "me" && memo?.status === "pending");
    }
  }, [selected]);

  return (
    <>
      <main>
        <section className="header_dashboard_section ">
          <PageHeader
            header_text={"Memos"}
            breadCrumb_data={[{ name: "Home" }, { name: "Memos" }]}
            buttonProp={[
              // { button_text: "My Aproval Memo" },
              {
                button_text: "Create Memo",
                fn: () => openDrawerFn("create_memo"),
              },
            ]}
          />
        </section>
        <div className="mt-5">
          <hr />
        </div>
        <>
          <Separator separator_text={"OVERVIEW"} />
          <OverviewCards memos={data} setSelected={setSelected} />
        </>
        <Separator separator_text={"ALL MEMOS"} />
        <section className="memos_section mt-3">
          <div className="filter_section grid grid-cols-1 md:grid-cols-4 gap-5">
            <div>
              <Input
                type="text"
                variant={"bordered"}
                label="Memo Name"
                className="text-[rgb(33, 37, 41)] font-[400] h-[50px] text-[15px] leading-[2]"
                classNames={{
                  inputWrapper:
                    "outline-none border-[1px] shadow-none rounded-[0.375rem] bg-white",
                  label: "z-1",
                }}
              />
            </div>
            <div>
              <Input
                type="text"
                variant={"bordered"}
                label="Memo Name"
                className="text-[rgb(33, 37, 41)] bg-[rgb(255, 255, 255)] font-[400] h-[50px] text-[15px]"
                classNames={{
                  inputWrapper: [
                    "outline-none",
                    "border-[1px]",
                    "shadow-none",
                    "rounded-[0.375rem]",
                    "bg-white",
                  ],
                  label: "z-1",
                }}
              />
            </div>
            <div>
              <Select
                value={"Select Designation"}
                className="text-[#000] text-semibold bg-[rgb(255, 255, 255)] text-[15px] leading-[2] py-0"
                variant="bordered"
                aria-label="Select Designation"
                size="sm"
                classNames={{
                  mainWrapper: ["h-[50px]"],
                  trigger: [
                    "outline-none",
                    "border-[1px]",
                    "shadow-none",
                    "rounded-[0.375rem]",
                    "bg-white",
                  ],
                  value: [
                    "text-[rgb(103, 103, 103)]",
                    "text-[14px]",
                    "font-[500]",
                  ],
                }}
              >
                <SelectItem value="Select Designation">
                  Select Designation
                </SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </Select>
            </div>
            <div>
              <button className="uppercase h-[47px] text-center rounded-[6px] text-[16px] font-[400] font-[circularstd, sans-serif] leading-[24px] bg-[#00bcc2] w-full text-white">
                Search
              </button>
            </div>
          </div>

          {/* <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
            className="mt-4 flex justify-en"
            variant="bordered"
            color="secondary"
            classNames={{
            base: "rounded"
            }}
            radius="sm"
          >
            <Tab key="my_memos" title="My Memos">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-5">
                {data
                  ?.filter((memo) => memo?.created_by === "me")
                  ?.map((item, index) => (
                    <MemoCard
                      key={index + "_memo"}
                      memo={item}
                      handleOpenDrawer={handleOpenDrawer}
                      openDrawerFn={openDrawerFn}
                    />
                  ))}
              </div>
            </Tab>
            <Tab key="approval_memo" title="Approval Memo">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-5">
                {data
                  ?.filter((memo) => memo.created_by !== "me")
                  ?.map((item, index) => (
                    <MemoCard
                      key={index + "_memo"}
                      memo={item}
                      handleOpenDrawer={handleOpenDrawer}
                      openDrawerFn={openDrawerFn}
                    />
                  ))}
              </div>
            </Tab>
          </Tabs> */}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 lg:gap-5 mt-3">
            {modifiedData?.map((item, index) => (
              <MemoCard
                key={index + "_memo"}
                memo={item}
                handleOpenDrawer={handleOpenDrawer}
                openDrawerFn={openDrawerFn}
              />
            ))}
          </div>
        </section>
      </main>

      <ExpandedDrawerWithButton
        isOpen={openDrawer.status}
        onClose={closeDrawerFn}
        maxWidth={"47rem"}
      >
        {
        // openDrawer.type === "viewMemo" || openDrawer === "viewNote" ? (
        //   <div className="mt-5 mb-5">
        //     {openDrawer.type === "viewNote" ? (
        //       <ViewNotes />
        //     ) : (
        //       <SignMemo
        //         memo={selectedMemo}
        //         openDrawerFn={openDrawerFn}
        //         handleOpenDrawer={handleOpenDrawer}
        //       />
        //     )}
        //   </div>
        // ) : 
        (
          <FormDrawer

            tabs={
              openDrawer?.type === "create_memo"
                ? [
                    {
                      title: "Create Memo",
                      component: <Form handleCloseDrawer={closeDrawerFn}/>,
                      header_text: "Create Memo",
                      subText: "",
                    },
                    {
                      title: "Add Attachment",
                      component: <Attachement />,
                      header_text: "Attachment",
                    },
                    {
                      title: "Add Approval",
                      component: <MemoApproval />,
                      header_text: "Approvals",
                    },
                    // {
                    //   title: "Add Note",
                    //   component: <AddNote />,
                    //   header_text: "Add Note",
                    // },
                  ]
                : openDrawer?.type === "edit_memo"
                ? [
                    {
                      title: "Edit Memo",
                      component: <Form />,
                      header_text: "Edit Memo",
                      sub_text: "",
                    },
                    {
                      title: "Attachment",
                      component: <Attachement />,
                      header_text: "Attachment",
                      sub_text: "",
                    },
                    {
                      title: "Approval",
                      component: <MemoApproval />,
                      header_text: "Approval History",
                    },
                    // { title: "Note", component: <AddNote /> }
                  ]
                : openDrawer.type === "addNote"
                ? [
                    {
                      title: "Add Note",
                      component: <AddNote />,
                      header_text: "Add Note",
                    },
                  ]
                : openDrawer.type === "viewNote" ? [
                    { title: "Notes", component: <MemoNotes />, header_text: "Notes" },
                    { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                    { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                  ]
                : openDrawer.type==='approval_history' && [
                  { title: "Approval", component: <MemoApprovalHistory />, header_text: "Memo Approval History" },
                    { title: "Notes", component: <MemoNotes />, header_text: "Notes" },
                    { title: "Attachment", component: <MemoAttachment />, header_text: "Memo Attachment" },
                  ]
            }
          >
            <Form />
          </FormDrawer>
        )}
      </ExpandedDrawerWithButton>

      <ExpandedDrawerWithButton
        isOpen={open.status}
        onClose={handleCloseDrawer}
      >
        {/* <FormDrawer
          tabs={
            open.role === "compose_memo"
              ? [
                  { title: "Compose Memorandom" },
                  {
                    title: "Training upload",
                    component: <Training_UploadForm />,
                  },
                  { title: "Expense", component: <ExpenseForm /> },
                  { title: "Travel", component: <TravelForm /> },
                  { title: "Invoice", component: <InvoiceForm /> },
                  { title: "Access", component: <AccessForm /> },
                  // description, date and amount
                ]
              : open.role === "review"
              ? [
                  { title: "Content" },
                  { title: `Approval(${3})` },
                  { title: `Notes(${3})` },
                  { title: `Attachment(2)` },
                ]
              : open.role === "viewNote"
              ? [
                  { title: "Notes", component: <ViewNotes /> },
                  { title: "Attachment", component: <MemoAttachment /> },
                  { title: "Approval", component: <MemoApproval /> },
                  // { title: "Add Note", component: <AddNote /> },
                ]
              : [
                  selectedMemo?.created_by === "me" && {
                    title: "Edit Memo",
                  },
                  { title: "Content" },
                  { title: `Approval(${3})` },
                  selectedMemo?.created_by !== "me" && {
                    title: `Notes(${3})`,
                    component: <AddNote />,
                  },
                  { title: `Attachment(2)`, component: <Attachement /> },
                ]
          }
        >
          {open.role === "edit_memo" ? <EditMemo /> : null}
        </FormDrawer> */}

        <SignMemoByJohn memo={selectedMemo} handleOpenDrawer={openDrawerFn} />
      </ExpandedDrawerWithButton>

      
    </>
  );
}
