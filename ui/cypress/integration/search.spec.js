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
          delay: 500,
          fixture: 'romelabelsweb.json'
        })
      }
    ).as('getLabelsAndRome')

    cy.get('.c-spinner').should('not.exist');
    cy.get('.c-autocomplete_option').should('not.exist');
    // when
    cy.get('input[name="jobField"]:visible').type('web')
    // then
    cy.get('.c-spinner').should('exist');
    cy.get('.c-autocomplete_option').should('exist');
  })

})
