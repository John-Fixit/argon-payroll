import { useQuery } from "@tanstack/react-query"
import { API_URL } from "./api_urls/api_urls"
import API from "../services/AxiosInstance"

export const useGetStaffDetails = (payload, query_key) => {
    return useQuery({
      queryKey: [`staff_details_${query_key}`],
      queryFn: async () => {
        return await API.post(API_URL.get_staff_details, payload)
      },
    })
  }
  