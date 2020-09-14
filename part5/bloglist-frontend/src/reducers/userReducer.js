import loginService from '../services/login';
import blogService from '../services/blogs';

const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const user = action.data;
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      return user;
    }
    case 'LOGOUT':
      window.localStorage.removeItem('loggedUser');
      return initialState;
    case 'SET_USER':
      return action.data;
    default:
      return state;
  }
};

export const loginUser = potentialUser => {
  return async dispatch => {
    const user = await loginService.login(potentialUser);
    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  };
};

export const setUser = user => {
  blogService.setToken(user.token);
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const logoutUser = () => {
  return {
    type: 'LOGOUT',
  };
};

export default reducer;
