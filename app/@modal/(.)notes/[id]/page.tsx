'use client';

import { useEffect, useState } from 'react';
import NotePreview from '../../../../components/NotePreview/NotePreview';
import { fetchNoteById } from '../../../../lib/api';
import { Note } from '../../../../types/note';

export default function NoteModalPage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNoteById(params.id).then(setNote);
  }, [params.id]);

  if (!note) return null;

  return <NotePreview note={note} />;
}