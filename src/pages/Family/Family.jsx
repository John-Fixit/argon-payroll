// import React from 'react'

import { useState } from "react";
import Header from "../../components/FamilyComponents/Header"
import HistoryTable from "../../components/FamilyComponents/HistoryTable"
import Drawer from "../../components/Request&FormComponent/Drawer";
import Separator from "../../components/payroll_components/Separator";
import FamilyTextForm from "../../components/Request&FormComponent/FamilyForms/FamilyTextForm";
import Attachment from "../../components/Request&FormComponent/Attachement";
import Note from "../../components/Request&FormComponent/Note";

const Family = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [selectedTab, setSelectedTab] = useState(0)
  const tabs=[
         { title: "Form", sub: "Fill form",},
  {
    title: "Attachments",
    sub: "Upload ",
  },
  { title: "Notes", sub: "Add Note",},
      ]
  return (
      <div className="py-8 font-helvetica">
    <Header setIsOpen={setIsOpen}/>
    <div className="mb-6">
  <Separator separator_text={'History'}/>
  </div>

      <HistoryTable/>

  <Drawer
        tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab}   isOpen={isOpen} setIsOpen={setIsOpen}  sideBarNeeded={true}
        >
        {tabs[selectedTab].title.toLowerCase()==('form').toLowerCase()&&<FamilyTextForm />}
      {tabs[selectedTab].title.toLowerCase()==('Attachments').toLowerCase()&&<Attachment/>}
      {tabs[selectedTab].title.toLowerCase()==('Notes').toLowerCase()&&<Note/>}
        </Drawer>
    </div>
  )
}

export default Family