import React, { useEffect } from "react";
import "./Hero.css";
import ecocoin from "../../assets/semi3.png";
import circle from "../../assets/circle2.png";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div data-aos="fade" className="background">
      <div className="flex">
        <div data-aos="fade-right" className="liftide">
          <h1>Eco coin</h1>
          <h1 className="game">A Gamified Platform for Sustainable Living</h1>
          <Link to="/Addimage">
            <button className="btn">Get started</button>
          </Link>
        </div>
      </div>
      <div  className="half">
        <div data-aos="fade-left" className="rightside">
          <img className="semi" src={ecocoin} alt="Ecocoin Image" />
          <img className="fullcircle" src={circle} alt="Circle" />
          <img
            className="handtree"
            src="https://wanderlust.coffee/wp-content/uploads/2023/09/Hand-plant-.png.webp"
            alt="Hand with plant"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
