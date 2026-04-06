'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import SidebarNotes from '../@sidebar/default';
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


  const notes = notesData?.notes || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <div className={css.page}>

      <SidebarNotes />
      
      <main className={css.mainContent}>
         <h1>Tag: {tag}</h1>
      </main>
    </div>
  );
}