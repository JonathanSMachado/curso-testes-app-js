context('Store e2e', () => {
  it('should visit the store', () => {
    cy.visit('http://localhost:3000');

    cy.get('body').contains('Brand');
    cy.get('body').contains('Wrist Watch');
    cy.get('body').contains('25 Products');
  });
});
