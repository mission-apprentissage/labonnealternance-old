/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Search', () => {
  before(() => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    
  })
  it('User can click on job field, a message appears', () => {
    // given
    cy.get('.c-autocomplete__menu').should('not.be.visible');
    // when
    cy.get('input[name="jobField"]:visible').click()
    // then
    cy.get('.c-autocomplete__menu').should('be.visible');
    cy.get('.c-autocomplete__menu').contains('Indiquez un métier')
  })

  it('User can start to type inside job field, a list of possible jobs appear', () => {
    // given
    cy.intercept(
      {
        method: 'GET', url: /api\/romelabels/, query: {title: 'web'},
      },
      (req) => {
        req.reply({
          delay: 50, // ms, simulate a slow endpoint, increase value to debug
          fixture: 'romelabels_web.json'
        })
      }
    ).as('apiRomeLabels')

    cy.get('.c-spinner').should('not.exist');
    cy.get('.c-autocomplete_option').should('not.exist');
    // when
    cy.get('input[name="jobField"]:visible').type('web')
    // then
    cy.get('.c-spinner').should('exist');
    cy.get('.c-autocomplete_option').should('exist');
    cy.get('.c-spinner').should('not.exist');
  })
  
  it('User can choose a job', () => {
    cy.intercept(
      {
        method: 'GET', url: /api\/jobsdiplomas/, query: { romes: 'M1805', rncps: 'RNCP31114' },
      },
      (req) => {
        req.reply({
          delay: 0, // ms, simulate a slow endpoint, increase value to debug
          fixture: 'jobsdiplomas.json'
        })
      }
    ).as('apiJobsDiplomas')

    // given
    cy.get('.c-autocomplete_option').should('exist');
    // when
    cy.contains('Developpeur web').click()
    // then
    cy.get('.c-autocomplete_option').should('not.exist');
    cy.get('input[name="jobField"]:visible').should('have.value', 'Developpeur web')
  })

  it('User can start to type inside place field, a list of possible places appear', () => {
    // given
    cy.intercept(
      {
        method: 'GET', 
        url: /api-adresse.data.gouv.fr\/search/, 
        query: {
          q: 'nant',
          limit: '10',
          type: 'municipality',
        },
      },
      (req) => {
        req.reply({
          delay: 500,
          fixture: 'adresse_nant.json'
        })
      }
    ).as('getAdresseNant')

    cy.get('.c-spinner').should('not.exist');
    cy.get('.c-autocomplete_option').should('not.exist');
    // when
    cy.get('input[name="placeField"]:visible').type('nant')
    // then
    cy.get('.c-spinner').should('exist');
    cy.get('.c-autocomplete_option').should('exist');
    cy.get('.c-spinner').should('not.exist');
  })

})
