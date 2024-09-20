import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import Hero2 from '../../components/Hero2.css/Hero2'
import Hero3 from '../../components/Hero3/Hero3'
import Accordion from '../../components/FAQ/Faq'
import Hero4 from '../../components/Hero4/Hero4'


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Hero2/>
      <Hero3/>
      <Hero4/>
      <Accordion/>
      <Footer/>
    </div>
  )
}

export default Home