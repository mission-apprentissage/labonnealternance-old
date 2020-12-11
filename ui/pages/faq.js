import React from "react";
import Navigation from "components/navigation";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";
const FAQ = () => (
  <div>

    <Navigation bgcolor="is-white"/>
    
    <Breadcrumb forPage="faq"/>

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-1">Questions</span>
            <span className="d-block c-page-title is-color-2">fréquemment</span>
            <span className="d-block c-page-title is-color-2">posées</span>
          </h1>
          <hr className="c-page-title-separator" align="left"/>
        </div>
        <div className="col-12 col-md-7">
          <div className="c-faq-question-block">
            <h2 className="c-faq-question is-first">Il manque des entreprises dans la liste.</h2>
            <p className="c-faq-answer">La Bonne Alternance est bien plus qu’un simple annuaire. La Bonne Alternance effectue un ciblage spécifique des entreprises à fort potentiel d’embauche afin de vous faire gagner du temps dans la sélection des entreprises à démarcher. Toutes les entreprises ne sont donc pas indiquées.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">Il n’est pas précisé si les entreprises embauchent.</h2>
            <p className="c-faq-answer">La Bonne Alternance ne propose pas d’offres d’emploi. Nous ciblons spécifiquement les entreprises ayant un fort potentiel d’embauche et vous mettons à disposition une liste par métier. Vous devez utiliser cette liste dans le cadre de candidatures spontanées. En effet, 75 % des recrutements ne sont jamais diffusés.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">Pourquoi certains secteurs d’activité ne sont pas proposés ?</h2>
            <p className="c-faq-answer">La Bonne Alternance vous indique uniquement les entreprises à fort potentiel d’embauche en fonction du métier sélectionné. Le tri par secteurs d’activité est donc uniquement possible sur les secteurs d’activité de ces entreprises. La recherche par secteur d’activité n’est actuellement pas disponible.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">La distance indiquée est erronée.</h2>
            <p className="c-faq-answer">Les distances indiquées sont les distances à vol d’oiseau. Si vous constatez tout de même une erreur, merci de nous contacter par l’intermédiaire du formulaire "Donner votre avis" (à droite de l’écran).</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">J’ai indiqué un métier précis, et les entreprises présentées ne correspondent pas à mes attentes.</h2>
            <p className="c-faq-answer">La Bonne Alternance est bien plus qu’un simple annuaire. La Bonne Alternance effectue un ciblage spécifique des entreprises à fort potentiel d’embauche afin de vous faire gagner du temps dans la sélection des entreprises à démarcher. Toutes les entreprises ne sont donc pas indiquées.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">Le métier que je recherche n’est pas présent.</h2>
            <p className="c-faq-answer">La Bonne Alternance utilise le Répertoire Opérationnel des Métiers et des Emplois (ROME). Seuls les métiers et appellations présents dans ce répertoire sont disponibles.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">Il n’y a pas de précisions sur les profils recherchés.</h2>
            <p className="c-faq-answer">La Bonne Alternance vous indique uniquement les entreprises à fort potentiel d’embauche. Il n’y a donc pas d’offres d’emploi. Il s’agit d’entreprises ciblées auprès desquelles vous pouvez envoyer des candidatures spontanées.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">Il manque des coordonnées : courriel, téléphone…</h2>
            <p className="c-faq-answer">La Bonne Alternance vous indique uniquement les coordonnées portées à notre connaissance par les entreprises.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">Les coordonnées des entreprises sont erronées.</h2>
            <p className="c-faq-answer">La Bonne Alternance vous indique uniquement les coordonnées portées à notre connaissance par les entreprises. La mise à jour des coordonnées est également réalisée par les entreprises qui peuvent omettre de nous prévenir.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">Comment rechercher sur un département entier ?</h2>
            <p className="c-faq-answer">Cette fonctionnalité n’est actuellement pas disponible.</p>
          </div>
          <div className="c-faq-question-block">
            <h2 className="c-faq-question">J’ai une suggestion d’amélioration de La Bonne Alternance, comment puis-je vous la transmettre ?</h2>
            <p className="c-faq-answer">Laissez un message en cliquant sur "Donner votre avis" à droite de l’écran.</p>
          </div>
        </div>
      </div>
    </div>
    <div className="mb-3">
      &nbsp;
    </div>
    <Footer />
  </div>
);

export default FAQ;
