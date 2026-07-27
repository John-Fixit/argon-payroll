import { useMutation, useQuery } from "@tanstack/react-query";
import API from "../services/AxiosInstance.js";

export const useGetAnouncement = (payload) => {
  return useQuery({
    queryKey: ["anouncement_get_api"],
    queryFn: async () => {
      return await API.post("social/loadAllAnnouncement", payload);
    },
  });
};

export const useSaveAnnouncement_One = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`social/create_announcement`, payload);
    },
  });
};
export const useDeleteAnnouncement = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`social/delete_announcement`, payload);
    },
  });
};
