import { Button } from '@nextui-org/react'
import NewAppraisalFormDrawer from './NewAppraisalFormDrawer'
import { useState } from 'react'

export default function NewAppraisalForm() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const handleEditClick = () => {
    setIsDrawerOpen(true)
  }
  return (
    <>
      <div>
        <Button onClick={handleEditClick}>New Form</Button>
      </div>

      {isDrawerOpen && (
        <NewAppraisalFormDrawer
          isOpen={isDrawerOpen}
          setIsOpen={setIsDrawerOpen}
        />
      )}
    </>
  )
}
