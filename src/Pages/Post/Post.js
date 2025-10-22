import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { fetchPosts, addPost, deletePost } from '../../Redux/PostAction/postAction';

export default function Posts() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);

  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleAdd = () => {
    if (title.trim() === '') return;

    const newPost = {
      id: Math.random(), 
      title,
    };

    dispatch(addPost(newPost));
    setTitle('');
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Posts</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Post Title"
      />
      <button onClick={handleAdd}>Add Post</button>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}{' '}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
