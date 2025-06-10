import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      {/* Header */}
      <header>
        <h1>School App</h1>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 School</p>
      </footer>
    </div>
  );
};