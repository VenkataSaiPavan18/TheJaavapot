import React, { useState } from "react";
import { Card, Typography, Box, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import img1 from "../../../../assets/home/franchise/im01.jpeg";
import img2 from "../../../../assets/home/franchise/img02.jpeg";
import img3 from "../../../../assets/home/franchise/img03.jpg";
import img4 from "../../../../assets/home/franchise/img04.jpg";
import SwiperCore, { Autoplay, Pagination } from 'swiper';

SwiperCore.use([Autoplay, Pagination]);

const FranchiseModel = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const franchises = [
    { category: "outlets", image: img1, name: "", address: "" },
    { category: "outlets", image: img2, name: "", address: "" },
    { category: "outlets", image: img3, name: "", address: "" },
    { category: "outlets", image: img4, name: "", address: "" },
    { category: "franchises", image: img1, name: "Shop Place 3", address: "789 Oak St, MG Road, Bangalore, Karnataka" },
    { category: "franchises", image: img2, name: "Shop Place 4", address: "101 Maple St, Indiranagar, Bangalore, Karnataka" },
    { category: "franchises", image: img1, name: "Shop Place 5", address: "202 Pine St, Whitefield, Bangalore, Karnataka" },
    { category: "franchises", image: img2, name: "Shop Place 6", address: "101 Maple St, Indiranagar, Bangalore, Karnataka" },
    { category: "franchises", image: img1, name: "Shop Place 7", address: "202 Pine St, Whitefield, Bangalore, Karnataka" },
  ];

  const StyledCard = styled(Card)({
    position: "relative",
    borderRadius: "15px",
    overflow: "hidden",
    width: isMobile ? "90%" : "406px",
    height: "250px",
    flexShrink: 0,
    margin: isMobile ? "20px auto" : "50px 10px",
  });

  const StyledImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s, opacity 0.5s",
    "&:hover": {
      transform: "scale(1.3)",
      opacity: 0.7,
    },
  });

  const Overlay = styled(Box)({
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
    opacity: 0,
    transition: "opacity 0.3s",
    "&:hover": {
      opacity: 1,
    },
  });

  const Heading = styled(Typography)({
    fontFamily: "Arial, sans-serif",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#FD7E4B",
    textAlign: "center",
    margin: "20px 0",
    zIndex: 2,
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
  });

  return (
    <div style={{ paddingBottom: "50px", paddingTop: "60px", margin: 0, padding: 0 }}>
      <Heading>Visit Our Outlet</Heading>
      <p style={{ textAlign: "center", fontWeight: "bold", margin: 0, padding: 0 }}>Shalivahana Nagar, Sarita Arcade, Malakpet Colony, Saidabad, Hyderabad, Telangana 500036</p>

      <Swiper
        spaceBetween={isMobile ? 10 : 50}
        slidesPerView={isMobile ? 1 : 3}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        style={{ 
          marginTop: "0", paddingTop: "0" }}
      >
        {franchises.map((franchise, index) => (
          <SwiperSlide key={index}>
            <StyledCard spacing="1">
              <StyledImage src={franchise.image} alt={`Franchise ${index + 1}`} />
             
            </StyledCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FranchiseModel;
