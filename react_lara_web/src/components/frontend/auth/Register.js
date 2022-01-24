import axios from 'axios';
import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Register() {
    const styleError = {
        color: "red"
    };
    const history = useHistory();
    // Khai báo các trường dl
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`http://localhost:8000/api/register`, data).then(res => {
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    history.push('/');
                }else{
                    setRegister({...registerInput , error_list: res.data.validation_errors});
                }
            });
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
                                        <span style={styleError}>{registerInput.error_list.name}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type='' onChange={handleInput} value={registerInput.email} name='email' className='form-control'></input>
                                        <span style={styleError}>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className='form-group mb-3'>
                                        <label>Mật khẩu</label>
                                        <input type='' onChange={handleInput} value={registerInput.password} name='password' className='form-control'></input>
                                        <span style={styleError}>{registerInput.error_list.password}</span>
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
