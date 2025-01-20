import React,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import axios from "axios";
import { useDispatchCart } from "../../../store/ContextReducer"; // Context API or Redux for state management
import { useAuth } from "../../../store/AuthContext"; // Your auth management context (replace as needed)
import { googleMapAPI, ApiPath, ApiPathQuiz } from "../../../config";
import { useLocation } from "react-router-dom";
import "./cart.css";
import { myColors } from "../../../contants/Colors";
import { toast } from "react-toastify";
import { ArrowBackIosNew } from "@mui/icons-material";
import AdjustIcon from "@mui/icons-material/Adjust";


const OrderSummary = ({ route }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const { menuData, selectedAddress, totalAmount, discount, subtotal, GST } =
    location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(50);
  const [finalAmount, setFinalAmount] = useState(totalAmount);
  const { login, isAuthenticated, user } = useAuth();
  const [couponApplied, setCouponApplied] = useState(false);
  const [gameCouponApplied, setGameCouponApplied] = useState(false);
  const [couponData, setCouponData] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const COUPON_CODE = "DUSSEHRA_DEEPAVALI50";
  const FREE_DELIVERY_CODE = "FREEDELIVERY1000";
  const BUY_2_FREE_1 = "BUY2GET1FREE";
  const OFFER_END_DATE = new Date("2024-11-13T23:59:59");
  const [buy2Applied, setBuy2Applied] = useState(false);

  // console.log('menuData',menuData);
  

  if(!isAuthenticated){
    toast.error("Please login to order")
    navigate('/AuthPage')
  }

    // Fetch coupon data
    useEffect(() => {
      const fetchCoupon = async () => {
        // applyBuyOneGetOneOffer()
        // const userEmail = "harika.krishna99@gmail.com";
        const userEmail = localStorage.getItem("userEmail");
        try {
          const response = await axios.get(`${ApiPathQuiz}/${userEmail}`);
          // console.log(userEmail,response.data);
          if (response.data) {
            setCouponData(response.data);
            // console.log("786",response.data);
              
          }
        } catch (error) {
          console.error("Error fetching coupon data:", error);
        }
      };
  
      fetchCoupon();
    }, []);

  useEffect(() => {
    let discountedAmount = subtotal - couponDiscount;
    const roundedAmount = Math.round(discountedAmount + deliveryCharges+GST);
    setFinalAmount(roundedAmount);
  }, [subtotal, deliveryCharges, couponDiscount]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = ""; 
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const calculateDeliveryCharges = (distance, subtotal) => {
    let deliveryCharge = 0;
    let comboCategory = null;
    if (distance < 100) {
      deliveryCharge = 49;
    } else if (distance >= 100 && distance < 200) {
      deliveryCharge = 69;
    } else if (distance >= 200 && distance < 500) {
      deliveryCharge = 69;
    } else if (distance >= 500 && distance < 700) {
      deliveryCharge = 99;
    } else if (distance >= 700 && distance < 1000) {
      deliveryCharge = 99;
    } else if (distance >= 1000) {
      deliveryCharge = 99;
    }

  
    menuData.forEach((item) => {
      if (item.category.toLowerCase() === "combo-3") {
        deliveryCharge = 49;
        comboCategory = "combo-3";
      } else if (item.category.toLowerCase() === "combo-5") {
        deliveryCharge = 49;
        comboCategory = "combo-5";
      } else if (item.category.toLowerCase() === "combo-10") {
        deliveryCharge = 0;
        comboCategory = "combo-10";
      }
    });

    if (subtotal > 1000) {
      deliveryCharge = 0;
      toast.success(`Coupon applied! ${FREE_DELIVERY_CODE} You Saved Delivery Charges .`);
    }

    if (comboCategory) {
      toast.success(`Delivery charge for ${comboCategory} is ₹${deliveryCharge}.`);
    }

    return deliveryCharge;
  };

  const CurrentCafeLocation =
    "16-11-741/D/106, Shalivahana Nagar Malakpet, Hyderabad - 500036, Telangana";

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        const cafeLocation = CurrentCafeLocation;
        const userEmail = localStorage.getItem("userEmail");

        if (selectedAddress) {
          const userLocation = `${selectedAddress.Location}, ${selectedAddress.City}, ${selectedAddress.Pincode}`;

          const service = new window.google.maps.DistanceMatrixService();

          service.getDistanceMatrix(
            {
              origins: [cafeLocation],
              destinations: [userLocation],
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
              if (status === window.google.maps.DistanceMatrixStatus.OK) {
                const distanceInMeters =
                  response.rows[0].elements[0].distance.value;
                const distance = distanceInMeters / 1000;
                setDistance(distance);
                console.log("Distance:", distance);

                const deliveryCharge = calculateDeliveryCharges(
                  distance,
                  subtotal
                );
                setDeliveryCharges(deliveryCharge);
              } else {
                console.error("Error calculating distance:", status);
                setDeliveryCharges(50);
              }
            }
          );
        } else {
          setDeliveryCharges(50);
        }
      } catch (error) {
        console.error("Error fetching distance:", error);
        setDistance(0);
        setDeliveryCharges(50);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDistance();
  }, [selectedAddress]);

  const handleCheckOut = async (amount) => {
   
    try {
      // Check if the selected city is not Hyderabad
      if (selectedAddress.City.toLowerCase() !== "hyderabad") {
        // Check if any item in the cart is from the ReadyToEat category
        const hasReadyToEatItem = menuData.some(
          (item) => item.maincategory === "ReadyToEat"
        );
  
        if (hasReadyToEatItem) {
          // Show alert if ReadyToEat items are in the cart for non-Hyderabad locations
          toast.error(
            "Currently, ReadyToEat items are available only in Hyderabad. You can order ReadyToCook items for other locations."
          );
          return; // Prevent further execution
        }
      }
  
      const {
        data: { key },
      } = await axios.get(`${ApiPath}jaavapotpayment/api/getkey`);
      const {
        data: { order },
      } = await axios.post(`${ApiPath}jaavapotpayment/checkout`, { amount });
      
      // const {
      //   data: { order },
      // } = await axios.post(`${ApiPath}jaavapotpayment/checkout`, 1);
  
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Jaavapot",
        description: "Food ordering",
        order_id: order.id,
        handler: async function (response) {
          let userEmail = localStorage.getItem("userEmail");
          console.log("response",response);
          const{razorpay_order_id,razorpay_payment_id,
            razorpay_signature
          } =response
          const paymentDetail={
            totalAmount:amount,
            orderId:razorpay_order_id,
            paymentId:razorpay_payment_id,
            paymentSignature:razorpay_signature
          }
          let responses = await axios.post(`${ApiPath}jaavapotorders/api/orders`, {
            order_data: [menuData, selectedAddress,paymentDetail],
            email: userEmail,
          });
  
          let responseToKitchen = await axios.post(
            `${ApiPath}jaavapotemailnotification/send-email`,
            {
              // emailid: ["orders@thejaavapot.com","haseelaboina@pagoanalytic.com","haseelaboina@thejaavapot.com"],
              emailid: "haseelaboina@pagoanalytics.com",
              order_data: [menuData, selectedAddress],
            }
          );
  
          if (responses.status === 200 && responseToKitchen.status === 200) {
            dispatch({ type: "DROP" });
            toast.success(
              "Your Order is Successfully Placed and will be delivered soon."
            );
            updateStatusToInactive()
            navigate("/orders");
          }
        },
        prefill: {
          name: selectedAddress.name,
          email: selectedAddress.delivery_email,
          contact: selectedAddress.delivery_phone,
        },
        notes: {
          city: selectedAddress.City,
          address: selectedAddress.Location,
          pincode: selectedAddress.Pincode,
          landmark: selectedAddress.Landmark,
        },
        theme: { color: "#FD7E4B" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  const isComboOrSubscription = menuData.some(
    (item) =>
      item.maincategory.toLowerCase() === "combos" ||
      item.maincategory.toLowerCase() === "subscriptions"
  );
  
  const applyBuy2Get1FreeOffer = () => {
    // console.log("Menu Data:", menuData);
    if (isComboOrSubscription) {
      toast.error(
        "Buy 2 Get 1 Free offer is not applicable for Combos or Subscriptions."
      );
      return;
    }
    // Calculate total quantity of all products
    const totalQty = menuData.reduce((sum, item) => sum + item.qty, 0);
  
    if (totalQty >= 3) {
      // Calculate the discount amount (price of one unit of the cheapest item)
      const cheapestItem = menuData.reduce((minItem, item) => 
        item.basicPrice < minItem.basicPrice ? item : minItem, 
        menuData[0]
      );
  
      // Apply the discount (price of one unit of the cheapest item)
      setCouponDiscount(cheapestItem.basicPrice);
      toast.success(`Buy 2 Get 1 Free offer applied! Discount: ₹${cheapestItem.basicPrice}`);
      setBuy2Applied(true);
    } else {
      // Notify user if the condition isn't met
      toast.info("Add at least 3 products to avail this offer");
    }
  };
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

   // Combining both coupons if needed
const applyQuizCoupons = () => {
  // const currentDate = new Date();
  let discountedSubtotal = subtotal; // Start with the original subtotal

  // if (currentDate <= OFFER_END_DATE) {
    // First apply the 50% discount
    const firstDiscount = discountedSubtotal * 0.1;
    discountedSubtotal -= firstDiscount;

    // Then apply the 20% game coupon discount
    // const secondDiscount = discountedSubtotal * 0.2;
    // discountedSubtotal -= secondDiscount;

    // Calculate the total discount applied
    setCouponDiscount(subtotal - discountedSubtotal);

    // Calculate the final amount including any delivery charges
    // setFinalAmount(discountedSubtotal + deliveryCharges);

    setCouponApplied(true);
    setGameCouponApplied(true);
    toast.success("10% discounts applied successfully!");
 

};
 
  const updateStatusToInactive = async () => {
    if (!gameCouponApplied) {
      console.log('Game coupon is not applied, status update skipped.');
      return; // Exit the function if gameCouponApplied is not true
    }
    try {
      const response = await axios.put(`${ApiPathQuiz}/${couponData._id}/status`, {
        status: 'inactive',
      });
     
    } catch (error) {
      console.error('Error updating status:', error);
      // alert('An error occurred while updating the status.');
    }
  };
  // updateStatusToInactive()
  

  return (
    <div className="my" style={{ backgroundColor: "#FDF0DD" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p
          style={{
            fontWeight: 700,
            fontFamily: "Arial",
            fontSize: "36px",
            fontStyle: "italic",
            color: "#FD7E4B",
          }}
        >
          Order Summary
        </p>
        <div
          onClick={() => navigate(-1)}
          //  onClick={()=> navigate('/milletproducts')}
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            backgroundColor: "#FF9A7233",
            padding: "10px",
            borderRadius: "15px",
          }}
        >
          <ArrowBackIosNew style={{ color: "#000", fontSize: "20px" }} />
          <span
            style={{
              marginLeft: "8px",
              fontSize: "16px",
              color: "#0D0D0D",
              fontWeight: 400,
              fontFamily: "Arial",
            }}
          >
            Back To Cart
          </span>
        </div>
      </div>
      {menuData.length === 0 ? (
        <div className="empty-cart">
          <p>Your Cart is Empty!</p>
        </div>
      ) : (
        <div className="menu-list">
          <div>
            {menuData.length > 0 && (
              <div className="cart-headings">
                <div className="heading-image">
                  <strong>Picture</strong>
                </div>
                <div className="heading-name">
                  <strong>Name</strong>
                </div>
                <div className="heading-base-price">
                  <strong>Base Price</strong>
                </div>
                {/* <div className="heading-quantity"><strong>Quantity</strong></div> */}
                <div className="heading-price">
                  <strong>Price</strong>
                </div>
                <div className="heading-tax">
                  <strong>Other</strong>
                </div>
                {/* <div className="heading-tax"><strong>Tax (18%)</strong></div> */}
                <div className="heading-total">
                  <strong>Total</strong>
                </div>
              </div>
            )}

            {menuData.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="heading-image">
                  <img src={item.img} alt={item.name} className="item-image" />
                </div>
                <div className="heading-name">
                  <h4 className="valueStylesName">{item.name}</h4>
                </div>
                <div className="heading-base-price">
                  <p className="valueStyles">₹{item.basicPrice}</p>
                </div>

                <div className="heading-price">
                  <p className="valueStyles">₹ {item.basicPrice * item.qty}</p>
                </div>
                <div className="heading-tax">
                  <p className="valueStyles">
                    ₹ {(item.basicPrice * item.qty * 0.18).toFixed(2)}
                  </p>
                </div>
                <div className="heading-total">
                  <p className="valueStyles">
                    ₹ {(item.basicPrice * item.qty * 1.18).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="address-container">
        <p
          style={{
            fontWeight: 700,
            fontFamily: "Arial",
            fontSize: "36px",
            fontStyle: "italic",
            color: "#FD7E4B",
          }}
        >
          Delivery Address
        </p>
        {selectedAddress ? (
          <div className="address-item" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <p>{selectedAddress.name}</p>
              <p>{`${selectedAddress.Location}, ${selectedAddress.City}, ${selectedAddress.State} - ${selectedAddress.Pincode}`}</p>
              <p>{`Phone: ${selectedAddress.delivery_phone}`}</p>
              {selectedAddress.delivery_email && (
                <p>{`Email: ${selectedAddress.delivery_email}`}</p>
              )}
            </div>
            <div className="icon-container">
    <AdjustIcon sx={{ color: "#F67939", fontSize: "50px" }} />
  </div>
          </div>
        ) : (
          <p>No Address Selected</p>
        )}
      </div>

      <div className="summary-box">
        <div className="summary-row">
          <p>Subtotal</p>
          <p>{subtotal} ₹</p>
        </div>
        <div className="summary-row">
          <p>Delivery Charge</p>
          <p>{deliveryCharges} ₹</p>
        </div>
        <div className="summary-row">
          <p>Other</p>
          <p>{GST.toFixed(2)} ₹</p>
        </div>
        <div className="summary-row">
          <p>Discount</p>
          <p>- {couponDiscount.toFixed(2)} ₹</p>
          {/* <p>- {couponDiscount} ₹</p> */}
        </div>
        <div className="summary-row total-amount">
          <p
            style={{
              color: myColors.primaryOrange,
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            Total Amount
          </p>
          <p
            style={{
              color: myColors.primaryOrange,
              fontWeight: "700",
              fontSize: "24px",
            }}
          >
            {finalAmount} ₹
          </p>
        </div>
        {!gameCouponApplied && couponData?.status === "active" &&  (
           <div style={{display:'flex',justifyContent:'center'}}>
           <button 
  style={{
   display: 'flex', 
  //  justifyContent: 'space-between', 
   alignItems: 'center', 
   fontSize: '14px', 
   fontWeight: '400', 
   borderRadius: '20px', 
   maxWidth: '490px', 
   padding: '10px 40px', 
   width: '100%'
  }} 
  onClick={applyQuizCoupons}
  >
  <span style={{ marginRight: "" }}>Apply TJPDD24N Game Coupon for 10% Off</span>
  
  </button>
  </div>
)} 

{!buy2Applied &&  (
           <div style={{display:'flex',justifyContent:'center'}}>
           <button 
  style={{
   display: 'flex', 
   justifyContent: 'center', 
   alignItems: 'center', 
   fontSize: '20px', 
   fontWeight: '500', 
   borderRadius: '20px', 
   maxWidth: '490px', 
   padding: '10px 40px', 
   width: '100%'
  }} 
  onClick={applyBuy2Get1FreeOffer}
  >
  <span style={{ marginRight: "" }}>Apply Buy 2 Get 1 Free Offer</span>
  
  </button>
  </div>
)}     
        <div style={{display:'flex',justifyContent:'center'}}>
              <button 
    style={{
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      fontSize: '24px', 
      fontWeight: '600', 
      borderRadius: '20px', 
      maxWidth: '490px', 
      padding: '10px 40px', 
      width: '100%'
    }} 
    onClick={() => handleCheckOut(finalAmount)}
  >
    <span style={{ marginRight: 'auto' }}>Place Order</span>
    {buy2Applied && <span style={{ textDecoration: 'line-through' }}>₹{finalAmount+couponDiscount} </span>}
    <span style={{ marginLeft: '8px'}}>₹{finalAmount}</span>
  </button>
  </div>
      </div>
    </div>
  );
};

export default OrderSummary;
