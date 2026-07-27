import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";

export const useGetAllPayrollStaff = (payload) => {
  return useQuery({
    queryKey: [`get_payroll_staff_${payload?.staff_type}`],
    queryFn: async () => {
      const res = await API.post(`payroll_staff/all_company_staff`, payload);
      return res?.data?.data;
    },
  });
};

// NOTE!! for only REPORT
export const useGetAllPayrollStaffFORREPORT = (payload) => {
  return useQuery({
    queryKey: [`get_payroll_staff_${payload?.staff_type}`],
    queryFn: async () => {
      const res = await API.post(`payroll_staff/get_all_staff`, payload);
      return res?.data?.data;
    },
  });
};
// payroll_staff/get_all_staff POST {staff_type:1, company_id:1}

export const useUpdateStaffPayroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_staff/update_staff_payroll`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_payroll_staff_0"] });
      queryClient.invalidateQueries({ queryKey: ["get_payroll_staff_1"] });
    },
  });
};
export const useGetPayrollStaffDetail = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.get(`payroll_staff/get_staff/${payload?.staff_id}`);
    },
  });
};

export const useGetAllNonMembershipStaff = (payload) => {
  return useQuery({
    queryKey: [`all_non_membership_${payload?.staff_type}`],
    queryFn: async () => {
      const res = await API.post(`payroll_staff/all_non_membership`, payload);
      return res?.data?.data;
    },
  });
};

export const useGetAllAwaitingPayrollStaff = (payload) => {
  return useQuery({
    queryKey: [`awaiting_membership`],
    queryFn: async () => {
      const res = await API.get(
        `payroll_staff/awaiting_payroll_onboard/${payload}`
      );
      return res?.data?.data;
    },
  });
};
export const useAddStaffToPayroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.get(`payroll_staff/add_staff_to_payroll/${payload}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`awaiting_membership`] });
    },
  });
};
export const useAddMultipleStaffToPayroll = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_staff/add_staff_to_payroll`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`awaiting_membership`] });
    },
  });
};

export const useGetAllSuspendedPayrollStaff = (payload) => {
  return useQuery({
    queryKey: [`all_payroll_suspended_${payload?.staff_type}`],
    queryFn: async () => {
      const res = await API.post(
        `payroll_staff/all_payroll_suspended`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useSuspendStaffPayroll = (type) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        `payroll_allowance/suspend_staff_payment/`,
        payload
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`all_payroll_suspended_${type}`],
      });
    },
  });
};

export const useRestoreStaffPayroll = (type) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/restore_staff/`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`all_payroll_suspended_${type}`],
      });
    },
  });
};

// payroll_allowance/get_thirteenth_summary
export const useGetAll13thPayment = (payload) => {
  return useQuery({
    queryKey: [`get_thirteenth_summary`],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_thirteenth_summary`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useCreate13th = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/create_thirteenth/`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get_thirteenth_summary`] });
    },
  });
};

export const useGet13thPaymentDetails = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.get(
        `payroll_allowance/get_company_thirteenth/${payload}`
      );
      return res?.data?.data;
    },

    // return useQuery({
    //   queryKey: [`get_company_thirteenth`],
    //   queryFn: async () => {
    //     console.log(payload);

    //     const res = await API.get(`payroll_allowance/get_company_thirteenth${payload}`, );
    //     return res?.data?.data;
    //   },
  });
};

export const useRecalculate13th = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        `payroll_allowance/recalculate_staff_thirteenth/`,
        payload
      );
    },
  });
};

export const useStaff13thMonth = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/get_staff_thiteenth/`, payload);
    },
  });
};

// payrun
// payroll_allowance/get_thirteenth_summary
export const useGetPayrollList = (payload) => {
  return useQuery({
    queryKey: [`get_company_payroll`],
    queryFn: async () => {
      const res = await API.post(
        `payroll_allowance/get_company_payroll`,
        payload
      );
      return res?.data?.data;
    },
  });
};

export const useCreatePayrun = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/create_payroll/`, payload);
    },
  });
};
export const useRerunPayrun = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/rerun_payroll/`, payload);
    },
  });
};
export const useRerunTaxPayrun = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/rerunTax`, payload);
    },
  });
};
export const useSendToStaffPayrun = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(
        `payroll_allowance/push_payroll_to_staff/`,
        payload
      );
    },
  });
};
export const useClosePayrun = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/close_payroll/`, payload);
    },
  });
};
export const useRefresh13thMonthStaff = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/referesh_thirteenth`, payload);
    },
  });
};
export const useDelete13thMonthStaff = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`payroll_allowance/remove_thirteenth`, payload);
    },
  });
};
