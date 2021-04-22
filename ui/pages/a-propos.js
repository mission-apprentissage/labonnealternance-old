import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";
import logoPrdv from "public/images/logo_prdv.svg";
import logoMatcha from "public/images/logo_matcha.svg";
import logoCatalogue from "public/images/logo_catalogue.svg";

import Footer from "components/footer";
const APROPOS = () => (
  <div>
    <ScrollToTop />
    <Navigation />

    <Breadcrumb forPage="a-propos" label="A propos" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-1">A propos de</span>
            <span className="d-block c-page-title is-color-2">La Bonne Alternance</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h2>Le saviez-vous ?</h2>
          <p>
            7 employeurs sur 10 recrutent sans déposer d’offre d’emploi.
            <br />
            Il est essentiel dans votre recherche de proposer votre candidature à des entreprises n’ayant pas forcément
            déposé d’offre d’emploi en alternance.
          </p>
          <p>
            En complément, le service La Bonne Alternance expose les formations disponibles en apprentissage.
          </p>
          <p>
            Notre algorithme La Bonne Alternance analyse les offres et les recrutements des 6 dernières années pour vous
            proposer les entreprises qui recrutent régulièrement en alternance (contrat d'apprentissage ou contrat de
            professionnalisation).
          </p>

          <p>En complément, le service La Bonne Alternance expose les formations disponibles en apprentissage.</p>

          <p>
            Pour une meilleure lisibilité, les résultats sont affichés sur une carte et en liste.
            <br />
            En cliquant sur une entreprise, vous accédez à sa description, ses coordonnées lorsqu’elles sont
            disponibles, ainsi qu’à des conseils pour postuler.
          </p>

          <h2>Qui sommes-nous ?</h2>

          <p>
            La Bonne Alternance est d’abord une start-up interne de Pôle emploi créée et développée par des conseillers.{" "}
            <br />
            Reprise par la{" "}
            <a href="https://mission-apprentissage.gitbook.io/general/" rel="nooepener noreferrer" target="_blank">
              Mission apprentissage
            </a>{" "}
            en 2020, le site ajoute désormais des informations sur les formations et les offres d’emploi en
            apprentissage.
          </p>

          <h2>Les services de La Bonne Alternance</h2>
         
          <div className="card c-about-card c-about-card--flat">
            <div className="c-about-card__img">
              <img
                className={"c-about-card__img--matcha"}
                src={logoMatcha}
                alt={"Logo matcha"}
              />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">
                title
              </div>
              <div className="c-about-card__text">
                text
              </div>
              <div className="c-about-card__link">
                <a href="">link</a>
              </div>
            </div>
          </div>

          <div className="card c-about-card c-about-card--flat">
            <div className="c-about-card__img">
              <img
                className={"c-about-card__img--catalog"}
                src={logoCatalogue}
                alt={"Logo catalogue"}
              />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">
                title
              </div>
              <div className="c-about-card__text">
                text
              </div>
              <div className="c-about-card__link">
                <a href="">link</a>
              </div>
            </div>
          </div>

          <div className="card c-about-card c-about-card--flat">
            <div className="c-about-card__img">
              <img
                className={"c-about-card__img--prdv"}
                src={logoPrdv}
                alt={"Logo prdv"}
              />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">
                title
              </div>
              <div className="c-about-card__text">
                text
              </div>
              <div className="c-about-card__link">
                <a href="">link</a>
              </div>
            </div>
          </div>

          <h2>Crédits images</h2>

          <p>
            <small><a href="https://www.freepik.com/vectors/people">Illustration de la page d'accueil réalisée par pikisuperstar - www.freepik.com</a></small>
          </p>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default APROPOS;
