import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';


const Welcome = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/milletproducts');
  };

  return (
    <div style={styles.container}>
        {/* <EcoIcon style={styles.icon} /> */}
        {/* <FaLeaf style={styles.icon} /> */}
        <FaLeaf style={styles.icon} />
    
      <p style={styles.welcomeText}>Welcome to the world of Porridges and soups.</p>
      <p style={styles.offeringsText}>Offerings</p>
      <button style={styles.button} onClick={handleNavigate}>
        Offering
      </button>
    </div>
  );
};

// Custom styles using styled-components or inline styles
const styles = {
  container: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '100vh',
    marginBottom:'50px'
  },
  icon: {
    color: '#FD7E4B',
    backgroundColor: '#FFD5BF',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '94px',
    marginBottom:'25px'
  },
  welcomeText: {
    fontFamily: 'Inter',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '20px',
    color: '#363636',
  },
  offeringsText: {
    fontFamily: 'Inter',
    fontSize: '22px',
    fontWeight: '600',
    lineHeight: '20px',
    color: '#363636',
    borderBottom: '2px solid #363636',
    marginBottom: '20px',
  },
  button: {
    fontFamily: 'Inter',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '21.78px',
    textAlign: 'left',
    padding: '10px 20px',
    backgroundColor: '#FD7E4B',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Welcome;
