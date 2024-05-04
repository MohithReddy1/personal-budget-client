// visual-regression.cy.js

describe('Visual Regression Test', () => {
    before(() => {
      // Set Applitools API key before the tests run
      Cypress.env('APPLITOOLS_API_KEY', 'd2j5AWKqXxwrFVMmNbQXexHLmEjYy111pCt85gz4Seb0w110');
    });
  
    it('should match the login page screenshot', () => {
      // Visit the login page
      cy.visit('http://localhost:3000/login');
  
      // Take a full-page screenshot using Applitools
      cy.eyesOpen({
        appName: 'Personal Budget',
        testName: 'Login Page Test',
      });
      cy.eyesCheckWindow('Login Page');
  
      // Close the Applitools session
      cy.eyesClose();
    });
  });  