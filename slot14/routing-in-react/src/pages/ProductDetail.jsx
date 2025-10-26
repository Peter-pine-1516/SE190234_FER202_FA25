import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProductDetail() {
  // Lấy productId từ URL params
  const { productId } = useParams();
  
  // Hook để điều hướng
  const navigate = useNavigate();

  // Mock data cho products
  const productData = {
    101: {
      name: "Laptop Gaming",
      price: "25,000,000 VNĐ",
      description: "Laptop gaming hiệu năng cao với card đồ họa rời",
      fullDescription: "Laptop gaming cao cấp với CPU Intel Core i7 thế hệ 12, RAM 16GB DDR4, SSD 512GB, card đồ họa RTX 3070. Màn hình 15.6 inch Full HD 144Hz, pin 83Wh cho phép chơi game liên tục.",
      specs: ["CPU: Intel Core i7-12700H", "RAM: 16GB DDR4", "SSD: 512GB NVMe", "GPU: RTX 3070 8GB", "Màn hình: 15.6 inch Full HD 144Hz"],
      image: "/LaptopGaming.jpg"
    },
    102: {
      name: "Smartphone",
      price: "15,000,000 VNĐ",
      description: "Điện thoại thông minh với camera chất lượng cao",
      fullDescription: "Smartphone flagship với chip Snapdragon 8 Gen 2, camera 64MP, màn hình AMOLED 6.7 inch, pin 5000mAh với sạc nhanh 67W. Hỗ trợ 5G và chống nước IP68.",
      specs: ["Chip: Snapdragon 8 Gen 2", "Camera: 64MP + 12MP + 8MP", "Màn hình: 6.7 inch AMOLED", "Pin: 5000mAh", "Sạc nhanh: 67W"],
      image: "/Phone.jpg"
    },
    103: {
      name: "Tai Nghe Bluetooth",
      price: "2,500,000 VNĐ",
      description: "Tai nghe không dây với chất lượng âm thanh tuyệt vời",
      fullDescription: "Tai nghe Bluetooth cao cấp với công nghệ Active Noise Cancellation (ANC), pin 30 giờ, sạc nhanh 15 phút dùng 3 giờ. Driver 40mm với chất lượng âm thanh Hi-Fi.",
      specs: ["ANC: Active Noise Cancellation", "Thời lượng pin: 30 giờ", "Sạc nhanh: 15 phút = 3 giờ", "Driver: 40mm Hi-Fi", "Bluetooth 5.2"],
      image: "/EarPhone.jpg"
    }
  };

  const product = productData[productId];

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Sản phẩm không tồn tại!</h4>
          <p>Không tìm thấy sản phẩm với ID: {productId}</p>
          <button className="btn btn-secondary" onClick={() => navigate('/san-pham')}>
            Quay lại trang sản phẩm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 mb-3">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate('/san-pham')}
          >
            ← Quay lại trang sản phẩm
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.image} 
            alt={product.name}
            className="img-fluid rounded"
            style={{ width: '100%', height: '500px', objectFit: 'cover' }}
          />
        </div>
        
        <div className="col-md-6">
          <h1 className="display-5 mb-3">{product.name}</h1>
          <div className="alert alert-primary mb-3">
            <h2 className="mb-0">{product.price}</h2>
          </div>
          
          <div className="mb-4">
            <h5>Mô tả sản phẩm</h5>
            <p className="text-muted">{product.fullDescription}</p>
          </div>

          <div className="mb-4">
            <h5>Thông số kỹ thuật</h5>
            <ul className="list-group">
              {product.specs.map((spec, index) => (
                <li key={index} className="list-group-item">{spec}</li>
              ))}
            </ul>
          </div>

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg">
              Thêm Vào Giỏ Hàng
            </button>
            <button className="btn btn-outline-primary">
              Mua Ngay
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="alert alert-info">
            <strong>Lưu ý:</strong> Sản phẩm ID <strong>{productId}</strong> đang được hiển thị qua dynamic route sử dụng useParams!
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
