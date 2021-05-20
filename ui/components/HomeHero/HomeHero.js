import React from "react";
import StartForm from "../StartForm";

const HomeHero = () => {
  return (
    <div className="c-home-hero">
      <div className="container c-home-hero__container pt-5 pb-0 pb-sm-5">
        <div className="card c-home-hero__card p-0 p-sm-4">
          <h1 className="card-title">
            <span className="c-home-hero__title c-home-hero__title1">Se former et travailler</span>
            <span className="c-home-hero__title c-home-hero__title2">&nbsp;en alternance</span>
          </h1>
          <StartForm isHome={true} />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
