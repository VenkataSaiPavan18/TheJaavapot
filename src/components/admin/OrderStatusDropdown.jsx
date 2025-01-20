import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ApiPath } from '../../config';

const OrderStatusDropdown = ({ orderId, orderStatus, switchTab }) => {
  const [selectedStatus, setSelectedStatus] = useState(orderStatus || '');
  const [timer, setTimer] = useState(0);
  const timerRef = useRef();
  const initialTime = 30 * 60 * 1000; // 30 minutes in milliseconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setSelectedStatus(orderStatus || '');
  }, [orderStatus]);
  

  const handleStatusChange = async (status) => {
    try {
      await axios.put(`${ApiPath}jaavapotorders/api/orders/${orderId}`, { status });
      setSelectedStatus(status);
      alert('Order status updated successfully');
      switchTab(status);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    if (selectedStatus === 'Under-Process') {
      handleStart();
    } else if (selectedStatus === 'Delivered') {
      handleStop();
    }
  }, [selectedStatus]);

  const startTimer = () => {
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      setTimer(elapsedTime);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      const startTime = localStorage.getItem('startTime');
      if (startTime) {
        const elapsedTime = Date.now() - parseInt(startTime);
        const remaining = initialTime - elapsedTime;
        if (remaining > 0) {
          setTimeRemaining(remaining);
        } else {
          setTimeRemaining(0);
          localStorage.removeItem('startTime');
          setIsRunning(false);
        }
      } else {
        localStorage.setItem('startTime', Date.now());
      }

      timer = setInterval(() => {
        setTimeRemaining(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsRunning(false);
            localStorage.removeItem('startTime');
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [initialTime, isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    localStorage.setItem('startTime', Date.now() - (initialTime - timeRemaining));
  };


  
  const getColorByStatus = (status) => {
    switch (status) {
      case 'Order-Placed':
        return '#dba80f';
      case 'Under-Process':
        return '#5cb1ed';
      case 'Ready-For-Pickup':
        return '#90ed1f';
      case 'Out-For-Delivery':
        return '#13ebbc';
      case 'Delivered':
        return '#32a31c';
      default:
        return 'white';
    }
  };

  return (
    <div style={{ padding: "5px", borderRadius: "10px", fontWeight: "bold" }}>
      <label htmlFor="orderStatus" style={{backgroundColor: getColorByStatus(selectedStatus),padding:"5px",borderRadius:"16px"}}>Order Status: {selectedStatus}</label>
     
      
      {selectedStatus === 'Order-Placed' && (
        <div>
          <button type="button" style={{ borderRadius: "20px", margin: "5px" }} onClick={() => handleStatusChange('Order-Cancelled-By-TJP')}>
            Reject
          </button>
          <button type="button" style={{ borderRadius: "20px", margin: "5px" }} onClick={() => handleStatusChange('Under-Process')}>
            Accept
          </button>
        </div>
      )}
      {selectedStatus === 'Under-Process' && (
        <div>
          <button type="button" style={{borderRadius: "20px", margin: "5px" }} onClick={() => handleStatusChange('Ready-For-Pickup')}>
          Ready-For-Pickup
          </button>
        </div>
      )}
      {selectedStatus === 'Ready-For-Pickup' && (
        <div>
          <button type="button" style={{ borderRadius: "20px", margin: "5px" }} onClick={() => handleStatusChange('Out-For-Delivery')}>
          Out-For-Delivery
          </button>
        </div>
      )}
      {selectedStatus === 'Out-For-Delivery' && (
        <div>
          <button type="button" style={{ borderRadius: "20px", margin: "5px" }} onClick={() => handleStatusChange('Delivered')}>
            Delivered
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderStatusDropdown;
