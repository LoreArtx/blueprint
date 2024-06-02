"use client"

import useFetchData from '@/hooks/useFetchData';
import IBlueprint from '@/types/IBlueprint';
import React from 'react';

const Home = () => {
  const { data, loading, error } = useFetchData<IBlueprint[] | null>("http://localhost:5555/api/blueprints")

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ul>
        {data && data.map(blueprint => (
          <li key={blueprint.id}>{blueprint.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
