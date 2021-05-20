import React from "react";
import howto1 from "public/images/howto1.svg";
import howto2 from "public/images/howto2.svg";
import howto3 from "public/images/howto3.svg";

const HowTo = () => {
  return (
    <>
      <section className="c-howto container">
        <div className="c-howto-cards card-deck">
          <div className="card border-0">
            <img src={howto1} className="card-img-top" alt="Première étape"/>
            <div className="card-body">
              <h5 className="card-title">Le job de vos rêves</h5>
              <p className="card-text">Renseignez le métier que vous souhaitez faire et la localisation (Ville ou Code postal)</p>
            </div>
          </div>
          <div className="card card--middle border-0">
            <img src={howto2} className="card-img-top" alt="Deuxième étape"/>
            <div className="card-body">
              <h5 className="card-title">En un clin d’oeil</h5>
              <p className="card-text">Obtenez en un clin d’oeil la liste des formations et entreprises proche de chez vous dans le domaine recherché.</p>
            </div>
          </div>
          <div className="card border-0">
            <img src={howto3} className="card-img-top" alt="Troisième étape"/>
            <div className="card-body">
              <h5 className="card-title">Un contact facile</h5>
              <p className="card-text">Contactez facilement les centres de formations ou les entreprises pour postuler </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowTo;
