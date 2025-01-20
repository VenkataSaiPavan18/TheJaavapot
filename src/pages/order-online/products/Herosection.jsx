// import React from 'react';
// import { Container } from 'react-bootstrap';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay'; // Import Swiper autoplay styles
// import { Navigation, Autoplay } from 'swiper';

// const slides = [
//   {
//     imgSrc: 'https://via.placeholder.com/1600x900.png?text=Slide+1',
//     title: 'One Meal a Day With Millets',
//   },
//   {
//     imgSrc: 'https://via.placeholder.com/1600x900.png?text=Slide+2',
//     title: 'Products',
//   },
//   {
//     imgSrc: 'https://via.placeholder.com/1600x900.png?text=Slide+3',
//     title: 'Franchisee Stores',
//   },
// ];

// const HeroSection = () => {
//   return (
//     <section className="main-slide">
//       <Swiper
//         modules={[Navigation, Autoplay]}
//         navigation
//         autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
//         loop
//         spaceBetween={30}
//         slidesPerView={1}
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className="item"
//               style={{
//                 position: 'relative',
//                 height: '100vh',
//                 backgroundImage: `url(${slide.imgSrc})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             >
//               <div
//                 className="tbl-wrp slide-2 d-flex align-items-center justify-content-center"
//                 style={{
//                   height: '100%',
//                   backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 }}
//               >
//                 <Container className="text-center text-white">
//                   <h2 className="slide-title2 pb-50" style={{ marginBottom: '50px' }}>
//                     {slide.title}
//                   </h2>
//                 </Container>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </section>
//   );
// };

// export default HeroSection;

import React from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper';
import './styles.css'; // Make sure to import the custom CSS

const slides = [
  {
    imgSrc: 'https://plus.unsplash.com/premium_photo-1679811673491-18b886de424c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // imgSrc: 'https://via.placeholder.com/1600x900.png?text=Slide+1',
    title: 'One Meal a Day With Millets',
  },
  {
    imgSrc: 'https://images.unsplash.com/photo-1504027973709-58986e840e79?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Products',
  },
  {
    imgSrc: 'https://media.istockphoto.com/id/604830968/photo/fresh-millet-crop-landscape.jpg?s=1024x1024&w=is&k=20&c=66gb0h9bzQ993VHQvIdZ9mRlYsdsne1DB3UewIOC6ZU=',
    title: 'Franchisee Stores',
  },
];

const HeroSection = () => {
  return (
    <div className="main-slide">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        spaceBetween={30}
        slidesPerView={1}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="item"
              style={{
                backgroundImage: `url(${slide.imgSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              <div
                className="tbl-wrp slide-2 d-flex align-items-center justify-content-center"
                style={{
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                <Container className="text-center text-white">
                  <h2 className="slide-title2 pb-50" style={{ marginBottom: '50px' }}>
                    {slide.title}
                  </h2>
                </Container>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
