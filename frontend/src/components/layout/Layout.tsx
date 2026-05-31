import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <h1>EcoSense</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}