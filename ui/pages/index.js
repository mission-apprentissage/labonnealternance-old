import React, { useEffect } from "react";
import Navigation from "components/navigation";
import HomeHero from "components/HomeHero";
import { getWidgetParameters } from "services/config";
//import ServicesMissionApprentissage from "components/ServicesMissionApprentissage";
import DescriptionMissionApprentissage from "components/DescriptionMissionApprentissage";
import Footer from "components/footer";
import { push } from "connected-next-router";
import { useDispatch } from "react-redux";
import { setWidgetParameters } from "store/actions";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.applyWidgetParameters) {
      dispatch(setWidgetParameters(props));
      dispatch(push({ pathname: "/recherche-apprentissage" }));
    }
  }, []);

  return (
    <div>
      <Navigation />
      <HomeHero />
      <DescriptionMissionApprentissage />
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ query }) {
  return { props: getWidgetParameters(query) };
}

export default Home;
