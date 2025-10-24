import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1 className="display-4 mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="lead mb-4">
            Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy gửi tin nhắn cho chúng tôi!
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Gửi Tin Nhắn</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Họ và Tên *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Chủ Đề *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Nội Dung Tin Nhắn *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">
                  Gửi Tin Nhắn
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Thông Tin Liên Hệ</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6><i className="fas fa-map-marker-alt"></i> Địa Chỉ</h6>
                <p className="mb-0">
                  123 Đường ABC, Quận 1<br />
                  Thành phố Hồ Chí Minh, Việt Nam
                </p>
              </div>
              
              <div className="mb-3">
                <h6><i className="fas fa-phone"></i> Điện Thoại</h6>
                <p className="mb-0">+84 123 456 789</p>
              </div>
              
              <div className="mb-3">
                <h6><i className="fas fa-envelope"></i> Email</h6>
                <p className="mb-0">contact@example.com</p>
              </div>
              
              <div className="mb-3">
                <h6><i className="fas fa-clock"></i> Giờ Làm Việc</h6>
                <p className="mb-0">
                  Thứ 2 - Thứ 6: 8:00 - 17:00<br />
                  Thứ 7: 8:00 - 12:00<br />
                  Chủ Nhật: Nghỉ
                </p>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">Tại Sao Chọn Chúng Tôi?</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fas fa-check text-success"></i> 
                  Hỗ trợ khách hàng 24/7
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success"></i> 
                  Sản phẩm chất lượng cao
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success"></i> 
                  Giá cả cạnh tranh
                </li>
                <li className="mb-2">
                  <i className="fas fa-check text-success"></i> 
                  Giao hàng nhanh chóng
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
