import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from "../services/AxiosInstance";
import { API_URL } from "./api_urls/api_urls";

//================get exit reason request ===============================
export const useGetReason = () => {
  return useQuery({
    queryKey: ["get_reason"],
    queryFn: async () => {
      const res = await API.get(API_URL.get_reason);
      return res?.data?.data;
    },
  });
};

//================create exit request ===============================

export const useCreateExit = (is_hr) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(
        is_hr ? "exits/admin_exit_request" : API_URL.create_exit,
        payload,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exit_pending_request");
    },
  });
};

export const useGetExit = (payload, query_key) => {
  return useQuery({
    queryKey: [`exit_${query_key}`],
    queryFn: async () => {
      return await API.post(API_URL.get_exit_requests + query_key, payload);
    },
  });
};
