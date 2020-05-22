const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;

    case 'REMOVE_NOTIFICATION':
      return action.data;
    default:
      return state;
  }
};

export const setNotification = (notification) => ({
  type: 'SET_NOTIFICATION',
  data: {
    content: notification,
    style: {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
    },
  },
});

export const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION',
  data: {
    content: '',
    style: {
      display: 'none',
    },
  },
});

export default reducer;
