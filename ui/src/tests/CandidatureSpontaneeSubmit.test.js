import React from 'react';
import { render } from '@testing-library/react';
import CandidatureSpontaneeSubmit from '../../components/ItemDetail/CandidatureSpontaneeSubmit';

describe('CandidatureSpontaneeSubmit', () => {

  it('By default renders nothing', () => {
    const { container } = render(<CandidatureSpontaneeSubmit loadingState={''} />)
    expect(container.firstChild).toBe(null)
  })

  it('Renders a submit button by default', () => {
    const { container } = render(<CandidatureSpontaneeSubmit loadingState={'not_sent'} />)
    expect(container.firstChild.classList.contains('c-candidature-submit--default')).toBe(true)
  })

  it('Renders an spinner message if submission is pending', () => {
    const { container } = render(<CandidatureSpontaneeSubmit loadingState={'currently_sending'} />)
    expect(container.firstChild.classList.contains('c-candidature-submit--spinner')).toBe(true)
  })
  
  it('Renders an appropriate message if submission is over and OK', () => {
    const { container } = render(<CandidatureSpontaneeSubmit loadingState={'ok_sent'} />)
    expect(container.firstChild.classList.contains('c-candidature-submit-ok')).toBe(true)
  })
  
  it('Renders an error message if submission is over and NOT OK', () => {
    const { container } = render(<CandidatureSpontaneeSubmit loadingState={'sent_but_errors'} />)
    expect(container.firstChild.classList.contains('c-candidature-submit-error')).toBe(true)
  })
  
  

})
