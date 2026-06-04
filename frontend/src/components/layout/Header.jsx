export default function Header({ title, onMenuClick }) {
  return (
    <header className="page-header">
      <span className="page-title">{title}</span>

      <h1 className="app-logo">EcoSense</h1>

      <button type="button" className="menu-button" onClick={onMenuClick}>
        ☰
      </button>
    </header>
  );
}