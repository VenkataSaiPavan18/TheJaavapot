// import React, { useState, useEffect } from 'react';
// import OrderStatusDropdown from './OrderStatusDropdown';
// import { ApiPath } from '../../config';
// import { FaPhone } from 'react-icons/fa';
// import "./styles/adminlogin.css";

// const ReceivedOrders = () => {
//   const [allOrders, setAllOrders] = useState([]);
//   const [displayedOrders, setDisplayedOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeOption, setActiveOption] = useState('');

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     fetch(`${ApiPath}jaavapotorders/api/orders`)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setAllOrders(data);
//         setLoading(false);
//         // Initial call to display orders based on the current activeOption
//         filterOrders(activeOption);
//       })
//       .catch(error => {
//         setError('Error fetching orders. Please try again later.');
//         setLoading(false);
//         console.error('Error fetching orders:', error);
//       });
//   }, [activeOption]);

//   const handleDisplayOptionChange = option => {
//     setActiveOption(option);
//     filterOrders(option); // Perform filtering here instead of in useEffect
//   };

//   // const handleDisplayOptionChange = option => {
//   //   if (option === activeOption) {
//   //     // If the selected option is already active, reset activeOption to trigger re-selection
//   //     setActiveOption('');
//   //     setTimeout(() => {
//   //       setActiveOption(option); // Set the desired option after a short delay
//   //     }, 2000);
//   //   } else {
//   //     setActiveOption(option); // Set the selected option directly if it's different
//   //   }
//   // };

//   const filterOrders = option => {
//     const today = new Date();
//     const filteredOrders = allOrders.filter(order => {
//       const orderDate = new Date(order.timestamp);
//       const isToday = orderDate.getDate() === today.getDate() &&
//                      orderDate.getMonth() === today.getMonth() &&
//                      orderDate.getFullYear() === today.getFullYear();

//       switch (option) {
//         case 'all':
//           return true;
//         case 'todayDelivered':
//           return isToday && order.status === 'Delivered';
//         case 'new':
//           return order.status === 'Order-Placed';
//         case 'under-process':
//           return order.status === 'Under-Process';
//         case 'ready-for-pickup':
//           return order.status === 'Ready-For-Pickup';
//         case 'out-for-delivery':
//           return order.status === 'Out-For-Delivery';
//         case 'delivered': // Use this only for all delivered orders, not just today's
//           return order.status === 'Delivered';
//         default:
//           return true;
//       }
//     });
//     setDisplayedOrders(filteredOrders);
//   };

//   const formatTimestamp = timestamp => {
//     return new Date(timestamp).toLocaleString('en-IN');
//   };

//   function handleCall(phoneNo) {
//     // Remove non-numeric characters from phone number
//     const cleanedPhoneNumber = phoneNo.replace(/\D/g, '');
//     // Construct tel: URI
//     const telUri = `tel:${cleanedPhoneNumber}`;
//     // Open the URI to initiate the call
//     window.open(telUri);
//   }

//   const switchTab = status => {
//     switch (status) {
//       case 'Under-Process':
//         handleDisplayOptionChange('under-process');
//         break;
//       case 'Ready-For-Pickup':
//         handleDisplayOptionChange('ready-for-pickup');
//         break;
//       case 'Out-For-Delivery':
//         handleDisplayOptionChange('out-for-delivery');
//         break;
//       case 'Delivered':
//         handleDisplayOptionChange('todayDelivered');
//         break;
//       default:
//         break;
//     }
//   };

//   function handleCall(phoneNo) {
//     // Remove non-numeric characters from phone number
//     const cleanedPhoneNumber = phoneNo.replace(/\D/g, '');
//     // Construct tel: URI
//     const telUri = `tel:${cleanedPhoneNumber}`;
//     // Open the URI to initiate the call
//     window.open(telUri);
//   }

