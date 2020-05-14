/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is show', function () {
    cy.contains('Login');
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-button')
      .should('have.text', 'login')
  });
});

