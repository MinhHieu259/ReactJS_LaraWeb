import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function ProductDetail(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        let isMounted = true;
        const category_slug = props.match.params.category;
        const product_slug = props.match.params.product;
        axios.get(`/api/viewProductDetail/${category_slug}/${product_slug}`).then(res => {
            if (isMounted) {
                if (res.data.status === 200) {
                    console.log(res.data.product)
                    setProduct(res.data.product);
                    setLoading(false);
                } else if (res.data.status === 404) {
                    history.push('/collections');
                    swal("Lỗi", res.data.message, "error");
                }
            }
        });
        return () => {
            isMounted = false;
        }
    }, [props.match.params.category, props.match.params.product, history]);

    const handleDecrement = () => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1);
        }
    }

    const handleIncrement = () => {
        if(quantity < 10){
            setQuantity(prevCount => prevCount + 1);
        }
    }

    const submitAddtoCart = (e) => {
        e.preventDefault();
        const data = {
            product_id : product.id,
            product_qty : quantity
        }
        axios.post(`/api/add-to-cart`, data).then(res => {
            if(res.data.status === 201){
                swal('Thành công', res.data.message, "success");
            } else if(res.data.status === 409){
                swal('Cảnh báo', res.data.message, "warning");
            }  else if(res.data.status === 401){
                swal('Lỗi', res.data.message, "error");
            } else if(res.data.status === 404){
                swal('Cảnh báo', res.data.message, "warning");
            }
        });
    }

    if (loading) {
        return <h4>Đang tải chi tiết sản phẩm...</h4>
    } else {
        var avaial_stock = ''
        if (product.qty > 0) {
            avaial_stock = <div>
                <label className='btn-sm btn-success px-4 mt-2'>Còn hàng</label>
                <div className='row'>
                    <div className='col-md-3 mt-3'>
                        <div className='input-group'>
                            <button type='button' onClick={handleDecrement} className='input-group-text'>-</button>
                            <div className='form-control text-center'>{quantity}</div>
                            <button type='button' onClick={handleIncrement} className='input-group-text'>+</button>
                        </div>
                    </div>
                    <div className='col-md-3 mt-3'>
                        <button type='botton' className='btn btn-primary w-100' onClick={submitAddtoCart}>Thêm giỏ hàng</button>
                    </div>
                </div>
            </div>
        } else {
            avaial_stock = <div>
                <label className='btn-sm btn-danger px-4 mt-2'>Hết hàng</label>
            </div>
        }

    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Danh mục / {product.category.name} / {product.name}</h6>
                </div>
            </div>

            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 border-end'>
                            <img src={`http://localhost:8000/${product.image}`} alt={product.name} className='w-100' />
                        </div>

                        <div className='col-md-8'>
                            <h4>
                                {product.name}
                                <span className='float-end badge btn-sm btn-danger badge-pill'>{product.brand}</span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className='mb-1'>
                                {product.selling_price}
                                <s className='ms-2'>{product.original_price}</s>
                            </h4>

                                {avaial_stock}
                            <button type='button' className='btn btn-danger mt-3'>Thêm yêu thích</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;