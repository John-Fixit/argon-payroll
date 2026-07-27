// import toast from 'react-hot-toast'
import { useMutation, useQuery, } from '@tanstack/react-query'
import API from '../services/AxiosInstance' 

export const useCreateMemo = () => {
    
    return useMutation({
        mutationFn: (data) => API.post("memo/create_memo", data),
      });
};

export const useUpdateMemo = () => {
    
    return useMutation({
        mutationFn: (data) => API.post("memo/update_draft", data),
      });
};


export const useGetMyMemoRequest  = () => {

  return useMutation({
    mutationFn: (data) => API.post("memo/my_requests", data),
  });

}


export const useGetAllMemoRequest = (key,payload) => {
  return useQuery({
   queryKey:[key,payload],
      queryFn: async ({queryKey}) => {
      const data = queryKey[1]
        return await API.post("memo/all_requests", data)
      },
    })
}


export const useLoadAllMemoRequest = (data) => {
  return useQuery({
   queryKey:["loadmemo"],
      queryFn: async () => {
        return await API.post("social/load_memo", data)
      },
    })
}



export const useGetAllStaff  = (company_id) => {
  return useQuery({
      queryFn: async () => {
          const res = await API.get(`package/getAllStaff/${company_id}`)
          return res?.data?.data
        },
        queryKey: ["staff"]
  })
}


export const useGetAllDepartment  = (company_id) => {
  return useQuery({
      queryFn: async () => {
          const res = await API.get(`package/get_departments/${company_id}`)
               return res?.data?.data
        },
        queryKey: ["dept"]
  })
}



export const useGetAllUnits  = (company_id) => {
  return useQuery({
      queryFn: async () => {
          const res = await API.get(`package/get_units/${company_id}`)
          return res?.data?.data
        },
        queryKey: ["units"]
  })
}

export const useGetAllRegion  = (company_id) => {
  return useQuery({
      queryFn: async () => {
          const res = await API.get(`package/get_region/${company_id}`)
          return res?.data?.data
        },
        queryKey: ["region"]
  })
}

export const useGetAllDirectorate  = (company_id) => {
  return useQuery({
      queryFn: async () => {
          const res = await API.get(`package/get_directorates/${company_id}`)
          return res?.data?.data
        },
        queryKey: ["directo"]
  })
}


