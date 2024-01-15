import axios from "axios";
import { Storage } from "../modules/Storage";
import { BASE_URL } from "./config";

export const getAgentInfoByAgentNo = async (agentNo) => {
  // let config = {
  //   method: 'get',
  //   maxBodyLength: Infinity,
  //   url: BASE_URL+'/agent/agentNo/' + agentNo,
  //   headers: { }
  // };
  // return await axios.get
  return await axios.get(BASE_URL + "/agent/agentNo/" + agentNo);
}
export const getAgentInfoByAgentName = async (agentName) => {
  return await axios.get(BASE_URL + "/agent/agentName/" + agentName);
}

export const getQuotationByPreMatchingNoAndAgentNo = async (preMatchingId, agentNo) => {
  return await axios.post(BASE_URL + "/preMatching/quotation/", {
    preMatchingId: preMatchingId,
    agentNo: agentNo
  }, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}

export const sendQuotation = async (data) => {
  return await axios.post(BASE_URL + "/preMatching/sendQuotation", data, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
};

export const getChatRoomListByClientId = async (data) => {
  return await axios.get(BASE_URL + "/chat/getChatRoomClient?clientId=" + data, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}

export const getChatRoomListByAttorneyId = async (data) => {
  return await axios.get(BASE_URL + "/chat/getChatRoomAttorney?attorneyId=" + data, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}

export const getChatRoomDetail = async (chatRoomId, listCount, skipCount) => {
  return await axios.get(BASE_URL + "/chat?chatRoomId=" + chatRoomId + "&listCount=" + listCount + "&skipCount=" + skipCount, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}

export const getAccountProfile = async (data) => {
  return await axios.get(BASE_URL + "/account/profile/" + data, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}

export const requestVerifyCode = async (email, reset) => {
  return await axios.get(BASE_URL + "/account/requestVerifyCode/" + email +"/" + reset, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}

export const verifyCode = async (data) => {
  return await axios.post(BASE_URL + "/account/verifyCode", data, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}

export const resetPassword = async (data) => {
  return await axios.post(BASE_URL + "/reset/password", data, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });

}

export const getPreMatchingInfo = async (pId) => {
  return await axios.get(BASE_URL + "/preMatching/" + pId, {
    headers: {
      "X-AUTH-TOKEN": Storage.get("authToken"),
    },
  });
}