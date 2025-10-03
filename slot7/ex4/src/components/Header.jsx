export default function Header() {
  return (
    <header className="py-3" style={{ backgroundColor: "#e48f39" }}>
      <div className="container text-center">
        <a href="/" className="logo d-inline-block">
          <img src="FPT_logo.png" alt="FPT University" style={{ maxWidth: 420, width: "100%" }} />
        </a>
      </div>

      <nav className="mt-2">
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <a className="nav-link" href="/" style={{ color: "white" }}>Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#about" style={{ color: "white" }}>About</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#contact" style={{ color: "white" }}>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

