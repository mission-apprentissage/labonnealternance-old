import React from "react";

import styles from "./HomeHero.module.scss";


const HomeHero = () => {
  return (
    <div className="c-home-hero">

      <div className="container py-5">
        <div className="card c-home-hero__card px-4 py-4">
          <div className="card-body">
            <h1 className="card-title">
              <span className="d-block c-home-hero__title c-home-hero__title1">Se former et travailler</span>
              <span className="d-block c-home-hero__title c-home-hero__title2">en alternance</span>
            </h1>
            <p className="card-text mb-5">
              <span className="d-block">Trouvez la formation et l’entreprise pour</span>
              <span className="d-block">réaliser votre projet d'alternance</span>
            </p>
            <div class="form-group mb-2" className="c-home-hero__input">
              <input type="text" required="required" value="" class="form-control form-control-lg w-100" aria-describedby="name" placeholder="ex : boulanger" />
            </div>
            <div class="form-group" className="c-home-hero__input">
              <input type="text" required="required" value="" class="form-control form-control-lg w-100" aria-describedby="name" placeholder="ex : France, Paris, 75000" />
            </div>
            <div class="form-group" className="c-home-hero__input">
              <input type="submit" value="C'est parti !" class="d-block btn btn-lg btn-dark w-100 font-weight-bold c-home-hero__submit" data-disable-with="C'est parti !"/>
            </div>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
      </div>
      );
};

export default HomeHero;
