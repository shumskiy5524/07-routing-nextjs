'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import NoteList from '@/components/NoteList/NoteList';

interface Props {
  tag?: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(t);
  }, [search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const { data, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ['notes', tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        tag: tag === 'all' ? undefined : tag,
        search: debouncedSearch,
        page,
      }),
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div>
      <SearchBox value={search} onChange={handleSearchChange} />

      <button onClick={() => setIsModalOpen(true)}>Add Note</button>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {!isLoading && notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && notes.length === 0 && <p>No notes found</p>}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={() => setIsModalOpen(false)}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}