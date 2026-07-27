/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import ChildModal from "./ChildModal";
import {
  Button,
} from "@nextui-org/react";

const OrganogramEdit = () => {
  const [selectedObject, setSelectedObject] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [organizationalChart, setOrganizationalChart] = useState({
    id: "37205b2a-d844-4672-87fc-288b3aa443fd",
    title: "General Manager",
    children: [
      {
        id: "f7881598-3248-4d93-bd23-328d95ed81c1",
        title: "Supervisory Manager",
        children: [
          {
            id: "dbcadfe4-da82-4dff-baeb-82542f960078",
            title: "Account Supervisor 1",
            children: [
              {
                id: "15633faa-e0c7-49ae-987e-9d7c3ce13066",
                title: "Account Executive",
                children: [
                  {
                    id: "d39cfe81-b49d-4487-956b-3ae43c05f7d7",
                    title: "Account Executive",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: "669b13d2-74d0-47b4-9cd3-4891a4b6fbc3",
            title: "Account Supervisor 2",
          },
        ],
      },
      {
        id: "48b26727-01d4-4adf-bd8c-a90b677a997c",
        title: "Creative Media",
        children: [
          {
            id: "876a578e-bd1f-4222-b06a-124a1dc128e2",
            title: "Art/Copy",
            children: [
              {
                id: "519d1b0c-327c-44fb-8f9c-2fb08e4326f9",
                title: "Production",
                children: [
                 
                ],
              },
            ],
          },
        ],
      },
      {
        id: "35e5656c-e25f-4504-8189-ca689a9da1be",
        title: "Marketing Services 1",
        children: [
        {
            id: "b82f2b58-389c-422b-9512-a69b9ff87ce8",
            title: "Media",
            children: [
              {
                id: "8ab706e6-32ab-4092-9c7a-f00cfba6436c",
                title: "Research",
                children: [
                 
                ],
              },
            ],
          },
        ],
      },
      {
        id: "c5bbae1e-aa17-4c0e-b45f-6fb8386c3186",
        title: "Management Services 2",
        // sub_title: "Management Services",
        children: [
          {
            id: "073427ef-95be-46d1-9726-6e2388a3625e",
            title: "Accounting",
            sub_title: "",
            children: [
              {
                id: "2ef8e721-9e6d-4226-9903-194fb249ddc3",
                title: "Purchasing",
                sub_title: "",
                children: [
                  {
                    id: "7e5ab406-668b-4800-8474-4c3b9a4f9e95",
                    title: "Personal",
                    sub_title: "",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  const edit = (object) => {
    setIsModalOpen(true);
    setEditMode(true);
    // console.log(object);
    setSelectedObject(object);
  };



  const RenderChild = ({ child }) => {
    return (
      <TreeNode
        label={
                <Button className={`${
                        child?.id == selectedObject?.id
                          ? 'bg-slate-50':'bg-white'
                      } h-auto outline-none py-4 px-6  transition-all shadow-sm`}
                      onClick={() => edit(child)}
                      >
                    <div
                      className={`cursor-pointe mx-auto rounded flex justify-center items-center flex-col`}
                    >
                      <h3>{child?.title}</h3>
               <p className="text-sm">{child?.sub_title}</p>
                    </div>
                </Button>
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
                <Button className={`${
                        organizationalChart?.id == selectedObject?.id
                          ? 'bg-slate-50':'bg-white'
                      } h-auto outline-none py-4 px-6  transition-all shadow-sm`}
                      onClick={() => edit(organizationalChart)}
                      >
                    <div
                      className={`cursor-pointe mx-auto rounded flex justify-center items-center flex-col`}
                    >
                     <h3>{organizationalChart?.title}</h3>
               {/* <p className="text-sm">{organizationalChart?.sub_title}</p> */}
                    </div>
                </Button>
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

export default OrganogramEdit;
