/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import Label from "../forms/FormElements/Label";
import Input from "../forms/FormElements/Input";
import { button } from '@nextui-org/react';

const ChildModal = ({isModalOpen, setIsModalOpen,organizationalChart,selectedObject,editMode, setEditMode}) => {
  const [inputValue, setInputValue] = useState('')

useEffect(() => {
 if (editMode) {
    setInputValue(selectedObject?.title)
 }
}, [editMode,selectedObject?.title])


  function findNodeById(node, target,newData) {
  if (node.id === target) {
    node.children.push(newData);
  }
    for (const child of node.children) {
    findNodeById(child, target,newData);
    }
}

function updateTitle(obj, idToUpdate, newTitle) {
    if (obj.id === idToUpdate) {
        obj.title = newTitle;
        return true;
    }

    if (obj.children && obj.children.length > 0) {
        for (let i = 0; i < obj.children.length; i++) {
            const child = obj.children[i];
            const updated = updateTitle(child, idToUpdate, newTitle);
            if (updated) {
                break;
            }
        }
    }
    return false;
}


  const handleSave = () => {
  if (editMode) {
    updateTitle(organizationalChart, selectedObject?.id,inputValue)
  }else{
findNodeById(organizationalChart, selectedObject?.id,{id:crypto.randomUUID(),title:inputValue,children:[]});
  }
setInputValue('')
    setIsModalOpen(false);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  setInputValue('')
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal open={isModalOpen} footer={[
      <div className='flex items-center gap-4 justify-end' key={1}>
      <button className=' border px-4 py-1 font-helvetica rounded ' onClick={handleCancel}>Cancel</button>
      <button className={`text-white px-4 py-1 font-helvetica rounded ${editMode?'bg-green-400':'bg-blue-400'}`} onClick={handleSave}>{editMode?"Update":"Add"}</button>
      </div>
    ]} onCancel={handleCancel} >
      <div className='my-4'> 
              <Label className={`text-medium`}>
                 Child
                </Label>
             
            <Input
            autoFocus
              type="text"
              className="w-full"
              placeholder='Title'
              value={inputValue}
              onChange={(e) => {
    setInputValue(e.target.value)
  }}
            />
      </div>
      </Modal>
    </>
  );
};

export default ChildModal;