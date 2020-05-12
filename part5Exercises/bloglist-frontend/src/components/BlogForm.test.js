import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  const currentUser = {
    name: 'test',
    username: 'test_username',
  };

  test('blog is added when correct content', async () => {
    const mockSetNotification = jest.fn();
    const mockSetError = jest.fn();
    const mockConcatBlog = jest.fn();
    const mockToggle = jest.fn();

    const mockAddBlog = jest.fn();

    const component = render(
      <BlogForm
        currentUser={currentUser}
        concatNewBlog={mockConcatBlog}
        setIsError={mockSetError}
        toggleVisibility={mockToggle}
        setNotification={mockSetNotification}
        mockAddBlog={mockAddBlog}
      />,
    );

    const title = component.getByTestId('title');
    const author = component.getByTestId('author');
    const url = component.getByTestId('url');

    const form = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'testing a form is annoying' },
    });
    fireEvent.change(author, {
      target: { value: 'Kelan' },
    });
    fireEvent.change(url, {
      target: { value: 'google.com' },
    });

    await fireEvent.submit(form);

    expect(mockAddBlog.mock.calls).toHaveLength(1);
  });
});
