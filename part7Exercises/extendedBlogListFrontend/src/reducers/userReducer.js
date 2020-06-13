const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('user action', action.data);
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (user) => ({
  type: 'SET_USER',
  data: { user },
});

export default reducer;
