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
        <HomeHero />
        <HowTo />
      </div>
      <DescriptionMissionApprentissage />
      <Footer />
    </div>
  );
};

export default Home;
