import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useCreatePayrollAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/create_allowance`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_all_allowance"],
      });
    },
  });
};

export const useGetAllAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_all_allowance", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_all_company_allowance`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useRecomputeAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/recompute_allowance`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_all_allowance"],
      });
    },
  });
};
export const useGetAllowanceAbbrv = (payload) => {
  return useQuery({
    queryKey: ["get_allowance_abbrv", payload],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_allowance_abbrev`,
        payload
      );
      return res?.data?.data;
    },
  });
};
export const useGetCompanyRankGradeLevel = (payload) => {
  return useQuery({
    queryKey: ["getCompanyRankGradeLevel", payload],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_all_company_rank_grade`,
        payload
      );
      return res?.data;
    },
  });
};
export const useGetParentAllowance = (payload) => {
  return useQuery({
    queryKey: ["getParentAllowance", payload],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_parent_allowance`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useRecalculateStaffAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        `payroll_allowance/recalculate_staff_allowance`,
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_all_allowance"] });
    },
  });
};

export const useStopAllStaffAllowance = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        `payroll_allowance/stop_all_staff_allowance`,
        payload
      );
    },
  });
};
export const useActivateAllStaffAllowance = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        `payroll_allowance/add_allowance_for_staff`,
        payload
      );
    },
  });
};
export const useGetStaffAllowanceByMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.post(
        `/payroll_allowance/get_staff_allowance`,
        payload
      );
      return res?.data;
    },
  });
};
export const useGetStaffAllowanceByQuery = (payload) => {
  return useQuery({
    queryKey: [`get_staff_allowance_${payload?.payment_type}`],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_staff_allowance`,
        payload
      );
      return res?.data;
    },
  });
};
