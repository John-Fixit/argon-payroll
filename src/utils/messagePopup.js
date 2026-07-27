

import toast from "react-hot-toast"


export const formatError = (msg)=>{
    return toast.error(msg)
}
export const showSuccess = (msg)=>{
    return toast.success(msg)
}