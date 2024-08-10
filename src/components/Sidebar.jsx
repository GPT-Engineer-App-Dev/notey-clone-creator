import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import usePages from '../hooks/usePages';

const Sidebar = () => {
  const { pages, addPage } = usePages();

  const handleAddPage = () => {
    addPage('New Page');
  };

  return (
    <div className="w-64 h-full bg-gray-100 p-4 flex flex-col">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold">Notion Clone</h1>
      </div>
      <div className="mb-4">
        <Input type="text" placeholder="Search" className="w-full" 
               icon={<Search className="h-4 w-4 text-gray-500" />} />
      </div>
      <Button className="mb-4 w-full" onClick={handleAddPage}>
        <Plus className="h-4 w-4 mr-2" /> New Page
      </Button>
      <nav className="flex-grow overflow-y-auto">
        <ul>
          {pages.map(page => (
            <li key={page.id} className="mb-2">
              <a href="#" className="text-gray-700 hover:text-gray-900">{page.title}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;