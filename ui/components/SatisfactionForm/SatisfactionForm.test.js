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
    render(<SatisfactionForm />);
    // When
    const submitButton = screen.queryByRole("button", { name: /jenvoie-mon-commentaire/i });
    // Then
    const textArea = screen.getByTestId("fieldset-message")
    expect(textArea).toBeVisible();
    expect(textArea).not.toHaveClass("is-valid-false");
    expect(submitButton).toBeVisible();
  });
  
  it("Shows error if message is not filled", () => {
    // Given
    render(<SatisfactionForm />);
    const submitButton = screen.queryByRole("button", { name: /jenvoie-mon-commentaire/i });
    // When
    userEvent.click(submitButton)
    // Then
    const textArea = screen.getByTestId("fieldset-message")
    expect(textArea).toBeVisible();
    expect(textArea).toHaveClass("is-valid-false");
  });

});
