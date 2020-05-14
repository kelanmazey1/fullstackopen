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
  });
});

