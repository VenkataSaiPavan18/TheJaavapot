// // 13/12/24
// import React, { useState, useEffect } from "react";
// import { useDispatchCart, useCart } from "../../../store/ContextReducer";
// import { useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box, TextField } from '@mui/material';
// import { toast,ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import newcardbg01 from '../../../assets/home/newcardbg01.png';
// import newcardbg02 from '../../../assets/home/newcardbg02.png';
// import newcardbg03 from '../../../assets/home/christmass-card-bg.png';
// import './CardStyles.css';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import GLightbox from 'glightbox';
// import 'glightbox/dist/css/glightbox.css';
// import { myColors } from "../../../contants/Colors";

// export default function FoodCard({ foodItem, userCity }) {

//   // console.log("hello",props);
//   const nav = useNavigate();
//   const dispatch = useDispatchCart();
//   const data = useCart();
//   // const foodItem = props.foodItem;
//   // const { foodItem, userCity } = props;
//   const [qty, setQty] = useState(1);
//   const [size, setSize] = useState(""); // Define the size state
//   const [hover, setHover] = useState(false);
//   const [myCity, setMyCity] = useState('');

//   useEffect(() => {
//     // This will run every 2 seconds
//     const interval = setInterval(() => {
//       const city = localStorage.getItem("myCity");
//       if (city) {
//         setMyCity(city);
//         // console.log("270",city);
        
//       } else {
//       //  console.log('273');
       
//       }

//     }, 3000);

//     // Cleanup the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, [userCity]); //

//   // useEffect(() => {
//   //   console.log("City has changed:", userCity); // Debug to see the city update
//   //   setMyCity(userCity)
//   // }, [userCity]); 

//   useEffect(() => {
//     const lightbox = GLightbox({
//       touchNavigation: true,
//       loop: true,
//       autoplayVideos: true,
//     });
//   }, []);

//   const handleAddToCart = async () => {
//     console.log('297',foodItem);
    
//       const finalPrice = qty * parseInt(foodItem.details[0].price || 0);
//       const basicPrice =  parseInt(foodItem.details[0].price || 0);

//       if (foodItem.maincategory === "ReadyToEat") {
//         console.log("Checking city",userCity)
//         if (myCity && myCity.toLowerCase() === "hyderabad") {
//           addFoodToCart(finalPrice,basicPrice);
//         } else {
//           toast.error("We apologize, but we are currently only serving the Hyderabad location.");
//         }
//       } else if (foodItem.maincategory === "ReadyToCook") {
//         addFoodToCart(finalPrice,basicPrice);
//       }else if (foodItem.maincategory === "Combos") {
//         addFoodToCart(finalPrice,basicPrice);
//       }
//     // }
//   };

//   const addFoodToCart = async (finalPrice,basicPrice) => {
//     let food = data.find(item => item.id === foodItem._id);

//     if (food) {
//       if (food.size === size) {
//         await dispatch({
//           type: "UPDATE",
//           id: foodItem._id,
//           price: finalPrice,
//           qty,
//         });
//       } else {
//         await dispatch({
//           type: "ADD",
//           id: foodItem._id,
//           name: foodItem.itemname,
//           price: finalPrice,
//           qty,
//           size,
//           img: foodItem.imagepath,
//           basicPrice,
//           maincategory:foodItem.maincategory,
//           category:foodItem.category
//         });
//       }
//     } else {
//       await dispatch({
//         type: "ADD",
//         id: foodItem._id,
//         name: foodItem.itemname,
//         description: foodItem.description,
//         price: finalPrice,
//         qty,
//         size,
//         img: foodItem.imagepath,
//         basicPrice,
//         maincategory:foodItem.maincategory,
//         category:foodItem.category
//       });
//     }
//     toast.success(`Added item ${foodItem.itemname} to your cart`);
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

//   const handleImageClick = (imageSrc) => {
//     const lightbox = GLightbox({
//       elements: [
//         {
//           href: imageSrc,
//           type: 'image',
//         },
//       ],
//     });
//     lightbox.open();
//   };

