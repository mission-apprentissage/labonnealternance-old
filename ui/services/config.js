import { getValueFromPath } from "utils/tools";
import { setWidgetParameters, setItemParameters } from "store/actions";
import { push } from "connected-next-router";

export const getWidgetParameters = () => {
  let widgetParameters = { parameters: null, applyWidgetParameters: false };

  let parameters = {};
  let applyWidgetParameters = true;

  parameters = {};

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
  if (p && !isNaN(p) && (p === "10" || p === "30" || p === "60" || p === "100")) {
    parameters.radius = parseInt(p);
  }

  parameters.returnURI = getValueFromPath("return_uri");
  parameters.returnLogoURL = getValueFromPath("return_logo_url");
  parameters.jobName = getValueFromPath("job_name");
  parameters.frozenJob = getValueFromPath("frozen_job");
  parameters.caller = getValueFromPath("caller");
  parameters.zipcode = getValueFromPath("zipcode");
  parameters.insee = getValueFromPath("insee");
  parameters.diploma = getValueFromPath("diploma");
  parameters.address = getValueFromPath("address");

  widgetParameters.parameters = parameters;
  widgetParameters.applyWidgetParameters = applyWidgetParameters;

  if (applyWidgetParameters && parameters.address && parameters.jobName && parameters.zipcode && parameters.insee) {
    widgetParameters.applyFormValues = true;
  }

  //console.log("widgetParameters : ", widgetParameters);

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

/* à conserver
export const buildFormValuesFromParameterString = (urlParams) => 
{
  let params = {};

  params.lat = parseFloat(urlParams.get("lat"));
  params.lon = parseFloat(urlParams.get("lon"));
  params.jobName = urlParams.get("job_name");
  params.zipcode = urlParams.get("zipcode");
  params.insee = urlParams.get("insee");
  params.diploma = urlParams.get("diploma");
  params.address = urlParams.get("address");
  params.romes = urlParams.get("romes");
  params.radius = urlParams.get("radius");

  return buildFormValuesFromParameters(params);
}*/

const buildFormValuesFromParameters = (params) => {

  let formValues = {
    job: {
      label: params.jobName,
      romes: params.romes.split(","),
      rncps: params.rncps ? params.rncps.split(",") : [],
    },
    location: {
      value: {
        coordinates: [params.lon, params.lat],
        type: "Point",
      },
      insee: params.insee,
      zipcode: params.zipcode,
      label: params.address,
    },
    radius: params.radius,
    diploma: params.diploma,
  };

  return formValues;
};

export const initParametersFromQuery = ({ dispatch, shouldPush }) => {
  let hasParameters = false;

  const widgetParameters = getWidgetParameters();
  if (widgetParameters && widgetParameters.applyWidgetParameters) {
    if (widgetParameters.applyFormValues) {
      widgetParameters.formValues = buildFormValuesFromParameters(widgetParameters.parameters);
    }
    dispatch(setWidgetParameters(widgetParameters));
  }

  const itemParameters = getItemParameters();
  if (itemParameters && (itemParameters.applyItemParameters || itemParameters.mode)) {
    dispatch(setItemParameters(itemParameters));
    hasParameters = true;
  }

  if (hasParameters && shouldPush) {
    dispatch(push({ pathname: "/recherche-apprentissage" }));
  }
};
