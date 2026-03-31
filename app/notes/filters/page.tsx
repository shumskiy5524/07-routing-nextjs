import { fetchNotes } from '@/lib/api';

export default async function NotesPage() {
  const notes = await fetchNotes();

  return (
    <div>
      {notes.map(note => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}