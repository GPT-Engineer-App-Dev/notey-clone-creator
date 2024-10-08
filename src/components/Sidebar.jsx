import React, { useState } from 'react';
import { Plus, Search, Moon, Sun, ChevronRight, ChevronDown, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePages from '../hooks/usePages';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const PageItem = ({ page, onSelectPage, onToggle, isOpen, level = 0, onDelete }) => {
  const { pages } = usePages();
  const childPages = pages.filter(p => p.parentId === page.id);

  return (
    <>
      <Draggable draggableId={page.id.toString()} index={page.id}>
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-1"
          >
            <div className="flex items-center">
              <button
                onClick={() => onSelectPage(page)}
                className={`text-left w-full px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white flex items-center ${
                  level > 0 ? 'ml-4' : ''
                }`}
              >
                {childPages.length > 0 && (
                  <span onClick={(e) => { e.stopPropagation(); onToggle(page.id); }}>
                    {isOpen ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                  </span>
                )}
                {page.title}
              </button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(page.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        )}
      </Draggable>
      {isOpen && childPages.length > 0 && (
        <Droppable droppableId={`${page.id}-children`} type="page">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              {childPages.map((childPage) => (
                <PageItem
                  key={childPage.id}
                  page={childPage}
                  onSelectPage={onSelectPage}
                  onToggle={onToggle}
                  isOpen={isOpen}
                  level={level + 1}
                  onDelete={onDelete}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      )}
    </>
  );
};

const Sidebar = ({ onSelectPage, darkMode, toggleDarkMode }) => {
  const { pages, trashedPages, addPage, movePage, deletePage, restorePage, permanentlyDeletePage } = usePages();
  const [searchTerm, setSearchTerm] = useState('');
  const [openPages, setOpenPages] = useState({});
  const [showTrash, setShowTrash] = useState(false);

  const handleAddPage = () => {
    const newPage = addPage('New Page');
    onSelectPage(newPage);
  };

  const togglePage = (id) => {
    setOpenPages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) && page.parentId === null
  );

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const sourceId = parseInt(result.draggableId);
    const destinationId = parseInt(result.destination.droppableId.split('-')[0]);

    if (sourceId !== destinationId) {
      movePage(sourceId, destinationId === 0 ? null : destinationId);
    }
  };

  return (
    <div className="w-64 h-full bg-gray-100 dark:bg-gray-800 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold dark:text-white">Lotion</h1>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search"
          className="w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-4 w-4 text-gray-500" />}
        />
      </div>
      <Button className="mb-4 w-full" onClick={handleAddPage}>
        <Plus className="h-4 w-4 mr-2" /> New Page
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="0" type="page">
          {(provided) => (
            <nav className="flex-grow overflow-y-auto" ref={provided.innerRef} {...provided.droppableProps}>
              <ul>
                {filteredPages.map(page => (
                  <PageItem
                    key={page.id}
                    page={page}
                    onSelectPage={onSelectPage}
                    onToggle={togglePage}
                    isOpen={openPages[page.id]}
                    onDelete={deletePage}
                  />
                ))}
                {provided.placeholder}
              </ul>
            </nav>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setShowTrash(!showTrash)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Trash
        </Button>
        {showTrash && (
          <ul className="mt-2">
            {trashedPages.map(page => (
              <li key={page.id} className="flex items-center justify-between py-1">
                <span className="text-sm dark:text-white">{page.title}</span>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => restorePage(page.id)}>
                    Restore
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => permanentlyDeletePage(page.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;