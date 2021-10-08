import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidatureSpontanee from './CandidatureSpontanee';

describe('CandidatureSpontanee', () => {

  it('By default displays a button, not a modal', () => {
    render(<CandidatureSpontanee item={{}}/>)
    expect(screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i})).toBeVisible();
    expect(screen.queryByRole('modal')).toBeNull();
  })
  it('If button is clicked, modal with a form is displayed', () => {
    render(<CandidatureSpontanee item={{}}/>)
    expect(screen.queryByText("J'envoie une candidature spontanée")).toBeVisible();
    expect(screen.queryByRole("modal")).toBeNull();
  })
})
