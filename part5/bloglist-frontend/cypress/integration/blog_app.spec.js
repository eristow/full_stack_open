describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDB({ name: 'Test', username: 'test123', password: 'test123' });
  });

  it('Should show the login form on first visit', function () {
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-submit');
  });

  describe('Login', function () {
    it('Should succeed with correct credentials', function () {
      cy.get('#username').type('test123');
      cy.get('#password').type('test123');
      cy.get('#login-submit').click();

      cy.get('.error')
        .should('contain', 'Successfully logged in')
        .and('have.css', 'color', 'rgb(0, 0, 255)');

      cy.get('html').should('contain', 'Test logged in');
    });

    it('Should fail with wrong credentials', function () {
      cy.get('#username').type('test123');
      cy.get('#password').type('wrong');
      cy.get('#login-submit').click();

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(0, 0, 255)');

      cy.get('html').should('not.contain', 'Test logged in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test123', password: 'test123' });
    });

    it('Should create a blog when blog form submitted', function () {
      cy.contains('New Blog').click();
      cy.get('#title').type('Test Title');
      cy.get('#author').type('Test Author');
      cy.get('#url').type('http://www.testurl.com');
      cy.get('#blog-submit').click();

      cy.get('html').should('contain', 'Test Title');
    });

    describe('Blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'First blog',
          author: 'Author One',
          url: 'http://www.one.com',
        });
        cy.createBlog({
          title: 'Second blog',
          author: 'Author Two',
          url: 'http://www.two.com',
        });
        cy.createBlog({
          title: 'Third blog',
          author: 'Author Three',
          url: 'http://www.three.com',
        });
      });

      it('Should show blog details when show button clicked', function () {
        cy.contains('First blog').parent().find('button').click();
        cy.get('html').should('contain', 'Author One');
        cy.get('html').should('contain', 'http://www.one.com');
        cy.get('html').should('contain', 'likes 0');
      });

      it('Should increment likes when like button clicked', function () {
        cy.contains('Second blog').parent().find('button').click();
        cy.contains('Second blog').parent().get('#like-button').click();
        cy.contains('Second blog')
          .parent()
          .get('.blogDetails')
          .should('contain', 'likes 1');
      });

      it('Should delete blog owned by logged-in user when delete clicked', function () {
        cy.contains('Third blog').parent().find('button').click();
        cy.contains('Third blog').parent().get('#delete-button').click();
        cy.get('html').should('not.contain', 'Third blog');
      });

      it('Should not delete blog owned by somebody else when delete clicked', function () {
        cy.request('POST', 'http://localhost:3001/api/users', {
          name: 'User2',
          username: 'user2',
          password: 'user2',
        });
        cy.get('#logout-button').click();
        cy.login({ username: 'user2', password: 'user2' });

        cy.contains('Third blog').parent().find('button').click();
        cy.contains('Third blog')
          .parent()
          .should('not.contain', '#delete-button');
        cy.get('html').should('contain', 'Third blog');
      });

      it('Should display blogs in descending order of likes', function () {
        // Fix repeated code?
        cy.contains('Second blog').parent().find('button').click();
        cy.contains('http://www.two.com').get('#like-button').click();
        cy.contains('First blog').parent().find('button').click();
        cy.contains('http://www.two.com').get('#like-button').click();
        cy.contains('Second blog').parent().find('button').click();
        cy.contains('Third blog').parent().find('button').click();
        cy.contains('http://www.three.com').get('#like-button').click();
        cy.contains('Second blog').parent().find('button').click();

        // This test is not very extensible if the UI changes...
        cy.get('#blogs-list>div').each($el => {
          cy.wrap($el)
            .get('.blogDetails>#blog-likes')
            .each(($el, index) => {
              switch (index) {
              case 0:
                cy.wrap($el).contains('likes 2');
                break;
              case 1:
                cy.wrap($el).contains('likes 1');
                break;
              case 2:
                cy.wrap($el).contains('likes 0');
                break;
              }
            });
        });
      });
    });
  });
});
