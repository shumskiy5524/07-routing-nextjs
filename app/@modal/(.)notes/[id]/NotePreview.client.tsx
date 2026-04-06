'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import  Modal  from '../../../../components/Modal/Modal'; 
import { Note } from '../../../../types/note';

interface NotePreviewProps {
  noteId: string;
}

async function fetchNote(id: string): Promise<Note> {
  const res = await fetch(`/api/notes/${id}`);
  if (!res.ok) throw new Error('Failed to fetch note');
  return res.json();
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data: note, isLoading, isError } = useQuery<Note, Error>({
  queryKey: ['note', noteId],
  queryFn: () => fetchNote(noteId),
});

  if (isLoading) return <Modal onClose={() => router.back()}>Loading...</Modal>;
  if (isError || !note) return <Modal onClose={() => router.back()}>Error loading note.</Modal>;

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p><strong>Tag:</strong> {note.tag}</p>
      <p><strong>Created At:</strong> {new Date(note.createdAt).toLocaleString()}</p>
    </Modal>
  );
}

