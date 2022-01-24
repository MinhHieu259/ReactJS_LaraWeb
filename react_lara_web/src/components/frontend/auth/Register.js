import React from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
function Register() {
    return (
        <div>
            <Navbar />
            <div className='container py-5'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                <h4>Đăng ký</h4>
                            </div>
                            <div className='card-body'>
                                <form>
                                    <div className='form-group mb-3'>
                                        <label>Họ tên</label>
                                        <input type='' name='name' className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type='' name='email' className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Mật khẩu</label>
                                        <input type='' name='password' className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Xác nhận mật khẩu</label>
                                        <input type='' name='confirm_password' className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                    <button type='submit' className='btn btn-primary'>Đăng ký</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register;
