import React from "react";

interface Note {
  id: string;
  title: string;
}

interface FilteredNotesParams {
  tag?: string[];
}

async function fetchNotes(tag?: string): Promise<Note[]> {
  let url = "/api/notes"; 
  if (tag && tag !== "all") {
    url += `?tag=${encodeURIComponent(tag)}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export default async function FilteredNotes({
  params,
}: {
  params: FilteredNotesParams;
}) {
  const tagParam = params.tag?.[0] || "all"; 
  const notes = await fetchNotes(tagParam);

  return (
    <div style={{ padding: "20px" }}>
      <h2>{tagParam === "all" ? "All Notes" : `Notes tagged "${tagParam}"`}</h2>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note: Note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}