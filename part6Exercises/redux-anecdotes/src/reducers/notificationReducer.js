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
// action creators
const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION',
  data: {
    content: '',
    style: {
      display: 'none',
    },
  },
});

const setNotification = (notification) => (dispatch) => {
  dispatch({
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
  // returning a promise to ensure removal gets called after
  return Promise.resolve();
};
/*
timer is declared outside to so it is independent of each function call,
 it is so the notification appears for a uniform amount of time each time it is set
*/
let timer;

export const setTimedNotification = (notification, seconds) => (dispatch) => {
  // check if there is a timout currently and clears if so
  if (timer) {
    clearTimeout(timer);
  }
  dispatch(setNotification(notification))
    .then(
      // adds a new timer
      timer = setTimeout(() => dispatch(removeNotification()), seconds * 1000),
    );
};

export default reducer;
