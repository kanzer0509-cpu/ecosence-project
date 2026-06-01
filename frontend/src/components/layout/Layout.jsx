export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>EcoSense</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}