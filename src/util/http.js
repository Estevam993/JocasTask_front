"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const postRequest = async (config) => {
  const { url, params } = config;

  try {
    const response = await axios.post(url, params);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const setCookie = async (name, value, options = {}) => {
  const cookieStore = cookies();

  cookieStore.set(name, value, {
    path: "/",
    httpOnly: true,
    secure: true,
    ...options,
  });
};

export const getCookie = async (name) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(name);

  return cookie?.value || null;
};
