import { useMutation, } from '@tanstack/react-query'
import API from '../services/AxiosInstance'
export const useSearchProfile=()=>{
    return useMutation({
        mutationFn:(payload)=>{
            const json = {
                    "company_id": payload?.company_id,
                    "search_name":payload?.search_name,
                    "staff_id":payload?.staff_id
                
            }
            return API.post("chat/chat_search", json)
        }
    })
}