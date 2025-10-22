import { useParams } from 'react-router-dom';
import React from 'react';

export default function UserDetails() {
  const { id } = useParams();
  return <h1>User Details for: {id}</h1>;
}
