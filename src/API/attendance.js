// import toast from 'react-hot-toast'
import { useMutation, useQuery, } from '@tanstack/react-query'
import { APIAttendance } from '../services/AxiosInstance'


export const usePunchIn = () => {
    
    return useMutation({
        mutationFn: (data) => APIAttendance.post("attendance/add-record", data),
      });
};


export const usePunchOut = () => {
    
    return useMutation({
        mutationFn: (data) => APIAttendance.post("attendance/add-record-punch-out", data),
      });
};


export const useGetFirstPunchRecord  = (userID) => {
  return useQuery({
      queryFn: async () => {
          const res = await APIAttendance.get(`attendance/first-punch-in/${userID}`)
          return res?.data
        },
    queryKey: ['get_user_first_punch_today'],
  })
}


export const useGetAttendanceRecord  = (userID, query) => {
  return useQuery({
      queryFn: async () => {
          const res = await APIAttendance.get(`attendance/get-today/${userID}?page=${query.page}`)
          return res?.data
        },
    queryKey: ['get_user_attendance'],
  })
}

export const useGetAttendanceRecordForHR  = (query) => {
  return useQuery({
      queryFn: async () => {
          const res = await APIAttendance.get(`attendance/get-hr-today?page=${query.page}&size=${query.size}`)
          return res?.data
        },
    queryKey: ['get_HR_user_attendance'],
  })
}


export const useGetLast3daysAttendanceRecord  = (userID) => {

  return useQuery({
      queryFn: async () => {
          const res = await APIAttendance.get(`attendance/get-last-3-day/${userID}`)
          return res?.data
        },
    queryKey: ['get_user_last_3_attendance'],
  })
}


export const useSearchAttendanceRecordForHR  = () => {
  return useMutation({
    mutationFn: (query) => {
      return APIAttendance.get(`attendance/get-hr-today?${query}`);
    }
  });
}

export const useSearchAttendanceRecord  = () => {
  return useMutation({
    mutationFn: (query) => {
      return APIAttendance.get(`attendance/search-record?${query}`);
    }
  });
}


export const useGetAttendanceChartData  = (query) => {
  return useQuery({
    queryFn: async () => {
      const res = await APIAttendance.get(`attendance/chart-data?${query}`)
      return res?.data
    },
    queryKey: ['get_attendance_chart_data'],
  })
}




export const useGetUserImageRecord  = (query) => {
  return useQuery({
    queryFn: async () => {
      const res = await APIAttendance.get(`attendance/get-user-image-url/${query}`)
      return res?.data
    },
    queryKey: ['get_attendance_image_url_data'],
  })
}