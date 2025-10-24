import React from 'react';

function Home() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="jumbotron">
            <h1 className="display-4">Trang Chủ</h1>
            <p className="lead">
              Chào mừng bạn đến với trang chủ của ứng dụng React Router!
            </p>
            <hr className="my-4" />
            <p>
              Đây là trang chủ của ứng dụng. Bạn có thể điều hướng đến các trang khác bằng thanh menu ở trên.
            </p>
            <div className="row mt-4">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Sản Phẩm</h5>
                    <p className="card-text">Xem danh sách các sản phẩm của chúng tôi.</p>
                    <a href="/san-pham" className="btn btn-primary">Xem Sản Phẩm</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Liên Hệ</h5>
                    <p className="card-text">Liên hệ với chúng tôi để được hỗ trợ.</p>
                    <a href="/lien-he" className="btn btn-primary">Liên Hệ</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;