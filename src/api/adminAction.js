/* eslint-disable no-useless-catch */
import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchTotalUserArtistCountsAction = async () => {
  try {
    // console.log("fetchTotalUserArtistCountsAction Called");
    const response = await axios.get(
      `${VITE_BASE_URL}/admin/getTotalUsersAndArtists`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllUsersAction = async (payload) => {
  try {
    console.log("fetchAllUsersAction Called", payload);
    const response = await axios.get(
      `${VITE_BASE_URL}/admin/getAllUsers?search=${payload.search}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllArtistsAction = async (payload) => {
  try {
    // console.log("fetchAllArtistsAction Called");
    const response = await axios.get(
      `${VITE_BASE_URL}/admin/getAllArtists?search=${payload.search}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPantingsAction = async () => {
  try {
    // console.log("getAllPantingsAction Called");
    const response = await axios.get(`${VITE_BASE_URL}/admin/getAllPainting`);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const approveArtWorkAction = async (payload) => {
  try {
    console.log("approveArtWorkAction Called");
    const response = await axios.patch(
      `${VITE_BASE_URL}/admin/approveArtwork?artId=${payload?.artId}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
export const updateArtistCommissionAction = async (payload) => {
  try {
    console.log("updateArtistCommissionAction Called", payload);
    const response = await axios.patch(
      `${VITE_BASE_URL}/admin/updateCommission`,
      payload.body
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};
export const verifyArtistAction = async (payload) => {
  try {
    console.log("verifyArtist Called", payload);
    const response = await axios.patch(
      `${VITE_BASE_URL}/admin/verifyArtist?userId=${payload?.userId}`
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

// Send Order Email Action
export const sendOrderEmailAction = async (payload) => {
  try {
    const { orderId, emailType, customMessage, recipientEmail, token } =
      payload;
    const response = await axios.post(
      `${VITE_BASE_URL}/admin/${orderId}/send-email`,
      {
        emailType, // 'confirmation', 'shipping', 'delivery', 'custom'
        customMessage,
        recipientEmail,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Generate Order Report Action
export const generateOrderReportAction = async (payload) => {
  try {
    const {
      reportType,
      dateFrom,
      dateTo,
      filters,
      format = "pdf",
      token,
    } = payload;
    const response = await axios.post(
      `${VITE_BASE_URL}/admin/generate-report`,
      {
        reportType, // 'sales', 'orders', 'revenue', 'customer'
        dateFrom,
        dateTo,
        filters,
        format, // 'pdf', 'excel', 'csv'
      },
      {
        headers: {
          Authorization: token,
        },
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// Download Invoice Action
export const downloadInvoiceAction = async (payload) => {
  try {
    const { orderId, format = "pdf", token } = payload;
    const response = await axios.get(
      `${VITE_BASE_URL}/admin/${orderId}/invoice`,
      {
        params: { format },
        headers: {
          Authorization: token,
        },
        responseType: "blob",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};



// FETCH_ADMIN_ORDERS Action
export const fetchAdminOrdersAction = async (payload) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      search, 
      status, 
      paymentStatus, 
      dateFrom, 
      dateTo, 
      minAmount, 
      maxAmount, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      token 
    } = payload;
    
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      sortOrder
    });
    
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    if (paymentStatus) params.append('paymentStatus', paymentStatus);
    if (dateFrom) params.append('dateFrom', dateFrom);
    if (dateTo) params.append('dateTo', dateTo);
    if (minAmount) params.append('minAmount', minAmount);
    if (maxAmount) params.append('maxAmount', maxAmount);
    
    const response = await axios.get(`${VITE_BASE_URL}/admin/getAllOrdersAdmin?${params}`, {
      headers: {
        'Authorization': token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// UPDATE_ORDER_STATUS Action
export const updateOrderStatusAction = async (payload) => {
  try {
    const { orderId, status, notes, notifyCustomer = true, token } = payload;
    
    const response = await axios.patch(`${VITE_BASE_URL}/admin/updateOrderStatus/${orderId}/status`, { 
      status,
      notes,
      notifyCustomer
    }, {
      headers: {
        'Authorization': token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Additional helper actions for admin orders

// Fetch single admin order by ID
export const fetchAdminOrderByIdAction = async (payload) => {
  try {
    const { orderId, token } = payload;
    const response = await axios.get(`/admin/orders/${orderId}`, {
      headers: {
        'Authorization': token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Get admin dashboard statistics
export const getAdminDashboardStatsAction = async (payload) => {
  try {
    const { period = '30d', token } = payload;
    const response = await axios.get(`/admin/orders/stats?period=${period}`, {
      headers: {
        'Authorization': token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Bulk update orders
export const bulkUpdateOrdersAction = async (payload) => {
  try {
    const { orderIds, updates, token } = payload;
    const response = await axios.put('/admin/orders/bulk-update', { 
      orderIds,
      updates 
    }, {
      headers: {
        'Authorization': token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Search orders with advanced filters
export const searchOrdersAction = async (payload) => {
  try {
    const { searchTerm, filters, token } = payload;
    const params = new URLSearchParams();
    
    if (searchTerm) params.append('search', searchTerm);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await axios.get(`/admin/orders/search?${params}`, {
      headers: {
        'Authorization': token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
