// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import fr from "../../assets/fr.png";

// const HomeModal = () => {
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setShowModal(true);
//     }, 10000); 

//     return () => clearInterval(intervalId); 
//   }, []);

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div  style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:"80%"}}>
     
//      <Modal
//   isOpen={showModal}
//   onRequestClose={closeModal}

//   contentLabel="Example Modal"
//   style={{
//     overlay: {
//       backgroundColor: 'rgba(0, 0, 0, 0.5)' // Background color of the overlay
//     },
//     content: {
//       height: '70%', // Height of the modal
//       width: '60%', // Width of the modal
//       margin: 'auto' ,
//       backgroundColor:"orange",
//       position:"relative",
//       marginTop:"100px"// Center the modal horizontally
//     }
//   }}


// >
//  <img src={fr} alt="frnachise" style={{width:"90%",height:"100%",objectFit:"contain"}}/>
//  <button onClick={closeModal} style={{position:"absolute",top:"0px",right:"0px",borderRadius:"20px",fontWeight:"bolder",backgroundColor:"transparent"}}> X </button>
// </Modal>

//     </div>
//   );
// };

// export default HomeModal;



import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import fr from "../../assets/fr.png";

const HomeModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalDisplayed, setModalDisplayed] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!modalDisplayed) {
        setShowModal(true);
        setModalDisplayed(true);
      }
    }, 10000); 

    return () => clearInterval(intervalId); 
  }, [modalDisplayed]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ zIndex:"-1000",display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "80%" }}>
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)' // Background color of the overlay
          },
          content: {
            height: '70%', // Height of the modal
            width: '60%', // Width of the modal
            margin: 'auto',
            backgroundColor: "orange",
            position: "relative",
            marginTop: "100px" // Center the modal horizontally
          }
        }}
      >
          <h5 style={{textAlign:"center"}}>Interested in joining our franchise family? Let's talk! For franchise inquiries, we're just a message away. Reach out to us today and explore the exciting possibilities of partnering with us.</h5>
         <div style={{display:"flex",justifyContent:"space-around",alignItems:"center",flexWrap:"wrap"}}> <a href="mailto:sales@thejaavapot.com">  <p style={
                  {fontSize:"1rem",color:"black",textDecorationStyle:"none",fontWeight:"bold"}
                } >
                Mail us : sales@thejaavapot.com  </p> </a>

                <a href="tel:7989355998"> <p style={ {fontSize:"1rem",color:"black",textDecorationStyle:"none",fontWeight:"bold"}}> Call us: 7989355998</p> </a>  

       </div>
        <img src={fr} alt="franchise" style={{ width: "90%", height: "60%", objectFit: "contain" }} />
        <button onClick={closeModal} style={{ position: "absolute", top: "0px", right: "0px", borderRadius: "20px", fontWeight: "bolder", backgroundColor: "transparent" }}> X </button>
     
   
      </Modal>
    </div>
  );
};

export default HomeModal;
