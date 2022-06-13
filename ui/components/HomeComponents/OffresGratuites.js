import React from "react";

const OffresGratuites = ({ service }) => {
  return (
    <section className="p-3 mb-2 mb-md-5">
      <div className="row">
        <div className="col-12 col-md-6">
          <img
            className="c-homecomponent-illustration mr-3 my-3"
            src="/images/home_pics/illu-plateformesjeunes.svg"
            alt=""
          />
        </div>
        <div className="col-12 col-md-6 pt-md-5 order-md-first">
          <h2 className="c-homecomponent-title__small mb-3">
            Vos offres sont diffusées gratuitement au plus près des candidats
          </h2>
          {service === "entreprise" ? (
            <div>
              Exprimez votre besoin en quelques clics, nous générons votre offre instantanément. Retrouvez vos offres
              dans votre compte en vous connectant avec votre email uniquement.
            </div>
          ) : (
            ""
          )}
          {service === "cfa" ? (
            <div>
              Elles sont mises en ligne sur les sites les plus visités par les candidats en recherche d’alternance : la
              Bonne Alternance, 1jeune1solution, Parcoursup et bien d’autres.
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
export default OffresGratuites;
