import axios from "axios";
import baseUrl from "../utils/baseUrl";
import _ from "lodash";
import { logError } from "../utils/tools";
import extractCandidatureParams from "./extractCandidatureParams";

export default async function postCandidature(
  values_h,
  errorCallbackFn = _.noop,
  _baseUrl = baseUrl,
  _axios = axios,
  _window = window,
  _logError = logError
) {
  let res = '';

  const candidatureApi = _baseUrl + "/api/application";
  const response = await _axios.get(candidatureApi, { params: extractCandidatureParams(values_h) });

  const isAxiosError = !!_.get(response, "data.error");
  const isSimulatedError = false;
  const isError = isAxiosError || isSimulatedError;

  if (isError) {
    errorCallbackFn();
    if (isAxiosError) {
      _logError("Candidature API error", `Candidature API error ${response.data.error}`);
      console.log('response', response);
    } else if (isSimulatedError) {
      _logError("Candidature API error simulated");
    }
  } else {
    res = 'ok'
  }

  return res;
}
