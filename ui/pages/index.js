import React from "react";
import Navigation from "components/navigation";
import HomeHero from "components/HomeHero";
import { getWidgetParameters, isTrainingOnly } from "services/config"
//import ServicesMissionApprentissage from "components/ServicesMissionApprentissage";
import DescriptionMissionApprentissage from "components/DescriptionMissionApprentissage";
import Footer from "components/footer";
const Home = ({a}) =>{ 
  
  
  console.log("aaa ",a);

  return (
  <div>
    <Navigation />
    <HomeHero />
    <DescriptionMissionApprentissage />
    <Footer />
  </div>
);}

// add getStaticProps() function
export async function getServerSideProps({ query }) {
  const category = query.category;
  console.log("cat : ",query, category);
  //console.log("context : ", context.query);

  return {props:{a:5}};
}

export default Home;
