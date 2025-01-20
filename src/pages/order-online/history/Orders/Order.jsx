import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { ApiPath } from "../../../../constants/Api";
// import { getItem } from "../../../../utils/asyncStorage";
import { MaterialIcons, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import { MdShoppingCart, MdCancel, MdHourglassTop, MdRestaurantMenu, MdLocalShipping, MdCheckCircle, MdHelpOutline, MdDoNotDisturb } from "react-icons/md";
import { ApiPath } from "../../../../config";
import './order.css'; // Create a CSS file for styles
import { ArrowBackIosNew } from "@mui/icons-material";


export default function Order() {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Active");
  const navigate = useNavigate();
  
  useEffect(() => {
    let pollingInterval;

    const fetchOrderData = async () => {
      try {
        const email = localStorage.getItem("userEmail");
        const response = await axios.get(
          `${ApiPath}jaavapotorders/api/orders/${email}`
        );
        setOrderData(response.data.reverse());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching order data:", error);
        setIsLoading(false);
      }
    };

    fetchOrderData();
    pollingInterval = setInterval(fetchOrderData, 5000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const filterOrders = (orders) => {
    switch (activeTab) {
      case "Active":
        return orders.filter(
          (order) => order.status !== "Delivered" && order.status !== "Rejected"&& order.status !== "Canceled-By-User"
        );
      case "Completed":
        return orders.filter((order) => order.status === "Delivered");
      case "Canceled":
        return orders.filter((order) => order.status === "Rejected"|| order.status === "Canceled-By-User");
      default:
        return orders;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours() % 12 || 12;
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${date.toLocaleDateString()} ${hours}:${String(
      date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")} ${ampm}`;
  };

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
        return "#FD7E4B";
    }
  };

  const getIconByStatus = (status) => {
    switch (status) {
      case "Order-Placed":
        return <MdShoppingCart size={34} />;
      case "Rejected":
        return <MdCancel size={34}  />;
      case "Under-Process":
        return <MdHourglassTop size={34}  />;
      case "Ready-For-Pickup":
        return <MdRestaurantMenu size={34}  />;
      case "Out-For-Delivery":
        return <MdLocalShipping size={34}  />;
      case "Delivered":
        return <MdCheckCircle size={34}  />;
        case "Canceled-By-User":
      return <MdDoNotDisturb size={34} />;
      default:
        return <MdHelpOutline size={34}  />;
    }
  };

  const renderOrderItem = (item) => {
    const firstItemImage = item.order_data[0][0].img;
    const status = item.status;
    const handleCardClick = () => {
      navigate(`/order-details/${item._id}`, { state: { orderData: item } });
    };
  
    return (
      <div className="ordered-card" onClick={handleCardClick}>
        <div className="ordered-cardContent">
          {firstItemImage && (
            <div className="ordered-imageContainer">
              <img src={firstItemImage} alt="Order item" className="ordered-image" />
            </div>
          )}
          <div className="ordered-textContainer">
            <p className="ordered-orderId">Order ID: {item._id}</p>
            <p className="ordered-itemCount">Number of Products: {item.order_data[0].length}</p>
            <div className="ordered-status">
              <span style={{ color: getColorByStatus(status) }}>{status}</span>
              <span className="ordered-statusIcon">{getIconByStatus(status)}</span>
            </div>
          </div>
          <p className="ordered-timestamp">
            {formatTimestamp(item.timestamp)}
          </p>
          <IoMdArrowForward size={30} className="ordered-arrowIcon" />
        </div>
      </div>
    );
  };
  
  
  return (
    <div className="ordered-container">
      <div className="orders-header"
      //  style={{display:'flex',justifyContent:'space-between',margin:'24px'}}
      >
      <p
        style={{
          fontWeight: 700,
          fontFamily: "Arial",
          fontSize: "36px",
          fontStyle: "italic",
          color: "#FD7E4B",
        }}
      >
        My Orders
      </p>  
      <div onClick={()=> navigate('/milletproducts')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer',   backgroundColor:'#FF9A7233',padding:'10px',borderRadius:'15px'}}>
      <ArrowBackIosNew style={{ color: '#000', fontSize: '20px' }} />
      <span style={{ marginLeft: '8px', fontSize: '16px', color: '#0D0D0D',   fontWeight: 400,
          fontFamily: "Arial",}}>Continue Shopping</span>
    </div>
      </div>
      {/* <IoMdArrowBack className="ordered-backButton" onClick={() => window.history.back()} />
      <h1 className="ordered-heading">My Orders</h1> */}
      <div className="ordered-tabContainer">
        <div className={`ordered-tab ${activeTab === "Active" && "ordered-activeTab"}`} onClick={() => toggleTab("Active")}>
          Active
        </div>
        <div className={`ordered-tab ${activeTab === "Completed" && "ordered-activeTab"}`} onClick={() => toggleTab("Completed")}>
          Completed
        </div>
        <div className={`ordered-tab ${activeTab === "Canceled" && "ordered-activeTab"}`} onClick={() => toggleTab("Canceled")}>
          Canceled
        </div>
      </div>

      {isLoading ? (
        <div className="ordered-loading">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {filterOrders(orderData).length === 0 ? (
            <div className="ordered-emptyContainer">
              <p className="ordered-emptyText">No Orders to Display</p>
            </div>
          ) : (
            filterOrders(orderData).map((item) => renderOrderItem(item))
          )}
        </>
      )}
    </div>
  );
}
