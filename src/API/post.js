import toast from "react-hot-toast";
import API, { API_FILE } from "../services/AxiosInstance";
import { formatError } from "../utils/messagePopup";



export const createPost =  (data)=>{
    const json = {
        "staff_id": data?.STAFF_ID,
        "content": data?.content,
        "file_id": data?.file,
        "background_color": data?.bg
    }

    const res =  API.post("social/addPost", 
    json);

    return res
}





export const addAttachment =  (formData)=>{
    const res =  API_FILE.post("attachment/addFile", 
    formData);

    return res
}





export const getRecentPosts = async (inputs)=>{
    const res = await API.get(`/posts?userId=${inputs}&page=1&pageSize=10`);
    return res
}







export const getBirthday = async (data)=>{
    const json = {
        "company_id": data?.COMPANY_ID,
    }

    const res = await API.post(`social/LoadBirthday`, json);
    return res
}


export const loadAnnouncement = async (data)=>{
    // console.log(data)
    const json = {
        "company_id": data?.COMPANY_ID,
    }

    const res = await API.post(`social/loadAnnouncement`, json);
    return res
}







export const addComment = async (data)=>{

    const json = {
        "staff_id": data?.STAFF_ID,
        "comment":data?.comment,
        "post_id": data?.postId,
    }

    const res = await API.post(`social/add_comment`, json);
    return res
    
}

export const loadMoreComment = async (data)=>{

    const json = {
        "post_id": data?.post_id,
        "limit":data?.limit,
    }

    const res = await API.post(`social/loadMorePostComments`, json);
    return res
    
}






export const fetchInfinitePostsInitial = async (data)=>{
    // console.log('start', data)
    // const page = !data?.pageParam  ? 1 : data?.pageParam

    const json = {
        "company_id": data?.COMPANY_ID,
        "staff_id": data?.STAFF_ID,
    }
    // const res = await API.post(`social/loadposts`, json);
    const res = await API.post(`social/loadposts`, json);
    return res
}

export const fetchInfinitePosts = async (data)=>{
    // console.log('next', data)
    // const page = !data?.pageParam  ? 1 : data?.pageParam
      
    const json = {
        "company_id": data?.COMPANY_ID,
        "staff_id": data?.STAFF_ID,
        "offset": data?.offset 
    }


    const res = await API.post(`social/LoadMorePosts`, json);
    return res
}



export const fetchInfinitePostsV2Action = async (data) => {
    let res = await fetchInfinitePostsV2(data)
      .then(async (response) => {
        return response.data;
      })
      .catch((error) => {
        formatError(error?.response?.data || 'Something went wrong');
     
        
      });
    return res;
}
  


  const fetchInfinitePostsV2 = async (data) => {
    try {
        const json = {
            "company_id": data?.data?.COMPANY_ID,
            "staff_id": data?.data?.STAFF_ID,
            "offset": data?.offset 
        }
    
        const res = await API.post(`social/LoadMorePosts`, json);
        return res;
        
    } catch (error) {
        toast.error(error.response.data)
    }
  }




export const likePost = (data)=>{

    const json = {
        "post_id": data?.POST_ID,
        "staff_id" : data?.USER_ID
    }

    return API.post("social/likePost", json);
}









export const deletePost = (postId)=>{
    return  API.delete(`/posts/${postId}`)  
}




// social/upcomingBirthday
export async function getUpcomingBirthdaysAction(json) {
    let data = await getUpcomingBirthdays(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const getUpcomingBirthdays = async (data) => {
    const json = {
        "company_id": data?.COMPANY_ID,
    }

    return API.post("social/upcomingBirthday", json);
}