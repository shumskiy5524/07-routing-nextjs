import { fetchNoteById } from '@/lib/api';

export default async function NotePage({ params }) {
  const note = await fetchNoteById(params.id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
}