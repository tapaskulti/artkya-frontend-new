import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createOrderAction = async (payload) => {
  console.log("Action payload---->", payload);
  const response = await axios.post(
    `${VITE_BASE_URL}/order/createOrder?userId=${payload}`,
  );

  return response;
};
