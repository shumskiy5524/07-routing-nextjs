'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '../../../components/Modal/Modal';
import type { Note } from '../../../types/note';
import css from './NotePreview.module.css';

interface PageProps {
  params: { id: string };
}

export default function NotePreview({ params }: PageProps) {
  const router = useRouter();
  const { id } = params;

  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const closeModal = () => router.back();

  if (isLoading) return null;
  if (error || !note) return <p>Note not found</p>;

  return (
    <Modal onClose={closeModal}>
      <div className={css.wrapper}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
      </div>
    </Modal>
  );
}