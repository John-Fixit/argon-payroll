import Select from "react-tailwindcss-select";
import Label from '../forms/FormElements/Label';
import {useState} from 'react'
import OrganizationalChart from './OrganizationalChart';

const OrganogramForm = () => {
const [organizationalData,setOrganizationalData]=useState([])
const options = [
  { value: "Director General", label: "Director General",},
  { value: "Director of Finance", label: "Director of Finance",},
  { value: "Director of Human Resources", label: "Director of Human Resources",},
  { value: "Director of Servicom", label: "Director of Servicom",},
]

const selectParent=(value)=>{
// console.log(value)

setOrganizationalData([...organizationalData,{id:crypto.randomUUID(),title:value.label,children:[]}])
// console.log(organizationalData)
}

const deleteParent = (id) => {
// console.log(id);
setOrganizationalData(prevData=>prevData.filter(data=>data?.id!==id))
}
const handleSave = () => {
// console.log(organizationalData);
}


  return (
    <div>
    

      <div className="md:w-[50%] mx-auto">
            <Label className={`text-medium`}>
            Parent
            </Label>
            <div className="flex gap-2">
                     <Select
                     placeholder="Select parent"
            options={options}
            isSearchable={true}
            onChange={(value)=>selectParent(value)}
          />
          <button className={`text-white px-4 py-1 font-helvetica rounded bg-blue-400`} onClick={handleSave}>Save</button>
            </div>
            </div>
{organizationalData?.map((data,i)=><OrganizationalChart deleteParent={deleteParent} organizationalChart={data} key={i}/>)}
            
    </div>
  )
}

export default OrganogramForm