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
    if (response?.data?.labelsAndRomes.length) {
      res = res.concat(response.data.labelsAndRomes);
    }
    if (response?.data?.labelsAndRomesForDiplomas.length) {
      res = res.concat(response.data.labelsAndRomesForDiplomas);
    }
  }

  return res;
}
