import React from "react";
import StartForm from "../StartForm";
import styles from "./HomeHero.module.scss";

const HomeHero = () => {
  return (
    <div className="c-home-hero">
      <div className="container py-5">
        <div className="card c-home-hero__card px-4 py-4">
          <StartForm />
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
