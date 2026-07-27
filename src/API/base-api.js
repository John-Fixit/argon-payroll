import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import API from "../services/AxiosInstance";
export const useGetStaffLoginData = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await axios.post(
        `https://hr.ncaa.gov.ng/old_hr/apis/apps/get_staff_data`,
        {
          company_id: payload?.company_id,
          staff_id: payload?.staff_id,
        },
        {
          headers: {
            token: payload?.token,
            "Content-type": "application/json",
            Accept: "application/json",
          },
        },
      );
    },
  });
};

export const useValidateCompany = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.post(`/apps/get_apps`, payload);
      return res?.data?.data;
    },
  });
};
