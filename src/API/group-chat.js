import API from "../services/AxiosInstance";
// import { formatError } from "../utils/messagePopup";

export async function getGroupChatHistoryAction(json) {
  let data = await getGroupChatHistory(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

const getGroupChatHistory = async (data) => {
  const json = {
    company_id: data?.COMPANY_ID,
    staff_id: data?.STAFF_ID,
  };

  return API.post("chat/active_group", json);
};

export async function getGroupChatMemberAction(json) {
  let data = await getGroupChatMember(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

const getGroupChatMember = async (data) => {
  const json = {
    company_id: data?.COMPANY_ID,
    group_id: data?.GROUP_ID,
  };

  return API.post("chat/get_group_members", json);
};

export async function createGroupChatAction(json) {
  let data = await createGroupChat(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

const createGroupChat = async (data) => {
  const json = {
    group_name: data?.group_name, //"IT Group",
    company_id: data?.company_id,
    staff: data?.staff, //"2334,1123,345,345",
    staff_id: data?.staff_id, // "211"
  };

  return API.post("chat/create_chat_group", json);
};

export async function createSupportGroupChatAction(json) {
  let data = await createSupportGroupChat(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

const createSupportGroupChat = async (data) => {
  const json = {
    company_id: data?.company_id,
    staff_id: data?.staff_id,
  };

  return API.post("chat/create_support_group", json);
};

export async function addGroupMemberAction(json) {
  let data = await addGroupMember(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

const addGroupMember = async (data) => {
  const json = {
    company: data?.company, // "211"
    member: data?.member,
    staff: data?.staff, //"2334,1123,345,345",
    group_id: data?.group_id, //"IT Group",
  };

  return API.post("chat/add_group_member", json);
};

export async function sendGroupMessageAction(json) {
  let data = await sendGroupMessage(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

const sendGroupMessage = async (data) => {
  // const json = {
  //     "sender_id": data?.sender_id,   //"1",
  //     "message": data?.message,    //"Thank you",
  //     "file_id": data?.file_id,
  //     "group_id": data?.group_id
  // }

  return API.post("chat/send_group_message", data);
};

export async function getGroupMessageAction(json) {
  let data = await getGroupMessage(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return data;
}

const getGroupMessage = async (data) => {
  const json = {
    staff_id: data?.staff_id,
    group_id: data?.group_id,
  };

  return API.post("chat/get_group_chat", json);
};

export async function getMoreGroupChatMessageAction(json) {
  let data = await getMoreGroupChatMessage(json)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      // formatError(error?.response?.data?.message || "Something went wrong");
    });

  return data;
}

const getMoreGroupChatMessage = async (data) => {
  const json = {
    staff_id: data?.staff_id,
    group_id: data?.group_id,
    limit: data?.limit,
  };

  return API.post("chat/get_more_group_chat", json);
};
