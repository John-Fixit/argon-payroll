import { useMutation, useQuery } from "@tanstack/react-query"
import API, { APIAPPROVAL, } from "../../services/AxiosInstance"

export const useGetPackage = (companyID)=>{
  return useQuery({
    queryKey: ["package"],
    queryFn: async () => {
      return await API.get(`package/get_package/${companyID}`)
    },
  })
}

export const useGetMyApprovals = (key,payload) => {
 return useQuery({
 queryKey:[key,payload],
    queryFn: async ({queryKey}) => {
    const data = queryKey[1]
      return await API.post(`approvals/my_approvals`,data)
    },
  })
}
export const useGetMyRequests = (key,payload) => {
return useQuery({
 queryKey:[key,payload],
    queryFn: async ({queryKey}) => {
    const data = queryKey[1]
      return await API.post(`requests/my_requests`,data)
    },
  })
}
export const useGetAllRequests = (key,payload) => {
 return useQuery({
 queryKey:[key,payload],
    queryFn: async ({queryKey}) => {
    const data = queryKey[1]
      return await API.post(`requests/all_requests`,data)
    },
  })
}
export const useGetRequests  = (key, payload) => {

 return useQuery({
 queryKey: [key, payload],
    queryFn: async ({queryKey}) => {
    const data = queryKey[1]
      return await API.post(`approvals/my_approvals`, data)
    },
  })
}


export const useGetRequest_Detail  = (payload) => {


  return useQuery({
  queryKey: ["request_detail", payload],
     queryFn: async ({queryKey}) => {
     const requestID = queryKey[1]
       return await API.post(`approvals/view_approvals`, {request_id: requestID})
     },
   })
 }


export const useGetRequestDetail = () => {
 return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`approvals/view_approvals`,payload)
    },
  })
}



// {
//   "company_id":"1",
//   "staff_id":"1",
//  "request_id":"",
// "rejection_note":""
// }


export const useReassignApprovalRequest = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`approvals/update_approval_staff`, payload)
    },
  })
}

export const useCanAssign = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`admin/is_assignor`, payload)
    },
  })
}
export const useGetCanAssignStaffs = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`admin/get_assignor_staff`, payload)
    },
  })
}



// {
  //   "company_id":"1",
  //   "staff_id":"1",
  //  "request_id":"",
  //  "leave_start_date":"",//can be empty if not edited
  // "leave_end_date":"",//can be empty if not edited
  // "leave_date_array":"",//can be empty if not edited
  // "memo_content":"",//can be empty if not edited
  // "memo_signature":""//must be sent if approved for memo
  // }


  export const useDeclineApprovalRequest = () => {
   return useMutation({
      mutationFn: async (payload) => {
        return await APIAPPROVAL.post(`approvals_alt/declineRequest`, payload)
      },
    })
  }

export const useApprovedApprovalRequest = () => {
 return useMutation({
    mutationFn: async (payload) => {
      return await APIAPPROVAL.post(`approvals_alt/approveRequest`, payload)
    },
  })
}


export const useReAssignApprovalReq = () => {
return useMutation({
    mutationFn: (payload) => {
      return  APIAPPROVAL.post(`approvals_alt/update_approval_staff`, payload)
    },
  });
};