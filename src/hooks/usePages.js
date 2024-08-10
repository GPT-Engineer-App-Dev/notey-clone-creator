import { useState } from 'react';

const usePages = () => {
  const [pages, setPages] = useState([
    { id: 1, title: 'Welcome Page', content: '<p>Welcome to your Notion clone!</p>', parentId: null },
    { id: 2, title: 'Getting Started', content: '<p>Here are some tips to get started...</p>', parentId: null },
    { id: 3, title: 'Nested Page Example', content: '<p>This is a nested page.</p>', parentId: 2 },
  ]);
  const [trashedPages, setTrashedPages] = useState([]);

  const addPage = (title, content = '', parentId = null) => {
    const newPage = {
      id: Date.now(),
      title,
      content,
      parentId,
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
    const pageToDelete = pages.find(page => page.id === id);
    if (pageToDelete) {
      setPages(pages.filter(page => page.id !== id && page.parentId !== id));
      setTrashedPages([...trashedPages, { ...pageToDelete, deletedAt: new Date() }]);
    }
  };

  const restorePage = (id) => {
    const pageToRestore = trashedPages.find(page => page.id === id);
    if (pageToRestore) {
      setTrashedPages(trashedPages.filter(page => page.id !== id));
      setPages([...pages, { ...pageToRestore, deletedAt: undefined }]);
    }
  };

  const permanentlyDeletePage = (id) => {
    setTrashedPages(trashedPages.filter(page => page.id !== id));
  };

  const movePage = (id, newParentId) => {
    setPages(pages.map(page =>
      page.id === id ? { ...page, parentId: newParentId } : page
    ));
  };

  return { 
    pages, 
    trashedPages, 
    addPage, 
    updatePage, 
    deletePage, 
    restorePage, 
    permanentlyDeletePage, 
    movePage 
  };
};

export default usePages;