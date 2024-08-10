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
    setPages(prevPages => [...prevPages, newPage]);
    return newPage;
  };

  const updatePage = (id, title, content) => {
    setPages(prevPages => prevPages.map(page => 
      page.id === id ? { ...page, title, content } : page
    ));
  };

  const deletePage = (id) => {
    const pageToDelete = pages.find(page => page.id === id);
    if (pageToDelete) {
      setPages(prevPages => prevPages.filter(page => page.id !== id && page.parentId !== id));
      setTrashedPages(prevTrashedPages => [...prevTrashedPages, { ...pageToDelete, deletedAt: new Date() }]);
    }
  };

  const restorePage = (id) => {
    const pageToRestore = trashedPages.find(page => page.id === id);
    if (pageToRestore) {
      setTrashedPages(prevTrashedPages => prevTrashedPages.filter(page => page.id !== id));
      setPages(prevPages => [...prevPages, { ...pageToRestore, deletedAt: undefined }]);
    }
  };

  const permanentlyDeletePage = (id) => {
    setTrashedPages(prevTrashedPages => prevTrashedPages.filter(page => page.id !== id));
  };

  const movePage = (id, newParentId) => {
    setPages(prevPages => prevPages.map(page =>
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