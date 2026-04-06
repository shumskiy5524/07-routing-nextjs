
"use client"; 
import React from "react";
import Link from "next/link";

const tags = ["Work", "Personal", "Ideas", "Shopping"]; 
const SidebarNotes = () => {
  return (
    <aside style={{ padding: "20px", borderRight: "1px solid #ddd" }}>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link href={`/notes/filter/all`} style={{ textDecoration: "none", color: "#333" }}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} style={{ marginBottom: "10px" }}>
            <Link href={`/notes/filter/${tag}`} style={{ textDecoration: "none", color: "#333" }}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarNotes;