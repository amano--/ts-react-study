/* eslint-disable @typescript-eslint/no-namespace */
export * from './lib/shared-e2e-utils';

/// <reference types="Cypress" />
declare namespace Cypress {
  interface Chainable<Subject = any> {
    getEl<E extends Node = HTMLElement>(
      identifier: string
    ): Chainable<JQuery<E>>;
  }
}

Cypress.Commands.add(
  'getEl',
  { prevSubject: 'optional' },
  (subject: Cypress.Chainable, identifier: string) => {
    if (subject) {
      return subject.find(`[data-e2e="${identifier}"]`);
    } else {
      return cy.get(`[data-e2e="${identifier}"]`);
    }
  }
);
