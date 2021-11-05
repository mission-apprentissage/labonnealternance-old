import React from 'react';
import { render, screen, fireEvent, wait } from '@testing-library/react';
import CandidatureSpontanee from './CandidatureSpontanee';
import nock from 'nock';

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

  it('If button is clicked, modal with a form is displayed, with not-yet-valid messages', async () => {
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
      expect(screen.getByTestId('fieldset-firstname')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-lastname')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-email')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-phone')).toHaveClass('is-valid-false')
    });
  })

  it('If submit is fired with all valid fields', async () => {
    // Given
    nock.disableNetConnect()

    render(<CandidatureSpontanee item={realisticLbb}/>)
    const button = screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i })
    fireEvent.click(button)

    let firstNameInput = screen.getByTestId('firstName')
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } })
    let lastNameInput = screen.getByTestId('lastName')
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    let phoneInput = screen.getByTestId('phone')
    fireEvent.change(phoneInput, { target: { value: '0202020202' } })
    let emailInput = screen.getByTestId('email')
    fireEvent.change(emailInput, { target: { value: 'from@applicant.com' } })
    const submit = screen.queryByRole('button', { name: /je-postule/i })
    
    expect(screen.queryByText(/⚠ la pièce jointe est obligatoire/i)).toBeNull()
    // When
    fireEvent.click(submit)
    // Then
    await wait(() => {
      expect(screen.queryByText(/⚠ la pièce jointe est obligatoire/i)).not.toBeNull()
      // expect(screen.getByText(/⚠ la pièce jointe est obligatoire/i)).toBeVisible()
    });
    // let emailInputz = screen.getByTestId('emailz')
    // console.log('emailInputz', emailInputz);
  })

  let realisticLbb = {
    "ideaType": "lbb",
    "title": "DATA BUSINESS MARKETING",
    "longTitle": null,
    "id": null,
    "contact": {
      "email": "someone@example.com",
      "phone": ""
    },
    "place": {
      "distance": 1.2,
      "fullAddress": "56 RUE FRANCOIS BRUNEAU, 44000 NANTES",
      "latitude": 47.2291,
      "longitude": -1.5619,
      "city": "NANTES",
      "address": "56 RUE FRANCOIS BRUNEAU, 44000 NANTES"
    },
    "company": {
      "name": "DATA BUSINESS MARKETING",
      "siret": "40400744500079",
      "size": "0 salarié",
      "socialNetwork": "",
      "url": ""
    },
    "diplomaLevel": null,
    "diploma": null,
    "cfd": null,
    "rncpCode": null,
    "rncpLabel": null,
    "rncpEligibleApprentissage": null,
    "period": null,
    "capacity": null,
    "createdAt": null,
    "lastUpdateAt": null,
    "onisepUrl": null,
    "url": "https://labonneboite.pole-emploi.fr/40400744500079/details?rome_code=M1803&utm_medium=web&utm_source=api__emploi_store_dev&utm_campaign=api__emploi_store_dev__idea",
    "job": null,
    "romes": [
      {
        "code": "M1803",
        "label": "Direction des systèmes d'information"
      }
    ],
    "nafs": [
      {
        "code": "6201Z",
        "label": "Programmation informatique"
      }
    ],
    "training": null
  }

})
