/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

function please_intercept(local_cy, url, fixture, alias) {
  local_cy.intercept(
    {
      method: 'GET', 
      url: url
    },
    (req) => {
      req.reply({
        delay: 0, // ms, simulate a slow endpoint, increase value to debug
        fixture: fixture
      })
    }
  ).as(alias)
}

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
          q: 'caho',
          limit: '10',
          type: 'municipality',
        },
      },
      (req) => {
        req.reply({
          delay: 50,
          fixture: 'adresse_caho.json'
        })
      }
    ).as('getAdresseCaho')

    cy.get('.c-spinner').should('not.exist');
    cy.get('.c-autocomplete_option').should('not.exist');
    // when
    cy.get('input[name="placeField"]:visible').type('caho')
    // then
    cy.get('.c-spinner').should('exist');
    cy.get('.c-autocomplete_option').should('exist');
    cy.get('.c-spinner').should('not.exist');
  })

  it('User can choose a place', () => {
    // given
    cy.get('.c-autocomplete_option').should('exist');
    // when
    cy.get('input[name="placeField"]:visible').type('{downarrow}').type('{uparrow}').type('{enter}')
    // then
    cy.get('.c-autocomplete_option').should('not.exist');
    cy.get('input[name="placeField"]:visible').should('have.value', 'Cahors 46000')
  })

  it('User can choose a radius', () => {
    cy.get('select[name="locationRadius"]:visible') // given
      .select('10km') // when
      .should('have.value', '10') // then
  })

  it('User can choose a diploma', () => {
    cy.get('select[name="diploma"]:visible') // given
    .select('Cap, autres formations niveau 3') // when
    .should('have.value', '3 (CAP...)') // then
  })
  
  it('User can launch the search', () => {

    ///api/v1/formations?romes=M1805,M1806,M1802&rncps=&longitude=1.438407&latitude=44.45771&radius=10&diploma=3+(CAP...)
    please_intercept(cy, /api\/v1\/formations/, 'api_v1_formations.json', 'apiV1Formations')
    
    ///api/v1/jobs?romes=M1805,M1806,M1802&longitude=1.438407&latitude=44.45771&insee=46042&zipcode=46000&radius=10&strictRadius=strict
    please_intercept(cy, /api\/v1\/jobs/, 'api_v1_jobs.json', 'apiV1Jobs')



    // given
    let submitButton = cy.get('button.c-logobar-submit:visible')
    // when
    submitButton.click()
    // then
    cy.get('canvas.mapboxgl-canvas', { timeout: 10000 }).should('be.visible')
    cy.location().should((loc) => { expect(loc.pathname).to.eq('/recherche-apprentissage') })
  })

})
