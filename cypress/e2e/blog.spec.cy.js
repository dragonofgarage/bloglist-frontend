describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'root',
      username: 'root',
      password: 'password'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.contains('login').click()
      cy.contains('root logged in')
      cy.contains('logout')
    })

    it.only('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.contains('login').click()

      cy.get('.errorMessage')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})