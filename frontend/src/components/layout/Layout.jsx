import { useState } from 'react';
import Header from './Header';
import SideMenu from './SideMenu';

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app">
      <Header title="" onMenuClick={() => setIsMenuOpen(true)} />

      <main className="app-main">{children}</main>

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </div>
  );
}