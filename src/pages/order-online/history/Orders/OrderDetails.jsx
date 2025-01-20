import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import './orderDetails.css';
import { myColors } from "../../../../contants/Colors";
import { MdShoppingCart, MdCancel, MdHourglassTop, MdRestaurantMenu, MdLocalShipping, MdCheckCircle, MdHelpOutline, MdDoNotDisturb } from "react-icons/md";
import { ArrowBackIosNew } from "@mui/icons-material";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { ApiPath } from "../../../../config";
import CustomAlert from "../../../../components/alert/CustomAlert";

// toast.configure();

export default function OrderDetails() {
  const navigate = useNavigate();
  // const { orderId } = useParams();
  const { state } = useLocation();
  const { orderData } = state;
  const  orderId  = orderData._id;
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  // console.log("186",orderId);
  // console.log("187",orderData._id);
  
  if (!orderData || !orderData._id) {
    return (
      <div className="ordered-container">
        <p>No order data available.</p>
      </div>
    );
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours() % 12 || 12;
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${date.toLocaleDateString()} ${hours}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")} ${ampm}`;
  };

  const handleCancelOrder = async () => {
    try {
      // Update order status to Canceled-By-User
      await axios.put(`${ApiPath}jaavapotorders/api/orders/${orderId}`, { status: "Canceled-By-User" });
      toast.success('Order has been canceled successfully!');
      // Here you would want to refresh or update the page with the new order status
      navigate("/orders"); // Refresh the page
    } catch (error) {
      console.error('Error canceling order:', error);
      toast.error('Failed to cancel the order. Please try again.');
    }
  };

  const confirmCancelOrder = () => {
    setIsAlertVisible(true);
  };

  const handleConfirmCancelOrder = () => {
    handleCancelOrder();
    setIsAlertVisible(false); // Close the alert after confirming
  };

  const handleCancelAlert = () => {
    setIsAlertVisible(false); // Close the alert without canceling the order
  };

  return (
    <>
      <div className="orders-header">
        <p className="ordered-header-title">Order Details</p>
        <div onClick={() => navigate(-1)} className="ordered-back-button">
          <ArrowBackIosNew className="ordered-back-icon" />
          <span className="ordered-back-text">Go Back</span>
        </div>
      </div>

      <div className="ordered-scroll-container">
        <div className="ordered-container">

          {/* Current Status */}
          <div className="ordered-section">
            <p className="ordered-sectionTitle">Current Status</p>
            <div className="ordered-statusContainer">
              <p className="ordered-orderStatus" style={{ color: getColorByStatus(orderData.status) }}>
                {orderData.status}
              </p>
              <p className="ordered-statusIcon">{getIconByStatus(orderData.status)}</p>
            </div>
          </div>

          {/* Order ID and Date */}
          <div className="ordered-section-id">
            <div>
              <p className="ordered-sectionTitle">Order ID</p>
              <p className="ordered-itemText">{orderData._id}</p>
            </div>
            <div>
              <p className="ordered-sectionTitle">Ordered On</p>
              <p className="ordered-itemText">{formatTimestamp(orderData.timestamp)}</p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="ordered-section">
            <p className="ordered-sectionTitle">Ordered Items</p>
            <div className="ordered-items">
              {orderData.order_data[0].map((item, index) => (
                <div key={index} className="ordered-itemContainer">
                  {item.img && <img src={item.img} alt={item.name} className="ordered-itemImage" />}
                  <div className="ordered-card-content-updates">
                    <p className="ordered-itemDetails">
                    <p className="ordered-itemName">{item.name}</p>
                      <p>₹ {item.price}</p>
                      <p>Quantity: {item.qty}</p>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div className="order-address-container">
            <div>
              <p className="ordered-sectionTitle">Delivery Address</p>
              <p className="ordered-itemText">Name: {orderData.order_data[1].name}</p>
              <p className="ordered-itemText">Email: {orderData.order_data[1].delivery_email}</p>
              <p className="ordered-itemText">Phone No: {orderData.order_data[1].delivery_phone}</p>
              <p className="ordered-itemText">Location: {orderData.order_data[1].Location}</p>
              <p className="ordered-itemText">City: {orderData.order_data[1].City}</p>
              <p className="ordered-itemText">Pincode: {orderData.order_data[1].Pincode}</p>
            </div>

            {/* Payment Details */}
            <div>
              <h3 className="ordered-sectionTitle">Payment Details</h3>
              <p className="ordered-itemText">Total Amount: ₹{orderData.order_data[2].totalAmount}</p>
              <p className="ordered-itemText">Payment ID: {orderData.order_data[2].paymentId}</p>
              <p className="ordered-itemText">Order ID: {orderData.order_data[2].orderId}</p>
            </div>
          </div>

          {/* Cancel Order Button */}
          {(orderData.status === "Order-Placed" || orderData.status === "Under-Process") && (
            <div className="ordered-cancel-container">
              <button onClick={confirmCancelOrder} className="ordered-cancel-button">
                Cancel Order
              </button>
            </div>
          )}

          {[ "Out-For-Delivery", "Delivered","Ready-For-Pickup"].includes(orderData.status) && (
            <p className="ordered-itemText" style={{ color: 'red', marginTop: '20px' }}>
              This order cannot be canceled as it is already being processed or delivered.
            </p>
          )}
        </div>
      </div>
      {isAlertVisible && (
        <CustomAlert
          message="Are you sure you want to cancel the order?"
          onConfirm={handleConfirmCancelOrder}
          onCancel={handleCancelAlert}
        />
      )}
    </>
  );
}

const getColorByStatus = (status) => {
  switch (status) {
    case "Order-Placed":
      return "#4CAF50";
    case "Rejected":
      return "red";
    case "Under-Process":
      return "#f5bc71";
    case "Ready-For-Pickup":
      return "purple";
    case "Out-For-Delivery":
      return "#6588db";
    case "Delivered":
      return "#32a31c";
      case "Canceled-By-User":
        return "red";   
    default:
      return myColors.primaryShadow;
  }
};

const getIconByStatus = (status) => {
  switch (status) {
    case "Order-Placed":
      return <MdShoppingCart size={34} />;
    case "Rejected":
      return <MdCancel size={34} />;
    case "Under-Process":
      return <MdHourglassTop size={34} />;
    case "Ready-For-Pickup":
      return <MdRestaurantMenu size={34} />;
    case "Out-For-Delivery":
      return <MdLocalShipping size={34} />;
    case "Delivered":
      return <MdCheckCircle size={34} />;
      case "Canceled-By-User":
      return <MdDoNotDisturb size={34} />;
    default:
      return <MdHelpOutline size={34} />;
  }
};
