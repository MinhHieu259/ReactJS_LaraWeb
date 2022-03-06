import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function Cart(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    if(!localStorage.getItem('auth_token')){
        history.push('/');
        swal("Lỗi", "Đăng nhập để xem giỏ hàng", "warning");
    }
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
        return <h4>Đang tải giỏ hàng...</h4>
    }

    var cart_HTML = '';
    if(cart.length > 0){
        cart_HTML = <div className='table-responsive'>
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th>Ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Tổng tiền</th>
                    <th>Xóa</th>
                </tr>
            </thead>
            <tbody>
            {cart.map((item) => {
                return (
                <tr>
                    <td width="10%">
                        <img src={`http://localhost:8000/${item.product.image}`} alt={item.product.name} width="50px" height="50px" />
                    </td>
                    <td>{item.product.name}</td>
                    <td width='15%' className='text-center'>{item.product.selling_price}</td>
                    <td width="15%">
                        <div className='input-group'>
                            <button type='button' className='input-group-text'>-</button>
                            <div className='form-control text-center'>{item.product_qty}</div>
                            <button type='button' className='input-group-text'>+</button>
                        </div>
                    </td>
                    <td width="15%" className='text-center'>{item.product.selling_price * item.product_qty}</td>
                    <td width="10%">
                        <button type='button' className='btn btn-danger btn-sm'>Xóa</button>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
    </div>
    } else {
        cart_HTML = <div>
            <div className='card card-body py-5 text-center shadow-sm'>
                <h4>Giỏ hàng trống</h4>
            </div>
        </div>

    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Trang chủ / Giỏ hàng</h6>
                </div>
            </div>

            <div className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            {cart_HTML}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;