import React from "react";
import styles from "./ServicesMissionApprentissage.module.scss";
import ServiceMissionApprentissage from "./ServiceMissionApprentissage";

const ServicesMissionApprentissage = () => {
  return (
    <div className="c-servicesmna-hero">
      <div className="container py-5">
        <div>Les services de </div>
        <div>La Bonne Alternance</div>

        <ServiceMissionApprentissage
          url="lienversservice"
          title="Sirirus"
          text="Avis et témoignages des apprentis "
          logo="zolilogo"
        />
        <ServiceMissionApprentissage url="lienversservice" title="Matcha" text="bblablabli" logo="zolilogo" />
        <ServiceMissionApprentissage
          url="lienversservice"
          title="Catalogue des formations"
          text="Un catalogue élargi de formations en apprentissage"
          logo="zolilogo"
        />

        <div>En savoir plus sur nos services</div>
      </div>
    </div>
  );
};

export default ServicesMissionApprentissage;
