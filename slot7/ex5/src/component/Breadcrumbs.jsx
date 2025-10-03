export default function Breadcrumbs({ items = [] }) {
  return (
    <div className="bg-light border-top border-bottom">
      <div className="container py-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            {items.map((it, idx) => (
              <li
                key={idx}
                className={`breadcrumb-item ${idx === items.length - 1 ? "active" : ""}`}
                aria-current={idx === items.length - 1 ? "page" : undefined}
              >
                {it.href ? <a href={it.href}>{it.label}</a> : it.label}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}

