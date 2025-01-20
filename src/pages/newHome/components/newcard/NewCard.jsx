// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import { useDispatchCart, useCart } from "../../../../store/ContextReducer";
// import { useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   IconButton,
//   Box,
//   TextField,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import newcardbg01 from "../../../../assets/home/newcardbg01.png";
// import newcardbg02 from "../../../../assets/home/newcardbg02.png";
// import "../CardStyles.css";
// import './newcard.css'
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import img01 from '../../../../assets/home/products/product01.png'
// import img02 from '../../../../assets/home/products/product02.png'
// import img03 from '../../../../assets/home/products/product03.png'
// import img04 from '../../../../assets/home/products/product04.png'
// import img05 from '../../../../assets/home/products/product05.png'

// const product = {
//   name: "Sample Product",
//   description: "This is a sample product description.",
//   price: "29.99",
//   images: [img01, img02, img03, img04, img05],
// };

// export default function NewCard(props) {
//   const nav = useNavigate();
//   const dispatch = useDispatchCart();
//   const data = useCart();
//   const foodItem = props.foodItem;
//   const [qty, setQty] = useState(1);
//   const [size, setSize] = useState(""); // Define the size state
//   const [hover, setHover] = useState(false);

//   const handleAddToCart = async () => {
//     if (!localStorage.getItem("token")) {
//       alert("Please login to add items into cart");
//     } else {
//       let food = data.find((item) => item.id === foodItem._id);
//       if (food) {
//         if (food.size === size) {
//           await dispatch({
//             type: "UPDATE",
//             id: foodItem._id,
//             price: finalPrice,
//             qty,
//           });
//         } else {
//           await dispatch({
//             type: "ADD",
//             id: foodItem._id,
//             name: foodItem.itemname,
//             price: finalPrice,
//             qty,
//             size,
//             img: props.ImgSrc,
//           });
//         }
//       } else {
//         await dispatch({
//           type: "ADD",
//           id: foodItem._id,
//           name: foodItem.itemname,
//           price: finalPrice,
//           qty,
//           size,
//         });
//       }
//       alert(`Added item ${foodItem.itemname} to your cart`);
//     }
//   };

//   const handleIncrement = () => {
//     setQty(qty + 1);
//   };

//   const handleDecrement = () => {
//     if (qty > 1) {
//       setQty(qty - 1);
//     }
//   };

//   const finalPrice = qty * parseInt(foodItem.details[0].price || 0);

//   return (
//     <Card
//       className={`custom-card ${hover ? "hover" : ""}`}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         backgroundImage: `url(${hover ? newcardbg02 : newcardbg01})`,
//         transition: "background-image 0.3s ease-in-out",
//         borderRadius: "38px",
//       }}
//     >
//       <IconButton
//         className="navigate-btn"
//         onClick={() => {
//           nav(`/product/${foodItem._id}`);
//         }}
//         style={{ position: "absolute", top: "10px", right: "10px" }}
//       >
//         <ArrowForwardIosIcon />
//       </IconButton>
//       {/* <div className="card-media"> */}

// <div>
//       <Swiper
//         className="product-image-swiper"
//         style={{ height: '450px',width:'250px', borderRadius: '10px', overflow: 'hidden'}}
//       >
//         {product.images.map((image, index) => (
//           <SwiperSlide key={index}>
//             <img src={image} alt={`Product ${index + 1}`} className="card-media" />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//       </div>
//       <CardContent className="card-content">
//         <Typography variant="h5" component="div" className="card-title pt-2">
//           {foodItem.itemname}
//         </Typography>
//         <Typography
//           variant="body2"
//           color="textSecondary"
//           className="card-description"
//         >
//           {foodItem.description}
//         </Typography>
//         <Box className="action-section">
//           <Typography
//             variant="h6"
//             component="div"
//             className="price"
//             style={{ fontSize: "36px", fontFamily: "Arial", fontWeight: "700" }}
//           >
//             ₹{finalPrice}
//           </Typography>
//           <Box className="quantity-controls">
//             <IconButton onClick={handleDecrement}>
//               <RemoveIcon sx={{ color: "#FD7E4B" }} />
//             </IconButton>
//             <TextField
//               value={qty}
//               sx={{ color: "black", fontWeight: "bold", fontSize: "50px" }}
//               inputProps={{ readOnly: true }}
//               className="quantity-input"
//             />
//             <IconButton onClick={handleIncrement}>
//               <AddIcon sx={{ color: "#FD7E4B" }} />
//             </IconButton>
//           </Box>
//         </Box>
//         <Button
//           variant="contained"
//           className={`add-to-cart-btn ${hover ? "show" : ""}`}
//           sx={{
//             backgroundColor: "#FD7E4B",
//             "&:hover": {
//               backgroundColor: "#FD7E4D",
//             },
//           }}
//           onClick={handleAddToCart}
//         >
//           Add to Cart hii
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay'; // Import Swiper autoplay styles
import SwiperCore, { Autoplay } from 'swiper';
import { useDispatchCart, useCart } from "../../../../store/ContextReducer";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
// import newcardbg01 from "../../../../assets/home/newcardbg01.png";
// import newcardbg02 from "../../../../assets/home/newcardbg02.png";
import "../CardStyles.css";
import './newcard.css'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import img01 from '../../../../assets/home/products/product01.png'
// import img02 from '../../../../assets/home/products/product02.png'
// import img03 from '../../../../assets/home/products/product03.png'
// import img04 from '../../../../assets/home/products/product04.png'
// import img05 from '../../../../assets/home/products/product05.png'
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

