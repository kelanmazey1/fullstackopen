/* eslint-disable prefer-arrow-callback */

import { oneOfType } from "prop-types";

/* eslint-disable func-names */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Kelan Mazey',
      username: 'kel',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is show', function () {
    cy.contains('Login');
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-button')
      .should('have.text', 'login')
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kel');
      cy.get('#password').type('test');
      cy.get('#login-button').click();

      cy.contains('Kelan Mazey logged in');
      cy.contains('new blog');
    });

    it('false with wrong credentials', function () {
      cy.get('#username').type('kel');
      cy.get('#password').type('nottherightpassword');
      cy.get('#login-button').click();

      cy.get('.error')
        .should('contain', 'Wrong Credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'kel', password: 'test' });
      });

      it('a new blog can be created', function () {
        cy.contains('new blog').click();

        cy.get('input[name="Title"]').type('cypress wrote this title');
        cy.get('input[name="Author"]').type('cypress');
        cy.get('input[name="URL"]').type('https://docs.cypress.io/');

        cy.get('#create-button')
          .should('contain', 'create')
          .click();

        cy.contains('a new blog cypress wrote this title by cypress added');
      });

      describe('Alter single blog', function () {
        beforeEach(function () {
          cy.createBlog({ 
            author: 'cypress',
            title: 'cypress wrote this title',
            url: 'https://docs.cypress.io/'
          });
        });

        it('a blog can be liked', function () {
          cy.contains('cypress wrote this title cypress');

          cy.get('#detail-button')
            .should('contain', 'view')
            .click();

          cy.get('.likes').should('contain', 'likes 0');

          cy.get('.likes')
            .children('button')
            .should('contain', 'like')
            .click();

            cy.get('.likes').should('contain', 'likes 1');
        });

        it('a blog can be deleted by the authorized user', function () {
          cy.contains('cypress wrote this title cypress');

          cy.get('#detail-button')
            .should('contain', 'view')
            .click();

          cy.get('#delete-button')
            .should('contain', 'delete')
            .click();

          cy.get('.html')
            .should('not.contain', 'cypress wrote this title cypress');
        });
        
      });

      describe.only('Multiple blogs', function () {
        beforeEach(function () {
          cy.createBlog({ 
            author: 'cypress again..',
            title: 'this should be 2nd',
            url: 'https://somuchcypress',
            likes: 5
          });
          
          cy.createBlog({ 
            author: 'cypress no likes',
            title: 'this should be last',
            url: 'https://google.co.uk',
            likes: 0
          });

          cy.createBlog({ 
            author: 'cypress',
            title: 'this should be top',
            url: 'https://docs.cypress.io/',
            likes: 10,
          });
    
        });
        // this works as the most liked blog should appear in the DOM first and always be blog 1
        it('blogs are ordered by likes', function () {
          cy.get('.blog')
            .each((blog, index) => {
              cy.wrap(blog).as(`blog ${index + 1}`)
            })
          
          cy.get('@blog 1').should('contain', 'this should be top');
          cy.get('@blog 2').should('contain', 'this should be 2nd');
          cy.get('@blog 3').should('contain', 'this should be last');
        
        });
      });
    });
  });
});

