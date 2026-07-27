import { useLoadAllMemoRequest } from "../../../../API/memo"
import useCurrentUser from "../../../../hooks/useCurrentUser"
import Multiplememo from "./MultipleMemo"

const Memos = () => {
    const {userData} = useCurrentUser()
    const {data} = useLoadAllMemoRequest({
        company_id: userData?.data?.COMPANY_ID,
        staff_id: userData?.data?.STAFF_ID,
    })
    
  return (
    <div>
            {
                data?.data?.data && data?.data?.data?.length > 0  && (
                    <div className="space-y-5 flex flex-col">
                        <Multiplememo memos={data?.data?.data}/>
                    </div>
                ) 
            }
    </div>
  )
}

export default Memos
