import React from "react";
import Navigation from "components/navigation";
import ScrollToTop from "components/ScrollToTop";
import Breadcrumb from "components/breadcrumb";

import Footer from "components/footer";
const MentionsLegales = () => (
  <div>
    <ScrollToTop />
    <Navigation />
    <Breadcrumb forPage="mentions-legales" label="Mentions légales" />

    <div className="c-page-container container my-0 mb-sm-5 p-5">
      <div className="row">
        <div className="col-12 col-md-5">
          <h1>
            <span className="d-block c-page-title is-color-2">Mentions légales</span>
          </h1>
          <hr className="c-page-title-separator" align="left" />
        </div>

        <div className="col-12 col-md-7">
          <p className="mb-3">Dernière mise à jour le : 06/04/2021</p>
          <h3>Éditeur du site</h3>
          <p>
            Le site La Bonne Alternance est édité par Pôle Emploi, situé :<br />
            15 avenue du Docteur Gley
            <br />
            75987 Paris cedex 20
            <br />
            Tél. : <a href="tel:+33140306000">01 40 30 60 00</a>
            <br />
          </p>

          <h3>Directeur de la publication</h3>
          <p>Monsieur Jean Bassères, Directeur Général.</p>

          <h3>Hébergement du site</h3>
          <p>
            Ce site est hébergé par OVH :<br />
            2 rue Kellermann
            <br />
            59100 Roubaix
            <br />
            Tél. : <a href="tel:+33972101007">09 72 10 10 07</a>
          </p>

          <h3>Accessibilité</h3>
          <p>
            L'initiative internationale pour l'accessibilité du Web (Web Accessiblility Initiative) définit
            l'accessibilité du Web comme suit :
          </p>
          <p>
            L'accessibilité du Web signifie que les personnes en situation de handicap peuvent utiliser le Web. Plus
            précisément, qu'elles peuvent percevoir, comprendre, naviguer et interagir avec le Web, et qu'elles peuvent
            contribuer sur le Web. L'accessibilité du Web bénéficie aussi à d'autres, notamment les personnes âgées dont
            les capacités changent avec l'âge. L'accessibilité du Web comprend tous les handicaps qui affectent l'accès
            au Web, ce qui inclut les handicaps visuels, auditifs, physiques, de paroles, cognitives et neurologiques.
          </p>
          <p>
            L'article 47 de la loi n° 2005-102 du 11 février 2005 pour l'égalité des droits et des chances, la
            participation et la citoyenneté des personnes handicapées fait de l'accessibilité une exigence pour tous les
            services de communication publique en ligne de l'État, les collectivités territoriales et les établissements
            publics qui en dépendent.
          </p>
          <p>Il stipule que les informations diffusées par ces services doivent être accessibles à tous.</p>
          <p>
            Le référentiel général d'accessibilité pour les administrations (RGAA) rendra progressivement accessible
            l'ensemble des informations fournies par ces services.
          </p>
          <p>
            Le site La Bonne Alternance est en cours d'optimisation afin de le rendre conforme au{" "}
            <a
              href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite"
              rel="noopener noreferrer"
              target="_blank"
            >
              RGAA v3
            </a>
            . La déclaration de conformité sera publiée ultérieurement.
          </p>

          <h3>Nos engagements</h3>
          <p>
            Audit de mise en conformité (en cours) pour nous aider à détecter les potentiels oublis d'accessibilité.
            <br />
            Déclaration d'accessibilité (en cours) pour expliquer en toute transparence notre démarche.
            <br />
            Mise à jour de cette page pour vous tenir informés de notre progression.
          </p>

          <p>
            Nos équipes ont ainsi travaillé sur les contrastes de couleur, la présentation et la structure de
            l'information ou la clarté des formulaires.
          </p>

          <p>Des améliorations vont être apportées régulièrement.</p>

          <h3>Améliorations et contact</h3>
          <p>
            L'équipe de La Bonne Alternance reste à votre écoute et entière disposition, si vous souhaitez nous signaler
            le moindre défaut de conception.
          </p>

          <p>
            Vous pouvez nous aider à améliorer l'accessibilité du site en nous signalant les problèmes éventuels que
            vous rencontrez : <a href="mailto:labonnealternance@pole-emploi.fr">Contactez-nous</a>.
          </p>

          <p>
            Vous pouvez également soumettre vos demandes de modification sur la plate-forme{" "}
            <a
              href="https://github.com/mission-apprentissage/labonnealternance"
              target="_blank"
              rel="noreferrer noopener"
            >
              Github
            </a>
            .
          </p>
        </div>
      </div>
    </div>
    <div className="mb-3">&nbsp;</div>
    <Footer />
  </div>
);

export default MentionsLegales;
