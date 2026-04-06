'use client';

import { useState, useMemo } from 'react';
import { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';

interface NotesClientProps {
  tag?: string;       
  notes?: Note[];     
}

export default function NotesClient({ tag, notes: initialNotes }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  
  const filteredNotes = useMemo(() => {
    if (!initialNotes) return [];
    return initialNotes
      .filter((note) => !tag || tag === 'all' || note.tag === tag) 
      .filter((note) => note.title.toLowerCase().includes(search.toLowerCase())); 
  }, [initialNotes, search, tag]);

  const totalPages = Math.ceil(filteredNotes.length / 10);
  const paginatedNotes = filteredNotes.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />
      <button onClick={() => setIsModalOpen(true)}>Add Note</button>

      <NoteList notes={paginatedNotes} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSubmit={() => setIsModalOpen(false)} onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}