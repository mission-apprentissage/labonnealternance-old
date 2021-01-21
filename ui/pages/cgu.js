import React, { useEffect } from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";
import ScrollToTop from "components/ScrollToTop";

import Footer from "components/footer";

const FAQ = (props) => {
  return (
    <div>
      <ScrollToTop />
      <Navigation bgcolor="is-white" />

      <Breadcrumb forPage="faq" label="FAQ" />

      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            <h1>
              <span className="d-block c-page-title is-color-1">Conditions</span>
              <span className="d-block c-page-title is-color-2">générales</span>
              <span className="d-block c-page-title is-color-2">d'utilisation</span>
            </h1>
            <hr className="c-page-title-separator" align="left" />
          </div>
          <div className="col-12 col-md-7">
            <h3 className="mb-3">Conditions d'utilisation</h3>
            <p>
              L’utilisateur du service doit respecter ces conditions générales d’utilisation. Elles peuvent être modifiées par Pôle emploi. L’utilisateur est donc invité à consulter régulièrement la dernière version mise à jour.
            </p>
            <section>
              <h2 className="c-faq-question mt-2">1. Mentions légales</h2>
              <p className="mb-0">
                <strong>Editeur</strong>
              </p>
              <p className="mb-0">
                Pôle Emploi
              </p>
              <p className="mb-0">
                15 avenue du Docteur Gley
              </p>
              <p className="mb-0">
                75987 Paris cedex 20
              </p>
              <p className="mb-0">
                Tél. 01 40 30 60 00
              </p>
              <p className="mt-2 mb-0">
                <strong>Directeur de la publication</strong>
              </p>
              <p className="mb-0">
                Monsieur Jean Bassères, Directeur général.
              </p>
              <p className="mt-2 mb-0">
                <strong>Hébergeur</strong>
              </p>
              <p className="mb-0">
                OVH
              </p>
              <p className="mb-0">
                2 rue Kellermann
              </p>
              <p className="mb-0">
                59100 Roubaix
              </p>
              <p className="mb-0">
                Tél. 09 72 10 10 07
              </p>
            </section>
            <section>
              <h2 className="c-faq-question mt-2">2. Objet du site</h2>
              <p>
                Le site internet <a href="labonnealternance.pole-emploi.fr">labonnealternance.pole-emploi.fr</a> a pour objet de faciliter les entrées en alternance des usagers en informant sur les formations en apprentissage ainsi que les offres d’emplois et entreprises auprès desquelles adresser une candidature.
              </p>
              <p>
                L’utilisateur peut filtrer tout ou partie des informations à l’aide des filtres suivants : niveau de diplôme préparé, secteur d’emploi et secteur géographique.
              </p>
            </section>
            <section>
              <h2 className="c-faq-question mt-2">3. Fonctionnement de la Bonne Alternance</h2>
              <p>
                Le service proposé sur le site <a href="labonnealternance.pole-emploi.fr">labonnealternance.pole-emploi.fr</a> permet à l’utilisateur de rechercher des formations et/ou entreprises susceptibles d’embaucher en alternance des profils similaires au sien, en fonction des données qu’il a saisies (domaine/métier, niveau de diplôme, secteur géographique).
              </p>
              <p>
                Les résultats de recherche sont accessibles en liste et sur une carte. Ils sont classés en fonction de leur proximité géographique par rapport au périmètre défini par l’utilisateur.
              </p>
              <p>
                Lorsque celles-ci sont renseignées, l’utilisateur peut entrer en contact avec l’entreprise ou l’organisme au moyen des coordonnées indiquées sur la fiche de l’entreprise ou de l’organisme.
              </p>
              <p>
                À tout moment, chaque entreprise peut d’une part s’opposer à ce que son nom apparaisse dans les résultats de recherche ou d’autre part, demander à être mise en avant.
              </p>
              <p>
                Elle peut également demander la modification/suppression des informations communiquées (ex. coordonnées) sur le site La Bonne Alternance en remplissant le formulaire recruteur directement depuis la page d’accueil du site.
              </p>
            </section>
            <section>
              <h2 className="c-faq-question mt-2">4. Protection des données à caractère personnel</h2>
              <p>
                Les moteurs de recherche disponibles sur le site internet La B bonne Aalternance peuvent recueillir :
              </p>
              <ul>
                <li>le domaine/métier/formation envisagé</li>
                <li>le niveau de diplôme souhaité</li>
                <li>le périmètre géographique de recherche</li>
              </ul>
              <p>
                Pôle emploi traite également des données relatives aux entreprises qui peuvent concerner directement des personnes physiques, notamment les coordonnées des interlocuteurs personnes physiques de ces entreprises.
              </p>
              <p>
                Ces données sont collectées et traitées par Pôle emploi uniquement dans le but de fournir, à la requête de l’utilisateur, des résultats de recherche pertinents, correspondant aux attentes de l’usager.
              </p>
              <p>
                S’agissant des coordonnées de contact, les destinataires des données sont les utilisateurs du site internet La Bonne Alternance. S’agissant des données relatives aux utilisateurs concernant leur recherche, seul Pôle emploi a accès aux données.
              </p>
              <p>
                Pôle emploi est le responsable de ce traitement. Ses coordonnées sont les suivantes : Pôle Emploi, 1-5 rue du docteur Gley, 75987, Paris cedex 20. Au titre de la licéité du traitement exigée par l’article 6 du règlement général (UE) sur la protection des données n°2016/679 du 27 avril 2016 (RGPD), le fondement juridique du traitement est la mission d’intérêt public dont est investi Pôle emploi en vertu de l’article L.5312-1 du code du travail qui consiste notamment à mettre en relation l’offre et la demande d’emploi.
              </p>
              <p>
                Conformément aux articles 12 à 23 du règlement général (UE) sur la protection des données n°2016/679 du 27 avril 2016 et à la loi Informatique et libertés n°78-17 du 6 janvier 1978 modifiée, vous bénéficiez d’un droit d’accès, de rectification, de limitation, de définir des directives sur le sort des données après votre mort et le droit de porter une réclamation devant la Commission nationale de l’informatique et des libertés pour les données vous concernant. Pour exercer vos droits, vous pouvez vous adresser au délégué à la protection des données de Pôle emploi (1 avenue du Docteur Gley, 75987 Paris cedex 20 ; courriers-cnil@pole-emploi.fr)
              </p>
            </section>
            <section>
              <h2 className="c-faq-question mt-2">5. Cookies</h2>
              <h3 className="mt-2 h6">5.1 Qu'est-ce qu'un cookie ?</h3>
              <p>
                Un cookie est un petit fichier texte déposé sur le terminal des utilisateurs (par exemple, un ordinateur, une tablette, un smartphone, etc.) lors de la visite d’un site internet.
              </p>
              <p>
                Il contient plusieurs données : le nom du serveur qui l’a déposé, un identifiant sous forme de numéro unique, et une date d’expiration. Les cookies ont différentes fonctionnalités. Ils ont pour but d’enregistrer les paramètres de langue d’un site, de collecter des informations relatives à votre navigation sur les sites, d’adresser des services personnalisés, etc.
              </p>
              <p>
                Seul l’émetteur d’un cookie est susceptible de lire, enregistrer ou de modifier les informations qui y sont contenues.
              </p>
              <h3 className="my-2 h6">5.2 Les cookies déposés sur La Bonne Alternance</h3>
              <h4 className="h6">
                Les cookies strictement nécessaires au fonctionnement du site internet
              </h4>
              <p>Des cookies sont utilisés sur le site internet La Bonne Alternance pour permettre le bon fonctionnement du site internet et l’utilisation des principales fonctionnalités du site : <a href="/rgpd">RGPD</a>.</p>
              <p>Sans ces cookies, l’utilisation du site peut être dégradée. L’utilisateur peut cependant s’opposer à leur dépôt en suivant les indications données au point 5.3.</p>
              <h4 className="h6">Les cookies statistiques ou de mesure d’audience</h4>
              <p>Le site internet La Bonne Alternance utilise des cookies, y compris des cookies déposés par des tiers (ex. Google, Hotjar), ayant pour finalité la mesure d’audience dans le but d'améliorer l'expérience utilisateur et la performance du site internet. L’utilisateur peut paramétrer le dépôt des cookies en suivant les indications données au point 5.3.</p>
              <h3 className="my-2 h6">5.3 Accepter ou refuser les cookies</h3>
              <p>
                L’utilisateur peut accepter ou refuser le dépôt de tout ou partie des cookies, à tout moment, en modifiant les paramètres de son navigateur (consulter la fonction « Aide » du navigateur pour en savoir plus) ou en se rendant sur l’une des pages suivantes, selon le navigateur utilisé :
              </p>
              <ul>
                <li>Google Chrome : <a href="https://support.google.com/chrome/answer/95647?hl=fr">https://support.google.com/chrome/answer/95647?hl=fr</a></li>
                <li>Internet Explorer : <a href="https://support.microsoft.com/fr-fr/help/17442">https://support.microsoft.com/fr-fr/help/17442</a></li>
                <li>Mozilla Firefox : <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies">https://support.mozilla.org/fr/kb/activer-desactiver-cookies</a></li>
                <li>Safari : <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac">https://support.apple.com/fr-fr/guide/safari/sfri11471/mac</a></li>
              </ul>
              <p>Pour information, la plupart des navigateurs acceptent par défaut le dépôt de cookies.</p>
              <p>
                Pour plus d’informations sur les cookies et les moyens permettant d’empêcher leur installation, l’utilisateur peut se rendre sur la page dédiée sur le site internet de la CNIL : <a href="www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser.">www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser.</a>
              </p>
            </section>
            <section>
              <h2 className="c-faq-question mt-2">6. Responsabilité</h2>
              <p>
                Les informations publiées sur le site internet La Bonne Alternance sont fournies à titre indicatif et peuvent être modifiées à tout moment. Pôle emploi ne garantit pas l’exhaustivité des résultats de recherche ni l’absence d’erreurs dans les résultats communiqués.
              </p>
              <p>
                Pôle emploi ne saurait être tenu pour responsable vis-à-vis de l’utilisateur des dommages résultant de l’utilisation du site internet La Bonne Alternance, de l’impossibilité d’y accéder et de l’utilisation des sites tiers vers lesquels le site redirige.
              </p>
            </section>
            <section>
              <h2 className="c-faq-question mt-2">7. Obligations de l'utilisateur</h2>
              <p>
                L’utilisation du site internet <a href="https://labonnealternance.pole-emploi.fr">labonnealternance.pole-emploi.fr</a> est soumise au respect par l’utilisateur :
              </p>
              <ul>
                <li>de la législation française;</li>
                <li>des présentes conditions d’utilisation;</li>
                <li>des conditions d’utilisation de l’Emploi store disponibles à l’adresse suivante : <a href="http://www.emploi-store.fr/portail/conditionsgeneralesutilisation">http://www.emploi-store.fr/portail/conditionsgeneralesutilisation</a>.</li>
              </ul>
            </section>
            <section>
              <h2 className="c-faq-question mt-2">8. Propriété intellectuelle</h2>
              <p>
                Les marques Pôle emploi et La Bonne Alternance sont protégées au titre des articles L.712-1 et suivants du code de la propriété intellectuelle. Toute représentation, reproduction ou diffusion, intégrale ou partielle de la marque Pôle emploi et/ou de la marque La Bonne Alternance, sur quelque support que ce soit, sans l'autorisation expresse et préalable de Pôle emploi constitue un acte de contrefaçon, sanctionné en application de l’article L.716-1 du même code.
              </p>
              <p>
                Par ailleurs, le site <a href="https://labonnealternance.pole-emploi.fr">labonnealternance.pole-emploi.fr</a> contient des contenus sur lesquels des tiers détiennent des droits de propriété intellectuelle (dessin, graphisme, marque, etc.) ou un droit à l’image (photo, visuel mettant en scène une personne physique, vidéo, etc.). Les internautes ne sont pas autorisés à réutiliser ces contenus en l’absence de l’autorisation préalable et expresse de ces tiers.
              </p>
            </section>
          </div>
        </div>
      </div>
      <div className="mb-3">&nbsp;</div>
      <Footer />
    </div>
  );
};

export default FAQ;