//   return (
//     <div style={{ width:"",backgroundColor: "rgba(189, 152, 109,0.5)", display: "flex", justifyContent: "start", alignItems: "center", margin: "20px", padding: "20px", borderRadius: "20px", boxShadow: "2px 2px 2px 2px black" }}>
//       <div style={{width:"100%"}}>
//         <div style={{display:'flex',justifyContent:'space-between',width:"100%"}}>
//           <button className="btn btn-secondary" style={{ boxShadow: activeOption === 'all' ? '0px 4px 6px 0px #e86c1a' : '' }}  onClick={() => handleDisplayOptionChange('all')}>All Orders</button>
//           <button className="btn btn-secondary"  style={{ boxShadow: activeOption === 'delivered' ? '0px 4px 6px 0px #e86c1a' : '' }} onClick={() => handleDisplayOptionChange('delivered')}>All Delivered Orders</button>
//         </div>
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center",width:"100%" }}>
//           <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center",width:"",margin:"10px" }}>
//             {/* Add ClickableArea components for each tab */}
//             <ClickableArea active={activeOption === 'new'} onClick={() => handleDisplayOptionChange('new')}>
//              New
//               {activeOption === 'new' && (

//          <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>

//       )}
//             </ClickableArea>
//             <ClickableArea active={activeOption === 'under-process'} onClick={() => handleDisplayOptionChange('under-process')}>
//               Under-Process
//               {activeOption === 'under-process' && (

//                 <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>

//              )}
//             </ClickableArea>
//             <ClickableArea active={activeOption === 'ready-for-pickup'} onClick={() => handleDisplayOptionChange('ready-for-pickup')}>
//             Ready-For-Pickup
//               {activeOption === 'ready-for-pickup' && (

//                 <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>

//              )}
//             </ClickableArea>
//             <ClickableArea active={activeOption === 'out-for-delivery'} onClick={() => handleDisplayOptionChange('out-for-delivery')}>
//             Out-For-Delivery
//               {activeOption === 'out-for-delivery' && (

//                 <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>

//              )}
//             </ClickableArea>
//             <ClickableArea  active={activeOption === 'todayDelivered'} onClick={() => handleDisplayOptionChange('todayDelivered')}>
//             Today's Delivered Orders
//               {activeOption === 'todayDelivered' && (

//                 <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>

//              )}
//             </ClickableArea>
//           </div>
//         </div>
//         {loading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//         {!loading && !error && displayedOrders.length === 0 && (
//           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
//             <p style={{ fontSize: '24px', color:"rgba(247, 91, 7)",fontWeight:"bolder",textAlign:"center" }}>
//               Welcome! <span style={{color:"black"}}> View and manage </span> the status of all orders.
//               <br/>
//               Stay organized with <span style={{color:"black"}}>real-time updates </span> on <span style={{color:"black"}}> new, under-process, ready-for-pickup, out-for-delivery </span> and <span style={{color:"black"}}> delivered orders.</span>
//             </p>

//           <p style={{fontWeight:"bold"}}>Click on <span style={{ color:"rgba(247, 91, 7)",}}>'New'</span> to view recently received orders.</p>
//             <img src="https://cdn.iconscout.com/icon/free/png-256/free-order-status-1851726-1569380.png?f=webp" alt="No New Orders" style={{ maxWidth: '100%', height: 'auto' }} />

