import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import posterImage from '../assets/img/event1.jpeg'; 
import "./PosterModal.css";

const PosterModal = ({ onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

//   useEffect(() => {
//     const hasSeenPoster = localStorage.getItem('hasSeenPoster');
//     if (hasSeenPoster) {
//       setShow(false);
//       onClose();
//     }
//   }, [onClose]);

//   const handleModalClose = () => {
//     localStorage.setItem('hasSeenPoster', 'true');
//     handleClose();
//   };

  return (
    
    <Modal show={show} onHide={handleClose} style={{backgroundColor:"transparent"}}  backdrop="static" keyboard={false}  centered className='modal-dialog'>
     
     <Modal.Footer style={{border:"0px"}} className='buttonevent'>
        <Button variant="danger" onClick={handleClose}
        className=""
        //  onClick={handleModalClose}
        style={{padding:"3px"}}

         >
          X
        </Button>
      </Modal.Footer>

      <Modal.Body className="text-center modal-body" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <img src={posterImage} alt="Event Poster" className='imgevent' style={{}}  />
        
      </Modal.Body>

    

    
    </Modal>
    
  );
};

export default PosterModal;
