import { useState } from 'react';

const usePages = () => {
  const [pages, setPages] = useState([
    { id: 1, title: 'Welcome Page', content: '<p>Welcome to your Notion clone!</p>' },
    { id: 2, title: 'Getting Started', content: '<p>Here are some tips to get started...</p>' },
  ]);

  const addPage = (title, content = '') => {
    const newPage = {
      id: Date.now(),
      title,
      content,
    };
    setPages([...pages, newPage]);
    return newPage;
  };

  const updatePage = (id, title, content) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, title, content } : page
    ));
  };

  const deletePage = (id) => {
    setPages(pages.filter(page => page.id !== id));
  };

  return { pages, addPage, updatePage, deletePage };
};

export default usePages;