/* eslint-disable import/prefer-default-export */
import blogService from '../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;

    case 'ADD_BLOG':
      return [...state, action.data];
    // case 'SHOW_DETAIL':
    //   console.log('showing detail action', action.data);
    //   return action.data;
    // case 'INCREMENT_LIKES':
    //   console.log('adding a like', action.data);
    //   return action.data;
    default:
      return state;
  }
};

export const initializeBlogs = (blogs) => ({
  type: 'INIT_BLOGS',
  data: blogs,
});

export const addNewBlog = (blogToBeAdded) => async (dispatch) => {
  const newBlog = await blogService.createBlog(blogToBeAdded);
  dispatch({
    type: 'ADD_BLOG',
    data: newBlog,
  });
};

export const showBlogDetail = (detail) => ({
  type: 'SHOW_DETAIL',
  data: detail,
});

export const incrementLikes = (id) => ({
  type: 'INCREMENT_LIKES',
  data: { id },
});

export default reducer;
