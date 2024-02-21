import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createCartAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/cart/createCart?${payload}`
  );
  return response;
};

export const getCartByIdAction = async (payload) => {
  const response = await axios.post(
    `${VITE_BASE_URL}/cart/cartByUserId?${payload}`
  );
  return response;
};
