/* eslint-disable react/prop-types */
import { Tree, TreeNode } from "react-organizational-chart";

const OrganizationTree = ({organizationalChart}) => {


 
  const edit=(title)=>{
// console.log(title);
  }

  const RenderChild=({child})=>{
     return ( 
        <TreeNode
          label={
            <div onClick={()=>edit(child.title)} className="h-auto bg-white cursor-pointe mx-auto inline-flex justify-center items-center flex-col py-4 px-6  transition-all shadow-sm rounded-md">
              <h3>{child.title}</h3>
              <p className="text-sm">{child?.sub_title}</p>
            </div>
          }
        >
         {child?.children?.map((child,i)=><RenderChild child={child} key={i} />)}
        </TreeNode>
      )
      }

  return (
    <div>
      {/* <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={
          <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
            Root
          </div>
        }
      >
        <TreeNode
          label={
            <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
              Child 1
            </div>
          }
        >
          <TreeNode
            label={
              <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
                Grand Child 1
              </div>
            }
          />
          <TreeNode
            label={
              <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
                Grand Child 2
              </div>
            }
          />
        </TreeNode>
        <TreeNode
          label={
            <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
              Child 2
            </div>
          }
        >
          <TreeNode
            label={
              <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
                Grand Child 1
              </div>
            }
          />
          <TreeNode
            label={
              <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
                Grand Child 2
              </div>
            }
          />
        </TreeNode>
      </Tree> */}

{/* <div className="my-6">
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={
          <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
            {organizationalChart.title}
          </div>
        }
      >
      {organizationalChart?.children?.map((child,i)=>{
     return ( 
        <TreeNode
        key={i}
          label={
            <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
              <h3>{child.title}</h3>
              <p className="text-sm">{child.sub_title}</p>
            </div>
          }
        >
         {child?.children?.map((child,i)=>{
     return ( 
        <TreeNode
        key={i}
          label={
            <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
              <p>{child.title}</p>
            </div>
          }
        >
         {child.children?.map((child,i)=>{
     return ( 
        <TreeNode
        key={i}
          label={
            <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
              <p>{child.title}</p>
            </div>
          }
        >
         {child.children?.map((child,i)=>{
     return ( 
        <TreeNode
        key={i}
          label={
            <div className="p-4 w-[10rem] mx-auto bg-gray-300 text-white rounded flex justify-center items-center flex-col">
              <p>{child.title}</p>
            </div>
          }
        >
         
        </TreeNode>
      )
      })}
        </TreeNode>
      )
      })}
        </TreeNode>
      )
      })}
        </TreeNode>
      )
      })}
      </Tree>
</div> */}
<div className="my-6">
      <Tree
        lineWidth={"2px"}
        lineColor={"#00BCC2"}
        lineBorderRadius={"10px"}
        label={
          <div className="h-auto bg-white cursor-pointe mx-auto inline-flex justify-center items-center flex-col py-4 px-6  transition-all shadow-sm rounded-md">
            {organizationalChart.title}
          </div>
        }
      >
      {organizationalChart?.children?.map((child,i)=><RenderChild child={child} key={i} />)}
      </Tree>
</div>
    </div>
  );
};

export default OrganizationTree;
