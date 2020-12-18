import React from "react";
import logoSirius from "public/images/logo_sirius.svg";
import logoMatcha from "public/images/logo_matcha.svg";
import logoCatalogue from "public/images/logo_catalogue.svg";

const HomeServices = () => {
  return (
    <section className="c-home-services">

        <h2 className="c-home-services__main-title pt-5">
          <span className="c-home-services__main-title--dark">Les services de </span> 
          <span className="d-block c-home-services__main-title--colored"> La Bonne Alternance</span>
        </h2>


      <div className="card-deck c-home-services__container">

        <div className="card c-home-services__card mb-4">
          <div className="card-body c-home-services__card-body">
            <div className="c-home-services__circle mx-auto mt-3">
              <img aria-hidden="true" className="c-home-services__img--sirius" src={logoSirius} alt="Logo Sirius" />
            </div>
            <h3 className="c-home-services__title mt-3 mb-5">Sirius</h3>
            <p className="c-home-services__text mb-4">Avis et témoignages d'apprentis</p>
          </div>
          <footer className="card-footer c-home-services__footer">
            <button type="button" className="c-home-services__btn btn btn-lg btn-block btn-primary mb-2">Découvrir</button>
          </footer>
        </div>

        <div className="card c-home-services__card mb-4">
          <div className="card-body c-home-services__card-body">
            <div className="c-home-services__circle mx-auto mt-3">
              <img aria-hidden="true" className="c-home-services__img--matcha" src={logoMatcha} alt="Logo Sirius" />
            </div>
            <h3 className="c-home-services__title mt-3 mb-5">Matcha</h3>
            <p className="c-home-services__text mb-4">Service bientôt disponible</p>
          </div>
          <footer className="card-footer c-home-services__footer">
            <button type="button" className="c-home-services__btn btn btn-lg btn-block btn-primary mb-2">Découvrir</button>
          </footer>
        </div>

        <div className="card c-home-services__card mb-4">
          <div className="card-body c-home-services__card-body">
            <div className="c-home-services__circle mx-auto mt-3">
              <img aria-hidden="true" className="c-home-services__img--catalog" src={logoCatalogue} alt="Logo Sirius" />
            </div>
            <h3 className="c-home-services__title mt-3 mb-3">Catalogue des formations</h3>
            <p className="c-home-services__text mb-4">Un catalogue élargi de formations en apprentissage</p>
          </div>
          <footer className="card-footer c-home-services__footer">
            <button type="button" className="c-home-services__btn btn btn-lg btn-block btn-primary mb-2">Découvrir</button>
          </footer>
        </div>



      </div>
      </section>
      );
};

export default HomeServices;
