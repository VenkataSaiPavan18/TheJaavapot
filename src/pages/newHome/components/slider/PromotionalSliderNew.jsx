import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PromotionalCardOne from "./PromotionalOne";
import PromotionalCardTwo from "./PromotionalTwo";
import PromotionalCardThree from "./PromotionalThree";
import "./PromotionalSliderNew.css"; // Custom CSS for Swiper

const PromotionalSliderNew = () => {
  const swiperRef = React.useRef(null);

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 8000, disableOnInteraction: false }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      arrows

      style={{ zIndex: 0, position: 'relative', height:"auto", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",   }}
    >
       <SwiperSlide style={{height:"55vh"}}>
        <PromotionalCardOne />
      </SwiperSlide>
      <SwiperSlide style={{height:"auto"}}>
        <PromotionalCardTwo />
      </SwiperSlide>
      <SwiperSlide>
        <PromotionalCardThree />
      </SwiperSlide>
     
    </Swiper>
  );
};

export default PromotionalSliderNew;

