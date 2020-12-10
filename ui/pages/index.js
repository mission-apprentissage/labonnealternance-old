import React from "react";
import Navigation from "components/navigation";
import HomeHero from "components/HomeHero";
import ServicesMissionApprentissage from "components/ServicesMissionApprentissage";
import DescriptionMissionApprentissage from "components/DescriptionMissionApprentissage";
import Footer from "components/footer";
const Home = () => (
  <div>
    <Navigation />
    <HomeHero />
    <DescriptionMissionApprentissage />
    <Footer />
  </div>
);

export default Home;
