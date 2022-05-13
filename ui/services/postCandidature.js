import axios from "axios";
import baseUrl from "../utils/baseUrl";
import _ from "lodash";
import { logError } from "../utils/tools";
import extractCandidatureParams from "./extractCandidatureParams";

export default async function postCandidature(
  applicant_h,
  company_h,
  _baseUrl = baseUrl,
  _axios = axios,
  _window = window,
  _logError = logError
) {
  let res = "";

  const candidatureApi = _baseUrl + "/api/application";

  let response = null;
  let isAxiosError = false;

  try {
    response = await _axios.post(candidatureApi, extractCandidatureParams(applicant_h, company_h));
  } catch (error) {
    response = error.response;
    isAxiosError = true; // les tests retournent un résultat correct avec une 500;
  }

  isAxiosError = isAxiosError || !!_.get(response, "data.error");
  const isSimulatedError = false;
  const isError = isAxiosError || isSimulatedError;

  if (isError) {
    if (isAxiosError) {
      _logError("Candidature API error", `Candidature API error ${response.data.error}`);
      console.log("response", response);
      res = response.data.error;
    } else if (isSimulatedError) {
      _logError("Candidature API error simulated");
      res = "simulated_error";
    } else {
      res = "unexpected_error";
    }
  } else {
    res = "ok";
  }

  return res;
}
