import submitCandidature from "./submitCandidature.js";

describe("submitCandidature", () => {
  it("By default, change current state if no error", async () => {
    // given
    const mockedSetSendingState = jest.fn();
    const mockedPostCandidature = jest.fn((applicants, items) => {
      return "ok";
    });
    const repeatFunc = (x) => {
      return x;
    };
    // when
    await submitCandidature(
      { applicants: "values" },
      mockedSetSendingState,
      { items: "some" },
      mockedPostCandidature,
      repeatFunc
    );
    // then
    expect(mockedPostCandidature).toHaveBeenCalledWith({ applicants: "values" }, { items: "some" });
    expect(mockedSetSendingState).toHaveBeenCalledWith("currently_sending");
    expect(mockedSetSendingState).toHaveBeenCalledWith("ok_sent");
  });

  it("If error, change state with an error", async () => {
    // given
    const mockedSetSendingState = jest.fn();
    const emptyFunc = () => {};
    const mockedPostCandidature = jest.fn(() => {
      throw "Custom error";
    });
    // when
    await submitCandidature(null, mockedSetSendingState, {}, mockedPostCandidature, emptyFunc);
    // then
    expect(mockedSetSendingState).toHaveBeenCalledWith("currently_sending");
    expect(mockedSetSendingState).toHaveBeenCalledWith("not_sent_because_of_errors");
  });

  it("If post result error, change state with an error", async () => {
    // given
    const mockedSetSendingState = jest.fn();
    const mockedPostCandidature = jest.fn((applicants, items) => {
      return "error";
    });
    const repeatFunc = (x) => {
      return x;
    };
    // when
    await submitCandidature(
      { applicants: "values" },
      mockedSetSendingState,
      { items: "some" },
      mockedPostCandidature,
      repeatFunc
    );
    // then
    expect(mockedPostCandidature).toHaveBeenCalledWith({ applicants: "values" }, { items: "some" });
    expect(mockedSetSendingState).toHaveBeenCalledWith("currently_sending");
    expect(mockedSetSendingState).toHaveBeenCalledWith("error");
  });
});
