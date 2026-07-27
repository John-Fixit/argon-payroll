import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "./api_urls/api_urls";
import API from "../services/AxiosInstance";

export const useGenerateReport = () => {
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.generateReport, payload);
    },
  });
};

// export const useGenerateThirteenthReport = () => {
//      console.log('payload');
//     return useMutation({
//       mutationFn: (payload) => {
//         console.log(payload);

//         return API.get(`payroll_allowance/thirteenth_month_remita${payload}`,)
//       },
//     })
// }

export const useGeneratePayrollReport = () => {
  return useMutation({
    mutationFn: (payload) => {
      return API.post(`payroll_report/all_report`, payload);
    },
  });
};

export const useGetContributionAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_payroll_contribution", payload],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_payroll_contribution`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetCoperativeAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_payroll_coperative", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_payroll_coperative`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetLoanAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_payroll_loans", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_payroll_loans`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetArrearsAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_payroll_arrears", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_payroll_arrears`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetMembershipAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_payroll_membership", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_payroll_membership`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetIncomeAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_payroll_income", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_payroll_income`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetDeductionAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_payroll_deduction", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_payroll_deduction`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGetBankAllowances = (payload) => {
  return useQuery({
    queryKey: ["get_all_company_allowance_alternative", payload],
    queryFn: async () => {
      const res = await API.post(
        `/payroll_allowance/get_all_company_allowance_alternative`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useGenerateThirteenthReport = (payload) => {
  return useQuery({
    queryKey: [`thirteenth_month_remita${payload}`, payload],
    queryFn: async () => {
      const res = await API.get(
        `/payroll_allowance/thirteenth_month_remita/${payload}`
      );
      return res?.data?.data;
    },
  });
};

export const useGenerateThirteenthReportByMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.get(
        `payroll_allowance/thirteenth_month_remita/${payload}`
      );
      return res?.data?.data;
    },
  });
};
