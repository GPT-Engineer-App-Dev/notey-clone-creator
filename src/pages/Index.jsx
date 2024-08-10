import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Workspace from '../components/Workspace';
import usePages from '../hooks/usePages';

const Index = () => {
  const pagesContext = usePages();
  const [currentPage, setCurrentPage] = useState(pagesContext.pages[0]);

  const handleSelectPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar {...pagesContext} onSelectPage={handleSelectPage} />
      <Workspace {...pagesContext} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Index;