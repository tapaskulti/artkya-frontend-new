import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createWishlistAction = async (payload) => {
  // console.log("Action payload---->", payload);
  const response = await axios.post(
    `${VITE_BASE_URL}/wishlist/createWishlist?userId=${payload}`,
  );

  return response;
};

export const addToWishlistAction = async (payload) => {
  // console.log("Action payload---->", payload);
  const response = await axios.patch(
    `${VITE_BASE_URL}/wishlist/addToWishlist?userId=${payload?.userId}&artId=${payload?.artId}`,
  );

  return response;
};

export const removeFromWishlistAction = async (payload) => {
 
  const response = await axios.patch(
    `${VITE_BASE_URL}/wishlist/removeFromWishList?userId=${payload?.userId}&artId=${payload?.artId}`,
  );

  return response;
};

export const getWishlistByIdAction = async (payload) => {
  console.log("Action payload---->", payload);
  const response = await axios.get(
    `${VITE_BASE_URL}/wishlist/wishlistByUserId?userId=${payload}`,
  );

  return response;
};
