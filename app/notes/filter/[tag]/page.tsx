'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import css from './page.module.css';

interface PageProps {
  params: {
    tag: string;
  };
}

export default function NotesPage({ params }: PageProps) {
  const { tag } = params;

  const { data: notesData, isLoading, error } = useQuery({
    queryKey: ['notes', tag],
    queryFn: () => fetchNotes({ search: tag === 'all' ? undefined : tag }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  const notes = notesData?.notes || [];

  return (
    <div className={css.page}>
      <main className={css.mainContent}>
        <h1>Tag: {tag}</h1>
        <ul>
          {notes.map(note => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}