//   return (
//     <>
//     <Card
//       className={`custom-card ${hover ? 'hover' : ''}`}
//       onMouseEnter={() => setHover(true)}
//       onMouseLeave={() => setHover(false)}
//       style={{
//         backgroundImage: `url(${hover ? newcardbg02 : newcardbg03})`,
//         transition: 'background-image 0.3s ease-in-out',
//         borderRadius: '26px'
//       }}
//     >
//       <IconButton
//         className="navigate-btn"
//         onClick={() => { nav(`/product/${foodItem._id}`); window.scrollTo(0, 0); }}

//         style={{ position: 'absolute', top: '10px', right: '10px' }}
//       >
//         <ArrowForwardIosIcon />
//       </IconButton>
//       <CardMedia
//         style={{ objectFit: 'contain',scale:"0.8" }}
//         component="img"
//         image={foodItem.imagepath}
//         title={foodItem.itemname}
//         className="card-media"
//         onClick={() => handleImageClick(foodItem.imagepath)}
//       />
//       <CardContent className="card-content"  sx={{padding:'0px'}}>
//         <Typography variant="h5" component="div" className="card-title pt-2" sx={{color:myColors.primaryOrange,fontFamily:'sans-serif',fontWeight:'500',fontSize:'20px', whiteSpace: 'nowrap', 
//     overflow: 'hidden',  
//     textOverflow: 'ellipsis',}}>
//           {foodItem.itemname}
//         </Typography>
//         <Typography variant="body2" color="textSecondary" className="card-description" style={{ fontSize: '12px', fontFamily: 'Arial', fontWeight: '400',marginTop:'5px' }}>
//           {foodItem.description}
//         </Typography>
//         <Box className="action-section">
//           <Typography variant="h6" component="div" className="main-card-price" style={{ fontSize: '22px', fontFamily: 'Arial', fontWeight: '700', }}>
//             ₹{finalPrice}
//           </Typography>
//           <Box className="quantity-controls" sx={{
//             display: 'flex',
//             alignItems: 'center',
//             // border: '1px solid #FD7E4B',
//             borderRadius: '20px',
//             overflow: 'hidden',
//             maxWidth: '150px',
//           }}>
//             <IconButton onClick={handleDecrement} sx={{
//               backgroundColor: '#FD7E4B',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#e06d42',
//               }
//             }}>
//               <RemoveIcon />
//             </IconButton>
//             <TextField
//               value={qty}
//               sx={{
//                 width: '50px',
//                 textAlign: 'center',
//                 '& .MuiOutlinedInput-root': {
//                   '& fieldset': {
//                     border: 'none', // Remove the outer border
//                   },
//                 },
//                 '& .MuiInputBase-input': {
//                   textAlign: 'center',
//                   padding: '0',
//                 },
//                 '& .MuiInputBase-root': {
//                   color: 'black',
//                   fontWeight: 'bold',
//                   fontSize: '30px',
//                   height: '40px',
//                 },
//               }}
//               // sx={{
//               //   width: '50px',
//               //   textAlign: 'center',
//               //   '& .MuiInputBase-input': {
//               //     textAlign: 'center',
//               //     padding: '0',
//               //   },
//               //   '& .MuiInputBase-root': {
//               //     color: 'black',
//               //     fontWeight: 'bold',
//               //     fontSize: '20px',
//               //     height: '40px',
//               //     border: 'none',
//               //   }
//               // }}
//               inputProps={{ readOnly: true }}
//               className="quantity-input"
//             />
//             <IconButton onClick={handleIncrement} sx={{
//               backgroundColor: '#FD7E4B',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#e06d42',
//               }
//             }}>
//               <AddIcon />
//             </IconButton>
//           </Box>
//         </Box>
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//   <Button
//     variant="contained"
//     style={{ marginTop: '10px', fontSize: '12px' }}
//     className={`add-to-cart-btn ${hover ? 'show' : ''}`}
//     sx={{
//       backgroundColor: '#FD7E4B',
//       '&:hover': {
//         backgroundColor: '#FD7E4D',
//         marginTop: '10px',
//       },
//     }}
//     onClick={handleAddToCart}
//   >
//     ADD TO CART
//   </Button>
// </div>

