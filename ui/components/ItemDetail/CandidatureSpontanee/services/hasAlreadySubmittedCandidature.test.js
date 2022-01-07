import submitCandidature from "./submitCandidature.js";
import hasAlreadySubmittedCandidature from "./hasAlreadySubmittedCandidature";

describe("hasAlreadySubmittedCandidature", () => {

  it("No if applied is null and modal false", async () => {
    // given
    // when
    let result = hasAlreadySubmittedCandidature({applied: null, modal: false})
    // then
    expect(result).toEqual(false)
  });

});
