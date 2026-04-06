
import SidebarNotes from './@sidebar/SidebarNotes';

export default function FilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <SidebarNotes />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}