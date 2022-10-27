describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.createUser('root','root','password')
    cy.createUser('admin','admin','password')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.login({ username: 'root', password: 'password' })

      cy.contains('root logged in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.contains('login').click()

      cy.get('.errorMessage')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' })
    })

    it('a blog can be created', function() {
      cy.createBlog({ title: 'testTitle', author: 'testAuthor', url: 'testUrl' })
      cy.get('.blog').contains('testTitle')
    })

    it('a blog can be liked by user', function() {
      cy.createBlog({ title: 'testTitle', author: 'testAuthor', url: 'testUrl' })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('likes').contains(1)
    })

    it('a blog can be deleted by its owner', function() {
      cy.createBlog({ title: 'testTitle', author: 'testAuthor', url: 'testUrl' })
      cy.get('.detailButton').click()
      cy.contains('remove').click()
      cy.contains('remove successful')
      cy.get('html').should('not.contain', 'testTitle')
    })

    it('a blog can\'t be deleted by other user', function() {
      cy.createBlog({ title: 'testTitle', author: 'testAuthor', url: 'testUrl' })
      cy.contains('logout').click()
      cy.login({ username: 'admin', password: 'password' })
      cy.get('.detailButton').click()
        .should('not.contain', 'remove')
    })

    describe.only('blog display order', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'The title with the most likes', author: 'testAuthor', url: 'testUrl' })
        cy.createBlog({ title: 'The title with the second most likes', author: 'testAuthor', url: 'testUrl' })

        cy.contains('The title with the most likes')
          .contains('view').click()
        cy.contains('The title with the second most likes')
          .contains('view').click()
        cy.contains('The title with the most likes').parent().within(function() {
          cy.contains('like').click()
          if(cy.contains('likes: 1'))
            cy.contains('like').click()
        })
        if(cy.contains('likes: 2'))
          cy.contains('The title with the second most likes')
            .contains('like').click()
      })

      it('sort of the blog', function() {
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
      })

    })
  })
})