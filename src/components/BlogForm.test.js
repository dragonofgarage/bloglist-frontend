import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('update parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog}/>)

    const titleInput =screen.getByPlaceholderText('write title here')
    const authorInput =screen.getByPlaceholderText('write author here')
    const urlInput =screen.getByPlaceholderText('write url here')
    const createButton = screen.getByText('create')
    await user.type(titleInput, 'testing a form ...')
    await user.type(authorInput, 'test author')
    await user.type(urlInput, 'test url')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing a form ...')
    expect(createBlog.mock.calls[0][0].url).toBe('test url')
    expect(createBlog.mock.calls[0][0].author).toBe('test author')
  })
})