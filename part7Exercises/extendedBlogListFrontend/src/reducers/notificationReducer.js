const initialState = {
  text: null,
  error: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  data: notification,
});

export const clearNotification = () => ({
  type: 'SET_NOTIFICATION',
  data: initialState,
});

export default reducer;
