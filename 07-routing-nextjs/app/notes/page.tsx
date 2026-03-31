import { fetchNotes } from '@/lib/api';
import { Note } from '@/types/note';

export default async function NotesPage() {
  const data = await fetchNotes({});

  return (
    <div>
      {data.notes.map((note: Note) => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}