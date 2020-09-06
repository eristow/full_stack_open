const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    });
    window.setTimeout(() => dispatch(clearNotification()), time * 1000);
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
