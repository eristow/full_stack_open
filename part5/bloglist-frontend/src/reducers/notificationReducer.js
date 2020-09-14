const initialState = { message: '', timeoutId: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) {
        window.clearTimeout(state.timeoutId);
      }
      return { message: action.message, timeoutId: action.timeoutId };
    case 'CLEAR_NOTIFICATION':
      return initialState;
    default:
      return state;
  }
};

export const setNotification = (message, time) => {
  return async dispatch => {
    const timeoutId = window.setTimeout(
      () => dispatch(clearNotification()),
      time * 1000,
    );
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      timeoutId,
    });
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export default reducer;
