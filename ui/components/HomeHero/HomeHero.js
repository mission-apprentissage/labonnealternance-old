import React from "react";
import StartForm from "../StartForm";

const HomeHero = () => {
  return (
    <div className="c-home-hero">
      <div className="container c-home-hero__container py-5">
        <div className="card c-home-hero__card p-0 p-sm-4">
          <StartForm />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
