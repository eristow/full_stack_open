const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) {
        window.clearTimeout(state.timeoutId);
      }
      return { notification: action.notification, timeoutId: action.timeoutId };
    case 'CLEAR_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const setNotification = (notification, time) => {
  return async dispatch => {
    const timeoutId = window.setTimeout(
      () => dispatch(clearNotification()),
      time * 1000,
    );
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
      timeoutId,
    });
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default notificationReducer;
