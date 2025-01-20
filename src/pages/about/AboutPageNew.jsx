import React from 'react'
import TopSection from './components/TopSection'
import Stories from './components/Stories'
import Things from './components/Things'
import Founders from './components/Founders'
import Welcome from './components/Welcome'

function AboutPageNew() {
  return (
    <div>
        <TopSection/>
        <Stories/>
        <Things/>
     {/* <Founders/> */}
     <Welcome/>
    </div>
  )
}

export default AboutPageNew
