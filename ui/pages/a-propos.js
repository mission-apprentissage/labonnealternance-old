import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";
import logoPrdv from "public/images/logo_prdv.svg";
import logoMatcha from "public/images/logo_matcha.svg";
import logoCatalogue from "public/images/logo_catalogue.svg";
import { NextSeo } from "next-seo";

import logoLbb from "public/images/logo-lbb.svg";
import logoLbf from "public/images/logo-labonneformation.svg";
import logoMaintenant from "public/images/logo-maintenant.svg";
import logoAvril from "public/images/logo-avril.svg";
import logoClara from "public/images/logo-clara.svg";

import Footer from "components/footer";
import ExternalLink from "@/components/externalLink";
const APROPOS = () => (
  <div>
    <NextSeo
      title="A propos | La bonne alternance | Trouvez votre alternance"
      description="Vous ne trouvez pas de contrat ou d'offres d'alternance ? Essayez La bonne alternance ! Trouvez ici les formations en alternance et les entreprises qui recrutent régulièrement en alternance."
    />

    <ScrollToTop />
    <Navigation />

    <Breadcrumb forPage="a-propos" label="A propos" />

    <div className="c-about c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-1">A propos de</span>
            <span className="d-block c-page-title is-color-2">La bonne alternance</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h2 className="c-about-title">Le saviez-vous ?</h2>
          <p>
            7 employeurs sur 10 recrutent sans déposer d’offre d’emploi.
            <br />
            Il est essentiel dans votre recherche de proposer votre candidature à des entreprises n’ayant pas forcément
            déposé d’offre d’emploi en alternance.
          </p>
          <p>
            Notre algorithme La bonne alternance analyse les offres et les recrutements des 6 dernières années pour vous
            proposer les entreprises qui recrutent régulièrement en alternance (contrat d'apprentissage ou contrat de
            professionnalisation).
          </p>

          <p>En complément, le service La bonne alternance expose les formations disponibles en apprentissage.</p>

          <p>
            Pour une meilleure lisibilité, les résultats sont affichés sur une carte et en liste.
            <br />
            En cliquant sur une entreprise, vous accédez à sa description, ses coordonnées lorsqu’elles sont
            disponibles, ainsi qu’à des conseils pour postuler.
          </p>

          <h2 className="c-about-title">Qui sommes-nous ?</h2>

          <p>
            La bonne alternance est d’abord une start-up interne de Pôle emploi créée et développée par des conseillers.{" "}
            <br />
            Reprise par la{" "}
            <ExternalLink url="https://mission-apprentissage.gitbook.io/general/" title="Mission apprentissage" /> en
            2020, le site ajoute désormais des informations sur les formations en apprentissage et les offres d'emploi
            en alternance.
          </p>

          <h2 className="c-about-title">Les services de La bonne alternance</h2>

          <div className="card c-about-card c-about-card--flat mt-4">
            <div className="c-about-card__img">
              <img className={"c-about-card__img--matcha"} src={logoMatcha} alt={""} />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">Dépôt d'offres simplifié</div>
              <div className="c-about-card__text">Susciter des recrutements en alternance</div>
              <div className="c-about-card__link">
                <ExternalLink
                  url="https://mission-apprentissage.gitbook.io/general/les-services-en-devenir/untitled"
                  title="En savoir plus"
                />
              </div>
            </div>
          </div>

          <div className="card c-about-card c-about-card--flat mt-3">
            <div className="c-about-card__img">
              <img className={"c-about-card__img--catalog"} src={logoCatalogue} alt={""} />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">Catalogue des formations</div>
              <div className="c-about-card__text">Un catalogue élargi de formations en apprentissage</div>
              <div className="c-about-card__link">
                <ExternalLink url="https://mission-apprentissage.gitbook.io/catalogue/" title="En savoir plus" />
              </div>
            </div>
          </div>

          <div className="card c-about-card c-about-card--flat mt-3 mb-4">
            <div className="c-about-card__img">
              <img className={"c-about-card__img--prdv"} src={logoPrdv} alt={""} />
            </div>
            <div className="c-about-card__content">
              <div className="c-about-card__title">Rendez-vous apprentissage</div>
              <div className="c-about-card__text">Pour échanger facilement avec les centres de formation</div>
              <div className="c-about-card__link">
                <ExternalLink
                  url="https://mission-apprentissage.gitbook.io/general/les-services-en-devenir/prise-de-rendez-vous"
                  title="En savoir plus"
                />
              </div>
            </div>
          </div>

          <h2 className="c-about-title">Autres services de Pôle Emploi</h2>

          <div className="card-deck">
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img src={logoLbb} width="134" alt={"Redirection vers le site La bonne boite"} />
              </div>
              <div className="c-about-card__content">
                <ExternalLink
                  className="c-about-card__text2 stretched-link"
                  url="https://labonneboite.pole-emploi.fr/"
                  title="Trouver des entreprises qui recrutent sans déposer d'offres d'emploi"
                />
              </div>
            </div>
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img src={logoMaintenant} width="134" alt={"Redirection vers le site Maintenant"} />
              </div>
              <div className="c-about-card__content">
                <ExternalLink
                  className="c-about-card__text2 stretched-link"
                  url="https://maintenant.pole-emploi.fr/"
                  title="Vous valez plus qu'un CV ! Trouvez le bon job en moins de 5 minutes"
                />
              </div>
            </div>
          </div>

          <div className="card-deck">
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img src="/images/logo-memo.png" width="114" className={"c-about-card__img--memo"} alt={"Redirection vers le site Mémo"} />
              </div>
              <div className="c-about-card__content">
                <ExternalLink
                  className="c-about-card__text2 stretched-link"
                  url="https://memo.pole-emploi.fr/"
                  title="Organiser votre recherche d'emploi avec notre tableau de bord"
                />
              </div>
            </div>
            <div className="card c-about-card c-about-card--small mt-3 mb-4">
              <div className="c-about-card__img2">
                <img src={logoAvril} width="114" className={"c-about-card__img--avril"} alt={"Redirection vers le site Avril"} />
              </div>
              <div className="c-about-card__content">
                <ExternalLink
                  className="c-about-card__text2 stretched-link"
                  url="https://avril.pole-emploi.fr/"
                  title="Trouvez une formation en fonction de votre profil ET du marché du travail"
                />
              </div>
            </div>
          </div>

          <h2 className="c-about-title">Autres liens utiles</h2>
          <div className="c-about-others">
            <div className="c-about-other">
              <div className="c-about-otherleft">
                <span className="c-about-otherbullet">•</span>
                <span className="c-about-otherlink">
                  <ExternalLink url="https://diagoriente.beta.gouv.fr/" title="Diagoriente" />
                </span>
              </div>
              <div className="c-about-otherright">
                <span className="c-about-otherdescr">
                  Outil d'orientation complet qui permet d'accéder à des pistes métiers en adéquation avec ses intérêts.
                </span>
              </div>
            </div>
            <div className="c-about-other">
              <div className="c-about-otherleft">
                <span className="c-about-otherbullet">•</span>
                <span className="c-about-otherlink">
                  <ExternalLink
                    url="https://www.parcoursup.fr/index.php?desc=formations_apprentissage"
                    title="Parcoursup"
                  />
                </span>
              </div>
              <div className="c-about-otherright">
                <span className="c-about-otherdescr">Les conseils de parcoursup pour entrer en apprentissage.</span>
              </div>
            </div>
            <div className="c-about-other">
              <div className="c-about-otherleft">
                <span className="c-about-otherbullet">•</span>
                <span className="c-about-otherlink">
                  <ExternalLink url="https://www.parcoursup.fr/index.php?desc=services_numeriques" title="Parcoursup" />
                </span>
              </div>
              <div className="c-about-otherright">
                <span className="c-about-otherdescr">
                  Les services d’aide à l’orientation vers les études supérieures proposés par Parcoursup.
                </span>
              </div>
            </div>
            <div className="c-about-other">
              <div className="c-about-otherleft">
                <span className="c-about-otherbullet">•</span>
                <span className="c-about-otherlink">
                  <ExternalLink url="https://www.myjobglasses.com/" title="Myjobglasses" />
                </span>
              </div>
              <div className="c-about-otherright">
                <span className="c-about-otherdescr">
                  Myjobglasses vous aide à identifier le métier qui vous correspond.
                </span>
              </div>
            </div>
            <div className="c-about-other">
              <div className="c-about-otherleft">
                <span className="c-about-otherbullet">•</span>
                <span className="c-about-otherlink">
                  <ExternalLink
                    url="https://openclassrooms.com/fr/courses/6003601-decouvrez-lalternance"
                    title="Openclassrooms"
                  />
                </span>
              </div>
              <div className="c-about-otherright">
                <span className="c-about-otherdescr">
                  Profitez d’un cours en ligne gratuit pour découvrir l'alternance.
                </span>
              </div>
            </div>
            <div className="c-about-other">
              <div className="c-about-otherleft">
                <span className="c-about-otherbullet">•</span>
                <span className="c-about-otherlink">
                  <ExternalLink url="https://www.1jeune1solution.gouv.fr/" title="#1jeune1solution" />
                </span>
              </div>
              <div className="c-about-otherright">
                <span className="c-about-otherdescr">
                  je suis jeune, je découvre toutes les solutions pour préparer mon avenir.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default APROPOS;
