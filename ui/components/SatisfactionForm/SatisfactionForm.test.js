import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
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
    const field = screen.getByTestId("fieldset-message")
    expect(field).toBeVisible();
    expect(field).not.toHaveClass("is-valid-false");
    expect(submitButton).toBeVisible();
  });
  
  it("Shows error if message is not filled", async () => {
    // Given
    render(<SatisfactionForm />);
    const submitButton = screen.queryByRole("button", { name: /jenvoie-mon-commentaire/i });
    // When
    userEvent.click(submitButton)
    // Then
    await waitFor(() => {
      const field = screen.getByTestId("fieldset-message")
      expect(field).toBeVisible();
      expect(field).toHaveClass("is-valid-false");
    });
  });
  
  it("Show successful page if comment is submitted properly", async () => {
    // Given
    render(<SatisfactionForm />);
    const textArea = screen.getByTestId("message")
    const submitButton = screen.queryByRole("button", { name: /jenvoie-mon-commentaire/i });
    // When
    userEvent.type(textArea, 'My comment')
    expect(textArea).toHaveValue('My comment')
    userEvent.click(submitButton)
    // // Then
    await waitFor(() => {
      expect(textArea).not.toBeVisible();
      expect(screen.getByTestId("SatisfactionFormSuccess")).toBeVisible();
    });
  });

});
