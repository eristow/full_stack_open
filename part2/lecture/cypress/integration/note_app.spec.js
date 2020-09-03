describe('Note app', function () {
  beforeEach(function () {
    const user = {
      name: 'Test',
      username: 'test123',
      password: 'test123',
    };
    cy.resetDB(user);
  });

  it('Should allow the user to login', function () {
    cy.contains('Login').click();
    cy.get('#username').type('test123');
    cy.get('#password').type('test123');
    cy.get('#login-button').click();

    cy.contains('Test logged in');
  });

  it('Should fail when logging in with wrong password', function () {
    cy.contains('Login').click();
    cy.get('#username').type('test123');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Test logged in');
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'test123',
        password: 'test123',
      });
    });

    it('Should make new note when form submitted', function () {
      cy.contains('New Note').click();
      cy.get('#note-content').type('A note created by Cypress.');
      cy.get('#note-submit').click();
      cy.contains('A note created by Cypress.');
    });

    describe.only('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({ content: 'First note', important: false });
        cy.createNote({ content: 'Second note', important: false });
        cy.createNote({ content: 'Third note', important: false });
      });

      it('Should be important when "make important" button clicked', function () {
        cy.contains('Second note')
          .parent()
          .find('button')
          .as('importantButton');
        cy.get('@importantButton').click();
        cy.get('@importantButton').should('contain', 'make not important');
      });
    });
  });
});
