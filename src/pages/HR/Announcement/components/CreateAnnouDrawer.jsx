
import { Button, Input, Select, SelectItem, } from "@nextui-org/react";
import PropType from "prop-types";

import { useState } from "react";
import ExpandedDrawerWithButton from "../../../../components/modals/ExpandedDrawerWithButton";
import CreatePostWithFormatter from "../../../home/centerFeed/components/CreatePostWithFormatter";

const CreateAnnouDrawer = ({isOpen, onClose }) => {
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

  return (
    <ExpandedDrawerWithButton maxWidth='50rem' isOpen={isOpen} onClose={onClose} >

        <div className='flex  h-full'>

                <div className='relative min-h-full w-20 hidden sm:block   bg-slate-700'>

                </div>

           <div className='p-10 text-center flex flex-col items-center w-full'>
              <h1>Create New Announcement</h1>

              <div className='flex  flex-col gap-5 md:w-[90%] w-full'>
                <div className='mt-20'>
               
                    <div className="grid grid-cols-1  md:grid-cols-2 gap-5">
                        <Input
                            type="text"
                            label={`Subject`}
                            labelPlacement="outside"
                            placeholder="Subject"
                        />
                         <Select 
                            label="Document Type" 
                            labelPlacement="outside"
                            
                        >
                            {['general', 'HR Form'].map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                            ))}
                        </Select>
                       
                        <Input
                            type="date"
                            label={`Start Date`}
                            labelPlacement="outside"
                            placeholder="date"
                        />
                        <Input
                            type="date"
                            label={`Start Date`}
                            labelPlacement="outside"
                            placeholder="date"
                        />
                    </div>

                </div>

                <div>
                        <CreatePostWithFormatter
                            desc={desc}
                            setDesc={setDesc}
                            file={file}
                            setFile={setFile}
                        />
                </div>
                <div>

                </div>

                <div className=' flex justify-end gap-x-5'>
                  <Button color='danger' onClick={onClose}>
                      Cancel
                  </Button>
                  <Button color='primary' disabled={ (!desc ||  desc === '<p><br></p>') && !file } >
                      Submit
                  </Button>
                </div>

              </div>
           </div>
        </div>
    </ExpandedDrawerWithButton>
  )
}


CreateAnnouDrawer.propTypes = {
    isOpen: PropType.bool,
    onClose: PropType.func
  };

export default CreateAnnouDrawer
