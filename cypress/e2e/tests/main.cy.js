/// <reference types="cypress" />

describe('Main page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cars/');
  });
  it('displays navbar', () => {
    cy.get('#navbar').should(
      'contain.html',
      '<img src="/public/img/logo.png">',
    );
  });
  it('displays footer', () => {
    cy.get('#footer').should(
      'contain.text',
      'Rent-A-Car by Rodrigo Fernandez.',
    );
    cy.get('#footer').should('contain.text', 'The source code is licensed');
  });
  it('displays empty carlist at start', () => {
    cy.get('#container h1').should('have.text', 'No cars to display yet!');
  });
});

describe('Form page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cars/');
  });
  it('redirects when click "Create car" button', () => {
    cy.contains('Create car').click();
    cy.get('form').should('be.visible');
  });
  it('do not send partialy complete form ', () => {
    cy.visit('http://localhost:3000/cars/new/');
    cy.get('input[name="brand"]').type('Ford');
    cy.get('input[name="year"]').type('2010');
    cy.get('input[name="kms"]').type('100000');
    cy.get('input[name="passengers"]').type('5');
    cy.get('input[name="color"]').type('red');
    cy.get('input[type=file]').selectFile('cypress/fixtures/img.png');
    cy.get('input[type=submit]').click();
    cy.get('form').should('be.visible');
  });
  it('send complete form', () => {
    cy.visit('http://localhost:3000/cars/new/');
    cy.get('input[name="brand"]').type('Ford');
    cy.get('input[name="model"]').type('Focus');
    cy.get('input[name="year"]').type('2010');
    cy.get('input[name="kms"]').type('100000');
    cy.get('input[name="passengers"]').type('5');
    cy.get('input[name="color"]').type('red');
    cy.get('input[type=file]').selectFile('cypress/fixtures/img.png');
    cy.get('input[type=submit]').click();
    cy.get('#container').should('be.visible');
    cy.get('figure').should('have.length', 1);
  });
});

describe('Cars management', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cars/');
  });
  it('opens edit form', () => {
    cy.contains('Edit').click();
    cy.get('form').should('be.visible');
    cy.get('input[name="brand"]').should('have.value', 'Ford');
    cy.get('input[name="year"]').should('have.value', '2010');
    cy.get('input[name="kms"]').should('have.value', '100000');
    cy.get('input[name="passengers"]').should('have.value', '5');
    cy.get('input[name="color"]').should('have.value', 'red');
  });
  it('deletes car', () => {
    cy.contains('Delete').click();
    cy.get('#container').should('be.visible');
    cy.get('figure').should('have.length', 0);
  });
});

