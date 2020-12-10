import React from "react";
import styles from "./DescriptionMissionApprentissage.module.scss";

const DescriptionMissionApprentissage = () => {
  return (
    <section className="c-home-recall text-center">
      <div className="container py-5">
        <h2 className="c-home-recall__title">La mission apprentissage</h2>
        <p className="c-home-recall__subtitle">Faciliter les entrées en apprentissage</p>
        <p className="c-home-recall__text">
          La Mission apprentissage vise à lever les freins à l'essor de l'apprentissage et faciliter la mise en contact
          des jeunes, des CFA et des entreprises. Elle est conjointement engagée par le ministère de l' Education
          nationale, le ministère de l'Enseignement supérieur, de la Recherche et de l'Innovation, le ministère du
          Travail et le ministère de la Transformation et de la Fonction publique, dans le cadre de la mobilisation
          nationale pour l'emploi et la transition écologique.
        </p>

        <a>En savoir plus sur la mission apprentissage</a>
      </div>
    </section>
  );
};

export default DescriptionMissionApprentissage;
