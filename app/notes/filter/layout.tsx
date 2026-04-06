
import React from 'react';

type FilterLayoutProps = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({ children, sidebar }: FilterLayoutProps) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <div>{sidebar}</div> 
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}