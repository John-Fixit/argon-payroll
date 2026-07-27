import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "./api_urls/api_urls";
import API from "../services/AxiosInstance";

//================get blood group request ===============================
export const useGetBloodGroup = () => {
  return useQuery({
    queryKey: ["anouncement"],
    queryFn: async () => {
      const res = await API.get(API_URL.getBlood_group);
      return res?.data?.data;
    },
  });
};
//========================================================================

export const useOnboardStaff = (is_draft) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      // if is_draft is true, it will use the convert draft to onboard endpoint else, it will use the endpoint to create (is_draft is passed as parameter to useOnboardStaff)
      console.log(is_draft, payload);
      return API.post(
        is_draft ? API_URL.convert_onboard : API_URL.create_onboard,
        payload
      );
      //===========
    },
    onSuccess: () => {
      queryClient.invalidateQueries("onboard_pending_requests");
    },
  });
};

export const useRecreateOnboard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.recreate_onboard, payload);
    },
    onSuccess: () => {
      // invalidate get onboard query
      queryClient.invalidateQueries("onboard_pending_requests");
    },
  });
};

export const useSaveOnboardAsDraft = () => {
  return useMutation({
    mutationFn: (payload) => {
      return API.post(API_URL.onboard_draft, payload);
    },
  });
};

export const useGetPension = () => {
  return useQuery({
    queryKey: ["get_pension"],
    queryFn: async () => {
      const res = await API.get(API_URL.get_pension);
      return res?.data?.data;
    },
  });
};

export const useGetOnboard = (payload, query_key) => {
  return useQuery({
    queryKey: [`onboard_${query_key}`],
    queryFn: async () => {
      return await API.post(API_URL.get_onboard_requests + query_key, payload);
    },
  });
};

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (request_id) => {
      const res = await API.get(`/onboard/remove_list/${request_id}`);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("onboard_pending_requests");
    },
  });
};
