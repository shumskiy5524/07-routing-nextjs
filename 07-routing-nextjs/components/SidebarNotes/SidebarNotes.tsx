import css from './SidebarNotes.module.css';
import Link from 'next/link';

const tags = ['All', 'Work', 'Personal', 'Study'];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link href="/notes/filter/all" className={css.menuLink}>
          All notes
        </Link>
      </li>

      {tags
        .filter(tag => tag !== 'All')
        .map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        ))}
    </ul>
  );
}