import React from 'react';
import { render, screen } from '@testing-library/react';
import CandidatureSpontanee from './CandidatureSpontanee';

describe('CandidatureSpontanee', () => {

  it('By default renders modal', () => {
    render(<CandidatureSpontanee item={{}}/>)
    expect(screen.getByText("J'envoie une candidature spontanée")).toBeInTheDocument();
  })
})
