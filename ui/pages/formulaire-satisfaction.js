import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

const FormulaireSatisfaction = () => {
  //getValueFromPath

  //

  useEffect(() => {
    // enregistrement en state des params provenant du path
    // requête post avis pour enregistrement en base si et seulement si params corrects
  }, []);

  return (
    <div>
      <NextSeo
        title="Formulaire de satisfaction | La Bonne Alternance | Trouvez votre alternance"
        description="Formulaire de satisfaction."
      />
      Logo LBA, lien vers home lba
      <div className="c-page-container container my-0 mb-sm-5 p-5">
        <div className="row">
          <div className="col-12 col-md-5">
            Texte remerciement
            <br />
            <br />
            Textarea commentaire
            <br />
            <br />
            Bouton enregistrement
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulaireSatisfaction;
