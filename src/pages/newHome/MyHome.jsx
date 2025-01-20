import React from 'react'
import TopSection from './components/TopSection'
import AboutUs from './components/About'
import MenuSection from './components/MenuSection'
import Franchise from './components/Franchise'
import PromotionalSliderNew from './components/slider/PromotionalSliderNew' 
import FranchiseModel from './components/franchise/FranchiseModel'

// import PromotionalSlider from './components/slider/PromotionalSliderNew'
// import Promotional from './components/Promotional'
// import PromotionalSlider from './components/PromotionalSlider'

export const MyHome = () => {
  return (
    <div style={{backgroundColor:'#FFF'}}>
   {/* <HeroSection/> */}
      {/* <TopSection/> */}
      {/* <AboutUs/> */}
      {/* <MenuSection/> */}
      <FranchiseModel/>
      {/* <Franchise/> */}
      {/* <Promotional/> */}
      {/* <PromotionalSlider/> */}
      <PromotionalSliderNew/> 
    </div>
  )
}
