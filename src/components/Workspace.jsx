import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, Heading1, Heading2, Code, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePages from '../hooks/usePages';

const Workspace = ({ currentPage, setCurrentPage, updatePage, addPage }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing here...',
      }),
    ],
    content: currentPage.content,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setCurrentPage(prev => ({ ...prev, content: newContent }));
      updatePage(currentPage.id, currentPage.title, newContent);
    },
  });

  useEffect(() => {
    if (editor && currentPage.content !== editor.getHTML()) {
      editor.commands.setContent(currentPage.content);
    }
  }, [currentPage, editor]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
            break;
          case 'i':
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
            break;
          case '1':
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
            break;
          case '2':
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
            break;
          case 'l':
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
            break;
          case 'e':
            e.preventDefault();
            editor.chain().focus().toggleCodeBlock().run();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setCurrentPage(prev => ({ ...prev, title: newTitle }));
    updatePage(currentPage.id, newTitle, currentPage.content);
  };

  const handleAddNestedPage = () => {
    const newPage = addPage('New Nested Page', '', currentPage.id);
    setCurrentPage(newPage);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="flex-grow p-8 bg-white dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          value={currentPage.title}
          onChange={handleTitleChange}
          className="text-3xl font-bold w-full outline-none bg-transparent dark:text-white"
        />
        <Button variant="outline" size="sm" onClick={handleAddNestedPage}>
          <Plus className="h-4 w-4 mr-2" /> Add Nested Page
        </Button>
      </div>
      <div className="mb-4 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          title="Bullet List (Ctrl+L)"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          title="Heading 1 (Ctrl+1)"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          title="Heading 2 (Ctrl+2)"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
          title="Code Block (Ctrl+E)"
        >
          <Code className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none dark:prose-invert" />
    </div>
  );
};

export default Workspace;