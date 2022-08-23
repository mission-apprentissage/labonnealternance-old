import React from "react";



const AlgoHome = () => {
  return (
    <section className="c-algo">
      <div className="">
        <h2>
          <span className="d-block">Vous révéler</span>
          <span className="d-block">le marché caché de l'emploi</span>
        </h2>
        <p>
          La bonne alternance expose différents types d'opportunités d'emplois :
        </p>
        <ul>
          <li><strong>Les offres d'emploi</strong>Les offres d'emploi : publiées sur notre plateforme ainsi que celles issues de Pôle emploi et ses partenaires. Elles sont identifiées grâce au tag.</li>
          <li><strong>Les candidatures spontanées</strong> : correspondant au marché caché de l'emploi. Chaque mois, un algorithme prédictif de Pôle emploi analyse les recrutements des 6 années passées pour prédire ceux des 6 mois à venir. Grâce à ces données, il identifie une liste restreinte d'entreprises "à fort potentiel d'embauche en alternance" pour faciliter vos démarches de candidatures spontanées. Elles sont identifiées grâce au tag </li>
        </ul>
      </div>
      <div className="d-flex-center">
        <img
          className=""
          src="/images/icons/algo_home.svg"
          alt="Recherche Internet"
        />
      </div>
    </section>
  );
};

export default AlgoHome;
