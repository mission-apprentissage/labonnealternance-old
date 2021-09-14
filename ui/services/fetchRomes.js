import axios from "axios";
import baseUrl from "../utils/baseUrl";
import _ from "lodash";
import { isNonEmptyString } from "../utils/strutils";
import { logError } from "../utils/tools";

export default async function fetchRomes(
  value,
  errorCallbackFn = _.noop,
  _baseUrl = baseUrl,
  _axios = axios,
  _window = window,
  _logError = logError
) {
  let res = [];

  if (!isNonEmptyString(value)) return res;

  const romeLabelsApi = _baseUrl + "/api/romelabels";
  const response = await _axios.get(romeLabelsApi, { params: { title: value } });

  const isAxiosError = !!_.get(response, "data.error");
  const hasNoLabelsAndRomes =
    !_.get(response, "data.labelsAndRomes") && !_.get(response, "data.labelsAndRomesForDiplomas");
  const isSimulatedError = _.includes(_.get(_window, "location.href", ""), "romeError=true");

  const isError = isAxiosError || hasNoLabelsAndRomes || isSimulatedError;

  if (isError) {
    errorCallbackFn();
    if (isAxiosError) {
      _logError("Rome API error", `Rome API error ${response.data.error}`);
    } else if (hasNoLabelsAndRomes) {
      _logError("Rome API error : API call worked, but returned unexpected data");
    } else if (isSimulatedError) {
      _logError("Rome API error simulated with a query param :)");
    }
  } else {
    // transformation des textes des diplômes
    let diplomas = [];

    if (response?.data?.labelsAndRomesForDiplomas?.length) {
      diplomas = response.data.labelsAndRomesForDiplomas.map(
        (diploma) => (diploma = { ...diploma, label: _.capitalize(diploma.label) })
      );
    }

    // on affiche d'abord jusqu'à 4 métiers puis jusqu'à 4 diplômes puis le reste s'il y a
    if (response?.data?.labelsAndRomes?.length) {
      res = res.concat(response.data.labelsAndRomes.slice(0, 4));
    }
    if (diplomas.length) {
      res = res.concat(diplomas.slice(0, 4));
    }
    if (response?.data?.labelsAndRomes?.length) {
      res = res.concat(response.data.labelsAndRomes.slice(4));
    }
    if (diplomas.length) {
      res = res.concat(diplomas.slice(4));
    }
  }

  return res;
}
