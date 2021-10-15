/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Navigation', () => {

  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')
    // cy.pause()
    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="a-propos"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/a-propos')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('A propos')
  })

})
