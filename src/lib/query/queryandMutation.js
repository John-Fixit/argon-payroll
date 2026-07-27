/* eslint-disable no-unused-vars */
import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'

import { QUERY_KEYS } from './queryKeys'

import { addComment, createPost, deletePost, fetchInfinitePosts, fetchInfinitePostsInitial, getBirthday, getRecentPosts, likePost, loadAnnouncement, loadMoreComment } from '../../API/post'
import { getAllChatHistory, getAllChatHistoryByName, getAllChatMessage, getMoreChatMessage } from '../../API/chat';
import API from '../../services/AxiosInstance';




// ============================================================
// POST QUERIES
// ============================================================

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_INFINITE_POSTS_INITIAL],
        });
      },
    });
  };


  export const useGetRecentPosts = (params) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_RECENT_POSTS,],
      queryFn:()=> getRecentPosts(params),
      
    });
  };


  export const useLoadBirthday = (params) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_BIRTHDAY],
      queryFn:()=> getBirthday(params),
      
    });
  };



  export const useLoadAnnouncement = (params) => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_ANNOUNCEMENT],
      queryFn:()=> loadAnnouncement(params),
      
    });
  };




  export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => addComment(data),
      // onSuccess: () => {
      //   queryClient.invalidateQueries({
      //     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS_INITIAL],
      //   });
      //   queryClient.invalidateQueries({
      //     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      //   });
      // },
    });
   
  };

  export const useDeletePost = () => {
    return useMutation({
        mutationFn:  async (data) => {
          return await API.post("social/deletePost", data)
        } 
      });
  };

  export const useDeletePostComment = () => {
    return useMutation({
      mutationFn: async (payload) => {
        return await API.post(`social/deleteComment`,payload)
      },
      });
  };

  export const useEditPostComment = () => {
    return useMutation({
        mutationFn: async  (data) => {
          return API.post("social/updateComment", data)
        }
      });
  };


  



  export const useLikePost = () => {
      const queryClient = useQueryClient();
      
      return useMutation({
          mutationFn: (data) => likePost(data),
          onSuccess: (data) => {
              // queryClient.invalidateQueries({
              //     queryKey: [QUERY_KEYS.GET_RECENT_POSTS,],
              //   });
              // queryClient.invalidateQueries({
              //     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS,],
              //   });
            },
        });
    };


  export const useLoadMoreComment = () => {
      
      return useMutation({
          mutationFn: (data) => loadMoreComment(data),
         
        });
        
  };










  // export const useDeletePost = () => {
  //     const queryClient = useQueryClient();
      
  //     return useMutation({
  //         mutationFn: (params) => deletePost(params),
  //         onSuccess: (data) => {
  //             queryClient.invalidateQueries({
  //                 queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
  //               });
  //           },
  //       });
  // };
    






  // initial ? (datas)=>fetchInfinitePostsInitial({...datas, ...data}) : 
  export const useGetPostsInfinite = (data, offset) => {
      
      return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
        queryFn : (datas)=>fetchInfinitePosts({...datas, ...data, offset}),
        getNextPageParam: (data)=>{ 
            
            const lastpage = data?.data?.data?.length > 0 ? 2 : 2
     
            if(lastpage) return lastpage
        }
      }) 
    };



  export const useGetPostsInitial = (data) => {
      
      return useInfiniteQuery({
        queryKey: [QUERY_KEYS.GET_INFINITE_POSTS_INITIAL],
        queryFn :  (datas)=>fetchInfinitePostsInitial({...datas, ...data}),
        getNextPageParam: (data)=>{ 
            const lastpage = null
        
            if(lastpage) return lastpage
        }
      }) 
  };



// ============================================================
// POST QUERIES
// ============================================================
























// ============================================================
// CHAT QUERIES
// ============================================================

export const useGetAllChatHistory = () => {
      
  return useMutation({
      mutationFn: (data) => getAllChatHistory(data),
      retry: false
    });
    
};




export const useGetAllChatHistoryByName = () => {
      
  return useMutation({
      mutationFn: (data) => getAllChatHistoryByName(data),
     
    });
    
};

export const useGetChatInfinite = (data, offset, chat) => {
      
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_INFINITE_CHATS_INFINITE],
    queryFn : (datas)=>getMoreChatMessage({...datas, ...data,  ...chat,  offset,}),
    getNextPageParam: (data)=>{ 
        
        const lastpage = data?.data?.data?.length > 0 ? 2 : 2
 
        if(lastpage) return lastpage
    },
    // refetchInterval: false,
    gcTime: 1000 * 60,
    staleTime: 1000 * 60 
  }) 
};



export const useGetChatInitial = (data, chat) => {
  
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.GET_USERS_CHAT],
    queryFn :  (datas)=>getAllChatMessage({...datas, ...data, ...chat}),
    getNextPageParam: (data)=>{ 
        const lastpage = null
    
        if(lastpage) return lastpage
    }
  }) 
};

export const useDeleteChat = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`chat/delete_chat`,payload)
    },
    });
};









// ============================================================
// CHAT QUERIES
// ============================================================











// ====================================================================
// LEAVE MUTATIONS
// ==================================
