import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  EyeIcon,
  ShoppingBagIcon,
  TruckIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isOrderLoading, pagination, summary } = useSelector(
    (state) => state.order
  );
  const { authUser,token } = useSelector((state) => state.auth);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (authUser?._id) {
      dispatch({
        type: "FETCH_USER_ORDERS",
        payload: {
          userId: authUser._id,
          page: currentPage,
          status: filterStatus !== "all" ? filterStatus : undefined,
          token
        },
      });
    }
  }, [dispatch, authUser, currentPage, filterStatus,token]);

  const getStatusColor = (status) => {
    const statusColors = {
      paid: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      confirmed: "bg-blue-100 text-blue-800",
      processing: "bg-purple-100 text-purple-800",
      shipped: "bg-indigo-100 text-indigo-800",
      delivered: "bg-green-100 text-green-800",
      transit: "bg-blue-100 text-blue-800",
      cancelled: "bg-gray-100 text-gray-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusIcon = (orderStatus, paymentStatus, shippingStatus) => {
    if (orderStatus === "cancelled")
      return <FaExclamationTriangle className="h-5 w-5" />;
    if (shippingStatus === "delivered")
      return <CheckCircleIcon className="h-5 w-5" />;
    if (shippingStatus === "transit" || shippingStatus === "shipped")
      return <TruckIcon className="h-5 w-5" />;
    if (paymentStatus === "paid" && orderStatus === "confirmed")
      return <ShoppingBagIcon className="h-5 w-5" />;
    return <ClockIcon className="h-5 w-5" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const toggleOrderExpansion = (orderId) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredOrdersCount = orders?.length || 0;

  if (isOrderLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">
                Track and manage your purchases
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/painting"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <ShoppingBagIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {summary.totalOrders}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-green-600 text-2xl font-bold">$</div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Spent
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${summary.totalSpent}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TruckIcon className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Avg Order Value
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${summary.averageOrderValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Orders</option>
                <option value="confirmed">Confirmed</option>
                <option value="transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="text-sm text-gray-600">
              Showing {filteredOrdersCount} of {pagination?.totalOrders || 0}{" "}
              orders
            </div>
          </div>
        </div>

        {/* Orders List */}
        {orders?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Orders Found
            </h3>
            <p className="text-gray-600 mb-6">{`You haven't placed any orders yet.`}</p>
            <Link
              to="/painting"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <div
                        className={`p-2 rounded-full ${getStatusColor(
                          order.status.shipping
                        )}`}
                      >
                        {getStatusIcon(
                          order.status.order,
                          order.status.payment,
                          order.status.shipping
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.orderDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-6">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${order.totals.amount}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.totals.items} item
                          {order.totals.items > 1 ? "s" : ""}
                        </p>
                      </div>

                      <div className="flex space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status.payment
                          )}`}
                        >
                          {order.status.payment}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status.shipping
                          )}`}
                        >
                          {order.status.shipping}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleOrderExpansion(order.orderId)}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <EyeIcon className="h-4 w-4 mr-1" />
                        {expandedOrders.has(order.orderId)
                          ? "Hide"
                          : "View"}{" "}
                        Details
                        {expandedOrders.has(order.orderId) ? (
                          <ChevronUpIcon className="h-4 w-4 ml-1" />
                        ) : (
                          <ChevronDownIcon className="h-4 w-4 ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Details (Expandable) */}
                {expandedOrders.has(order.orderId) && (
                  <div className="p-6 bg-gray-50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Shipping Address */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Shipping Address
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-medium">
                            {order.shipping.address.firstName}{" "}
                            {order.shipping.address.lastName}
                          </p>
                          <p>{order.shipping.address.address1}</p>
                          {order.shipping.address.address2 && (
                            <p>{order.shipping.address.address2}</p>
                          )}
                          <p>
                            {order.shipping.address.city},{" "}
                            {order.shipping.address.state}{" "}
                            {order.shipping.address.postalCode}
                          </p>
                          <p>{order.shipping.address.country}</p>
                          <div className="mt-2 space-y-1">
                            <p>📧 {order.shipping.address.Email}</p>
                            <p>📱 {order.shipping.address.PhoneNumber}</p>
                          </div>
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Billing Address
                          {order.shipping.sameAsBilling && (
                            <span className="text-sm font-normal text-gray-500 ml-2">
                              (Same as shipping)
                            </span>
                          )}
                        </h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p className="font-medium">
                            {order.billing.address.firstName}{" "}
                            {order.billing.address.lastName}
                          </p>
                          <p>{order.billing.address.address1}</p>
                          {order.billing.address.address2 && (
                            <p>{order.billing.address.address2}</p>
                          )}
                          <p>
                            {order.billing.address.city},{" "}
                            {order.billing.address.state}{" "}
                            {order.billing.address.postalCode}
                          </p>
                          <p>{order.billing.address.country}</p>
                        </div>
                      </div>
                    </div>

                    {/* Artworks */}
                    <div className="mt-8">
                      <h4 className="font-semibold text-gray-900 mb-4">
                        Items Ordered
                      </h4>
                      <div className="space-y-4">
                        {order.artworks.map((artwork) => (
                          <div
                            key={artwork.id}
                            className="flex items-center space-x-4 p-4 bg-white rounded-lg"
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={artwork.thumbnail}
                                alt={artwork.title}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            </div>
                            <div className="flex-grow">
                              <h5 className="font-semibold text-gray-900">
                                {artwork.title}
                              </h5>
                              <p className="text-sm text-gray-600">
                                by {artwork.artist.name}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  {artwork.category}
                                </span>
                                {artwork.medium.map((med, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                  >
                                    {med}
                                  </span>
                                ))}
                                {artwork.styles.map((style, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
                                  >
                                    {style}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                ${artwork.price.amount}
                              </p>
                              <p className="text-xs text-gray-500">
                                {artwork.isOriginal ? "Original" : "Print"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {order.flags.canCancel && (
                        <button className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors">
                          Cancel Order
                        </button>
                      )}
                      {order.flags.canReturn && (
                        <button className="px-4 py-2 border border-orange-300 text-orange-700 rounded-md hover:bg-orange-50 transition-colors">
                          Return Item
                        </button>
                      )}
                      <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors">
                        Track Order
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                        Download Invoice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className={`px-4 py-2 rounded-md ${
                  pagination.hasPrevPage
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-md ${
                    page === currentPage
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className={`px-4 py-2 rounded-md ${
                  pagination.hasNextPage
                    ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
