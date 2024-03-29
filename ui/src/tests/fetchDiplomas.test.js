import fetchDiplomas from "../../services/fetchDiplomas";
import _ from "lodash";

describe("fetchDiplomas", () => {
  it("skip : Should return an empty array if there is any wrong input", async () => {
    expect(await fetchDiplomas()).toEqual([]);
    expect(await fetchDiplomas(null, null)).toEqual([]);
    expect(await fetchDiplomas(/^/, /^/)).toEqual([]);
    expect(await fetchDiplomas(42, 42)).toEqual([]);
    expect(await fetchDiplomas("", "")).toEqual([]);
    expect(await fetchDiplomas("  ", "  ")).toEqual([]);
    expect(await fetchDiplomas([], [])).toEqual([]);
    expect(await fetchDiplomas(["", " "], ["", " "])).toEqual([]);
  });

  it("nominal : Should return response.data if remote API replied correctly", async () => {
    // given
    const mockedAxiosGet = jest.fn().mockReturnValue({ data: ["remotely_returned_array"] });
    const axiosStub = { get: mockedAxiosGet };
    // when
    const res = await fetchDiplomas(["D1208", "D1203"], ["D1208", "D1203"], "urlMock", axiosStub, {}, _.noop);
    // then
    expect(mockedAxiosGet).toHaveBeenCalledWith("urlMock/api/jobsdiplomas", {
      params: { romes: "D1208,D1203", rncps: "D1208,D1203" },
    });
    expect(res).toEqual(["remotely_returned_array"]);
  });

  it("error case : axios returns an non-empty data.error property", async () => {
    // given
    const mockedLoggerFn = jest.fn();
    const axiosStub = { get: jest.fn().mockReturnValue({ data: { error: "remote_error_message" } }) };
    // when
    const res = await fetchDiplomas(["D1208", "D1203", "D1204"], ["D1208", "D1203", "D1204"], "urlMock", axiosStub, {}, mockedLoggerFn);
    // then
    expect(mockedLoggerFn).toHaveBeenCalledWith("Diploma API error", "Diploma API error");
    expect(res).toEqual([]);
  });

  it("error case : axios do NOT returns expected data", async () => {
    // given
    const mockedLoggerFn = jest.fn();
    const axiosStub = { get: jest.fn().mockReturnValue({ data: { unexpected_prop: "unexpected_val" } }) };
    // when
    const res = await fetchDiplomas(["D1208", "D1203", "D1205"], ["D1208", "D1203", "D1205"], "urlMock", axiosStub, {}, mockedLoggerFn);
    // then
    expect(mockedLoggerFn).toHaveBeenCalledWith("Diploma API error : API call worked, but returned unexpected data");
    expect(res).toEqual([]);
  });

  it("error case : user simulated an error through URL query param", async () => {
    // given
    const mockedLoggerFn = jest.fn();
    const axiosStub = { get: jest.fn().mockReturnValue({ data: ["remotely_returned_array"] }) };
    // when
    const res = await fetchDiplomas(
      ["D1208", "D1203", "D1206"],
      ["D1208", "D1203", "D1206"],
      "urlMock",
      axiosStub,
      { location: { href: "anyurl.com?diplomaError=true" } },
      mockedLoggerFn
    );
    // then
    expect(mockedLoggerFn).toHaveBeenCalledWith("Diploma API error simulated with a query param :)");
    expect(res).toEqual([]);
  });
});
