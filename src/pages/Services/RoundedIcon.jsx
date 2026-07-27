/* eslint-disable react/prop-types */
export default function RoundedIcon(props){
    return (
        <>
        
             <div className={`rounded-full bg-${props?.color}-200 w-[42px] h-[42px] flex justify-center items-center`}>
              <props.icon size={20} className={`!font-bold text-${props?.color}-600`} />
            </div>
        </>
    )
}