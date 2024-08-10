import { useState } from 'react';

const usePages = () => {
  const [pages, setPages] = useState([
    { id: 1, title: 'Welcome Page', content: 'Welcome to your Notion clone!' },
    { id: 2, title: 'Getting Started', content: 'Here are some tips to get started...' },
  ]);

  const addPage = (title, content = '') => {
    const newPage = {
      id: Date.now(),
      title,
      content,
    };
    setPages([...pages, newPage]);
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