//           </div>
//         )}
//         {!loading && !error && (
//           <ul>
//             {displayedOrders.map(order => (
//               <li key={order._id} style={{ backgroundColor: "rgba(189, 152, 109,0.5)", borderRadius: "20px", marginTop: "10px", padding: "10px", boxShadow: "2px 2px 2px 2px black" }}>
//                 <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
//                   <div>
//                     <p> <span style={{ fontWeight: "bold" }}>Order Received from: </span> {order.email}</p>
//                     <p> <span style={{ fontWeight: "bold" }}>Received at:</span>  {formatTimestamp(order.timestamp)}</p>
//                     <p style={{ fontWeight: "bold" }}>Order  Details</p>
//                   </div>
//                   <OrderStatusDropdown orderId={order._id} orderStatus={order.status} switchTab={switchTab} />
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'row' }}>
//                   {/* First Card: Ordered Items */}
//                   <div style={{ backgroundColor: 'white', padding: '20px', marginRight: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//                     <h6 style={{ fontWeight: "bold",textAlign:'center' }}>Ordered Items</h6>
//                     <ol>
//                       {order.order_data.map((item, index) => (
//                         <div key={index}>
//                           {Array.isArray(item) ? (
//                             item.map((subItem, subIndex) => (
//                               <div key={subIndex} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px',backgroundColor:'#ff9933',padding:'5px',borderRadius:'5px' }}>
//                                 <li style={{ fontWeight: "bold" }}>{subItem.name} - X {subItem.qty} - ₹: {subItem.price}</li>
//                               </div>
//                             ))
//                           ) : null}
//                         </div>
//                       ))}
//                     </ol>
//                   </div>
//                   {/* Second Card: Delivery Address */}
//                   <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
//                     <h6 style={{ fontWeight: "bold",textAlign:'center' }}>Delivery Address: </h6>
//                     <div>
//                       {order.order_data.map((item, index) => (
//                         <div key={index}>
//                           {!Array.isArray(item) ? (
//                             <>
//                               <p><span style={{ fontWeight: "bold" }}>Name:</span> {item.name},</p>
//                               <p><span style={{ fontWeight: "bold" }}>Email:</span> {item.delivery_email},</p>
//                               <p><span style={{ fontWeight: "bold" }}>Phone No:</span> {item.delivery_phone},</p>
//                               <p><span style={{ fontWeight: "bold" }}>Location:</span> {item.Location},</p>
//                               <p><span style={{ fontWeight: "bold" }}>City:</span> {item.City},</p>
//                               <p><span style={{ fontWeight: "bold" }}>Pincode:</span> {item.Pincode},</p>
//                               <button style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', fontWeight: 'bold', marginTop: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)' }} onClick={() => handleCall(item.phoneNo)}>
//                                 <FaPhone style={{ marginRight: '5px' }} /> Call
//                               </button>
//                             </>
//                           ) : null}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// const ClickableArea = ({ children, active, onClick }) => {
//   return (
//     <div style={{ position: "relative" }}>
//       <div
//         className="clickable-area"
//         style={{
//           background: active ? "rgba(247, 91, 7)" : "transparent",
//           padding:'10px ',
//           borderRadius: "5px",
//           margin:"10px",
//           cursor: "pointer",
//           fontSize:'19px',
//           fontWeight:"bold",
//           textAlign:"center",
//           color: active ? "white" : "black",
//           display:"flex",
//           justifyContent:"center",
//           alignItems:"center"
//         }}
//         onClick={onClick}
//       >
//         {children}
//       </div>

//       <div
//         className="vertical-separator"
//         style={{
//           position: "absolute",
//           height: "50%",
//           left: 0,
//           top: 10,
//           width: "1px",
//           background: "gray",
//         }}
//       ></div>
//     </div>
//   );
// };

// export default ReceivedOrders;

import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderStatusDropdown from "./OrderStatusDropdown";
import { ApiPath } from "../../config";
import { FaPhone } from "react-icons/fa";
import "./styles/adminlogin.css";

const ReceivedOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeOption, setActiveOption] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`${ApiPath}jaavapotorders/api/orders`)
      .then((response) => {
        const data = response.data;
        setAllOrders(data);
        setLoading(false);
        filterOrders(activeOption); // Filter orders initially based on activeOption
      })
      .catch((error) => {
        setError("Error fetching orders. Please try again later.");
        setLoading(false);
        console.error("Error fetching orders:", error);
      });
  }, [activeOption]);

  const handleDisplayOptionChange = (option) => {
    setActiveOption(option);
    filterOrders(option); // Perform filtering here instead of in useEffect
  };

  const filterOrders = (option) => {
    const today = new Date();
    const filteredOrders = allOrders.filter((order) => {
      const orderDate = new Date(order.timestamp);
      const isToday =
        orderDate.getDate() === today.getDate() &&
        orderDate.getMonth() === today.getMonth() &&
        orderDate.getFullYear() === today.getFullYear();

      switch (option) {
        case "all":
          return true;
        case "todayDelivered":
          return isToday && order.status === "Delivered";
        case "new":
          return order.status === "Order-Placed";
        case "under-process":
          return order.status === "Under-Process";
        case "ready-for-pickup":
          return order.status === "Ready-For-Pickup";
        case "out-for-delivery":
          return order.status === "Out-For-Delivery";
        case "delivered":
          return order.status === "Delivered";
        default:
          return true;
      }
    });
    setDisplayedOrders(filteredOrders);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-IN");
  };

  const handleCall = (phoneNo) => {
    const cleanedPhoneNumber = phoneNo.replace(/\D/g, "");
    const telUri = `tel:${cleanedPhoneNumber}`;
    window.open(telUri);
  };

  const switchTab = (status) => {
    switch (status) {
      case "Under-Process":
        handleDisplayOptionChange("under-process");
        break;
      case "Ready-For-Pickup":
        handleDisplayOptionChange("ready-for-pickup");
        break;
      case "Out-For-Delivery":
        handleDisplayOptionChange("out-for-delivery");
        break;
      case "Delivered":
        handleDisplayOptionChange("todayDelivered");
        break;
      default:
        break;
    }
  };

  const ClickableArea = ({ active, onClick, children }) => {
    const areaStyles = {
      padding: "10px 20px",
      margin: "5px",
      borderRadius: "10px",
      backgroundColor: active ? "#e86c1a" : "#fff",
      color: active ? "#fff" : "#000",
      cursor: "pointer",
      boxShadow: active ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
      border: "1px solid #e86c1a",
      transition: "all 0.3s ease",
    };

    return (
      <div style={areaStyles} onClick={onClick}>
        {children}
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(189, 152, 109,0.5)",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        margin: "20px",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "2px 2px 2px 2px black",
      }}
    >
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            className="btn btn-secondary"
            style={{
              boxShadow:
                activeOption === "all" ? "0px 4px 6px 0px #e86c1a" : "",
            }}
            onClick={() => handleDisplayOptionChange("all")}
          >
            All Orders
          </button>
          <button
            className="btn btn-secondary"
            style={{
              boxShadow:
                activeOption === "delivered" ? "0px 4px 6px 0px #e86c1a" : "",
            }}
            onClick={() => handleDisplayOptionChange("delivered")}
          >
            All Delivered Orders
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <ClickableArea
              active={activeOption === "new"}
              onClick={() => handleDisplayOptionChange("new")}
            >
              New
              {activeOption === "new" && (
                <img
                  className="zoom-effect"
                  src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png"
                  alt="refresh"
                  style={{ marginLeft: "4px", height: "20px", width: "20px" }}
                />
              )}
            </ClickableArea>
            <ClickableArea
              active={activeOption === "under-process"}
              onClick={() => handleDisplayOptionChange("under-process")}
            >
              Under-Process
              {activeOption === "under-process" && (
                <img
                  className="zoom-effect"
                  src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png"
                  alt="refresh"
                  style={{ marginLeft: "4px", height: "20px", width: "20px" }}
                />
              )}
            </ClickableArea>
            <ClickableArea
              active={activeOption === "ready-for-pickup"}
              onClick={() => handleDisplayOptionChange("ready-for-pickup")}
            >
              Ready-For-Pickup
              {activeOption === 'ready-for-pickup' && (             
                <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>
             )}
            </ClickableArea>
            <ClickableArea
              active={activeOption === "out-for-delivery"}
              onClick={() => handleDisplayOptionChange("out-for-delivery")}
            >
              Out-For-Delivery
              {activeOption === 'out-for-delivery' && (             
                <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>
             )}
            </ClickableArea>
            <ClickableArea
              active={activeOption === "todayDelivered"}
              onClick={() => handleDisplayOptionChange("todayDelivered")}
            >
              Today's Delivered Orders
              {activeOption === 'todayDelivered' && (             
                <img className='zoom-effect' src="https://res.cloudinary.com/dyylqn8vb/image/upload/v1710782863/ref-removebg-preview_gc2vvr.png" alt="refresh" style={{marginLeft:"4px",height:"20px",width:"20px",}}/>
             )}
            </ClickableArea>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && displayedOrders.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                color: "rgba(247, 91, 7)",
                fontWeight: "bolder",
                textAlign: "center",
              }}
            >
              Welcome! <span style={{ color: "black" }}>View and manage</span>{" "}
              the status of all orders.
              <br />
              Stay organized with{" "}
              <span style={{ color: "black" }}>real-time updates</span> on{" "}
              <span style={{ color: "black" }}>
                new, under-process, ready-for-pickup, out-for-delivery
              </span>{" "}
              and <span style={{ color: "black" }}>delivered orders.</span>
            </p>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/free-order-status-1851726-1569380.png?f=webp"
              alt="No New Orders"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        )}

        {!loading && !error && (
          <ul>
            {displayedOrders.map((order) => (
              <li
                key={order._id}
                style={{
                  backgroundColor: "rgba(189, 152, 109,0.5)",
                  borderRadius: "20px",
                  marginTop: "10px",
                  padding: "10px",
                  boxShadow: "2px 2px 2px 2px black",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Order Received from:{" "}
                      </span>{" "}
                      {order.email}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Received at: </span>{" "}
                      {formatTimestamp(order.timestamp)}
                    </p>
                    <p style={{ fontWeight: "bold" }}>Order Details</p>
                  </div>
                  <OrderStatusDropdown
                    orderId={order._id}
                    orderStatus={order.status}
                    switchTab={switchTab}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "row" }}>
                  {/* Ordered Items */}
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      marginRight: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h6 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Ordered Items
                    </h6>
                    <ol>
                      {order.order_data.map((item, index) => (
                        <div key={index}>
                          {Array.isArray(item) &&
                            item.map((subItem, subIndex) => (
                              <div
                                key={subIndex}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "5px",
                                  backgroundColor: "#ff9933",
                                  padding: "5px",
                                  borderRadius: "5px",
                                }}
                              >
                                <li style={{ fontWeight: "bold" }}>
                                  {subItem?.name} - X {subItem.qty} - ₹:{" "}
                                  {subItem.price}
                                </li>
                              </div>
                            ))}
                        </div>
                      ))}
                    </ol>
                  </div>

                  {/* Delivery Address */}
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <h6 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Delivery Address
                    </h6>

                    {order.order_data && order.order_data[1] ? (
                      <>
                        {/* <p><span style={{ fontWeight: "bold" }}>Id:</span>{order.order_data[1].Id}</p> */}
                        <p>
                          <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                          {order.order_data[1].name}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Delivery_phone:
                          </span>{" "}
                          {order.order_data[1].delivery_phone}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Landmark:</span>{" "}
                          {order.order_data[1].Landmark}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Address:</span>{" "}
                          {order.order_data[1].Location}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>City:</span>{" "}
                          {order.order_data[1].City}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Pincode:</span>{" "}
                          {order.order_data[1].Pincode}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>State:</span>{" "}
                          {order.order_data[1].State}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Delivery_email:
                          </span>{" "}
                          {order.order_data[1].delivery_email}
                        </p>
                        <p>
                          {/* <FaPhone />  */}
                          <button
                            style={{
                              backgroundColor: "#4CAF50",
                              color: "white",
                              border: "none",
                              borderRadius: "5px",
                              padding: "10px",
                              fontWeight: "bold",
                              marginTop: "10px",
                              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                            }}
                            onClick={() =>
                              handleCall(order.order_data[1].delivery_phone)
                            }
                          >
                            {" "}
                            <FaPhone style={{ marginRight: "5px" }} />{" "}
                            {order.order_data[1].delivery_phone}
                          </button>
                        </p>
                      </>
                    ) : (
                      <p>No payment details available.</p>
                    )}

                    {/* <p style={{ fontWeight: "bold" }}>{order.delivery_address?.name}</p>
                    <p>{order.delivery_address?.City}, {order.delivery_address?.Location}, {order.delivery_address?.Pincode}, {order.delivery_address?.State}</p>
                    <p>{order.delivery_address?.Landmark}</p> */}
                    {/* <p>
                      <FaPhone /> 
                      <button style={{ color: "blue" }} onClick={() => handleCall(order.delivery_address?.delivery_phone)}>{order.delivery_address?.delivery_phone}</button>
                    </p> */}
                  </div>

                  {/* Payment Information */}
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                      marginLeft: "20px",
                    }}
                  >
                    <h6 style={{ fontWeight: "bold", textAlign: "center" }}>
                      Payment Information
                    </h6>
                    {/* <p><span style={{ fontWeight: "bold" }}>Payment Method:</span> {order.}</p> */}
                    {/* <p><span style={{ fontWeight: "bold" }}>Total Amount:</span> ₹{order.totalAmount}</p>
                    <p><span style={{ fontWeight: "bold" }}>Payment Status:</span> {order.orderId}</p>
                    <p><span style={{ fontWeight: "bold" }}>Payment Status:</span> {order.paymentId}</p>
                    <p><span style={{ fontWeight: "bold" }}>Payment Status:</span> {order.paymentSignature}</p> */}

                    {order.order_data && order.order_data[2] ? (
                      <>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Total Amount:
                          </span>{" "}
                          ₹{order.order_data[2].totalAmount}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>Order ID:</span>{" "}
                          {order.order_data[2].orderId}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Payment ID:
                          </span>{" "}
                          {order.order_data[2].paymentId}
                        </p>
                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            Payment Signature:
                          </span>{" "}
                          {order.order_data[2].paymentSignature}
                        </p>
                      </>
                    ) : (
                      <p>No payment details available.</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReceivedOrders;
