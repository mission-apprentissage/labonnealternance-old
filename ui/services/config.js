import { getValueFromPath } from "utils/tools";
import { setWidgetParameters, setItemParameters } from "store/actions";
import { push } from "connected-next-router";

export const getWidgetParameters = () => {
  let widgetParameters = { parameters: null, applyWidgetParameters: false };

  if (getValueFromPath("caller")) {
    let parameters = {};
    let applyWidgetParameters = true;

    parameters = {
      caller: getValueFromPath("caller"),
    };

    let p = getValueFromPath("lat");
    if (p && !isNaN(p)) parameters.lat = parseFloat(p);
    else applyWidgetParameters = false;

    p = getValueFromPath("lon");
    if (p && !isNaN(p)) parameters.lon = parseFloat(p);
    else applyWidgetParameters = false;

    p = getValueFromPath("romes"); // todo appliquer un ctrl regexp sur romes, max 3
    if (p) parameters.romes = p;
    else applyWidgetParameters = false;

    p = getValueFromPath("radius"); //todo: vérifier les valeurs légitimes
    if (p && !isNaN(p) && (p === "10" || p === "30" || p === "60" || p === "100")) parameters.radius = parseInt(p);

    p = getValueFromPath("return_uri");
    if (p) parameters.returnURI = p;

    p = getValueFromPath("return_logo_url");
    if (p) parameters.returnLogoURL = p;

    p = getValueFromPath("job_name");
    if (p) parameters.jobName = p;

    p = getValueFromPath("frozen_job");
    if (p) parameters.frozenJob = p;

    /*
        radius : Optionnel . Valeur numérique. Valeurs autorisées : 10 | 30 | 60 | 100. Le rayon de recherche autour du lieu en km. Valeur par défaut 30.
        job_name : Optionnel. Texte libre. Si job_name est précisé il ne sera pas possible de modifier le métier
        return_uri : Optionnel. Valeur par défaut / . L'uri de retour qui sera notifiée au site appelant. 
        return_logo_url : Optionnel. Valeur par défaut : logo du site Labonnealternance.pole-emploi.fr . L'url du logo du site vers lequel l'utilisateur revient en cliquant sur le bouton de retour dans Idea. 
        Si lat, lon et romes sont correctement renseignés une recherche sera lancée automatiquement en utilisant ces critères. Si radius est correctement renseigné il sera utilisé comme critère de la recherche.
        */

    widgetParameters.parameters = parameters;
    widgetParameters.applyWidgetParameters = applyWidgetParameters;
  }

  return widgetParameters;
};

export const getItemParameters = () => {
  let itemParameters = { parameters: null, mode: null, applyItemParameters: false };

  if (getValueFromPath("itemId")) {
    let parameters = {};
    let applyItemParameters = true;

    parameters = {
      itemId: getValueFromPath("itemId"),
    };

    let p = getValueFromPath("type");
    if (p) parameters.type = p;
    else applyItemParameters = false;

    itemParameters.parameters = parameters;
    itemParameters.applyItemParameters = applyItemParameters;
  }

  if (getValueFromPath("mode")) {
    itemParameters.mode = "debug";
  }

  return itemParameters;
};

export const initParametersFromQuery = (dispatch, shouldPush) => {
  const widgetParameters = getWidgetParameters();
  if (widgetParameters && widgetParameters.applyWidgetParameters) {
    dispatch(setWidgetParameters(widgetParameters));
    if (shouldPush) dispatch(push({ pathname: "/recherche-apprentissage" }));
  } else {
    const itemParameters = getItemParameters();
    if (itemParameters && (itemParameters.applyItemParameters || itemParameters.mode)) {
      dispatch(setItemParameters(itemParameters));
      if (shouldPush) dispatch(push({ pathname: "/recherche-apprentissage" }));
    }
  }
};
