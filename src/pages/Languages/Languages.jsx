/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import Header from '../../components/LanguagesComponents/Header';
import HistoryTable from '../../components/LanguagesComponents/HistoryTable';
import Drawer from '../../components/Request&FormComponent/Drawer';
import Separator from '../../components/payroll_components/Separator';

const Languages = () => {
  const [isOpen, setIsOpen] = useState(false);
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
  <Separator separator_text={'Languages'}/>
  </div>
      <HistoryTable/>
 <Drawer
          sideBarNeeded={true}
          tabs={tabs}
          targetedId={9}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

    </div>
  )
}

export default Languages