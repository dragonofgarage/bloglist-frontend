import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup  } from '@testing-library/react'
import Blog from './Blog'

afterEach(cleanup)

describe('<Blog />', () => {
  const testUser = {
    id:'123456789'
  }

  const sampleBlog= {
    title: 'test',
    author: 'testMc',
    url: 'testUrl',
    likes: 0,
    id: 123456789,
    user: [{ id:'1234456789' }]
  }

  let container

  beforeEach(() => {
    container = render(<Blog blog={sampleBlog} user={testUser}/>).container
  })


  test('display title and author', () => {
    const titleAndAuthor = screen.getByText( sampleBlog.author, sampleBlog.title)
    expect(titleAndAuthor).toBeDefined()
  })


  test('not display url and likes in default situation', () => {
    const div = container.querySelector('.blogDetail')
    expect(div).not.toBeVisible()
  })

})
