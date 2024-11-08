import { useState } from "react";
import axios from "axios";

const baseURL = "http://localhost:3000/user";

export const getActivity = async (id) => {
  const url = `${baseURL}/${id}/activity`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getDuration = async (id) => {
  const url = `${baseURL}/${id}/average-sessions`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getPerformance = async (id) => {
  const url = `${baseURL}/${id}/performance`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getScore = async (id) => {
  const url = `${baseURL}/${id}/`;
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (err) {
    throw new Error(err.message);
  }
};
