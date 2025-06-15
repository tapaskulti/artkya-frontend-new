import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const createOrderAction = async (payload) => {
  console.log("Action payload---->", payload);
  const response = await axios.post(
    `${VITE_BASE_URL}/order/createOrder`,
    payload.body
  );

  return response;
};
export const getOrderByUserIdAction = async (payload) => {
  console.log("Action payload---->", payload);
  const { token,userId, page = 1, limit = 10, status, dateRange } = payload;

  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    userId: userId,
  });

  if (status && status !== "all") {
    params.append("status", status);
  }

  if (dateRange && dateRange !== "all") {
    params.append("dateRange", dateRange);
  }

  const response = await axios.get(
    `${VITE_BASE_URL}/order/getUserOrders?${params}`,
     {
      headers: {
        Authorization: token,
      },
    }
  );

  return response;
};

export const getOrderByOrderIdAction = async (payload) => {
  console.log("Action payload---->", payload);
  const { orderId, token } = payload;
  const response = await axios.get(
    `${VITE_BASE_URL}/order/getOrderById?orderId=${orderId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response;
};
