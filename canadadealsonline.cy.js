/// <reference types="cypress" />

describe('Canada Deals Online Search Tests', () => {
    const searchTerms = ['Keyboard', 'Shower Carpet', 'Air Fryer'];
  
    beforeEach(() => {
      cy.visit('https://www.canadadealsonline.com/');
    });
  
    it('Search term has more than 1 search results in dropdown', () => {
      searchTerms.forEach((term) => {
        cy.get('input.block[placeholder="Search"]').as('searchInput')
          .type(term)
          .get('.suggestion-container li').should('have.length.gt', 1)
          .get('@searchInput').clear();
      });
    });
  
    it('Search term appears in top 3 options in search results', () => {
        searchTerms.forEach((term) => {
          cy.get('input.block[placeholder="Search"]').as('searchInput')
            .type(term)
           // .type('{enter}')
           .get('.suggestion-template').first().should('contain', term)
            .get('@searchInput').clear();
        });
      });
  
    it('Clicking on first search result does not lead to "http 404 not found" page', () => {
      searchTerms.forEach((term) => {
        cy.get('input.block[placeholder="Search"]').as('searchInput')
          .type(term)
          .get('.suggestion-template').first().click()
          .url().should('not.include', '/404')
          cy.visit('https://www.canadadealsonline.com/');
      });
    });
  });
  