
export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: data.slice(0, 10) }); 
    } catch (error) {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: error.message });
    }
  };
};


export const addPost = (post) => {
  return {
    type: 'ADD_POST',
    payload: post,
  };
};


export const deletePost = (id) => {
  return {
    type: 'DELETE_POST',
    payload: id,
  };
};
