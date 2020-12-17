import React from "react";

const DescriptionMissionApprentissage = () => {
  return (
    <section className="c-home-descr text-center">
      <div className="container py-5">
        <h2 className="c-home-descr__title pt-5">La Mission Apprentissage</h2>
        <p className="c-home-descr__subtitle">Faciliter les entrées en apprentissage</p>
        <p className="c-home-descr__text mx-auto pt-4 pb-5">
          La Mission apprentissage vise à lever les freins à l'essor de l'apprentissage et faciliter la mise en contact
          des jeunes, des CFA et des entreprises.<br />Elle est conjointement engagée par le ministère de l' Education
          nationale, le ministère de l'Enseignement supérieur, de la Recherche et de l'Innovation, le ministère du
          Travail et le ministère de la Transformation et de la Fonction publique, dans le cadre de la mobilisation
          nationale pour l'emploi et la transition écologique.
        </p>

        <a className="btn btn-outline-primary mb-5 px-1 px-sm-5 c-home-descr__more" rel="noopener noreferer" href="https://mission-apprentissage.gitbook.io/general/" target="_blank">
          <span className="d-block d-sm-inline">En savoir plus sur </span>
          <span className="d-block d-sm-inline">la mission apprentissage</span>
        </a>
        <div className="mb-5">&nbsp;</div>
      </div>
    </section>
  );
};

export default DescriptionMissionApprentissage;
