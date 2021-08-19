import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";
import { NextSeo } from "next-seo";

import Footer from "components/footer";
const RGPD = () => (
  <div>
    <NextSeo
      title="RGPD | La Bonne Alternance | Trouvez votre alternance"
      description="Politique de confidentialité, traitement des données à caractère personnel sur le site de La Bonne Alternance."
    />

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
          <div>
            <span className="d-block">Vous disposez des droits suivants concernant vos données à caractère personnel :</span>
            <ul>
              <li>Droit d’information et droit d’accès des données ;</li>
              <li>Droit de rectification et le cas échéant de suppression des données.</li>
            </ul>
            <span className="d-block">Pour les exercer, faites-nous parvenir une demande en précisant la date et l’heure précise de la requête - ces éléments sont indispensables pour nous permettre de retrouver votre recherche :</span>
            <ul>
              <li>par voie électronique à l’adresse suivante : <a target="_blank" rel="noopener noreferrer" href="mailto:dpo@apprentissage.beta.gouv.fr">dpo@apprentissage.beta.gouv.fr</a></li>
              <li>
                <span className="d-block">par voie postale : Fabrique numérique des ministères sociaux</span>
                <span className="d-block">Pôle emploi</span>
                <span className="d-block">1-5 rue du docteur Gley</span>
                <span className="d-block">75987 Paris cedex 20</span>
              </li>
            </ul>
            <p>En raison de l’obligation de sécurité et de confidentialité dans le traitement des données à caractère personnel qui incombe au responsable de traitement, votre demande ne sera traitée que si vous apportez la preuve de votre identité.</p>
            <p>Pour vous aider dans votre démarche, vous trouverez ici <a target="_blank" rel="noopener noreferrer" href="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces">https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces</a>, un modèle de courrier élaboré par la Cnil.</p>
            <p>Nous nous engageons à ne jamais céder ces informations à des tiers.</p>
          </div>

          <h2 class="h3">Délais de réponse</h2>
          <p>
            Le responsable de traitement s’engage à répondre dans un délai raisonnable qui ne saurait dépasser 1 mois à compter de la réception de votre demande.
          </p>

          <h2 class="h3">Destinataires des données</h2>
          <p>Le responsable de traitement s’engage à ce que les données à caractère personnel soient traitées par les seules personnes autorisées.</p>

          <h2 class="h3">Sous-traitants</h2>
          <p>Certaines des données sont envoyées à des sous-traitants pour réaliser certaines missions. Le responsable de traitement s’est assuré de la mise en œuvre par ses sous-traitants de garanties adéquates et du respect de conditions strictes de confidentialité, d’usage et de protection des données.</p>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Partenaire</th>
                <th>Pays destinataire</th>
                <th>Traitement réalisé</th>
                <th>Garanties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OVH</td>
                <td>France</td>
                <td>Hébergement du site</td>
                <td><a style={{wordBreak: "break-all"}} target="_blank" rel="noopener noreferrer" href="https://www.ovh.com/fr/protection-donnees-personnelles/">https://www.ovh.com/fr/protection-donnees-personnelles/</a></td>
              </tr>
              <tr>
                <td>Google Analytics</td>
                <td>USA</td>
                <td>Analyses comportementales et statistiques web</td>
                <td><a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=fr">https://policies.google.com/privacy?hl=fr</a></td>
              </tr>
              <tr>
                <td>Google Tag Manager</td>
                <td>USA</td>
                <td>Gestion de balises</td>
                <td><a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=fr">https://policies.google.com/privacy?hl=fr</a></td>
              </tr>
              <tr>
                <td>Google Optimize</td>
                <td>USA</td>
                <td>Optimisation de site web</td>
                <td>
                  <a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=fr">https://policies.google.com/privacy?hl=fr</a>
                </td>
              </tr>
              <tr>
                <td>Hotjar</td>
                <td>USA</td>
                <td>Analyses comportementales et statistiques web</td>
                <td><a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://www.hotjar.com/legal/policies/privacy/">https://www.hotjar.com/legal/policies/privacy/</a></td>
              </tr>
            </tbody>
          </table>
          <h2 class="h3">Sécurité et confidentialité des données</h2>
          <p>Le responsable de traitements ne conserve pas de données à caractère personnel sur le réseau. Elles sont conservées sur la machine locale de l’utilisateur. Dès lors il en a la maîtrise, et est le seul à même d’en garantir la sécurité et confidentialité.</p>

          <h2 class="h3">Utilisation de témoins de connexion (« cookies »)</h2>
          <p>Un cookie est un fichier déposé sur votre terminal lors de la visite d’un site. Il a pour but de collecter des informations relatives à votre navigation et de vous adresser des services adaptés à votre terminal (ordinateur, mobile ou tablette).</p>
          <p>Nous collectons donc des données par l’intermédiaire de dispositifs appelés “cookies” permettant d’établir des mesures statistiques.</p>
          <p>Le site dépose des cookies de mesure d’audience (nombre de visites, pages consultées), respectant les conditions d’exemption du consentement de l’internaute définies par la recommandation « Cookies » de la Commission nationale informatique et libertés (CNIL), et notamment les cookies strictement nécessaires au bon fonctionnement du site. Nous utilisons également des cookies qui vont être soumis à votre consentement :</p>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Partenaire</th>
                <th>Pays destinataire</th>
                <th>Traitement réalisé</th>
                <th>Garanties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Analytics</td>
                <td>USA</td>
                <td>Analyses comportementales et statistiques web</td>
                <td><a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=fr">https://policies.google.com/privacy?hl=fr</a></td>
              </tr>
              <tr>
                <td>Google Tag Manager</td>
                <td>USA</td>
                <td>Gestion de balises</td>
                <td><a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=fr">https://policies.google.com/privacy?hl=fr</a></td>
              </tr>
              <tr>
                <td>Google Optimize</td>
                <td>USA</td>
                <td>Optimisation de site web</td>
                <td>
                  <a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://policies.google.com/privacy?hl=fr">https://policies.google.com/privacy?hl=fr</a>
                </td>
              </tr>
              <tr>
                <td>Hotjar</td>
                <td>USA</td>
                <td>Analyses comportementales et statistiques web</td>
                <td><a style={{ wordBreak: "break-all" }} target="_blank" rel="noopener noreferrer" href="https://www.hotjar.com/legal/policies/privacy/">https://www.hotjar.com/legal/policies/privacy/</a></td>
              </tr>
            </tbody>
          </table>

          <h2 class="h3">Bouton "modifier les réglages"</h2>
          <p>Le responsable de traitements ne conserve pas de données à caractère personnel sur le réseau. Elles sont conservées sur la machine locale de l’utilisateur. Dès lors il en a la maîtrise, et est le seul à même d’en garantir la sécurité et confidentialité.</p>
          <p>À tout moment, vous pouvez refuser l’utilisation des cookies et désactiver le dépôt sur votre ordinateur ou en utilisant la fonction dédiée de votre navigateur en cliquant sur les liens suivants :</p>
          <ul>
            <li>Google Chrome : <a target="_blank" rel="noopener noreferrer" href="https://support.google.com/chrome/answer/95647?hl=fr">https://support.google.com/chrome/answer/95647?hl=fr</a></li>
            <li>Internet Explorer : <a target="_blank" rel="noopener noreferrer" href="https://support.microsoft.com/fr-fr/help/17442">https://support.microsoft.com/fr-fr/help/17442</a> </li>
            <li>Mozilla Firefox : <a target="_blank" rel="noopener noreferrer" href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies">https://support.mozilla.org/fr/kb/activer-desactiver-cookies</a></li>
            <li>Safari : <a target="_blank" rel="noopener noreferrer" href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac">https://support.apple.com/fr-fr/guide/safari/sfri11471/mac</a></li>
          </ul>
          <p>Pour aller plus loin, vous pouvez consulter les fiches proposées par la Commission Nationale de l’Informatique et des Libertés (CNIL) :</p>
          <ul>
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi">Cookies & traceurs : que dit la loi ?</a></li>
            <li><a target="_blank" rel="noopener noreferrer" href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser">Cookies : les outils pour les maîtriser</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default RGPD;
