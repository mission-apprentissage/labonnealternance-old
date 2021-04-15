import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";
const RGPD = () => (
  <div>
    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="rgpd" label="RGPD" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-2">Politique de confidentialité</span>
            <span className="d-block c-page-title is-color-2">La Bonne Alternance</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>
        <div className="col-12 col-md-7">
          <h2 class="h3">Traitement des données à caractère personnel</h2>
          <p>
            <span className="d-block">Le présent site La Bonne Alternance est à l’initiative de Pôle emploi, qui est responsable de traitement :</span>
            <span className="d-block">Pôle emploi</span>
            <span className="d-block">1-5 rue du docteur Gley</span>
            <span className="d-block">75987 Paris cedex 20</span>
          </p>

          <h2 class="h3">Finalité</h2>
          <p>
            <span className="d-block">Le site « La Bonne Alternance » vise à faciliter les entrées en alternance des usagers en informant sur les formations en apprentissage ainsi que les offres d’emplois et entreprises auprès desquelles adresser une candidature. Le traitement de données a donc pour finalité de fournir, sur requête de l’utilisateur, des résultats de recherche pertinents correspondant aux attentes de l’usager.</span>
          </p>
          
          <h2 class="h3">Données à caractère personnel traitées</h2>
          <p>
            <span className="d-block">Sont traitées les données suivantes :</span>
            <ul>
              <li>domaine/métier/formation envisagé ;</li>
              <li>niveau de diplôme souhaité ;</li>
              <li>périmètre géographique de recherche ;</li>
              <li>coordonnées des interlocuteurs physiques des entreprises ;</li>
              <li>données de connexion (et notamment, les identifiants de connexion, nature des opérations, date et heure de l’opération) ;</li>
              <li>cookies.</li>
            </ul>
          </p>
          
          <h2 class="h3">Base juridique du traitement de données</h2>
          <h3 class="h4">a. Données de connexion</h3>
          <p>
            <span className="d-block">Ce traitement est nécessaire au respect d'une obligation légale à laquelle le responsable de traitement est soumis au sens de l'article 6-c du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données.</span>
          </p>
          <p>
            <span className="d-block">L'obligation légale est posée par la loi LCEN n° 2004-575 du 21 juin 2004 pour la confiance
dans l'économie numérique et par les articles 1 et 3 du décret n°2011-219 du 25 février 2011.</span>
          </p>
          <h3 class="h4">b. Cookies</h3>
          <p>
            <span className="d-block">En application de l’article 5(3) de la directive 2002/58/CE modifiée concernant le traitement des données à caractère personnel et la protection de la vie privée dans le secteur des communications électroniques, transposée à l’article 82 de la loi n°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, les traceurs ou cookies suivent deux régimes distincts.</span>
          </p>
          <p>
            <span className="d-block">Les cookies strictement nécessaires au service ou ayant pour finalité exclusive de faciliter la communication par voie électronique sont dispensés de consentement préalable au titre de l’article 82 de la loi n°78-17 du 6 janvier 1978.</span>
          </p>
          <p>
            <span className="d-block">Les cookies n’étant pas strictement nécessaires au service ou n’ayant pas pour finalité exclusive de faciliter la communication par voie électronique doivent être consenti par l’utilisateur.</span>
          </p>
          <p>
            <span className="d-block">Ce consentement de la personne concernée pour une ou plusieurs finalités spécifiques constitue une base légale au sens du RGPD et doit être entendu au sens de l'article 6-a du Règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données.</span>
          </p>
          <h3 class="h4">c. Toutes les autres données</h3>
          <p>
            <span className="d-block">Les autres données sont traitées sur la base de l’exécution d’une mission d’intérêt public, en vertu de l’article L.5312-1 du Code du Travail qui consiste notamment à mettre en relation l’offre et la demande d’emploi.</span>
          </p>

          <h2 class="h3">Durée de conservation</h2>
          <p>
            <span className="d-block">Les données à caractère personnel sont conservées :</span>
            <ul>
              <li>Données de connexion : 12 mois (article 3 du Décret n° 2011-219 du 25 février 2011).</li>
              <li>Cookies : 13 mois maximum, ou jusqu’au retrait du consentement de la personne.</li>
              <li>Toutes les autres données : 2 ans</li>
            </ul>
          </p>

          <h2 class="h3">Droit des personnes concernées</h2>
          <p>
            <span className="d-block">Vous disposez des droits suivants concernant vos données à caractère personnel :</span>
            <ul>
              <li>Droit d’information et droit d’accès des données ;</li>
              <li>Droit de rectification et le cas échéant de suppression des données.</li>
            </ul>
            <span className="d-block">Pour les exercer, faites-nous parvenir une demande en précisant la date et l’heure précise de la requête - ces éléments sont indispensables pour nous permettre de retrouver votre recherche :</span>
            <ul>
              <li>par voie électronique à l’adresse suivante : dpo@apprentissage.beta.gouv.fr</li>
              <li>
                <span className="d-block">par voie postale : Fabrique numérique des ministères sociaux</span>
                <span className="d-block">Pôle emploi</span>
                <span className="d-block">1-5 rue du docteur Gley</span>
                <span className="d-block">75987 Paris cedex 20</span>
              </li>
            </ul>
          </p>

        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default RGPD;
