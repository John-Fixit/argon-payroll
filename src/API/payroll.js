import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetVariation = (payload) => {
  return useQuery({
    queryKey: [`get_variations`],
    queryFn: async () => {
      const res = await API.post(`variation/get_variation`, payload);
      return res?.data?.data;
    },
  });
};

export const useOnboardVariation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`variation/onboard_payroll`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_variations"] });
    },
  });
};

export const useGetLoansAllowance = (payload) => {
  return useQuery({
    queryKey: ["getPayrollLoans", payload],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_payroll_loans`,
        payload
      );
      return res?.data?.data;
    },
  });
};
export const useGetCooperativeAllowance = (payload) => {
  return useQuery({
    queryKey: ["get_cooperative_allowance", payload],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_payroll_coperative`,
        payload
      );
      return res?.data?.data;
    },
  });
};
export const useGetContributionAllowance = (payload) => {
  return useQuery({
    queryKey: ["get_contribution_allowance", payload],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_payroll_contribution`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useUploadLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/upload_loan`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_all_allowance"],
      });
    },
  });
};
export const useUploadCooperative = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/upload_coperative`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_all_allowance"],
      });
    },
  });
};

export const useGetLoanDetail = (payload) => {
  return useQuery({
    queryKey: [`get_loan_detail${payload?.allowance_type}`],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_loans_details`,
        payload
      );
      return res?.data?.data;
    },
  });
};
export const useGetContributionDetail = (payload) => {
  return useQuery({
    queryKey: [`get_contribution_detail${payload?.allowance_type}`],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_contribution_details`,
        payload
      );
      return res?.data?.data;
    },
  });
};
export const useGetCooperativeDetail = (payload) => {
  return useQuery({
    queryKey: [`get_cooperative_detail${payload?.allowance_type}`],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_coperative_details`,
        payload
      );
      return res?.data?.data;
    },
  });
};
