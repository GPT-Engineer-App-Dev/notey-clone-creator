import React, { useState } from 'react';
import { Plus, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePages from '../hooks/usePages';

const Sidebar = ({ onSelectPage, darkMode, toggleDarkMode }) => {
  const { pages, addPage } = usePages();
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPage = () => {
    const newPage = addPage('New Page');
    onSelectPage(newPage);
  };

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-64 h-full bg-gray-100 dark:bg-gray-800 p-4 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold dark:text-white">Notion Clone</h1>
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
      <nav className="flex-grow overflow-y-auto">
        <ul>
          {filteredPages.map(page => (
            <li key={page.id} className="mb-2">
              <button
                onClick={() => onSelectPage(page)}
                className="text-left w-full px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              >
                {page.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;