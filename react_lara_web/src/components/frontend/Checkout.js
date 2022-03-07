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

    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    const [error, setError] = useState([]);

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

    const handleInput = (e) => {
        e.persist();
        setCheckoutInput({ ...checkoutInput, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <h4>Đang tải thanh toán...</h4>
    }
    const submitOrder = (e, payment_mode) => {
        e.preventDefault();
        var data = {
            firstname: checkoutInput.firstname,
            lastname: checkoutInput.lastname,
            phone: checkoutInput.phone,
            email: checkoutInput.email,
            address: checkoutInput.address,
            city: checkoutInput.city,
            state: checkoutInput.state,
            zipcode: checkoutInput.zipcode,
            payment_mode: payment_mode,
            payment_id: ''
        };

        switch (payment_mode) {
            case 'cod':
                axios.post(`/api/place-order`, data).then(res => {
                    if (res.data.status === 200) {
                        swal("Thành công", res.data.message, "success");
                        setError([]);
                        history.push('/thank-you');
                    } else if (res.data.status === 422) {
                        swal("Không được để trống thông tin", "", "error");
                        setError(res.data.errors);
                    }
                });
                break;

            case 'razorpay':
                axios.post(`/api/validate-order`, data).then(res => {
                    if (res.data.status === 200) {
                        setError([]);
                        var options = {
                            "key": "rzp_test_5AEIUNtEJxBPv5",
                            "amount": (totalCartPrice),
                            "name": "Shop Minh Hieu",
                            "description": "Thank you for purcharsing in my shop",
                            "image": "https://example.com/your_logo",
                            "handler": function (response){
                                console.log(response.razorpay_payment_id);
                                data.payment_id = response.razorpay_payment_id;
                                axios.post(`/api/place-order`, data).then(place_res => {
                                    if (place_res.data.status === 200) {
                                        swal("Thành công", res.data.message, "success");
                                        setError([]);
                                        history.push('/thank-you');
                                    } 
                                });
                            },
                            "prefill": {
                                "name": data.firstname + data.lastname,
                                "email": data.email,
                                "contact": data.phone
                            },
                            "theme": {
                                "color": "#3399cc"
                            }
                        };
                        var rzp = new window.Razorpay(options);
                        rzp.open();
                    } else if (res.data.status === 422) {
                        swal("Không được để trống thông tin", "", "error");
                        setError(res.data.errors);
                    }
                });
                break;

            default:
                break;
        }

    };

    var checkout_HTML = '';
    if (cart.length > 0) {
        checkout_HTML = <div>
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
                                        <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className='form-control' />
                                        <small className='text-danger'>{error.firstname}</small>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Tên</label>
                                        <input type="text" name="lastname" onChange={handleInput} value={checkoutInput.lastname} className='form-control' />
                                        <small className='text-danger'>{error.lastname}</small>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Số điện thoại</label>
                                        <input type="text" name="phone" onChange={handleInput} value={checkoutInput.phone} className='form-control' />
                                        <small className='text-danger'>{error.phone}</small>
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group mb-3'>
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={checkoutInput.email} className='form-control' />
                                        <small className='text-danger'>{error.email}</small>
                                    </div>
                                </div>

                                <div className='col-md-12'>
                                    <div className='form-group mb-3'>
                                        <label>Địa chỉ</label>
                                        <textarea rows="3" name='address' onChange={handleInput} value={checkoutInput.address} className='form-control'></textarea>
                                        <small className='text-danger'>{error.address}</small>
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group mb-3'>
                                        <label>Thành phố</label>
                                        <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className='form-control' />
                                        <small className='text-danger'>{error.city}</small>
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group mb-3'>
                                        <label>Tình trạng</label>
                                        <input type="text" name="state" onChange={handleInput} value={checkoutInput.state} className='form-control' />
                                        <small className='text-danger'>{error.state}</small>
                                    </div>
                                </div>

                                <div className='col-md-4'>
                                    <div className='form-group mb-3'>
                                        <label>Mã zip</label>
                                        <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className='form-control' />
                                        <small className='text-danger'>{error.zipcode}</small>
                                    </div>
                                </div>

                                <div className='col-md-12'>
                                    <div className='form-group text-end'>
                                        <button type='button' onClick={(e) => submitOrder(e, 'cod')} className='btn btn-primary'>Đặt hàng</button>
                                        <button type='button' onClick={(e) => submitOrder(e, 'razorpay')} className='btn btn-primary'>Thanh toán Online</button>
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
    } else {
        checkout_HTML = <div>
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>Giỏ hàng trống, Không thanh toán được :))</h4>
            </div>
        </div>

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
                    {checkout_HTML}
                </div>
            </div>
        </div>
    );
}

export default Checkout;