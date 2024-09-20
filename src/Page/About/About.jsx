import React from 'react'   
import './About.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'

const About = () => {
  return (
  <div>
    <div>
      <Navbar/>
      <div className="about">
        <h1>About</h1>
        <p>Welcome to EcoCoin, where we turn sustainable living into an exciting and rewarding journey. At EcoCoin, we believe that every small eco-friendly action can make a big difference. Our platform empowers you to live sustainably by rewarding your efforts with EcoCoins.</p>
        <br />
        <h1>What We Do:</h1>
        <p>EcoCoin is a gamified platform designed to encourage and track your eco-friendly actions. Whether it's recycling, using public transport, or reducing energy usage, you earn EcoCoins for making green choices. These EcoCoins can be redeemed for discounts, products, or donations to environmental causes.</p>
      </div>
    </div>
  </div>
  )
}

export default About