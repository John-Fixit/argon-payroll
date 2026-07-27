import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetPossibleAmount=(payload)=>{
    return useQuery({
        queryKey: ["get_possibleAmount", payload],
        queryFn: async () => {
            const res = await API.post(`advance/get_available_amount`, payload);

            return res?.data?.data
        }
    })
}
export const useGetGuarantor=(payload)=>{
    return useQuery({
        queryKey: ["get_guarantor", payload],
        queryFn: async () => {
            const res = await API.post(`advance/getguarantor`, payload);

            return res?.data?.data
        }
    })
}

export const useGetApprovalStaff = () => {
    const approvalStaff = useMutation({
      mutationFn: async(payload)=>{
        return await API.post(`advance/getApprovalStaff`, payload)
      }
    })
    return approvalStaff;
  }


  export const useApplySalaryAdvance = () => {
    const queryClient = useQueryClient();
    const applySalary = useMutation({
      mutationFn: async (payload) => {
        console.log(payload)
        return await API.post("advance/apply", payload);
      },
      onSuccess:()=>{
        queryClient.invalidateQueries("pending_salary_advance");
      }
    });
  
    return applySalary;
  };


  export const useGetSalaryAdvance = (payload) => {
    return useQuery({
      queryKey: [`${payload?.status}_salary_advance`],
      queryFn: async () => {
        return await API.post("advance/my_requests", payload)
      },
    })
  }
  