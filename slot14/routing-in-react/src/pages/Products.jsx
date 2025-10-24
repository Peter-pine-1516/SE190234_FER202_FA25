import React from 'react';

function Products() {
  const products = [
    {
      id: 1,
      name: "Laptop Gaming",
      price: "25,000,000 VNĐ",
      description: "Laptop gaming hiệu năng cao với card đồ họa rời",
      image: "/LaptopGaming.jpg"
    },
    {
      id: 2,
      name: "Smartphone",
      price: "15,000,000 VNĐ",
      description: "Điện thoại thông minh với camera chất lượng cao",
      image: "/Phone.jpg"
    },
    {
      id: 3,
      name: "Tai Nghe Bluetooth",
      price: "2,500,000 VNĐ",
      description: "Tai nghe không dây với chất lượng âm thanh tuyệt vời",
      image: "/EarPhone.jpg"
    },
    {
      id: 4,
      name: "Smart Watch",
      price: "5,000,000 VNĐ",
      description: "Đồng hồ thông minh với nhiều tính năng hữu ích",
      image: "/SmartWatch.jpg"
    }
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4 mb-4">Danh Sách Sản Phẩm</h1>
          <p className="lead mb-4">
            Khám phá các sản phẩm công nghệ mới nhất của chúng tôi
          </p>
          
          <div className="row">
            {products.map(product => (
              <div key={product.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100">
                  <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text flex-grow-1">{product.description}</p>
                    <div className="mt-auto">
                      <p className="card-text">
                        <strong className="text-primary">{product.price}</strong>
                      </p>
                      <button className="btn btn-primary w-100">
                        Thêm Vào Giỏ Hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-4">
            <div className="col-12">
              <div className="alert alert-info">
                <h5>Thông Tin Khuyến Mãi</h5>
                <p className="mb-0">
                  Đang có chương trình khuyến mãi lớn! Giảm giá lên đến 30% cho tất cả sản phẩm.
                  <a href="/lien-he" className="alert-link"> Liên hệ ngay</a> để được tư vấn chi tiết.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
