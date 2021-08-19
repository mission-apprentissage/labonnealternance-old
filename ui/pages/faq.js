import React, { useEffect } from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";
import ScrollToTop from "components/ScrollToTop";
import { NextSeo } from "next-seo";

import Footer from "components/footer";

const FAQ = (props) => {
  return (
    <div>
      <NextSeo
        title="F.A.Q | La Bonne Alternance | Trouvez votre alternance"
        description="Questions fréquemment posées. Résultats entreprises, résultats formations, etc."
      />

      <ScrollToTop />
      <Navigation bgcolor="is-white" />

      <Breadcrumb forPage="faq" label="FAQ" />

      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            <h1>
              <span className="d-block c-page-title is-color-1">Questions</span>
              <span className="d-block c-page-title is-color-2">fréquemment</span>
              <span className="d-block c-page-title is-color-2">posées</span>
            </h1>
            <hr className="c-page-title-separator" align="left" />
          </div>
          <div className="col-12 col-md-7">
            <h3 className="mb-3">Résultats Entreprises</h3>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question is-first">Pourquoi toutes les entreprises ne sont pas dans la liste ?</h2>
              <p className="c-faq-answer">
                La Bonne Alternance est bien plus qu'un simple annuaire. La Bonne Alternance effectue un ciblage
                spécifique des entreprises à fort potentiel d'embauche afin de vous faire gagner du temps dans la
                sélection des entreprises à démarcher. Toutes les entreprises ne sont donc pas indiquées.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">Pourquoi certains métiers ne sont pas proposés ?</h2>
              <p className="c-faq-answer">
                Tout d'abord, certains métiers ne sont pas accessibles en alternance, c'est pourquoi ils ne sont pas
                proposés. Néanmoins, la sélection d'un domaine d'activité permet d'obtenir des résultats sur des métiers
                connexes.
                <br />
                Ensuite, La Bonne Alternance vous indique uniquement les entreprises en cours d'embauche ou à fort
                potentiel d'embauche en fonction du métier sélectionné ; parfois (mais cela reste rare) l'algorithme ne
                détecte malheureusement pas d'entreprise à fort potentiel d'embauche et il n'y a pas non plus d'offre
                d'emploi en cours de diffusion pour le métier concerné.
                <br />
                Enfin, La Bonne Alternance utilise le Répertoire Opérationnel des Métiers et des Emplois (ROME). Seuls
                les métiers et appellations présents dans ce répertoire sont disponibles.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">Si je candidate auprès d’une entreprise affichée sur La Bonne Alternance, suis-je obligé de suivre une formation dans un organisme proposé par La Bonne Alternance ?</h2>
              <p className="c-faq-answer">
                Non, il n’y a pas d’obligation : vous pouvez indépendamment postuler dans une des entreprises affichées par La Bonne Alternance et suivre une formation dans l’organisme de votre choix, même s’il n’est pas affiché sur La Bonne Alternance.
                <br />
                En effet, même si la plupart le font, certains organismes de formations choisissent de ne pas se référencer dans la base nationale des formations en apprentissage.
                <br />
                Précision utile : certains Centres de Formation des Apprentis (CFA) sont des CFA d’entreprise : postuler auprès d’une entreprise liée à ce type de CFA implique obligatoirement de suivre la formation dans ce CFA.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">Comment est calculée la distance indiquée ?</h2>
              <p className="c-faq-answer">
                Les distances indiquées sont les distances à vol d'oiseau. Si vous constatez tout de même une erreur,
                vous pouvez nous la signaler grâce au lien <a href="/contact">"contact"</a>  en bas de l'écran.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">
                Pourquoi il n'y a pas toujours de précisions sur les profils recherchés ?
              </h2>
              <p className="c-faq-answer">
                La Bonne Alternance centralise deux types de résultats :<br />
                <ul>
                  <li>
                    les offres d'emploi en apprentissage (les offres en contrat de professionnalisation ne sont pour le
                    moment pas disponibles)
                  </li>
                  <li>
                    les entreprises à fort potentiel d'embauche qui n'ont pas d'offre d'emploi en cours de diffusion. Il
                    s'agit d'entreprises ciblées auprès desquelles vous pouvez envoyer des candidatures spontanées. Ces
                    dernières ne présentent pas d'information spécifiques sur les profils recherchés.
                  </li>
                </ul>
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">Pourquoi manque-t-il parfois des coordonnées : courriel, téléphone…?</h2>
              <p className="c-faq-answer">
                La Bonne Alternance vous indique uniquement les coordonnées dont dispose Pôle emploi.
                <br />
                La mise à jour des coordonnées est réalisée par les entreprises.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">
                J'ai une suggestion d'amélioration de La Bonne Alternance, comment puis-je vous la transmettre ?
              </h2>
              <p className="c-faq-answer">
                Merci de nous aider à améliorer le service ! Vous pouvez nous transmettre vos suggestions grâce au lien <a href="/contact">"contact"</a> situé en bas de cet écran.
              </p>
            </div>
            <h3 className="mt-5 mb-3">Résultats Formations</h3>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">Pourquoi toutes les formations ne sont pas dans la liste ?</h2>
              <p className="c-faq-answer">
                La Bonne Alternance répertorie uniquement les formations en apprentissage. <br />
                Les formations présentes dans La Bonne Alternance sont celles que les organismes ont référencées.
                <br />
                Si vous êtes un organisme de formation et que vous souhaitez référencer une formation en apprentissage
                sur La Bonne Alternance, rendez-vous sur votre espace "Organisme de Formation" en haut de page.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">
                Toutes les formations disponibles dans La Bonne Alternance sont-elles aussi référencées sur Parcoursup et/ou Affelnet ?
              </h2>
              <p className="c-faq-answer">
                Pour figurer sur La Bonne Alternance, les organismes doivent référencer leurs formations auprès du Carif-Oref. Les conditions d'inscription sur Parcoursup ou Affelnet sont propres à ces plateformes et consultables <a href="https://catalogue.apprentissage.beta.gouv.fr/guide-reglementaire">ici</a>
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">
                Pourquoi les formations proposées ne correspondent pas au lieu de ma recherche ?
              </h2>
              <p className="c-faq-answer">
                Quand il n'y a pas de formation existante par rapport au domaine et à la zone géographique sélectionnée,
                nous vous affichons la formation correspondant au domaine sélectionné la plus proche de la localisation.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">
                Pourquoi je ne retrouve pas le métier recherché dans la liste proposée ?
              </h2>
              <p className="c-faq-answer">
                Lorsque vous renseignez un mot clé, un métier, un domaine ou même un endroit (par exemple : crèche), La
                Bonne Alternance vous propose des domaines derrière lesquels se trouvent le mot-clé, le métier que vous
                avez renseigné (ainsi, si vous renseignez le mot "bébé", nous vous proposons de sélectionner le domaine
                "assistance auprès d'enfants, puériculture", qui correspond aux métiers qui sont en lien avec les
                bébés).
                <br />
                Nous analysons régulièrement les termes de recherche qui n'ont pas permis d'afficher un domaine à
                sélectionner afin d'enrichir la liste de mots-clés.
                <br />
                Un domaine peut regrouper un ou plusieurs métiers.
                <br />
                Nous essayons d'améliorer cette liste de domaines avec des intitulés compréhensibles des utilisateurs :
                si vous avez une suggestion d'amélioration, vous pouvez nous la transmettre grâce au lien <a href="/contact">"contact"</a>                situé en bas de l'écran.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">Pourquoi il y a parfois plusieurs fois le même intitulé de formation ?</h2>
              <p className="c-faq-answer">
                Dans la base de données des formations en apprentissage, il manque parfois une information sur le code
                postal exact des lieux de formation pour un même établissement. Dans ce cas, nous affichons la localité
                de l'établissement qui gère l'ensemble des lieux : cela peut conduire à des doublons que nous corrigeons
                au fur et à mesure.
                <br />
                De la même manière, il existe parfois deux résultats en apparence identiques mais qui correspondent en
                fait à la 1ère année et la 2ème année du même diplôme. Nous corrigeons également ces cas de figure au
                fur et à mesure.
              </p>
            </div>
            <div className="c-faq-question-block">
              <h2 className="c-faq-question">
                Pourquoi le détail des formations ne mentionne pas certaines informations (rythme de la formation,
                descriptif, …) ?
              </h2>
              <p className="c-faq-answer">
                Le site La Bonne Alternance évolue en continu. Nous travaillons à alimenter les informations au fur et à
                mesure de leur disponibilité. Le contenu est donc susceptible d'évoluer et de s'enrichir par la suite.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-3">&nbsp;</div>
      <Footer />
    </div>
  );
};

export default FAQ;
