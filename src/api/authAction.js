import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginAction = async (payload) => {
  // console.log("Action payload---->", payload);
  const response = await axios.post(
    `${VITE_BASE_URL}/user/login`,
    payload.body
  );

  return response;
};

export const accessToken = async (payload) => {
  // console.log("access token payload ---->", payload);

  const response = await axios.post(
    `${VITE_BASE_URL}/user/access_Token?email=${payload.body}`
  );
  // console.log("access token action response", response);
  return response;
};

export const logoutSagaAction = async (payload) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${VITE_BASE_URL}/user/logout?email=${payload.body.userEmailload}`,
    headers: {},
  };
  const response = await axios.request(config);

  return response;
};

export const userLoggedInAction = async (payload) => {
  const response = await axios.get(`${VITE_BASE_URL}/user/loggedInUser`, {
    headers: {
      Authorization: payload?.token,
    },
  });
  return response;
};