import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance.js";
import { API_URL } from "./api_urls/api_urls.js";
import { filePrefix } from "../utils/filePrefix.js";

// export const file_Prefix = "http://lamp3.ncaa.gov.ng/pub/";
export const file_Prefix = filePrefix;
export const useApplyLeave = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`leave/apply`, payload);
    },
  });
};

export const useLeaveType = (payload) => {
  return useQuery({
    queryKey: ["leave_type"],
    queryFn: async () => {
      return await API.post(`leave/getLeaveType`, payload);
    },
  });
};
export const useDuration = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`leave/getLeaveDuration`, payload);
    },
  });
};
export const useReason = () => {
  return useMutation({
    mutationFn: async (payload) => {
      // console.log(payload)
      return await API.get(`leave/getLeaveReason`, payload);
    },
  });
};

export const useGetLeaveBalance = (payload) => {
  return useQuery({
    queryKey: ["leave_balance"],
    queryFn: async () => {
      return await API.post(`leave/getLeaveBalance`, payload);
    },
  });
};

export const useGetStaffApproval = (payload) => {
  return useQuery({
    queryKey: ["get_staff"],
    queryFn: async () => {
      return await API.post(`leave/getApprovalStaff`, payload);
    },
  });
};

export const useGetApprovalStaff = () => {
  const approvalStaff = useMutation({
    mutationFn: async (payload) => {
      return await API.post(`leave/getApprovalStaff`, payload);
    },
  });
  return approvalStaff;
};

export const useGetPendingRequest = (payload) => {
  return useQuery({
    queryKey: ["pending_request"],
    queryFn: async () => {
      return await API.post(`leave/pending_requests`, payload);
    },
  });
};
export const useGetApprovedRequest = (payload) => {
  return useQuery({
    queryKey: ["approved_request"],
    queryFn: async () => {
      return await API.post(`leave/approved_requests`, payload);
    },
  });
};
export const useGetDeclinedRequest = (payload) => {
  return useQuery({
    queryKey: ["declined_request"],
    queryFn: async () => {
      return await API.post(`leave/declined_requests`, payload);
    },
  });
};
export const useGetCompletedRequest = (payload) => {
  return useQuery({
    queryKey: ["completed_request"],
    queryFn: async () => {
      return await API.post(`leave/completed_requests`, payload);
    },
  });
};
export const useGetReturnRequest = (payload) => {
  return useQuery({
    queryKey: ["return_request"],
    queryFn: async () => {
      return await API.post(`leave/all_return`, payload);
    },
  });
};

export const useGetStaffPendingRequest = (payload) => {
  const { name, ...rest } = payload;
  return useQuery({
    queryKey: [`staffPending_request_${name}`],
    queryFn: async () => {
      return await API.post(
        name === "pending"
          ? `leave/staff_pending_leave`
          : name === "pending_return" && `leave/staff_pending_leave_return`,
        { ...rest }
      );
    },
  });
};
export const useGetStaffApprovedRequest = (payload) => {
  return useQuery({
    queryKey: ["staffApproved_request"],
    queryFn: async () => {
      return await API.post(`leave/staff_approved_leave`, payload);
    },
  });
};

export const useGetStaffUnreturnedRequest = (payload) => {
  return useQuery({
    queryKey: ["unreturned_request"],
    queryFn: async () => {
      return await API.post(`leave/staff_unreturned_leave`, payload);
    },
  });
};

export const useApplyReturn = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`leave/return`, payload);
    },
  });
};
export const useGetLeaveSchedules = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`leave/get_scheduled_leave`, payload);
    },
  });
};

export const useDeletePendingLeave = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post("/leave/delete_leave_request", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staffPending_request"]);
    },
  });
};

export const useGetLeaveStatistics = (payload) => {
  return useQuery({
    queryKey: ["leave_statistic"],
    queryFn: async () => {
      return await API.post(API_URL.leave_statistics, payload);
    },
  });
};
