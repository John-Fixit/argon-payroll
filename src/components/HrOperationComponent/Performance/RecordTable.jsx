import { MdError } from "react-icons/md"

const RecordTable = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10">
        <MdError className="text-5xl" />
        <p className="font-helvetica text-xl">No records</p>
        </div>
    </div>
  )
}

export default RecordTable