//         {/* <Button
//           variant="contained"
//           style={{marginTop:"10px",fontSize:'12px'}}
//           className={`add-to-cart-btn ${hover ? 'show' : ''}`}
//           sx={{
//             backgroundColor: '#FD7E4B',
//             '&:hover': {
//               backgroundColor: '#FD7E4D',
//               marginTop:"10px"
//             },
//           }}
//           onClick={handleAddToCart}
//         >
//           ADD TO CART
//         </Button> */}
//       </CardContent>
     
//     </Card>
//     </>
//   );
// }

// 16/01/25
import React, { useState, useEffect } from "react";
import { useDispatchCart, useCart } from "../../../store/ContextReducer";
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, IconButton, Box, TextField } from '@mui/material';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import newcardbg01 from '../../../assets/home/newcardbg01.png';
import newcardbg02 from '../../../assets/home/newcardbg02.png';
import newcardbg03 from '../../../assets/home/christmass-card-bg.png';
import './CardStyles.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';
import { myColors } from "../../../contants/Colors";

export default function FoodCard({ foodItem, userCity }) {

  // console.log("hello",props);
  const nav = useNavigate();
  const dispatch = useDispatchCart();
  const data = useCart();
  // const foodItem = props.foodItem;
  // const { foodItem, userCity } = props;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(""); // Define the size state
  const [hover, setHover] = useState(false);
  const [myCity, setMyCity] = useState('');

  useEffect(() => {
    // This will run every 2 seconds
    const interval = setInterval(() => {
      const city = localStorage.getItem("myCity");
      if (city) {
        setMyCity(city);
        // console.log("270",city);
        
      } else {
      //  console.log('273');
       
      }

    }, 3000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, [userCity]); //

  // useEffect(() => {
  //   console.log("City has changed:", userCity); // Debug to see the city update
  //   setMyCity(userCity)
  // }, [userCity]); 

  useEffect(() => {
    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });
  }, []);

  const handleAddToCart = async () => {
    console.log('297',foodItem);
    
      const finalPrice = qty * parseInt(foodItem.details[0].price || 0);
      const basicPrice =  parseInt(foodItem.details[0].price || 0);

      if (foodItem.maincategory === "ReadyToEat") {
        console.log("Checking city",userCity)
        if (myCity && myCity.toLowerCase() === "hyderabad") {
          addFoodToCart(finalPrice,basicPrice);
        } else {
          toast.error("We apologize, but we are currently only serving the Hyderabad location.");
        }
      } else if (foodItem.maincategory === "ReadyToCook") {
        addFoodToCart(finalPrice,basicPrice);
      }else if (foodItem.maincategory === "Combos") {
        addFoodToCart(finalPrice,basicPrice);
      }
    // }
  };

  const addFoodToCart = async (finalPrice,basicPrice) => {
    let food = data.find(item => item.id === foodItem._id);

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
          img: foodItem.imagepath,
          basicPrice,
          maincategory:foodItem.maincategory,
          category:foodItem.category
        });
      }
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.itemname,
        description: foodItem.description,
        price: finalPrice,
        qty,
        size,
        img: foodItem.imagepath,
        basicPrice,
        maincategory:foodItem.maincategory,
        category:foodItem.category
      });
    }
    toast.success(`Added item ${foodItem.itemname} to your cart`);
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

  const handleImageClick = (imageSrc) => {
    const lightbox = GLightbox({
      elements: [
        {
          href: imageSrc,
          type: 'image',
        },
      ],
    });
    lightbox.open();
  };

  return (
    <>
    <Card
      className={`custom-card ${hover ? 'hover' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        backgroundImage: `url(${hover ? newcardbg02 : newcardbg03})`,
        transition: 'background-image 0.3s ease-in-out',
        borderRadius: '26px'
      }}
    >
      <IconButton
        className="navigate-btn"
        onClick={() => { nav(`/product/${foodItem._id}`); window.scrollTo(0, 0); }}

        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <CardMedia
        style={{ objectFit: 'contain',scale:"0.8" }}
        component="img"
        image={foodItem.imagepath}
        title={foodItem.itemname}
        className="card-media"
        onClick={() => handleImageClick(foodItem.imagepath)}
      />
      <CardContent className="card-content"  sx={{padding:'0px'}}>
        <Typography variant="h5" component="div" className="card-title pt-2" sx={{color:myColors.primaryOrange,fontFamily:'sans-serif',fontWeight:'500',fontSize:'20px', whiteSpace: 'nowrap', 
    overflow: 'hidden',  
    textOverflow: 'ellipsis',}}>
          {foodItem.itemname}
        </Typography>
        <Typography variant="body2" color="textSecondary" className="card-description" style={{ fontSize: '12px', fontFamily: 'Arial', fontWeight: '400',marginTop:'5px' }}>
          {foodItem.description}
        </Typography>
        <Box className="action-section">
          <Typography variant="h6" component="div" className="main-card-price" style={{ fontSize: '22px', fontFamily: 'Arial', fontWeight: '700', }}>
            ₹{finalPrice}
          </Typography>
          <Box className="quantity-controls" sx={{
            display: 'flex',
            alignItems: 'center',
            // border: '1px solid #FD7E4B',
            borderRadius: '20px',
            overflow: 'hidden',
            maxWidth: '150px',
          }}>
            <IconButton onClick={handleDecrement} sx={{
              backgroundColor: '#FD7E4B',
              color: 'white',
              '&:hover': {
                backgroundColor: '#e06d42',
              }
            }}>
              <RemoveIcon />
            </IconButton>
            <TextField
              value={qty}
              sx={{
                width: '50px',
                textAlign: 'center',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Remove the outer border
                  },
                },
                '& .MuiInputBase-input': {
                  textAlign: 'center',
                  padding: '0',
                },
                '& .MuiInputBase-root': {
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '30px',
                  height: '40px',
                },
              }}
              // sx={{
              //   width: '50px',
              //   textAlign: 'center',
              //   '& .MuiInputBase-input': {
              //     textAlign: 'center',
              //     padding: '0',
              //   },
              //   '& .MuiInputBase-root': {
              //     color: 'black',
              //     fontWeight: 'bold',
              //     fontSize: '20px',
              //     height: '40px',
              //     border: 'none',
              //   }
              // }}
              inputProps={{ readOnly: true }}
              className="quantity-input"
            />
            <IconButton onClick={handleIncrement} sx={{
              backgroundColor: '#FD7E4B',
              color: 'white',
              '&:hover': {
                backgroundColor: '#e06d42',
              }
            }}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Button
    variant="contained"
    style={{ marginTop: '10px', fontSize: '12px' }}
    className={`add-to-cart-btn ${hover ? 'show' : ''}`}
    sx={{
      backgroundColor: '#FD7E4B',
      '&:hover': {
        backgroundColor: '#FD7E4D',
        marginTop: '10px',
      },
    }}
    onClick={handleAddToCart}
  >
    ADD TO CART
  </Button>
</div>

        {/* <Button
          variant="contained"
          style={{marginTop:"10px",fontSize:'12px'}}
          className={`add-to-cart-btn ${hover ? 'show' : ''}`}
          sx={{
            backgroundColor: '#FD7E4B',
            '&:hover': {
              backgroundColor: '#FD7E4D',
              marginTop:"10px"
            },
          }}
          onClick={handleAddToCart}
        >
          ADD TO CART
        </Button> */}
      </CardContent>
     
    </Card>
    </>
  );
}



