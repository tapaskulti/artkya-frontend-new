import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createCartAction = async (payload) => {
  // console.log("Action payload---->", payload);
  const response = await axios.post(
    `${VITE_BASE_URL}/cart/createCart?userId=${payload}`,
  );

  return response;
};

export const addToCartAction = async (payload) => {
  // console.log("Action payload---->", payload);
  const response = await axios.patch(
    `${VITE_BASE_URL}/cart/addToCart?userId=${payload?.userId}&artId=${payload?.artId}&artPrice=${payload?.artPrice}`,
  );

  return response;
};

export const removeFromCartAction = async (payload) => {
  // console.log("Action payload---->", payload);
  const response = await axios.patch(
    `${VITE_BASE_URL}/cart/removeFromCart?userId=${payload?.userId}&artId=${payload?.artId}&artPrice=${payload?.artPrice}`,
    payload.body
  );

  return response;
};

export const getCartByIdAction = async (payload) => {
  // console.log("Action payload---->", payload);
  const response = await axios.get(
    `${VITE_BASE_URL}/cart/cartByUserId?userId=${payload}`,
    payload.body
  );

  return response;
};
