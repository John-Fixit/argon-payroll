import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetAllowances = (body) => {
  return useQuery({
    queryKey: ["allowances"],
    queryFn: async () => {
      const res = await API.post(`package/get_allowances`, body);
      return res?.data?.data;
    },
  });
};
export const useGetStaffByType = (body) => {
  return useQuery({
    queryKey: [`staff_by_type_${body?.staff_type}_${body?.name}`],
    queryFn: async () => {
      const res = await API.post(`package/getAllStaffByType`, body);
      return res?.data?.data;
    },
  });
};
export const useMutateGetStaffByType = () => {
  return useMutation({
    mutationFn: async (body) => {
      const res = await API.post(`package/getAllStaffByType`, body);
      return res?.data?.data;
    },
  });
};

export const useCreateVariation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`/variation/create`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pending_requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["draft_requests"],
      });
    },
  });
};

export const useGetVariationRequest = (payload, query_key) => {
  return useQuery({
    queryKey: [`${query_key}_requests`],
    queryFn: async () => {
      const res = await API.post(
        query_key === "draft" //if query key is draft
          ? `variation/get_drafts`
          : query_key === "payroll_rejected" //if query key is payroll rejected
          ? "/variation/payroll_rejects"
          : `variation/${query_key}_requests`,
        payload
      );
      return res?.data?.data;
    },
  });
};
export const useGetAuditVariation = (payload) => {
  return useQuery({
    queryKey: [`get_audit_variation`],
    queryFn: async () => {
      const res = await API.post(`/variation/get_audit_approved`, payload);
      return res?.data?.data;
    },
  });
};
export const useGetVariationOnPayroll = (payload) => {
  return useQuery({
    queryKey: [`get_variation_on_payroll_${payload?.month}_${payload?.year}`],
    queryFn: async () => {
      const res = await API.post(`variation/variation_on_payroll`, payload);
      return res?.data?.data;
    },
  });
};
export const useGetVariationAwaitingArrears = (payload) => {
  return useQuery({
    queryKey: [`variation_awaiting_arrears`],
    queryFn: async () => {
      const res = await API.post(
        `variation/variation_awaiting_arrears`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useRemoveVariationRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/remove_list`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["draft_requests"] });
    },
  });
};

export const useSendForApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/send_for_approval`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["draft_requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["pending_requests"],
      });
    },
  });
};
export const useRejectVariation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/reject_variation`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payroll_rejected_requests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get_variations"],
      });
    },
  });
};

export const useRunArrears = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/run_arrears`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_variation_on_payroll"] });
    },
  });
};
export const useCancelArrears = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/cancel_arrears`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_variation_on_payroll"] });
    },
  });
};
export const useRemoveArrears = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/remove_arrears`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_variation_on_payroll"] });
    },
  });
};
export const useUpdateDesignation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/update_designation`, payload);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["get_variation_on_payroll"] });
    // },
  });
};
export const useUpdateAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/update_allowance`, payload);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["get_variation_on_payroll"] });
    // },
  });
};
