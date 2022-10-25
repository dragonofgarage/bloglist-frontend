import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

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
  //const mockHandler = jest.fn()

  beforeEach(() => {
    container = render(<Blog blog={sampleBlog} user={testUser} /*handleUpdateLikes={mockHandler}*//> ).container
  })


  test('display title and author', () => {
    const titleAndAuthor = screen.getByText( sampleBlog.author, sampleBlog.title)
    expect(titleAndAuthor).toBeDefined()
  })


  test('not display url and likes in default situation', () => {
    const div = container.querySelector('.blogDetail')
    expect(div).not.toBeVisible()
  })

  test('click button and show the detail', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.detailButton')
    await user.click(button)
    const blogUrl = container.querySelector('.blogUrl')
    const likes = container.querySelector('.likes')

    expect(blogUrl).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('click like button twice', async () => {
    const mockHandler = jest.fn()
    const user = userEvent.setup()
    const like = container.querySelector('.likes')
    like.onclick = mockHandler
    screen.debug(like)

    await user.click(like)
    await user.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})
