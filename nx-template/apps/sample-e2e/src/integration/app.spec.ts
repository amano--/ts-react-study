import { getGreeting } from '../support/app.po';

describe('sample', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file
    cy.login('my-email@something.com', 'myPassword');

    cy.get('[data-e2e="pageTitle"]').contains('Welcome sample');
    cy.getEl('pageTitle').contains('Welcome sample');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome sample');
  });
});
