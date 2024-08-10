import React from 'react';
import Sidebar from '../components/Sidebar';
import Workspace from '../components/Workspace';
import usePages from '../hooks/usePages';

const Index = () => {
  const pagesContext = usePages();

  return (
    <div className="flex h-screen bg-white">
      <Sidebar {...pagesContext} />
      <Workspace {...pagesContext} />
    </div>
  );
};

export default Index;