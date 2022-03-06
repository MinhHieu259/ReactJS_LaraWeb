import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function Checkout(props) {

    const history = useHistory();
    if (!localStorage.getItem('auth_token')) {
        history.push('/');
        swal("Lỗi", "Đăng nhập để xem giỏ hàng", "warning");
    }
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    var totalCartPrice = 0;
    useEffect(() => {
        let isMounted = true;

        axios.get(`/api/cart`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
                } else if (res.data.status === 401) {
                    history.push('/');
                    swal("Lỗi", res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false;
        }
    }, [history]);

    if (loading) {
        return <h4>Đang tải thanh toán...</h4>
    }

    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Trang chủ / Thanh toán</h6>
                </div>
            </div>

            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-7'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h4>Thông tin đặt hàng</h4>
                                </div>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='form-group mb-3'>
                                                <label>Họ</label>
                                                <input type="text" name="firstname" className='form-control' />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-group mb-3'>
                                                <label>Tên</label>
                                                <input type="text" name="lastname" className='form-control' />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-group mb-3'>
                                                <label>Số điện thoại</label>
                                                <input type="text" name="phone" className='form-control' />
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <div className='form-group mb-3'>
                                                <label>Email</label>
                                                <input type="text" name="email" className='form-control' />
                                            </div>
                                        </div>

                                        <div className='col-md-12'>
                                            <div className='form-group mb-3'>
                                                <label>Địa chỉ</label>
                                                <textarea rows="3" className='form-control'></textarea>
                                            </div>
                                        </div>

                                        <div className='col-md-4'>
                                            <div className='form-group mb-3'>
                                                <label>Thành phố</label>
                                                <input type="text" name="city" className='form-control' />
                                            </div>
                                        </div>

                                        <div className='col-md-4'>
                                            <div className='form-group mb-3'>
                                                <label>Tình trạng</label>
                                                <input type="text" name="state" className='form-control' />
                                            </div>
                                        </div>

                                        <div className='col-md-4'>
                                            <div className='form-group mb-3'>
                                                <label>Mã zip</label>
                                                <input type="text" name="zipcode" className='form-control' />
                                            </div>
                                        </div>

                                        <div className='col-md-12'>
                                            <div className='form-group text-end'>
                                                <button type='button' className='btn btn-primary'>Đặt hàng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-md-5'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th width="50%">Tên SP</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item, idx) => {
                                        totalCartPrice += item.product.selling_price * item.product_qty;
                                        return (
                                            <tr key={idx}>
                                                <td>{item.product.name}</td>
                                                <td>{item.product.selling_price}</td>
                                                <td>{item.product_qty}</td>
                                                <td>{item.product.selling_price * item.product_qty}</td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td colSpan="2" className='text-end fw-bold'>Thành tiền</td>
                                        <td colSpan="2" className='text-end fw-bold'>{totalCartPrice}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;