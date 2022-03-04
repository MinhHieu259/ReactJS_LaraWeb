import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
function Navbar() {
  const history = useHistory();
  const logoutSubmit = (e) => {
    e.preventDefault();
    axios.post(`api/logout`).then(res => {
      if (res.data.status === 200) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", res.data.message, "success");
        history.push('/');
      }
    });
  }
  var AuthButtons = '';
  if (!localStorage.getItem('auth_token')) {
    AuthButtons = (
      <ul className='navbar-nav'>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Đăng nhập</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/register">Đăng ký</Link>
        </li>
      </ul>
    );
  } else {
    AuthButtons = (
      <li className="nav-item">
        <button className="nav-link btn btn-danger btn-sm text-white" onClick={logoutSubmit} to="/register">Đăng xuất</button>
      </li>
    );
  }

  
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
              <Link className="nav-link" aria-current="page" to="/about">Thông tin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/contact">Liên hệ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="#">Collection</Link>
            </li>
            {AuthButtons}

          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
