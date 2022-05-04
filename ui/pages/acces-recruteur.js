import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import { NextSeo } from "next-seo";

import Footer from "components/footer";
import ExternalLink from "@/components/externalLink";

const AccesRecruteur = () => (
  <div>
    <NextSeo
      title="Acces recruteur | La Bonne Alternance | Trouvez votre alternance"
      description="Exprimez votre besoin en alternance. Aucune inscription ne vous sera demandée."
    />

    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="acces-recruteur" label="Accès recruteur" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-1">Informations </span>
            <span className="d-block c-page-title is-color-2">Recruteur</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>

        <div className="col-12 col-md-7">
          <p className="mb-3">Dernière mise à jour le : 06/05/2021</p>
          <div className="c-recruteur-hero p-5 mb-5">
            <h2 className="c-recruteur-hero-title">Exprimez votre besoin en alternance</h2>
            <p className="c-recruteur-hero-text">
              Notre service Matcha vous permet de publier en quelques minutes vos offres sur{" "}
              <strong>La Bonne Alternance.</strong>
            </p>
            <div className="mb-2">
              <ExternalLink
                className="btn btn-primary ml-1"
                url="https://matcha.apprentissage.beta.gouv.fr/creation/entreprise/lba"
                title="Publier une offre d'emploi en alternance"
              />
            </div>
            <div>
              <small>
                <em>Aucune inscription ne vous sera demandée</em>
              </small>
            </div>
          </div>
          <section>
            <h2 className="mb-3 h5 c-recruteur-title">
              Conditions d’affichage des offres d'emploi sur La Bonne Alternance
            </h2>
            <p>
              Seules les offres d'emploi en contrat d’apprentissage et en contrat de professionnalisation sont visibles
              sur La Bonne Alternance.
            </p>
            <p>
              Nous consommons l’API offres de Pôle emploi : par conséquent, votre offre d’emploi est visible sur La
              Bonne Alternance si :
            </p>
            <ul>
              <li>
                vous l’avez publiée sur &nbsp;
                <ExternalLink
                  url="https://pole-emploi.fr"
                  withPic={<img className="mt-n1" src="/images/square_link.svg" alt="Lien pole-emploi.fr" />}
                  picPosition="left"
                  title={<span className="ml-1">pole-emploi.fr</span>}
                />
                &nbsp; ou &nbsp;
                <ExternalLink
                  url="https://1jeune1solution.gouv.fr"
                  withPic={<img className="mt-n1" src="/images/square_link.svg" alt="Lien pole-emploi.fr" />}
                  picPosition="left"
                  title={<span className="ml-1">1jeune1solution.gouv.fr</span>}
                />
              </li>
              <li>
                vous l’avez publiée auprès de l’un des partenaires de &nbsp;
                <ExternalLink
                  url="https://pole-emploi.fr"
                  withPic={<img className="mt-n1" src="/images/square_link.svg" alt="Lien pole-emploi.fr" />}
                  picPosition="left"
                  title={<span className="ml-1">Pôle Emploi</span>}
                />
                , et que ce dernier a ouvert la multidiffusion de votre offre
              </li>
              <li>
                vous utilisez l’API "Je transfère mes offres" qui permet à Pôle emploi de recueillir directement votre
                offre depuis votre SIRH, et que l'option "multidiffusion" de l'offre est activée
              </li>
              <li>vous utilisez un multiposteur qui a opté pour la multidiffusion de votre offre à Pôle emploi</li>
            </ul>
          </section>
          <section className="mt-4">
            <h2 className="mb-3 h5 c-recruteur-title">
              Condition d’affichage des entreprises sans offre, pour réception de candidatures spontanées
            </h2>
            <p>
              Les entreprises présentes sur La Bonne Alternance sans offre d’emploi sont identifiées grâce à un
              algorithme prédictif. Ce dernier analyse les recrutements en alternance des 6 années passées afin de
              prédire ceux des 6 mois à venir.
            </p>
            <p>
              La liste d’entreprises est mise à jour tous les mois. Vous pouvez demander le référencement ou le
              déréférencement sur La Bonne Alternance grâce à ce &nbsp;
              <ExternalLink
                url="https://labonneboite.pole-emploi.fr/informations-entreprise/action"
                withPic={<img className="mt-n1" src="/images/square_link.svg" alt="Lien formulaire la bonne boîte" />}
                picPosition="left"
                title={<span className="ml-1">formulaire</span>}
              />
              &nbsp;
            </p>
          </section>
          <section className="mt-4">
            <h2 className="mb-3 h5 c-recruteur-title">
              Vous souhaitez modifier vos coordonnées de contact ou obtenir une autre information ?
            </h2>
            <p>
              Accédez à ce &nbsp;
              <ExternalLink
                url="https://labonneboite.pole-emploi.fr/informations-entreprise/action"
                withPic={<img className="mt-n1" src="/images/square_link.svg" alt="Lien formulaire la bonne boîte" />}
                picPosition="left"
                title={<span className="ml-1">formulaire</span>}
              />
              &nbsp; pour nous transmettre votre demande.
            </p>
          </section>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default AccesRecruteur;
