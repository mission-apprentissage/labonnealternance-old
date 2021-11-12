import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SatisfactionForm from "./SatisfactionForm";
import nock from "nock";
import userEvent from "@testing-library/user-event";

describe("SatisfactionForm", () => {

  beforeEach(() => {
    nock.disableNetConnect();
  });

  it("By default displays a form", () => {
    // Given
    render(<SatisfactionForm item={{}} />);
    // When
    const submitButton = screen.queryByRole("button", { name: /jenvoie-mon-commentaire/i });
    // Then
    expect(screen.getByTestId("fieldset-message")).toBeVisible();
    expect(submitButton).toBeVisible();
  });

});
