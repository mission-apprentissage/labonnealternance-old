import React, { useEffect } from "react";
import { getValueFromPath } from "utils/tools";
import { amongst } from "utils/arrayutils";
import { NextSeo } from "next-seo";
import postFeedback from "services/postFeedback";

const FormulaireSatisfaction = () => {
  //getValueFromPath

  let iv = null;
  let id = null;
  let avis = null;

  const initParametersFromPath = () => {
    //console.log("dddd",getValueFromPath("iv"));

    iv = getValueFromPath("iv");
    id = getValueFromPath("id");
    avis = getValueFromPath("avis");
  };

  const saveFeedback = () => {
    if (iv && id && amongst(avis, ["utile", "pasUtile", "neutre"])) {
      console.log("good : ",iv,id, avis);
      postFeedback({ iv, id, avis });
    } else {
      //else invalid params
      console.log("ca va pas !");
    }
  };

  useEffect(() => {
    // enregistrement en state des params provenant du path
    initParametersFromPath();
    // requête post avis pour enregistrement en base si et seulement si params corrects
    saveFeedback();
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
