import React, { useEffect } from "react";
import Navigation from "components/navigation";
import HomeHero from "components/HomeHero";
import HomeServices from "components/HomeServices";
import { getWidgetParameters } from "services/config";
//import ServicesMissionApprentissage from "components/ServicesMissionApprentissage";
import DescriptionMissionApprentissage from "components/DescriptionMissionApprentissage";
import Footer from "components/footer";
import { push } from "connected-next-router";
import { useDispatch } from "react-redux";
import { setWidgetParameters } from "store/actions";
import ScrollToTop from "components/ScrollToTop";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const widgetParameters = getWidgetParameters();
    if (widgetParameters && widgetParameters.applyWidgetParameters) {
      dispatch(setWidgetParameters(widgetParameters));
      dispatch(push({ pathname: "/recherche-apprentissage" }));
    }
  }, []);

  return (
    <div>
      <ScrollToTop />
      <Navigation />
      <HomeHero />
      <HomeServices />
      <DescriptionMissionApprentissage />
      <Footer />
    </div>
  );
};

export default Home;
