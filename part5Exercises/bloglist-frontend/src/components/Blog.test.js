import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('renders blog with author and title only by default', () => {
  const blog = {
    title: 'Only the title and author should appear',
    author: 'Me it\'s always me',
    url: 'localhost:3000',
  }

  const component = render(
    <Blog blog={blog} />
  )

  const blogDiv = component.container.querySelector('.blog');
  const blogDetails = component.container.querySelector('.blog-details');
  const moreDetailButton = component.getByText('view');

  expect(blogDetails).toHaveTextContent(
    'Only the title and author should appear Me it\'s always me'
  )

  expect(moreDetailButton).toBeInTheDocument();
  expect(blogDiv).toContainElement(blogDetails);
  expect(blogDiv).toContainElement(moreDetailButton);





})