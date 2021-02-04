import React from "react";
import logoPrdv from "public/images/logo_prdv.svg";
import logoMatcha from "public/images/logo_matcha.svg";
import logoCatalogue from "public/images/logo_catalogue.svg";
import HomeCard from "./HomeCard.js";

const HomeServices = () => {
  return (
    <section className="c-home-services">
      <h2 className="c-home-services__main-title py-4 my-md-4 mt-lg-5 mb-lg-5">
        <span className="c-home-services__main-title--dark">Les services de </span>
        <span className="c-home-services__main-title--colored">La Bonne Alternance </span>
      </h2>

      <div className="card-deck c-home-services__container">
        <HomeCard
          logo={logoPrdv}
          kind="prdv"
          url="https://mission-apprentissage.gitbook.io/general/les-services-en-devenir/prise-de-rendez-vous"
          title="Prise de rendez-vous"
          text="Pour échanger facilement avec les centres de formation"
        />
        <HomeCard
          logo={logoMatcha}
          kind="matcha"
          url="https://mission-apprentissage.gitbook.io/general/les-services-en-devenir/untitled"
          title="Matcha"
          text="Susciter des recrutements en apprentissage"
        />
        <HomeCard
          logo={logoCatalogue}
          kind="catalog"
          url="https://mission-apprentissage.gitbook.io/catalogue/"
          title="Catalogue des formations"
          text="Un catalogue élargi de formations en apprentissage"
        />
      </div>

      <div className="text-center my-2 my-md-5">
        <a
          className="btn btn-outline-primary mb-5 px-1 px-sm-5 c-home-descr__more"
          rel="noopener noreferrer"
          href="https://mission-apprentissage.gitbook.io/general/"
          target="_blank"
        >
          <span className="d-inline px-3 px-sm-0">En savoir plus </span>
          <span className="d-none d-sm-inline">sur nos services</span>
        </a>
      </div>
    </section>
  );
};

export default HomeServices;
