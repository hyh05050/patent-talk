import axios from "axios";
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
  });
}

export const sendQuotation = async (data) => {
  return await axios.post(BASE_URL + "/preMatching/sendQuotation", data);
};