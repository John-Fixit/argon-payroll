/* eslint-disable react/prop-types */

import ExpandedDrawerWithButton from '../../../../../components/modals/ExpandedDrawerWithButton'
import {Button, Input} from '@nextui-org/react'

const Drawer = ({isOpen, onClose, isCreate}) => {
  return (
    <ExpandedDrawerWithButton maxWidth='50rem' isOpen={isOpen} onClose={onClose} round>
           <div className='p-10 text-center flex flex-col items-center w-full'>
              <h1>{isCreate ? 'New' : 'Edit' } Institution</h1>

              <div className='flex  flex-col gap-5 md:w-[70%] w-full'>
                <div className='mt-20'>
               
                  <Input
                    type='text'
                    label='Institution Name'
                    labelPlacement='outside'
                    placeholder='institution name'
                
                  />
                </div>

                <div className=' flex justify-end gap-x-5'>
                  <Button color='danger' onClick={onClose}>
                      Cancel
                  </Button>
                  <Button color='primary' >
                      {
                         isCreate ?  'Create' : 'Edit'
                      }
                      
                  </Button>
                </div>

              </div>
           </div>
    </ExpandedDrawerWithButton>
  )
}

export default Drawer
