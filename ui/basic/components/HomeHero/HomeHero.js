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
                <span className="d-block c-home-hero__title c-home-hero__title2">En alternance</span>
              </h1>
              <p className="card-text mb-5">
                <span className="d-block">Trouvez la formation et l’entreprise pour</span>
                <span className="d-block">réaliser votre projet d'alternance</span>
              </p>
              <div class="form-group mx-auto" className="c-home-hero__input">
                <input type="text" required="required" value="" class="form-control form-control-lg" aria-describedby="name" placeholder="ex : boulanger" />
              </div>
            </div>
          </div>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad fugiat quasi, voluptatum error sequi corrupti, molestiae in at dolorum totam, atque placeat nulla sunt reiciendis hic saepe ab, numquam veniam!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad fugiat quasi, voluptatum error sequi corrupti, molestiae in at dolorum totam, atque placeat nulla sunt reiciendis hic saepe ab, numquam veniam!</p>

        </div>
      </div>
  );
};

export default HomeHero;
