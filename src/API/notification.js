import { useMutation } from '@tanstack/react-query';
import API from '../services/AxiosInstance';



export const useGetNotification = () => {
    return useMutation({
      mutationFn: (body) => {
        return API.post('profile/notifications', body);
      },
    });
  };      

export const useSeenNotification = () => {
    return useMutation({
      mutationFn: (body) => {
        return API.post('approvals/seen_approval', body);
      },
    });
  };      