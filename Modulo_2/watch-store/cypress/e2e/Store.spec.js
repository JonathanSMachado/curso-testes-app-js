import { makeServer } from '../../miragejs/server';

context('Store e2e', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should visit the store', () => {
    cy.visit('http://localhost:3000');

    cy.get('body').contains('Brand');
    cy.get('body').contains('Wrist Watch');
  });
});
