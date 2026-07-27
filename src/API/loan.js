/* eslint-disable no-unused-vars */
import { useMutation, useQuery, } from "@tanstack/react-query";
import API, { APINEW } from "../services/AxiosInstance";

export const useGetExternalLoan = (payload) => {
  return useQuery({
    queryKey: ["get_external_loan"],
    queryFn: async () => {
      const res = await API.post(`advance/get_external_loan`, payload);
      return res?.data;
    },
  });
};



export const useGetLoanHistory = (payload) => {
  return useQuery({
    queryKey: ["loan_history"],
    queryFn: async () => {
      const res = await APINEW.post(
        `loan/history`,
        payload
      );
      return res?.data?.data;
    },
});
};

export const useGetLoanOTP = () => {
  const get = useMutation({
    mutationFn: async (payload) => {
      return await APINEW.post("loan/get_key", payload);
    },
  });
  return get;
};

export const useConfirmLoanOTP = () => {
  const confirm = useMutation({
    mutationFn: async (payload) => {
      return await APINEW.post("loan/confirm_key", payload);
    },
  });
  return confirm;
};

export const useCreateLoan = () => {

  const createloan = useMutation({
    mutationFn: async (payload) => {
      return await APINEW.post("loan/create", payload);
    },
  });

  return createloan;
};

