import submitCandidature from "./submitCandidature.js";
import hasAlreadySubmittedCandidature from "./hasAlreadySubmittedCandidature";

describe("hasAlreadySubmittedCandidature", () => {

  it("No if applied is null and modal is closed (modal=false)", async () => {
    // given
    let input = { applied: null, modal: false }
    // when
    let output = hasAlreadySubmittedCandidature(input)
    // then
    expect(output).toEqual(false)
  });
  
  it("No if applied is 'null' and modal is closed (modal=false)", async () => {
    // given
    let input = { applied: 'null', modal: false }
    // when
    let output = hasAlreadySubmittedCandidature(input)
    // then
    expect(output).toEqual(false)
  });

  it("Yes if applied is 'anyString' and modal is closed (modal=false)", async () => {
    // given
    let input = { applied: 'anyString', modal: false }
    // when
    let output = hasAlreadySubmittedCandidature(input)
    // then
    expect(output).toEqual(true)
  });

  it("No if applied is 'anyString' and modal still open (modal=true)", async () => {
    // given
    let input = { applied: 'anyString', modal: true }
    // when
    let output = hasAlreadySubmittedCandidature(input)
    // then
    expect(output).toEqual(false)
  });

});
