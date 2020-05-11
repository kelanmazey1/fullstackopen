import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog /> with user who created blogs logged in', () => {
  let component;

  beforeEach(() => {
    const blog = {
      title: 'Only the title and author should appear',
      author: 'Me it\'s always me',
      url: 'localhost:3000',
      likes: 0,
      user: {
        name: 'test',
        username: 'test_username'
      }
    }

  const currentUser = {
    name: 'test',
    username: 'test_username'
  }

    component = render(
      <Blog blog={blog} currentUser={currentUser}/>
    );
  });
  
  test('renders blog with author and title only by default', () => {

    const blogDiv = component.container.querySelector('.blog');
    const blogDetails = component.container.querySelector('.blog-details');
    const moreDetailButton = component.getByText('view');

    expect(blogDetails).toHaveTextContent(
      'Only the title and author should appear Me it\'s always me'
    );

    expect(moreDetailButton).toBeInTheDocument();
    expect(blogDiv).toContainElement(blogDetails);
    expect(blogDiv).toContainElement(moreDetailButton);
  });

  test('shows url and likes when view button is clicked', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const extraDetail = component.container.querySelector('.extraDetail');

    expect(extraDetail).toBeDefined();

    expect(extraDetail).toContainElement(
      component.getByText('localhost:3000')
    );

    expect(extraDetail).toContainElement(
      component.getByText('likes 0')
    );
  })
});