import axios from "axios";

export const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const curstomHeaders = {
  Accept: "application/json",
};

export const newApiRequest = (route = "") =>
  axios.create({
    baseURL: `${baseURL}${route}`,
    headers: curstomHeaders,
  });
