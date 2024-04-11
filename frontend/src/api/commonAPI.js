import {
  AUTH_URL,
  BACKUP_URL,
  BASE_URL,
  GEN_MODEL,
  NETWORK_URL,
  RECOMMENDATION_URL,
} from "../config/config";
import axios from "axios";
import { get, post, put, deleteRequest } from "./httpMethods";

export const api = {
  loginUser: (payload) => {
    return post(`${AUTH_URL}/login`, payload);
  },
  onboardingUser: (payload) => {
    return post(`${AUTH_URL}/onboarding`, payload);
  },
  checkProfile: ({ firstName, lastName, url }) => {
    return get(`${BASE_URL}/profile/${`${firstName} ${lastName}`}/${url}`);
  },
  resetPassword: (payload) => {
    return post(`${AUTH_URL}/resetPassword`, payload);
  },
  forgotPassword: (payload) => {
    return post(`${AUTH_URL}/forgotPassword`, payload);
  },
  publications: ({ userId }) => {
    return get(`${BASE_URL}/publications/${userId}`);
  },
  verifyAccount: (payload) => {
    return post(`${AUTH_URL}/verifyAccount`, payload);
  },
  grants: (payload) => {
    return post(`${BACKUP_URL}/grants/${payload.userId}`, {
      keywords: payload.keywords,
    });
  },
  funding: ({ userId, type, interests }) => {
    return post(`${BASE_URL}/fundings/${userId}/${type}`, { interests });
  },
  recommendation: ({ userId, type, query, interests }) => {
    return post(`${RECOMMENDATION_URL}/recommendation/${userId}/${type}`, {
      interests,
      query,
    });
  },
  users: (payload) => {
    return post(`${NETWORK_URL}/users`, payload);
  },
  connection: (payload) => {
    return post(`${NETWORK_URL}/connect`, payload);
  },
  grantsSaveOrUpdate: (payload) => {
    return post(`${NETWORK_URL}/grants`, payload);
  },
  fileUpload: (file, userId) => {
    return post(`${NETWORK_URL}/fileUpload`, { file, userId });
  },
  message: (payload) => {
    return post(`${NETWORK_URL}/chat`, payload);
  },
  activation: (payload) => {
    return post(`${NETWORK_URL}/deactivate`, payload);
  },
  rating: (payload) => {
    return post(`${BASE_URL}/rate`, payload);
  },
  deleteOrVerifyUser: (payload) => {
    return put(`${AUTH_URL}/deleteOrVerifyUser`, payload);
  },
  disconnect: (payload) => {
    return deleteRequest(`${NETWORK_URL}/disconnect`, payload);
  },
  collaborator: (payload) => {
    return post(`${NETWORK_URL}/collaborate`, payload);
  },
  shareGrants: (payload) => {
    return post(`${NETWORK_URL}/share-grants`, payload);
  },
  upcomings: ({ date, interests }) => {
    return axios.post(GEN_MODEL, {
      prompt: {
        text: `give me upcoming conferences for these research interests (${interests}). Please give IEEE and ACM only`,
      },
    });
  },
};
