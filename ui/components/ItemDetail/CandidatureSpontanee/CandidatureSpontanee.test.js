import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('If button is clicked, modal with a form is displayed', () => {
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
    // screen.getByText('oooozzzz')
  })

})
