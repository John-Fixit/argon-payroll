/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import ChildModal from "./ChildModal";
import {
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import ActionButton from "../forms/FormElements/ActionButton";

const OrganizationalChart = ({ organizationalChart,deleteParent,}) => {
  const [selectedObject, setSelectedObject] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // console.log(organizationalChart);


  const createChild = (object) => {
    setIsModalOpen(true);
    setEditMode(false);
    // console.log(object);
    setSelectedObject(object);
  };


  const edit = (object) => {
    setIsModalOpen(true);
    setEditMode(true);
    // console.log(object);
    setSelectedObject(object);
  };

function deleteObjectById(obj, idToDelete, parent = null, index = -1) {
    if (obj?.id === idToDelete) {
        if (parent && index !== -1) {
            parent.children.splice(index, 1);
        } else {
            obj = null;
        }
        return true;
    }

    if (obj.children && obj.children.length > 0) {
        for (let i = 0; i < obj.children.length; i++) {
            const child = obj.children[i];
            const deleted = deleteObjectById(child, idToDelete, obj, i);
            if (deleted) {
                break;
            }
        }
    }

    return false;
}


  const deleteNode = (object) => {
deleteObjectById(organizationalChart, object?.id);
deleteParent(object?.id)
    // console.log(object);
    setSelectedObject(object);
  };

  const RenderChild = ({ child }) => {
    return (
      <TreeNode
        label={
        <Popover placement="top" showArrow offset={10}>
              <PopoverTrigger>
                <Button className={`${
                        child?.id == selectedObject?.id
                          ? 'bg-slate-50':'bg-white'
                      } h-auto outline-none py-4 px-6  transition-all shadow-sm`}
                      >
                  <Tooltip
                    showArrow={true}
                    content="Create child / Edit / Delete"
                  >
                    <div
                      className={`cursor-pointe mx-auto rounded flex justify-center items-center flex-col`}
                    >
                      <h3>{child?.title}</h3>
               <p className="text-sm">{child?.sub_title}</p>
                    </div>
                  </Tooltip>
                </Button>
                
              </PopoverTrigger>
              <PopoverContent className="">
                  <div className="px-1 py-2 w-full">
                    <div className="mt-2 flex flex-col gap-2 w-full">
                      <ActionButton onClick={()=>deleteNode(child)} size="md" className='bg-[#00BCC2] font-medium text-white px-2' >Delete</ActionButton>
                      <ActionButton onClick={() => edit(child)} className='bg-[#00BCC2] font-medium text-white px-2' >Edit</ActionButton>
                      <ActionButton onClick={() => createChild(child)} className='bg-[#00BCC2] font-medium text-white px-2' >create Child</ActionButton>
                    </div>
                  </div>
              </PopoverContent>
            </Popover>
        }
      >
        {child?.children?.map((child, i) => (
          <RenderChild child={child} key={i} />
        ))}
      </TreeNode>
    );
  };

  return (
    <div>
      <div className="my-6">
        <ChildModal
          selectedObject={selectedObject}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          organizationalChart={organizationalChart}
          editMode={editMode}
          setEditMode={setEditMode}
        />

        <Tree
          lineWidth={"2px"}
          lineColor={"#00BCC2"}
          lineBorderRadius={"10px"}
          label={
            <Popover placement="top" showArrow offset={10}>
              <PopoverTrigger>
                <Button className={`${
                        organizationalChart?.id == selectedObject?.id
                          ? 'bg-slate-50':'bg-white'
                      } h-auto outline-none py-4 px-6  transition-all shadow-sm`}
                      >
                  <Tooltip
                    showArrow={true}
                    content="Create child / Edit / Delete"
                  >
                    <div
                      className={`cursor-pointe mx-auto rounded flex justify-center items-center flex-col`}
                    >
                     <h3>{organizationalChart?.title}</h3>
               {/* <p className="text-sm">{organizationalChart?.sub_title}</p> */}
                    </div>
                  </Tooltip>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="">
                  <div className="px-1 py-2 w-full">
                    <div className="mt-2 flex flex-col gap-2 w-full">
                       <ActionButton onClick={()=>deleteNode(organizationalChart)} size="md" className='bg-[#00BCC2] font-medium text-white px-2' >Delete</ActionButton>
                      <ActionButton onClick={() => edit(organizationalChart)} className='bg-[#00BCC2] font-medium text-white px-2' >Edit</ActionButton>
                      <ActionButton onClick={() => createChild(organizationalChart)} className='bg-[#00BCC2] font-medium text-white px-2' >create Child</ActionButton>
                    </div>
                  </div>
              </PopoverContent>
            </Popover>
          }
        >
          {organizationalChart?.children?.map((child, i) => (
            <RenderChild child={child} key={i} />
          ))}
        </Tree>
      </div>
    </div>
  );
};

export default OrganizationalChart;
