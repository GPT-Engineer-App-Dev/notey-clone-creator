import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePages from '../hooks/usePages';

const Workspace = () => {
  const { pages, updatePage } = usePages();
  const [currentPage, setCurrentPage] = useState(pages[0]);

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
    setCurrentPage(pages[0]);
  }, [pages]);

  useEffect(() => {
    if (editor && currentPage.content !== editor.getHTML()) {
      editor.commands.setContent(currentPage.content);
    }
  }, [currentPage, editor]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setCurrentPage(prev => ({ ...prev, title: newTitle }));
    updatePage(currentPage.id, newTitle, currentPage.content);
  };

  if (!editor) {
    return null;
  }

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
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
};

export default Workspace;