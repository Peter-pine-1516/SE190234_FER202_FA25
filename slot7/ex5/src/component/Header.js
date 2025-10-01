export default function Header() {
  return (
    <header className="py-2 header-bar">
      <div className="container d-flex align-items-center justify-content-between">
        <a href="/" className="d-inline-flex align-items-center text-decoration-none">
          <img src="/Logo-FPT.webp" alt="FPT University" height={28} className="me-2" />
          <span className="fw-semibold small text-dark">FPT UNIVERSITY</span>
        </a>

        <nav className="d-flex align-items-center gap-3">
          <a href="/" className="nav-link px-0">Trang chủ</a>
          <a href="/majors" className="nav-link px-0">Ngành học</a>
          <a href="/admission" className="nav-link px-0">Tuyển sinh</a>
          <a href="/students" className="nav-link px-0">Sinh viên</a>

          <form className="ms-3 d-none d-md-flex" role="search" onSubmit={(e)=>e.preventDefault()}>
            <label htmlFor="q" className="visually-hidden">Search</label>
            <input id="q" name="q" className="form-control form-control-sm" placeholder="Search..." />
          </form>
        </nav>
      </div>
    </header>
  );
}

