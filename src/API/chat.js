

import API from "../services/AxiosInstance";
import { useQuery,  } from '@tanstack/react-query'

// import { formatError } from "../utils/messagePopup";




// chat/unread_support_chat

export const useGetUnReadChatSupport = (payload) => {
    return useQuery({
        queryKey:['anouncement'],
        queryFn:async()=>{
            return await API.post(`/chat/unread_support_chat`,payload)
            }
    })
  }







export const getAllChatHistory = (data)=>{
    // console.log(data)
    const json = {
        "company_id":data?.COMPANY_ID,
        "staff_id":data?.STAFF_ID,
        "department_id":data?.DEPARTMENT
    }

    return API.post("chat/get_chat_history", json);
}




export const getAllChatHistoryByName = (data)=>{
    // console.log(data)
    const json = {
        "staff_id":data?.STAFF_ID,
        "company_id":data?.COMPANY_ID,
        "search_name":data?.SEARCH
    }

    return API.post("chat/chat_search", json);
}




export const getAllChatMessage = (data)=>{
    // console.log(data)

    const json = {
        "staff_id":data?.data?.STAFF_ID,
        "mate_id":data?.STAFF_ID
    }

    return API.post("chat/single_chat", json);
}



export const getMoreChatMessage = (data)=>{
    // console.log(data)

    const json = {
        "staff_id":data?.data?.STAFF_ID,
        "mate_id":data?.STAFF_ID,
        "limit": data?.offset
    }

    return API.post("chat/more_single_chat", json);
}





// getAllChatMessage2Action 
export async function getAllChatMessage2Action(json) {
    let data = await getAllChatMessage2(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            // formatError(error?.response?.data?.message || "Something went wrong");
        });

    return data
}

const getAllChatMessage2 = async (data) => {

    // console.log(data)

    const json = {
        "staff_id":data?.data?.STAFF_ID,
        "mate_id":data?.STAFF_ID
    }

    return API.post("chat/single_chat", json);
}
// getAllChatMessage2Action end






// getAllChatMessage2Action 
export async function getMoreChatMessage2Action(json) {
    let data = await getMoreChatMessage2(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            // formatError(error?.response?.data?.message || "Something went wrong");
        });

    return data
}

const getMoreChatMessage2 = async (data) => {

    const json = {
        "staff_id":data?.data?.STAFF_ID,
        "mate_id":data?.STAFF_ID,
        "limit": data?.offset
    }

    return API.post("chat/more_single_chat", json);
}
// getAllChatMessage2Action end







// getAllChatMessage2Action 
export async function sendChatMessage2Action(json) {
    let data = await sendChatMessage2(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
            // formatError(error?.response?.data?.message || "Something went wrong");
        });

    return data
}

const sendChatMessage2 = async (data) => {
    const json = {
        "sender_id":data?.data?.STAFF_ID,
        "receiver_id":data?.STAFF_ID,
        "message":data?.MESSAGE,
        "file_id":data?.FILE
    }

    return API.post("chat/send_message", json);
}
// getAllChatMessage2Action 







export async function updateChatStatusAction(json) {
    let data = await updateChatStatus(json)
        .then(async (response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error)
        });

    return data
}

const updateChatStatus = async (data) => {
    const json = {
        "chat_id":data
    }

    return API.post("chat/update_read_status", json);
}



// getAllChatMessage2Action end












