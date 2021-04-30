describe('Presentation', function () {
  beforeEach(() => {
    cy.login()
    cy.visit('/')
  })

  it('Create new presentation', function () {
    // No presentations available
    cy.contains('You have no presentations yet, click the button above to create your first one')

    // Create new presentation
    cy.get('[data-test="createNewButton"]').click()
    cy.url().should('include', '/presentation/new')

    // Editor visible
    cy.get('[data-test="editor"]').should('be.visible')

    // Save presentation
    cy.get('[data-test="saveButton"]').click()
    cy.get('[data-test="titleInput"]').clear().type('Test novej prezentácie')
    cy.get('[data-test="descriptionInput"]').type('Popis verzie 1')
    cy.get('[data-test="saveNewButton"]').click()
    cy.get('[data-test="overwriteButton"]').should('be.visible')

    // Back to homepage
    cy.get('[data-test="homeButton"]').click()
    cy.get('[data-test="presentationSummaries"]').should('have.length', 1)

    // Name matches
    cy.contains('Test novej prezentácie')
  })

  it('Slide functionalities', function () {
    // Open presentation
    cy.get('[data-test="presentationSummaries"]').click()
    cy.get('[data-test="editVersionButton"]').click()

    // Open side panel
    cy.get('[data-test="slidesButton"]').click()

    // Can't delete one slide
    cy.get('[data-test="deleteSlideButton"]').should('be.disabled')

    // Test slide copy/paste
    cy.get('[data-test="pasteSlideButton"]').should('be.disabled')
    cy.get('[data-test="copySlideButton"]').click()
    cy.get('[data-test="pasteSlideButton"]').should('not.be.disabled')
    cy.get('[data-test="pasteSlideButton"]').click()
    cy.get('[data-test="slides"]').should('have.length', 2)

    // Test creating and deleting slides
    cy.get('[data-test="newSlideButton"]').click()
    cy.get('[data-test="deleteSlideButton"]').should('not.be.disabled')
    cy.get('[data-test="slides"]').should('have.length', 3)
    cy.get('[data-test="deleteSlideButton"]').click()
    cy.get('button').contains('Delete').click()
    cy.get('[data-test="slides"]').should('have.length', 2)

    // Open grid view
    cy.get('[data-test="openGridViewButton"]').click()
    cy.get('[data-test="editorSlideGrid"]').should('be.visible')
  })

  it('Create new version', function () {
    // Open presentation
    cy.get('[data-test="presentationSummaries"]').click()
    cy.get('[data-test="editVersionButton"]').click()

    // Save presentation
    cy.get('[data-test="saveButton"]').click()
    cy.get('[data-test="titleInput"]').clear().type('Nový názov')
    cy.get('[data-test="descriptionInput"]').clear().type('Popis verzie 2')
    cy.get('[data-test="saveNewButton"]').click()

    // Back to homepage
    cy.get('[data-test="homeButton"]').click()
    cy.get('[data-test="presentationSummaries"]').should('have.length', 1)

    // New name matches
    cy.contains('Nový názov')

    // Two versions available
    cy.get('[data-test="presentationSummaries"]').click()
    cy.get('[data-test="versions"]').should('have.length', 2)

    // Version 1 check
    cy.get('[data-test="versions"]').first().click()
    cy.contains('Popis verzie 1')

    // Version 2 check
    cy.get('[data-test="versions"]').last().click()
    cy.contains('Popis verzie 2')

    // Version 2 edit
    cy.get('[data-test="editVersionButton"]').click()
    cy.url().should('contain', '/2')

    // Overwrite version
    cy.get('[data-test="saveButton"]').click()
    cy.get('[data-test="titleInput"]').clear().type('Nový názov')
    cy.get('[data-test="descriptionInput"]').clear().type('Prepísaná verzia 2')
    cy.get('[data-test="overwriteButton"]').click()
    cy.get('button').contains('Save').click()

    // Back to homepage
    cy.get('[data-test="homeButton"]').click()
    cy.get('[data-test="presentationSummaries"]').should('have.length', 1)

    // Check overwrite
    cy.get('[data-test="presentationSummaries"]').click()
    cy.get('[data-test="versions"]').should('have.length', 2)
    cy.get('[data-test="versions"]').last().click()
    cy.contains('Prepísaná verzia 2')
  })

  it('Delete version', function () {
    cy.get('[data-test="presentationSummaries"]').click()
    cy.get('[data-test="versions"]').last().click()
    cy.get('[data-test="deleteVersionButton"]').click()
    cy.get('input').type('v2')
    cy.get('button').contains('Delete').click()
    cy.get('[data-test="versions"]').should('have.length', 1)
  })

  it('Preview presentation', function () {
    cy.get('[data-test="presentationSummaries"]').click()
    cy.get('[data-test="viewVersionButton"]').click()
    cy.url().should('contain', '/preview')
  })

  it('Delete presentation', function () {
    // Delete presentation
    cy.get('[data-test="deletePresentationButton"]').click()
    cy.get('.input').type('Nový názov')
    cy.get('button').contains('Delete').click()

    // User has no presentation
    cy.contains('You have no presentations yet, click the button above to create your first one')
  })
})
