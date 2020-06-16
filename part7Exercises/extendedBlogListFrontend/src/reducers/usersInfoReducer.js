import userService from '../services/users';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USER_INFO':

      return action.data;
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

export default reducer;
