import React from 'react';
import { render, screen, fireEvent, wait, waitFor } from '@testing-library/react';
import CandidatureSpontanee from './CandidatureSpontanee';
import nock from 'nock';
import userEvent from '@testing-library/user-event'

describe('CandidatureSpontanee', () => {

  beforeEach(() => {
    nock.disableNetConnect()
  });

  it('By default displays a button, not a modal', () => {
    // Given
    render(<CandidatureSpontanee item={{}} />)
    // When
    const button = screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i })
    const modal = screen.queryByRole('dialog')
    // Then
    expect(button).toBeVisible();
    expect(modal).toBeNull();
  })
  
  it('If button is clicked, modal with a form is displayed, with not-yet-valid messages', async () => {
    // Given / When
    openLbbModal(render, screen, fireEvent)
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
  
  it('for LBB, displays appropriate title and button text', () => {
    // Given / When
    openLbbModal(render, screen, fireEvent)
    // When
    const submit = screen.queryByRole('button', { name: /je-postule/i })
    expect(submit).toHaveTextContent("J'envoie ma candidature spontanée")
    const title = screen.getByTestId('CandidatureSpontaneeTitle')
    expect(title).toHaveTextContent("Candidature spontanée")
  })
  it('for MATCHA, displays appropriate title and button text', () => {
    // Given / When
    openMatchaModal(render, screen, fireEvent)
    // When
    const submit = screen.queryByRole('button', { name: /je-postule/i })
    expect(submit).toHaveTextContent("J'envoie ma candidature")
    const title = screen.getByTestId('CandidatureSpontaneeTitle')
    expect(title).toHaveTextContent("Postuler à l'offre de Lamacompta")
  })

  it('If submit is fired, all mandatory fields are marked as invalid', async () => {
    // Given
    openLbbModal(render, screen, fireEvent)
    const submit = screen.queryByRole('button', { name: /je-postule/i })
    // When
    fireEvent.click(submit)
    // Then
    await waitFor(() => {
      expect(screen.getByTestId('fieldset-firstname')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-lastname')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-email')).toHaveClass('is-valid-false')
      expect(screen.getByTestId('fieldset-phone')).toHaveClass('is-valid-false')
    });
  })

  it('If submit is fired with all valid fields, only File is missing', async () => {
    // Given
    openLbbModal(render, screen, fireEvent)
    fillLbbModalTextInputs(screen)

    const submit = screen.queryByRole('button', { name: /je-postule/i })

    expect(screen.queryByText(/⚠ la pièce jointe est obligatoire/i)).toBeNull()
    // When
    fireEvent.click(submit)
    // Then
    await screen.findByText(/⚠ la pièce jointe est obligatoire/i)

  })

  it('If submit is fired with all valid fields => HTTP request is triggered', async () => {
    // Given
    openLbbModal(render, screen, fireEvent)
    fillLbbModalTextInputs(screen)

    // When 1.
    const pdfFile = new File(['hello'], 'hello.pdf', { type: 'text/pdf' })
    const pdfInput = screen.getByTestId('fileDropzone')
    expect(screen.queryByTestId('selectedFile')).toBeNull()

    // Then 1.
    await waitFor(() => {
      userEvent.upload(pdfInput, pdfFile)
      expect(screen.queryByTestId('selectedFile')).not.toBeNull()
    })

    // When 2.
    nock('http://localhost:5000')
      .post('/api/application')
      .reply(200)

    expect(screen.queryByTestId('CandidatureSpontaneeWorked')).toBeNull()
    const submit = screen.getByRole('button', { name: /je-postule/i })
    fireEvent.click(submit)
    // Then 2.
    await waitFor(() => {
      expect(screen.queryByTestId('CandidatureSpontaneeWorked')).not.toBeNull()
    })

  })


  const openLbbModal = (render, screen, fireEvent) => {
    render(<CandidatureSpontanee item={realisticLbb} />)
    const button = screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i })
    fireEvent.click(button)
  }
  const openMatchaModal = (render, screen, fireEvent) => {
    render(<CandidatureSpontanee item={realisticMatcha} />)
    const button = screen.queryByRole('button', { name: /jenvoie-une-candidature-spontanee/i })
    fireEvent.click(button)
  }

  const fillLbbModalTextInputs = (screen) => {
    userEvent.type(screen.getByTestId('firstName'), 'Jane')
    userEvent.type(screen.getByTestId('lastName'), 'Doe')
    userEvent.type(screen.getByTestId('phone'), '0202020202')
    userEvent.type(screen.getByTestId('email'), 'from@applicant.com')
  }

  let realisticMatcha = {
    "ideaType": "matcha",
    "title": "Développement web, intégration",
    "longTitle": null,
    "id": "4S4nSyJLZrDoO8YYwxIeg-0",
    "contact": {
      "email": "janedoe@example.com",
      "name": "Jane Doe",
      "phone": "0202020202"
    },
    "place": {
      "distance": 2.7,
      "fullAddress": "11 Rue Bertrand Geslin 44000 Nantes",
      "latitude": "47.215778",
      "longitude": "-1.56622",
      "city": null,
      "address": "11 Rue Bertrand Geslin 44000 Nantes",
      "cedex": null,
      "zipCode": null,
      "insee": null,
      "departementNumber": null,
      "region": null
    },
    "company": {
      "name": "Lamacompta",
      "siret": "88177316200022",
      "size": null,
      "logo": null,
      "description": null,
      "socialNetwork": null,
      "url": null,
      "id": null,
      "uai": null,
      "place": null,
      "headquarter": null
    },
    "diplomaLevel": "DEUG, BTS, DUT, DEUST",
    "diploma": null,
    "cfd": null,
    "rncpCode": null,
    "rncpLabel": null,
    "rncpEligibleApprentissage": null,
    "period": null,
    "capacity": null,
    "createdAt": "2021-08-18T09:14:16.936Z",
    "lastUpdateAt": "2021-08-18T09:15:16.230Z",
    "onisepUrl": null,
    "url": null,
    "job": {
      "id": "611ccfa4bb8f010028f0bd75",
      "description": "",
      "creationDate": "2021-08-18T09:14:16.936Z",
      "contractType": "Apprentissage",
      "jobStartDate": "2021-08-23T00:00:00.000Z"
    },
    "romes": [
      {
        "code": "M1805"
      },
      {
        "code": "M1806"
      },
      {
        "code": "M1802"
      }
    ],
    "nafs": null,
    "training": null
  }

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
