import React from "react";

const DescriptionMissionApprentissage = () => {
  return (
    <>
      <section className="c-home-descr container mb-0 mb-sm-5 p-3">
        <div className="row">
          <div className="col-12 col-lg-4">
            <h1 className="c-home-descr__title">
              <span className="d-block c-page-title is-color-1">La mission</span>
              <span className="d-block c-page-title is-color-2">apprentissage</span>
            </h1>
            <hr className="c-page-title-separator" align="left" />
          </div>
          <div className="col-12 col-lg-8">
            <h2 className="c-home-descr__subtitle">Faciliter les entrées en apprentissage</h2>
            <p className="m-0">
              La Mission apprentissage vise à lever les freins à l'essor de l'apprentissage et faciliter la mise en contact
              des jeunes, des CFA et des entreprises.
            </p>
            <p className="">
              Sa création a été décidée par les ministres en charge de l’éducation nationale, de l’enseignement supérieur, du travail et de la transformation publique.
            </p>
            <a
              className="btn btn-outline-primary px-1 px-sm-5 c-home-descr__more"
              rel="noopener noreferrer"
              href="https://mission-apprentissage.gitbook.io/general/"
              target="_blank"
            >
              <span className="d-inline px-3 px-sm-0">En savoir plus </span>
              <span className="d-none d-sm-inline">sur la mission apprentissage</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default DescriptionMissionApprentissage;
