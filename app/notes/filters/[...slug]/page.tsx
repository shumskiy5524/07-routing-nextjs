import { fetchNotes } from '@/lib/api';

export default async function NotesByTag({ params }) {
  const { tag } = params;

  const notes =
    tag === 'all'
      ? await fetchNotes()
      : await fetchNotes(tag);

  return (
    <div>
      {notes.map(note => (
        <div key={note.id}>{note.title}</div>
      ))}
    </div>
  );
}