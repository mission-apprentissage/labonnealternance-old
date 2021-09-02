import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";
import { NextSeo } from "next-seo";

import Footer from "components/footer";

const Cookies = () => (
  <div>
    <NextSeo
      title="Cookies | La Bonne Alternance | Trouvez votre alternance"
      description="Politique de confidentialité, traitement des données à caractère personnel sur le site de La Bonne Alternance."
    />

    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="cookies" label="Cookies" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-2">Cookies</span>
            <span className="d-block c-page-title is-color-2">et autres traceurs</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h2 class="h3">1. Qu'est-ce qu'un cookie ?</h2>
          <p>
            <span className="d-block">Un cookie est un petit fichier texte déposé sur le terminal des utilisateurs (par  exemple un ordinateur, une tablette, un « Smartphone», etc.) lors de la visite d’un site internet.</span>
          </p>
          <p>
            <span className="d-block">Il contient plusieurs données : le nom du serveur qui l’a déposé, un identifiant sous forme de numéro unique, et une date d’expiration. Les cookies ont différentes fonctionnalités. Ils ont pour but d’enregistrer les paramètres de langue d’un site, de collecter des informations relatives à votre navigation sur les sites, d’adresser des services personnalisés, etc.</span>
          </p>
          <p>
            <span className="d-block">Seul l’émetteur d’un cookie est susceptible de lire, enregistrer ou de modifier les informations qui y sont contenues.</span>
          </p>

          <h2 class="h3">2. Les cookies déposés sur le site</h2>
          <h3 class="h4">Cookies strictement nécessaires au fonctionnement du site</h3>
          <p>
            <span className="d-block">
              Des cookies sont utilisés sur le site 
              <a href="https://labonnealternance.pole-emploi.fr/" target="_blank" rel="noopener noreferrer">La Bonne Alternance</a>
              La Bonne Alternance pour permettre le bon fonctionnement du site internet et l’utilisation des principales fonctionnalités du site.</span>
          </p>
          <p>
            <span className="d-block">Ces cookies ne sont pas soumis au consentement de l’utilisateur. Ils permettent par exemple le maintien de la connexion ou la conservation du choix de l’usager sur le dépôt des cookies. Sans ces cookies, l’utilisation du site peut être dégradée et l’accès à certains services être rendu impossible. Il est déconseillé de les désactiver.</span>
          </p>
          <p>
            <span className="d-block">L’utilisateur peut cependant s’opposer à leur dépôt en suivant les indications données au point 3.</span>
          </p>
          
          <h3 class="h4">Cookies statistiques ou de mesure d’audience</h3>
          <p>
            <span className="d-block">
              Des cookies sont utilisés sur le site 
              <a href="https://labonnealternance.pole-emploi.fr/" target="_blank" rel="noopener noreferrer">La Bonne Alternance</a>
              afin d’effectuer de la mesure d’audience, des analyses statistiques dans le but d'améliorer l'expérience utilisateur et la performance du site internet. Ces cookies sont déposés par des tiers pour le compte de Pôle emploi.
            </span>
          </p>
          <p>
            <span className="d-block">
              Concernant le dépôt des cookies Google Analytics et Google Optimize, 
              la société Google collecte par l’intermédiaire de ce cookie des données pour son propre compte dans les conditions définies dans sa politique de confidentialité accessible par le lien suivant : 
              <a href="https://policies.google.com/technologies/partner-sites?gl=fr" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/partner-sites?gl=fr</a>
            </span>
          </p>
          <p>
            <span className="d-block">L’utilisateur peut paramétrer le dépôt des cookies en suivant les indications données au point 3. Le fait de refuser la mise en œuvre de tels cookies n'a pas d'incidence sur la navigation sur le site.</span>
          </p>
          <p>
            <span className="d-block">Pour plus d’informations sur les cookies notamment sur le type de cookies déposés ainsi que leurs finalités précises, vous pouvez consulter la plateforme de gestion du consentement, disponible ici.</span>
          </p>


        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default Cookies;
