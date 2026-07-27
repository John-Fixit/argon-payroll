import { useState } from 'react'
import EduInformationDrawer from './profileDrawer/EduInformationDrawer'
import WorkTable from '../workTable/WorkTable'

export default function Education() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <>
      <WorkTable />
      {isDrawerOpen && (
        <EduInformationDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
