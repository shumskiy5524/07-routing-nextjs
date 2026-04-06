import React from "react";
import Link from "next/link";

const tags = ["Work", "Personal", "Ideas"]; 
export default function DefaultSidebar() {
  return (
    <nav>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <Link href="/notes/filter">All</Link>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/notes/filter/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}