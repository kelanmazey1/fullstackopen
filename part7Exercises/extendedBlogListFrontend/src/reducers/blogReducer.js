/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import blogService from '../services/blogs';
// used to inform the reducer handling users that a user has added a blog
import { userAddedBlog } from './usersInfoReducer';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;

    case 'ADD_BLOG':
      return [...state, action.data];

    case 'INCREMENT_LIKES':
      // find blog to add like
      const blogToAddLikeTo = state.find((b) => b.id === action.data.id);
      // submit new blog with likes incremented
      const blogLikeAdded = {
        ...blogToAddLikeTo,
        likes: blogToAddLikeTo.likes + 1,
      };
      // return array with updated blog
      return state.map((blog) => (blog.id !== action.data.id ? blog : blogLikeAdded));

    case 'ADD_COMMENT':
      return state.map((blog) => (blog.id !== action.data.id ? blog : action.data));
    case 'DELETE_BLOG':
      // find blog
      const blogToDelete = state.find((b) => b.id === action.data.id);
      // return array with blog omitted
      return state.filter((blog) => (blog.id !== blogToDelete.id));

    default:
      return state;
  }
};

// action creators
export const initializeBlogs = (blogs) => ({
  type: 'INIT_BLOGS',
  data: blogs,
});

export const addNewBlog = (blogToBeAdded) => async (dispatch) => {
  const newBlog = await blogService.createBlog(blogToBeAdded);
  dispatch(userAddedBlog(newBlog.user));
  dispatch({
    type: 'ADD_BLOG',
    data: newBlog,
  });
};

export const deleteBlog = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch({
    type: 'DELETE_BLOG',
    data: { id },
  });
};

export const showBlogDetail = (detail) => ({
  type: 'SHOW_DETAIL',
  data: detail,
});

export const addCommentAction = (blog, comment) => async (dispatch) => {
  const { id, comments } = blog;
  const updatedBlog = await blogService.update(id, {
    ...blog,
    comments: [...comments, comment],
  });
  dispatch({
    type: 'ADD_COMMENT',
    data: updatedBlog,
  });
};

export const incrementLikes = (blog) => async (dispatch) => {
  const { id, likes } = blog;
  await blogService.update(id, {
    ...blog,
    likes: likes + 1,
  });

  dispatch({
    type: 'INCREMENT_LIKES',
    data: { id },
  });
};

export default reducer;
