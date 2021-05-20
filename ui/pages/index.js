import React, { useEffect } from "react";
import Navigation from "components/navigation";
import HomeHero from "components/HomeHero";
import HowTo from "components/HowTo";
import { initParametersFromQuery } from "services/config";
import DescriptionMissionApprentissage from "components/DescriptionMissionApprentissage";
import Footer from "components/footer";
import { useDispatch } from "react-redux";
import ScrollToTop from "components/ScrollToTop";

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
        <HomeHero />
        <HowTo />
      </div>
      <DescriptionMissionApprentissage />
      <Footer />
    </div>
  );
};

export default Home;
