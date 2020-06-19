import userService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER_INFO':
      return action.data;
    case 'BLOG_ADDED':
      return state.map((user) => (user.id !== action.data.id ? user : action.data));
    default:
      return state;
  }
};

export const initUserInfo = () => async (dispatch) => {
  const allUsers = await userService.getAll();

  dispatch({
    type: 'INIT_USER_INFO',
    data: allUsers,
  });
};

export const userAddedBlog = (user) => ({
  type: 'BLOG_ADDED',
  data: user,
});
export default reducer;
