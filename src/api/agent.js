import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./config";
import axios from "axios";

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