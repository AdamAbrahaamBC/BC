describe('Auth', function () {
  it('Login', function () {
    cy.visit('/')
    cy.url().should('include', '/login')
    cy.contains('Login')

    cy.get('[data-test="email"]').type('john.doe@vutbr.com')
    cy.get('[data-test="password"]').type('vutbr')
    cy.get('[data-test="submitButton"]').click()

    cy.contains('Hello, John!')
  })

  it('Logout', function () {
    cy.login()
    cy.visit('/')
    cy.contains('Hello, John!')

    cy.get('[data-test="logoutButton"]').click()

    cy.url().should('include', '/login')
    cy.contains('Login')
  })
})
