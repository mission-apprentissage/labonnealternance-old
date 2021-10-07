import React from 'react';
import { render } from '@testing-library/react';
import CandidatureSpontaneeSubmit from '../../components/ItemDetail/CandidatureSpontaneeSubmit';

describe('CandidatureSpontaneeSubmit', () => {

  it('Renders a submit button by default', () => {
    const { container } = render(<CandidatureSpontaneeSubmit loadingState={'not_sent'} />)
    expect(container.firstChild.classList.contains('c-candidature-submit')).toBe(true)
  })
  
})
