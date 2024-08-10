import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Workspace from '../components/Workspace';
import usePages from '../hooks/usePages';

const Index = () => {
  const pagesContext = usePages();
  const [currentPage, setCurrentPage] = useState(pagesContext.pages[0]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSelectPage = (page) => {
    setCurrentPage(page);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <Sidebar
        onSelectPage={handleSelectPage}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Workspace
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        updatePage={pagesContext.updatePage}
        addPage={pagesContext.addPage}
      />
    </div>
  );
};

export default Index;