export const getWidgetParameters = (query) => {
  let widgetParameters = { parameters: null, applyWidgetParameters: false };

  if (query.caller) {
    let parameters = {};
    let applyWidgetParameters = true;

    parameters = {
      caller: query.caller,
    };

    let p = query.lat;
    if (p && !isNaN(p)) parameters.lat = parseFloat(p);
    else applyWidgetParameters = false;

    p = query.lon;
    if (p && !isNaN(p)) parameters.lon = parseFloat(p);
    else applyWidgetParameters = false;

    p = query.romes; // todo appliquer un ctrl regexp sur romes, max 3
    if (p) parameters.romes = p;
    else applyWidgetParameters = false;

    p = query.radius; //todo: vérifier les valeurs légitimes
    if (p && !isNaN(p) && (p === "10" || p === "30" || p === "60" || p === "100")) parameters.radius = parseInt(p);

    p = query.return_uri;
    if (p) parameters.returnURI = p;

    p = query.return_logo_url;
    if (p) parameters.returnLogoURL = p;
    /*
        radius : Optionnel . Valeur numérique. Valeurs autorisées : 10 | 30 | 60 | 100. Le rayon de recherche autour du lieu en km. Valeur par défaut 30.
        return_uri : Optionnel. Valeur par défaut / . L'uri de retour qui sera notifiée au site appelant. 
        return_logo_url : Optionnel. Valeur par défaut : logo du site Labonnealternance.pole-emploi.fr . L'url du logo du site vers lequel l'utilisateur revient en cliquant sur le bouton de retour dans Idea. 
        Si lat, lon et romes sont correctement renseignés une recherche sera lancée automatiquement en utilisant ces critères. Si radius est correctement renseigné il sera utilisé comme critère de la recherche.
        */

    widgetParameters.parameters = parameters;
    widgetParameters.applyWidgetParameters = applyWidgetParameters;
  }

  return widgetParameters;
};