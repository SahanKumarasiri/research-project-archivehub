import { axiosInstance } from "./axiosInstance";

const headers = {
  "Content-Type": "application/json",
};

export const get = async (path, config) =>
  await axiosInstance
    .get(`${path}`, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const post = async (path, body) =>
  await axiosInstance
    .post(`${path}`, body, {
      headers,
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const put = async (path, body) =>
  await axiosInstance
    .put(`${path}`, body, { headers })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const patch = async (path, body) =>
  await axiosInstance
    .patch(`${path}`, body, { headers })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });

export const deleteRequest = async (path, payload, config) =>
  await axiosInstance
    .delete(`${path}`, { data: payload, headers })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
