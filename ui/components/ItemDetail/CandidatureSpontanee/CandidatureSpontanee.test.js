import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import CandidatureSpontanee from './CandidatureSpontanee';

describe('CandidatureSpontanee', () => {

  it('By default displays a button, not a modal', () => {
    // Given
    render(<CandidatureSpontanee item={{}}/>)
    // When
    const button = screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i })
    const modal = screen.queryByRole('dialog')
    // Then
    expect(button).toBeVisible();
    expect(modal).toBeNull();
  })

  it('If button is clicked, modal with a form is displayed, with not-yet-vali', async () => {
    // Given
    render(<CandidatureSpontanee item={{}}/>)
    const button = screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i })
    // When
    fireEvent.click(button)
    // Then
    const modal = screen.queryByRole('dialog')
    expect(modal).not.toBeNull();
    const submit = screen.queryByRole('button', { name: /je-postule/i })
    expect(submit).not.toBeNull();
    expect(screen.getByTestId('fieldset-terms')).toHaveClass('is-not-validated')
    expect(screen.getByTestId('fieldset-firstname')).toHaveClass('is-not-validated')
    expect(screen.getByTestId('fieldset-lastname')).toHaveClass('is-not-validated')
    expect(screen.getByTestId('fieldset-email')).toHaveClass('is-not-validated')
    expect(screen.getByTestId('fieldset-phone')).toHaveClass('is-not-validated')
  })

  it('If submit is fired, all mandatory fields are marked as invalid', async () => {
    // Given
    render(<CandidatureSpontanee item={{}}/>)
    const button = screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i })
    fireEvent.click(button)
    const submit = screen.queryByRole('button', { name: /je-postule/i })
    // When
    fireEvent.click(submit)
    // Then
    await wait(() => {
      expect(screen.getByTestId('fieldset-terms')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-firstname')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-lastname')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-email')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-phone')).toHaveClass('is-valid-false')
    });
  })

})
