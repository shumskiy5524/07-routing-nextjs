'use client';

import { useState, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fetchNotes, FetchNotesParams } from '../../../../lib/api';
import { Note } from '../../../../types/note';
import SearchBox from '../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../components/Pagination/Pagination';
import Modal from '../../../../components/Modal/Modal';
import NoteForm from '../../../../components/NoteForm/NoteForm';
import NoteList from '../../../../components/NoteList/NoteList';

interface NotesClientProps {
  tag?: string;
}


const queryClient = new QueryClient();

export default function NotesClient({ tag }: NotesClientProps) {
  
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  
  const queryParams: FetchNotesParams = {
    tag,
    search: debouncedSearch,
    page: currentPage,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div>
       
        <SearchBox value={search} onChange={setSearch} />

        <button onClick={() => setIsModalOpen(true)}>Add Note</button>

       
        <NotesList queryParams={queryParams} />

        
        <Pagination
          totalPages={10}
          currentPage={currentPage} onPageChange={setCurrentPage} />

       
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onSubmit={() => setIsModalOpen(false)}
            onClose={() => setIsModalOpen(false)}/>
          </Modal>
        )}
      </div>
    </QueryClientProvider>
  );
}


interface NotesListProps {
  queryParams: FetchNotesParams;
}

function NotesList({ queryParams }: NotesListProps) {
  const { data: notesData, isLoading } = useQuery<Note[], Error>({
    queryKey: ['notes', queryParams],
    queryFn: () => fetchNotes(queryParams).then(res => res.notes),
    staleTime: 5000,
    refetchOnWindowFocus: false,
  });

  const notes = notesData ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (notes.length === 0) return <p>No notes found.</p>;

  return <NoteList notes={notes} />;
}