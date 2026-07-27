// import toast from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import API from '../services/AxiosInstance'

export const useGetUpcomingBirthday = ({ user }) => {
  const json = {
    company_id: user?.COMPANY_ID,
    staff_id: user?.STAFF_ID,
  }
  return useQuery({
    queryKey: ['get_upcoming_birthday'],
    queryFn: async () => {
      const res = await API.post(`/social/upcomingBirthday`, json)
      return res?.data?.data
    },
  })
}
