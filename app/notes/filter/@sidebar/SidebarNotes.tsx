
"use client";
import Link from "next/link";

const tags = ["Work", "Personal", "Ideas", "Shopping"];

export default function SidebarNotes() {
  return (
    <ul style={{ listStyle: "none", padding: 20 }}>
      <li><Link href="/notes/filter/all">All notes</Link></li>
      {tags.map(tag => (
        <li key={tag}><Link href={`/notes/filter/${tag}`}>{tag}</Link></li>
      ))}
    </ul>
  );
}