const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'ENABLE_NOTIFICATION':
      return action.notification;
    case 'DISABLE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

export const enableNotification = notification => {
  return {
    type: 'ENABLE_NOTIFICATION',
    notification,
  };
};

export const disableNotification = notification => {
  return {
    type: 'DISABLE_NOTIFICATION',
  };
};

export default notificationReducer;
