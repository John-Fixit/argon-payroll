import axios from "axios";
import toast from "react-hot-toast";
import { baseURL } from "./filePrefix";

export const uploadFileData = async (file, userToken) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await uploadFile(formData, userToken);
  if (res) {
    // console.log(res)
    return res;
  }
};

export const uploadFile = async (formData, token) => {
  try {
    const res = await axios({
      method: "post",
      url: baseURL + "attachment/addChatFile",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });

    if (res) {
      return res.data;
    }
  } catch (err) {
    if (
      err?.response?.data?.message !== "There was an error uploading your file"
    )
      toast.error(err?.response?.data?.message);
  }
};
