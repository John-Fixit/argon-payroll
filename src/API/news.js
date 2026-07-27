import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


// export const useGetTransactionDetails = (page) => {
//     return useQuery({
//       queryKey: ['get_insights'],
//       queryFn: async () => {
//         const res = await axios.get(`https://dev.api.statisense.co/insights?page=1&limit=10&page=${page}`);
//         return res.data;
//       },
//       enabled: true,
//       retry: false
//     });
//   };

//   export const useGetInsights = (page = 1) => {
//     return useInfiniteQuery({
//       queryKey: ['get_insights'],
//       queryFn : async ()=> {
//         const res = await axios.get(`https://dev.api.statisense.co/insights?limit=10&page=${page}`);
//         return res.data;
//       },
//       getNextPageParam: (data)=>{ 
//         console.log(data)
//            return true
//       }
//     }) 
//   };


  export const useGetInsights = () => {
    return useInfiniteQuery({
      queryKey: ['get_insights'],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await axios.get(`https://dev.api.statisense.co/insights?limit=10&page=${pageParam}`);
        return res.data;
      },
      getNextPageParam: (lastPage) => {
        // Check if there are more pages to fetch
        if (lastPage.success && lastPage.next) {
          return lastPage.next;
        }
        return undefined;
      },
      initialPageParam: 1,
    });
  };