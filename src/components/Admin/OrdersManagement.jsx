import { useDispatch, useSelector } from 'react-redux';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useEffect, useState } from 'react';

const AdminOrdersManagement = () => {
  const dispatch = useDispatch();
  const { 
    allOrders, 
    adminOrderLoading, 
    orderPagination, 
    orderStats, 
    orderFilters 
  } = useSelector((state) => state.admin);
  const { authUser, token } = useSelector((state) => state.auth);
  
  // State management
  const [filters, setFilters] = useState(orderFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [emailModal, setEmailModal] = useState({ open: false, orderId: null, orderEmail: '' });

  useEffect(() => {
    fetchAdminOrders();
  }, [currentPage, filters]);

  const fetchAdminOrders = () => {
    dispatch({
      type: "FETCH_ADMIN_ORDERS",
      payload: {
        page: currentPage,
        limit: 20,
        ...filters,
        token
      }
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      paymentStatus: '',
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
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

  const getStatusColor = (status) => {
    const colors = {
      paid: 'bg-gray-900 text-white',
      pending: 'bg-gray-600 text-white',
      failed: 'bg-gray-400 text-gray-900',
      confirmed: 'bg-gray-800 text-white',
      processing: 'bg-gray-700 text-white',
      shipped: 'bg-gray-900 text-white',
      delivered: 'bg-gray-900 text-white',
      transit: 'bg-gray-800 text-white',
      cancelled: 'bg-gray-300 text-gray-900'
    };
    return colors[status] || 'bg-gray-200 text-gray-800';
  };

  const getStatusIcon = (order) => {
    if (order.flags?.cancelled) return <AlertTriangle className="h-4 w-4 text-red-500" />;
    if (order.flags?.needsAttention) return <Clock className="h-4 w-4 text-yellow-500" />;
    if (order.status.shipping === 'delivered') return <CheckCircle className="h-4 w-4 text-green-500" />;
    return <ShoppingBag className="h-4 w-4 text-gray-500" />;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportOrders = () => {
    dispatch({
      type: "GENERATE_ORDER_REPORT",
      payload: { 
        reportType: 'orders',
        format: 'excel',
        filters, 
        token 
      }
    });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    dispatch({
      type: "UPDATE_ORDER_STATUS",
      payload: { orderId, status: newStatus, token }
    });
  };

  const sendEmail = (orderId, emailType, customMessage = '') => {
    dispatch({
      type: "SEND_ORDER_EMAIL",
      payload: { 
        orderId, 
        emailType, 
        customMessage,
        recipientEmail: emailModal.orderEmail,
        token 
      }
    });
    setEmailModal({ open: false, orderId: null, orderEmail: '' });
  };

  const downloadInvoice = (orderId) => {
    dispatch({
      type: "DOWNLOAD_INVOICE",
      payload: { orderId, format: 'pdf', token }
    });
  };

  const generateReport = (reportType, format = 'pdf') => {
    dispatch({
      type: "GENERATE_ORDER_REPORT",
      payload: { 
        reportType, 
        format,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
        filters, 
        token 
      }
    });
  };

  if (adminOrderLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-light text-white tracking-tight">Orders Management</h1>
              <p className="text-gray-300 mt-2 font-light">Manage and track all customer orders</p>
            </div>
            <div className="mt-6 lg:mt-0 flex space-x-4">
              <button
                onClick={exportOrders}
                className="inline-flex items-center px-4 py-2 bg-white text-gray-900 text-sm font-medium rounded-sm hover:bg-gray-100 transition-colors duration-200"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors duration-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        {orderStats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Orders</p>
                  <p className="text-2xl font-light text-gray-900 mt-2">{orderStats.overview?.totalOrders || 0}</p>
                </div>
                <ShoppingBag className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Revenue</p>
                  <p className="text-2xl font-light text-gray-900 mt-2">${orderStats.overview?.totalRevenue || 0}</p>
                </div>
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Avg Order Value</p>
                  <p className="text-2xl font-light text-gray-900 mt-2">${orderStats.overview?.avgOrderValue || 0}</p>
                </div>
                <TrendingUp className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{`Today's Orders`}</p>
                  <p className="text-2xl font-light text-gray-900 mt-2">{orderStats.overview?.todayOrders || 0}</p>
                </div>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Search</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Order ID, customer..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Order Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Payment Status</label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                  className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                >
                  <option value="">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Date Range</label>
                <div className="flex space-x-2">
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                    className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Filters
              </button>
              <button
                onClick={fetchAdminOrders}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors duration-200"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Quick Search */}
        <div className="bg-white border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Quick search orders..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900"
                />
              </div>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              {allOrders?.length || 0} of {orderPagination?.totalOrders || 0} orders
            </div>
          </div>
        </div>

        {/* Orders List */}
        {allOrders?.length === 0 ? (
          <div className="bg-white border border-gray-200 p-16 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-light text-gray-900 mb-3">No Orders Found</h3>
            <p className="text-gray-500 font-light">No orders match your current filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allOrders.map((order) => (
              <div
                key={order.orderId}
                className="bg-white border border-gray-200 hover:shadow-sm transition-all duration-300 ease-in-out"
              >
                {/* Order Header */}
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      {getStatusIcon(order)}
                      <div className="flex items-center space-x-3">
                        <img
                          src={order.customer.avatar || '/default-avatar.png'}
                          alt={order.customer.name}
                          className="w-10 h-10 rounded-full border border-gray-200"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            #{order.orderNumber}
                          </h3>
                          <p className="text-sm text-gray-500 font-light">
                            {order.customer.name} • {formatDate(order.orderDate)}
                          </p>
                        </div>
                      </div>
                      {order.flags?.highValue && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-sm">
                          High Value
                        </span>
                      )}
                      {order.flags?.needsAttention && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-sm">
                          Attention Required
                        </span>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-8">
                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          ${order.totals.amount}
                        </p>
                        <p className="text-sm text-gray-500 font-light">
                          {order.totals.items} item{order.totals.items > 1 ? 's' : ''}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <span className={`px-3 py-1 rounded-sm text-xs font-medium ${getStatusColor(order.status.payment)}`}>
                          {order.status.payment}
                        </span>
                        <span className={`px-3 py-1 rounded-sm text-xs font-medium ${getStatusColor(order.status.shipping)}`}>
                          {order.status.shipping}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => toggleOrderExpansion(order.orderId)}
                        className="flex items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200 group"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {expandedOrders.has(order.orderId) ? 'Hide' : 'View'} Details
                        <div className="ml-2 transition-transform duration-300 ease-in-out group-hover:scale-110">
                          {expandedOrders.has(order.orderId) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable Details */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedOrders.has(order.orderId) 
                    ? 'max-h-[2000px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 border-t border-gray-100">
                    <div className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Customer & Shipping Info */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-3">Customer Details</h4>
                          <div className="p-4 bg-gray-50 border border-gray-100 space-y-2">
                            <p className="font-medium text-gray-900">{order.customer.name}</p>
                            <p className="text-sm text-gray-600">{order.customer.email}</p>
                            <p className="text-xs text-gray-500">Customer ID: {order.customer.id}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-3">Shipping Address</h4>
                          <div className="p-4 bg-gray-50 border border-gray-100 space-y-2">
                            <p className="font-medium text-gray-900">
                              {order.shipping.address.firstName} {order.shipping.address.lastName}
                            </p>
                            <p className="text-sm text-gray-600">{order.shipping.address.address1}</p>
                            {order.shipping.address.address2 && (
                              <p className="text-sm text-gray-600">{order.shipping.address.address2}</p>
                            )}
                            <p className="text-sm text-gray-600">
                              {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.postalCode}
                            </p>
                            <p className="text-sm text-gray-600">{order.shipping.address.country}</p>
                            <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
                              <p className="text-sm text-gray-600">📧 {order.shipping.address.Email}</p>
                              <p className="text-sm text-gray-600">📱 {order.shipping.address.PhoneNumber}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-3">Order Items</h4>
                          <div className="space-y-3">
                            {order.artworks.map((artwork) => (
                              <div key={artwork.id} className="flex items-center space-x-4 p-4 border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                <div className="flex-shrink-0">
                                  <img
                                    src={artwork.thumbnail}
                                    alt={artwork.title}
                                    className="w-16 h-16 object-cover border border-gray-200"
                                  />
                                </div>
                                <div className="flex-grow">
                                  <h5 className="font-medium text-gray-900 text-sm">{artwork.title}</h5>
                                  <p className="text-sm text-gray-500 font-light">by {artwork.artist.name}</p>
                                  <span className="px-2 py-1 bg-gray-900 text-white text-xs font-medium rounded-sm mt-1 inline-block">
                                    {artwork.category}
                                  </span>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-gray-900">${artwork.price.amount}</p>
                                  <p className="text-xs text-gray-500 font-light">{artwork.price.currency}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Admin Actions */}
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm uppercase tracking-wide mb-3">Admin Actions</h4>
                          <div className="flex flex-wrap gap-3">
                            <select
                              onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                              value={order.status.order}
                              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            
                            <div className="relative">
                              <button 
                                onClick={() => setEmailModal({
                                  open: true, 
                                  orderId: order.orderId,
                                  orderEmail: order.customer.email
                                })}
                                className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
                              >
                                Send Email
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => downloadInvoice(order.orderId)}
                              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors duration-200"
                            >
                              Download Invoice
                            </button>
                            
                            <button 
                              onClick={() => generateReport('order-detail', 'pdf')}
                              className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors duration-200"
                            >
                              Generate Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {orderPagination && orderPagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!orderPagination.hasPrevPage}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                  orderPagination.hasPrevPage
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                Previous
              </button>
              
              {Array.from({ length: orderPagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                    page === currentPage
                      ? 'bg-gray-900 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!orderPagination.hasNextPage}
                className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors duration-200 ${
                  orderPagination.hasNextPage
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
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

export default AdminOrdersManagement;