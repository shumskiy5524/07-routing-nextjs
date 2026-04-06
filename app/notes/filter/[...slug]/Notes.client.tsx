'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchNotes, FetchNotesParams } from '../../../../lib/api';
import { Note } from '../../../../types/note';

export default function NotesClient() {
  const params = useParams();
  const tag = params.slug?.[0] === 'all' ? undefined : params.slug?.[0];
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const paramsObj: FetchNotesParams = tag ? { tag } : {};
    fetchNotes(paramsObj).then((res) => setNotes(res.notes));
  }, [tag]);

  return (
    <>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </>
  );
}