/* eslint-disable react/prop-types */
const CreateButton = ({icon:Icon, text}) => {
  return (
    <button className="px-6 py-2 rounded outline-none border inset-0  flex space-x-2 items-center">
      <Icon size={15}/> 
      <span className="font-semibold text-sm">
       {text}
      </span>
    </button>
  )
}

export default CreateButton
