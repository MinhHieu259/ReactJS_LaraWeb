import axios from 'axios';
import React, {useState} from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
function Register() {
    // Khai báo các trường dl
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleInput = (e) => {
        e.presist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.password,
            password: registerInput.password
        }

        axios.post(`/api/register`, data).then(res => {

        });
    }
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
                                <form onSubmit={registerSubmit}>
                                    <div className='form-group mb-3'>
                                        <label>Họ tên</label>
                                        <input type='' onChange={handleInput} value={registerInput.name} name='name' className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type='' onChange={handleInput} value={registerInput.email} name='email' className='form-control'></input>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Mật khẩu</label>
                                        <input type='' onChange={handleInput} value={registerInput.password} name='password' className='form-control'></input>
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
