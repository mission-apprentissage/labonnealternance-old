import React from "react";
import styles from "./ServicesMissionApprentissage.module.scss";

const ServiceMissionApprentissage = ({ logo, title, text, url }) => {
  return (
    <div className="c-servicesmna-hero">
      <div className="container py-5">
        <div className="card c-servicesmna-hero__card px-4 py-4">
          <div>{logo}</div>
          <div>{title}</div>
          <div>{text}</div>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Découvrir
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceMissionApprentissage;
