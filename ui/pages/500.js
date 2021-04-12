import React from "react";

import lostWoman from "public/images/lostWoman.svg";
import simpleLogo from "public/images/simpleLogo.svg";


const Error500 = () => {
  return <>
    <div className="c-500">
      <img src={simpleLogo} alt="Logo La Bonne Alternance" className="c-500-logo" onClick={(e) => {
        e.preventDefault();
        window.location.href="/";
      }}/>
      <h1 className="c-500-title">Oops</h1>
      <p>Le site La Bonne Alternance n'est pas disponible pour le moment</p>
      <img src={lostWoman} alt="Personne perdue" className="c-500-img" />
    </div>
  </>;
};

export default Error500;
