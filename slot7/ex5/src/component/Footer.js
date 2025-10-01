export default function Footer() {
  return (
    <footer className="footer-wrap mt-5">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <h6 className="mb-3">Our Address</h6>
            <ul className="list-unstyled small mb-0">
              <li>Khu đô thị FPT Đà Nẵng</li>
              <li>+84 0236 3711 111</li>
              <li>+852 6775 4321</li>
              <li>email@fpt.edu.vn</li>
            </ul>
          </div>
          <div className="col-12 col-md-6 d-flex align-items-end justify-content-md-end">
            <div className="text-md-end small">
              <div className="mb-2">Kết nối: Facebook · Google · LinkedIn · YouTube · Email</div>
              <div>© Copyright 2023</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

