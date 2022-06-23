import React, { useEffect, useState } from "react";
import axios from "axios";
import { initPostulerParametersFromQuery } from "services/config";
import WidgetPostulerError from "./WidgetPostulerError";
import { matchaApi, companyApi } from "components/SearchForTrainingsAndJobs/services/utils";
import WidgetCandidatureSpontanee from "./WidgetCandidatureSpontanee";

const WidgetPostuler = () => {
  useEffect(() => {
    try {
      const parameters = initPostulerParametersFromQuery();

      fetchPostulerItem(parameters);
    } catch (err) {
      setHasError(err.message);
    }
  }, []);

  const fetchPostulerItem = async (parameters) => {
    switch (parameters.type) {
      case "matcha": {
        const response = await axios.get(matchaApi + "/" + parameters.itemId);

        // gestion des erreurs
        if (!response?.data?.message) {
          setItem(response.data.matchas[0]);
        }

        break;
      }

      default: {
        const response = await axios.get(`${companyApi}/${parameters.itemId}?type=${parameters.type}`);

        // gestion des erreurs
        if (!response?.data?.message) {
          let companies = parameters.type === "lbb" ? response.data.lbbCompanies : response.data.lbaCompanies;

          setItem(companies[0]);
        }
        break;
      }
    }

    setIsLoading(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  const [item, setItem] = useState(null);

  /*
        afficher correctement le formulaire et pas seulement le bouton

        réadaptation des fichiers pour éviter la notion de modale


        checker infos d'email / iv

        afficher un message d'erreur le cas échéant

        vérifier a déjà postulé à cette offre

        afficher un message informatif le cas échéant

        afficher le formulaire

        onsubmit afficher 


    */

  return hasError ? (
    <WidgetPostulerError hasError={hasError} />
  ) : isLoading ? (
    "ca charge"
  ) : (
    <WidgetCandidatureSpontanee item={item} />
  );
};

export default WidgetPostuler;
