export default function HeroBanner({ src = "/banner.jpg", alt = "Banner" }) {
  return (
    <div className="hero-wrap">
      <div className="container">
        <img src={src} alt={alt} className="img-fluid w-100 hero-img" />
      </div>
    </div>
  );
}

