import React from "react";

const WidgetPostulerError = ({ hasError }) => {
  const getErrorText = () => {
    switch (hasError) {
      case "item_not_found": {
        return "L'offre n'est plus disponible";
      }
      case "missing_email": {
        return "Nous ne disposons pas des informations permettant de postuler en ligne.";
      }
      case "missing_source_parameter": {
        return "La source de l'appel au service est manquante.";
      }
      case "missing_item_id_parameter": {
        return "L'identifiant l'offre est manquant.";
      }
      case "missing_type_parameter": {
        return "Le type d'offre est manquant.";
      }
      default: {
        return "Nous rencontrons un problème technique. Veuillez nous excuser pour le dérangement.";
      }
    }
  };

  return hasError ? <div className="text-center my-2">{getErrorText()}</div> : "";
};

export default WidgetPostulerError;
