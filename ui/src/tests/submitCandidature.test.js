import submitCandidature from "../../services/submitCandidature.js";

describe("submitCandidature", () => {

  it("By default, change current state if no error", async () => {
    const mockedSetSendingState = jest.fn();
    const mockedPostCandidature = jest.fn();
    const repeatFunc = (x) => {return x}
    await submitCandidature({ applicants: "values" }, mockedSetSendingState, {items: 'some'}, mockedPostCandidature, repeatFunc)
    expect(mockedSetSendingState).toHaveBeenCalledWith("currently_sending");
    expect(mockedSetSendingState).toHaveBeenCalledWith("ok_sent");
    expect(mockedPostCandidature).toHaveBeenCalledWith({ "applicants": "values" }, { "items": "some" });
  });

  it("If error, change state with an error", async () => {
    const mockedSetSendingState = jest.fn();
    const emptyFunc = () => { }
    const badFunc = () => { throw "Custom error" }
    await submitCandidature(null, mockedSetSendingState, {}, badFunc, emptyFunc)
    expect(mockedSetSendingState).toHaveBeenCalledWith("currently_sending");
    expect(mockedSetSendingState).toHaveBeenCalledWith("not_sent_because_of_errors");
  });

});
