import axios from "axios";
import { APINEW } from "../services/AxiosInstance";
import { formatError, showSuccess } from "../utils/messagePopup";

// logout
export async function logoutAdminAction(val) {
  let data = await logoutAdmin(val)
    .then(async (response) => {
      return response.data;
    })
    .catch((error) => {
      formatError("Error" || error?.response?.data);
    });

  return data;
}

const logoutAdmin = async (val) => {
  const json = {
    company_id: val?.COMPANY_ID,
    staff_id: val?.STAFF_ID,
  };
  let resources = await APINEW.post("login/signout", json);
  return resources;
};
// logout end

// login
export async function loginUserAction(json) {
  let data = await loginUser(json)
    .then(async (response) => {
      showSuccess("successful login");
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      formatError(error?.response?.data?.message || "Something went wrong");
    });

  return data;
}

const loginUser = async (data) => {
  const json = {
    username: data?.username,
    password: data?.password,
  };
  let resources = await APINEW.post("login/signin", json);
  return resources;
};
// login end
