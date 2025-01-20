// src/components/ProductImageSwiper.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import { EffectFade, Navigation, Pagination } from 'swiper/react';

const ProductImageSwiper = ({ images }) => {
  return (
    <Swiper
    //   effect="fade"
    //   navigation
    //   pagination={{ clickable: true }}
    //   modules={[EffectFade, Navigation, Pagination]}
      className="product-image-swiper"
      style={{ width: '300px', height: '300px', borderRadius: '10px', overflow: 'hidden',position:'absolute',right:'25px' }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} alt={`Product ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover',position:'absolute',right:'25px'}} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductImageSwiper;
