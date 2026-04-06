import React from 'react';
import Link from 'next/link';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function DefaultSidebar() {
  return (
    <nav>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li style={{ marginBottom: '8px' }}>
          <Link href="/notes/filter/all" style={{ textDecoration: 'none', color: 'blue' }}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} style={{ marginBottom: '8px' }}>
            <Link href={`/notes/filter/${tag}`} style={{ textDecoration: 'none', color: 'blue' }}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}