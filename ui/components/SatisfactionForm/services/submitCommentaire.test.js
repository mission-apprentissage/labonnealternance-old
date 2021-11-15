import submitCommentaire from "../../ItemDetail/CandidatureSpontanee/services/submitCandidature.js";

describe("submitCommentaire", () => {
  it("By default, change current state if no error", async () => {
    // given
    const mockedSetSendingState = jest.fn();
    const mockedPostCommentaire = jest.fn();
    const repeatFunc = (x) => {
      return x;
    };
    // when
    await submitCommentaire(
      { id: "aaaa", iv: "aaaa", comment: "" },
      mockedSetSendingState,
      mockedPostCommentaire,
      repeatFunc
    );
    // then
    expect(mockedPostCommentaire).toHaveBeenCalledWith({ applicants: "values" }, { items: "some" });
    expect(mockedSetSendingState).toHaveBeenCalledWith("currently_sending");
    expect(mockedSetSendingState).toHaveBeenCalledWith("ok_sent");
  });

  it("If error, change state with an error", async () => {
    // given
    const mockedSetSendingState = jest.fn();
    const emptyFunc = () => {};
    const badFunc = () => {
      throw "Custom error";
    };
    // when
    await submitCommentaire(null, mockedSetSendingState, {}, badFunc, emptyFunc);
    // then
    expect(mockedSetSendingState).toHaveBeenCalledWith("currently_sending");
    expect(mockedSetSendingState).toHaveBeenCalledWith("not_sent_because_of_errors");
  });
});
