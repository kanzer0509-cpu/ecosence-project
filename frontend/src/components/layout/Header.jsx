export default function Header({ title, onMenuClick }) {
  return (
    <header className="page-header">
      <span className="page-title">{title}</span>

      <img
        src="/images/logo-header.png"
        alt="EcoSense"
        className="header-logo"
      />

      <button
        type="button"
        className="menu-button"
        onClick={onMenuClick}
      >
        ☰
      </button>
    </header>
  );
}