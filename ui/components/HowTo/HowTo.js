import React from "react";
import howto1 from "public/images/howto1.svg";
import howto2 from "public/images/howto2.svg";
import howto3 from "public/images/howto3.svg";

const HowTo = () => {
  return (
    <>
      <section className="c-howto container">

        <div class="card-deck">
          <div class="card border-0">
            <img src={howto1} class="card-img-top" alt="Première étape"/>
            <div class="card-body">
              <h5 class="card-title">Le job de vos rêves</h5>
              <p class="card-text">Renseignez le métier que vous souhaitez faire et la localisation (Ville ou Code postal)</p>
            </div>
          </div>
          <div class="card card--middle border-0">
            <img src={howto2} class="card-img-top" alt="Deuxième étape"/>
            <div class="card-body">
              <h5 class="card-title">En un clin d’oeil</h5>
              <p class="card-text">Obtenez en un clin d’oeil la liste des formations et entreprises proche de chez vous dans le domaine recherché.</p>
            </div>
          </div>
          <div class="card border-0">
            <img src={howto3} class="card-img-top" alt="Troisième étape"/>
            <div class="card-body">
              <h5 class="card-title">Un contact facile</h5>
              <p class="card-text">Contactez facilement les centres de formations ou les entreprises pour postuler </p>
            </div>
          </div>
        </div>


      </section>
    </>
  );
};

export default HowTo;
