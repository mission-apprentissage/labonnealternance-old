import React, { useEffect } from "react";
import Navigation from "components/navigation";
import HomeHero from "components/HomeHero";
import HowTo from "components/HowTo";
import { initParametersFromQuery } from "services/config";
import DescriptionMissionApprentissage from "components/DescriptionMissionApprentissage";
import Footer from "components/footer";
import { useDispatch } from "react-redux";
import ScrollToTop from "components/ScrollToTop";
import howtocircle1 from "public/images/howtocircle1.svg";
import howtocircle2 from "public/images/howtocircle2.svg";
import howtocircle3 from "public/images/howtocircle3.svg";
import howtocircle4 from "public/images/howtocircle4.svg";
import howtocircle5 from "public/images/howtocircle5.svg";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initParametersFromQuery(dispatch, "shouldPushPathname");
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <div className="c-homebg">
        <img src={howtocircle1} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle1" alt="Cercle" />
        <img src={howtocircle2} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle2" alt="Cercle" />
        <img src={howtocircle3} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle3" alt="Cercle" />
        <img src={howtocircle4} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle4" alt="Cercle" />
        <img src={howtocircle5} className="c-homebg-img c-homebg-img--circle c-homebg-img--circle5" alt="Cercle" />
        <HomeHero />
        <HowTo />
      </div>
      <DescriptionMissionApprentissage />
      <Footer />
    </div>
  );
};

export default Home;
