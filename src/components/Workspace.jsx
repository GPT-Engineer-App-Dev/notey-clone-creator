import React, { useState, useEffect } from 'react';
import { Bold, Italic, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePages from '../hooks/usePages';

const Workspace = () => {
  const { pages, updatePage } = usePages();
  const [currentPage, setCurrentPage] = useState(pages[0]);

  useEffect(() => {
    setCurrentPage(pages[0]);
  }, [pages]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setCurrentPage({ ...currentPage, title: newTitle });
    updatePage(currentPage.id, newTitle, currentPage.content);
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setCurrentPage({ ...currentPage, content: newContent });
    updatePage(currentPage.id, currentPage.title, newContent);
  };

  return (
    <div className="flex-grow p-8">
      <div className="mb-4">
        <input
          type="text"
          value={currentPage.title}
          onChange={handleTitleChange}
          className="text-3xl font-bold w-full outline-none"
        />
      </div>
      <div className="mb-4 flex space-x-2">
        <Button variant="outline" size="icon">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <List className="h-4 w-4" />
        </Button>
      </div>
      <textarea
        value={currentPage.content}
        onChange={handleContentChange}
        placeholder="Start typing here..."
        className="w-full h-[calc(100vh-200px)] p-4 border rounded-md resize-none outline-none"
      />
    </div>
  );
};

export default Workspace;