import React from 'react';
import {Link} from 'react-router-dom';
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow stick-top">
        <div className="container">
          <Link className="navbar-brand" to="/">Trang chủ</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Trang chủ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">Collection</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Đăng nhập</Link>
              </li>
            
              <li className="nav-item">
                <Link className="nav-link" to="/register">Đăng ký</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;
