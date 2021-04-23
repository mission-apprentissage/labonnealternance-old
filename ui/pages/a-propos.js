import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";
import logoPrdv from "public/images/logo_prdv.svg";
import logoMatcha from "public/images/logo_matcha.svg";
import logoCatalogue from "public/images/logo_catalogue.svg";

import logoLbb from "public/images/logo-lbb.svg";
import logoLbf from "public/images/logo-labonneformation.svg";
import logoMaintenant from "public/images/logo-maintenant.svg";
import logoMemo from "public/images/logo-memo.png";
import logoAvril from "public/images/logo-avril.svg";
import logoClara from "public/images/logo-clara.svg";

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
          <h2 className="h3">Le saviez-vous ?</h2>
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

          <h2 className="h3">Qui sommes-nous ?</h2>

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

          <h2 className="h3">Les services de La Bonne Alternance</h2>
         
          <div className="card c-about-card c-about-card--flat mt-4">
            <div className="c-about-card__img">
              <img
                className={"c-about-card__img--matcha"}
                src={logoMatcha}
                alt={"Logo matcha"}
              />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">
                Matcha
              </div>
              <div className="c-about-card__text">
                Susciter des recrutements en apprentissage
              </div>
              <div className="c-about-card__link">
                <a href="https://mission-apprentissage.gitbook.io/general/les-services-en-devenir/untitled"
                   rel="noopener noreferrer"
                   target="_blank">En savoir plus</a>
              </div>
            </div>
          </div>

          <div className="card c-about-card c-about-card--flat mt-3">
            <div className="c-about-card__img">
              <img
                className={"c-about-card__img--catalog"}
                src={logoCatalogue}
                alt={"Logo catalogue"}
              />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">
                Catalogue des formations
              </div>
              <div className="c-about-card__text">
                Un catalogue élargi de formations en apprentissage
              </div>
              <div className="c-about-card__link">
                <a href="https://mission-apprentissage.gitbook.io/catalogue/" 
                   rel="noopener noreferrer"
                   target="_blank">En savoir plus</a>
              </div>
            </div>
          </div>

          <div className="card c-about-card c-about-card--flat mt-3 mb-4">
            <div className="c-about-card__img">
              <img
                className={"c-about-card__img--prdv"}
                src={logoPrdv}
                alt={"Logo prdv"}
              />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">
                Prise de rendez-vous
              </div>
              <div className="c-about-card__text">
                Pour échanger facilement avec les centres de formation
              </div>
              <div className="c-about-card__link">
                <a href="https://mission-apprentissage.gitbook.io/general/les-services-en-devenir/prise-de-rendez-vous"
                  rel="noopener noreferrer"
                  target="_blank">En savoir plus</a>
              </div>
            </div>
          </div>

          <h2 className="h3">Autres services de Pôle Emploi</h2>

          <div className="card-deck">
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img
                  src={logoLbb}
                  width="134"
                  alt={"Logo"}
                />
              </div>
              <div className="c-about-card__content">
                <a href="https://labonneboite.pole-emploi.fr/"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="c-about-card__text2 stretched-link">
                  Trouver des entreprises qui recrutent sans déposer d'offres d'emploi
                </a>
              </div>
            </div>
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img
                  src={logoLbf}
                  width="134"
                  alt={"Logo"}
                  />
              </div>
              <div className="c-about-card__content">
                <a href="https://labonneboite.pole-emploi.fr/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="c-about-card__text2 stretched-link">
                  Trouvez une formation en fonction de votre profil ET du marché du travail
                </a>
              </div>
            </div>
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img
                  src={logoMaintenant}
                  width="134"
                  alt={"Logo"}
                  />
              </div>
              <div className="c-about-card__content">
                <a href="https://maintenant.pole-emploi.fr/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="c-about-card__text2 stretched-link">
                  Vous valez plus qu'un CV ! Trouvez le bon job en moins de 5 minutes
                </a>
              </div>
            </div>
          </div>

          <div className="card-deck">
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img
                  src={logoMemo}
                  width="114"
                  className={"c-about-card__img--memo"}
                  alt={"Logo"}
                  />
              </div>
              <div className="c-about-card__content">
                <a href="https://memo.pole-emploi.fr/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="c-about-card__text2 stretched-link">
                    Organiser votre recherche d'emploi avec notre tableau de bord
                </a>
              </div>
            </div>
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img
                  src={logoAvril}
                  width="114"
                  className={"c-about-card__img--avril"}
                  alt={"Logo"}
                  />
              </div>
              <div className="c-about-card__content">
                      <a href="https://avril.pole-emploi.fr/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="c-about-card__text2 stretched-link">
                  Trouvez une formation en fonction de votre profil ET du marché du travail
                </a>
              </div>
            </div>
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img
                  src={logoClara}
                  width="134"
                  className={"c-about-card__img--clara"}
                  alt={"Logo"}
                />
              </div>
              <div className="c-about-card__content">
                <a href="https://clara.pole-emploi.fr/"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="c-about-card__text2 stretched-link">
                  Découvrez les aides et mesures qui vont accélérer votre retour à l'emploi.
                </a>
              </div>
            </div>
          </div>




          <h2 className="h3">Autres liens utiles</h2>
          <div className="c-about-others">
            <div className="c-about-other">
              <div className="c-about-otherleft">
                <span className="c-about-otherbullet">•</span>
                <span className="c-about-otherlink">
                  <a href="#">some other link</a>
                </span>
              </div>                          
              <div className="c-about-otherright">
                <span className="c-about-otherdescr">lorem ipsum dolores ar mazer mlkzaerj lmazer mlazekjr azemlrj</span>
              </div>                          
            </div>            
          </div>


          <h2 className="h3">Crédits images</h2>

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
