import blogService from '../services/blogs';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LIKE': {
      return state.map(blog =>
        blog.id !== action.data.id ? blog : action.data,
      );
    }
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.id);
    case 'ADD_COMMENT':
      return state.map(blog => (blog.id !== action.data.id ? blog : action.data));
    default:
      return state;
  }
};

export const likeBlog = blog => {
  return async dispatch => {
    await blogService.update(blog.id, blog);
    dispatch({
      type: 'LIKE',
      data: blog,
    });
  };
};

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id);
    dispatch({
      type: 'REMOVE_BLOG',
      id,
    });
  };
};

export const addComment = blog => {
  return async dispatch => {
    const newBlog = await blogService.addComment(blog.id, blog);
    dispatch({
      type: 'ADD_COMMENT',
      data: newBlog,
    });
  };
};

export default reducer;
