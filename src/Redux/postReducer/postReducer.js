const initialState = {
  loading: false,
  posts: [],
  error: null,
};

const postReducer = (state = initialState, action) => {
    console.log(state,"state");
    console.log(action,"action");
  switch (action.type) {
    case 'FETCH_POSTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_POSTS_SUCCESS':
      return { ...state, loading: false, posts: action.payload };
    case 'FETCH_POSTS_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };

    case 'DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    default:
      return state;
  }
};

export default postReducer;
