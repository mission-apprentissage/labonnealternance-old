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

export const initParametersFromQuery = ({ dispatch, shouldPush, setFormValues }) => {
  const widgetParameters = getWidgetParameters();
  if (widgetParameters && widgetParameters.applyWidgetParameters) {
    if (widgetParameters.applyFormValues) {
      widgetParameters.formValues = buildFormValuesFromParameters(widgetParameters.parameters);
      dispatch(setFormValues(widgetParameters.formValues));
    }
    dispatch(setWidgetParameters(widgetParameters));
    if (shouldPush) {
      dispatch(push({ pathname: "/recherche-apprentissage" }));
    }
  } else {
    const itemParameters = getItemParameters();
    if (itemParameters && (itemParameters.applyItemParameters || itemParameters.mode)) {
      dispatch(setItemParameters(itemParameters));
      if (shouldPush) dispatch(push({ pathname: "/recherche-apprentissage" }));
    }
  }
};
