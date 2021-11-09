import React from 'react';
import { render, screen } from '@testing-library/react';
import { some } from 'lodash';
import LbbCompanyDetail from './LbbCompanyDetail';

describe('LbbCompanyDetail', () => {


  it('Displays a link about the company', () => {
    // Given
    render(<LbbCompanyDetail lbb={lbbWithoutEmail} seeInfo={false} setSeeInfo={()=>{}}/>)
    // When
    const knowMoreLbb = screen.getByTestId('link-knowmore-lbb')
    // Then
    expect(knowMoreLbb).toHaveTextContent('DATA BUSINESS MARKETING');
  })

  it('When Lbb has NO email, displays GoingToContactQuestion, but not CandidatureSpontanee', () => {
    // Given
    render(<LbbCompanyDetail lbb={lbbWithoutEmail} seeInfo={false} setSeeInfo={()=>{}}/>)
    // When
    const candidatureSpontanee = screen.queryByTestId('CandidatureSpontanee')
    const goingToContactQuestion = screen.queryByTestId('GoingToContactQuestion')
    // Then
    expect(goingToContactQuestion).not.toBeNull();
    expect(candidatureSpontanee).toBeNull();
  })

  it('When Lbb has an email, displays CandidatureSpontanee, but not GoingToContactQuestion', () => {
    // Given
    let lbbWithEmail = lbbWithoutEmail
    lbbWithEmail.contact.email = 'someone@example.com'
    render(<LbbCompanyDetail lbb={lbbWithEmail} seeInfo={false} setSeeInfo={()=>{}}/>)
    // When
    const candidatureSpontanee = screen.queryByTestId('CandidatureSpontanee')
    const goingToContactQuestion = screen.queryByTestId('GoingToContactQuestion')
    // Then
    expect(candidatureSpontanee).not.toBeNull();
    expect(goingToContactQuestion).toBeNull();
  })

  let lbbWithoutEmail = {
    "ideaType": "lbb",
    "title": "DATA BUSINESS MARKETING",
    "longTitle": null,
    "id": null,
    "contact": {
      "email": "",
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
