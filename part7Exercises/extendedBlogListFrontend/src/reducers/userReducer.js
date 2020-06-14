const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: 'SET_USER',
  data: user,
});

export const logOutUser = () => ({
  type: 'LOGOUT_USER',
});

export default reducer;