SwiperCore.use([Autoplay]);

const product = {
  name: "Sample Product",
  description: "This is a sample product description.",
  price: "29.99",
  // images: [img01, img02, img03, img04, img05],
};

export default function NewCard(props) {
  const nav = useNavigate();
  const dispatch = useDispatchCart();
  const data = useCart();
  const foodItem = props.foodItem;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });
  }, []);

  const handleAddToCart = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please login to add items into cart");
    } else {
      let food = data.find((item) => item.id === foodItem._id);
      if (food) {
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            id: foodItem._id,
            price: finalPrice,
            qty,
          });
        } else {
          await dispatch({
            type: "ADD",
            id: foodItem._id,
            name: foodItem.itemname,
            price: finalPrice,
            qty,
            size,
            img: props.ImgSrc,
          });
        }
      } else {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.itemname,
          price: finalPrice,
          qty,
          size,
        });
      }
      alert(`Added item ${foodItem.itemname} to your cart`);
    }
  };

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const finalPrice = qty * parseInt(foodItem.details[0].price || 0);

  // const handleImageClick = (imageSrc) => {
  //   const lightbox = GLightbox({
  //     elements: [
  //       {
  //         href: imageSrc,
  //         type: 'image',
  //       },
  //     ],
  //   });
  //   lightbox.open();
  // };

  return (
    <Card
      className={`custom-card ${hover ? "hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        // backgroundImage: `url(${hover ? newcardbg02 : newcardbg01})`,
        transition: "background-image 0.3s ease-in-out",
        borderRadius: "38px",
      }}
    >
      <IconButton
        className="navigate-btn"
        onClick={() => {
          nav(`/product/${foodItem._id}`);
        }}
        style={{ position: "absolute", top: "10px", right: "10px" }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      <Swiper
        className="product-image-swiper"
        style={{ height: '450px', width: '250px', borderRadius: '10px', overflow: 'hidden' }}
        autoplay={{ delay: 3000 }} // Enable autoplay with a delay of 3 seconds
      >
        {/* {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Product ${index + 1}`}
              className="card-media"
              onClick={() => handleImageClick(image)}
            />
          </SwiperSlide>
        ))} */}
      </Swiper>

      <CardContent className="card-content">
        <Typography variant="h5" component="div" className="card-title pt-2">
          {foodItem.itemname}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className="card-description"
        >
          {foodItem.description}
        </Typography>
        <Box className="action-section">
          <Typography
            variant="h6"
            component="div"
            className="price"
            style={{ fontSize: "36px", fontFamily: "Arial", fontWeight: "700" }}
          >
            ₹{finalPrice}
          </Typography>
          <Box className="quantity-controls">
            <IconButton onClick={handleDecrement}>
              <RemoveIcon sx={{ color: "#FD7E4B" }} />
            </IconButton>
            <TextField
              value={qty}
              sx={{ color: "black", fontWeight: "bold", fontSize: "50px" }}
              inputProps={{ readOnly: true }}
              className="quantity-input"
            />
            <IconButton onClick={handleIncrement}>
              <AddIcon sx={{ color: "#FD7E4B" }} />
            </IconButton>
          </Box>
        </Box>
        <Button
          variant="contained"
          className={`add-to-cart-btn ${hover ? "show" : ""}`}
          sx={{
            backgroundColor: "#FD7E4B",
            "&:hover": {
              backgroundColor: "#FD7E4D",
            },
          }}
          onClick={handleAddToCart}
        >
          Add to Cart hii
        </Button>
      </CardContent>
    </Card>
  );
}

