describe('shared-greeter: SharedGreeter component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=sharedgreeter--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to SharedGreeter!');
    });
});
