import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewProduct() {

    const [loading, setLoading] = useState(true);
    const [viewProduct, setProduct] = useState([]);
    useEffect(() => {

        document.title = "Danh sách sản phẩm";
        axios.get(`/api/view-product`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.products);
                setLoading(false);
            }
        });
    }, []);

    var disPlayProductData = "";
    if (loading) {
        return <h4>Đang tải...</h4>
    } else {
        disPlayProductData = viewProduct.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt={item.name} /></td>
                    <td>
                        <Link to={`edit-product/${item.id}`} className='btn btn-success btn-sm'>Sửa</Link>
                    </td>
                    <td><button type='button' className='btn btn-danger btn-sm'>Xóa</button></td>
                </tr>
            );
        });
    }

    return (
        <div className='card px-4 mt-3'>
            <div className='card-header'>
                <h4>Danh sách sản phẩm
                    <Link to="/admin/add-product" className='btn btn-primary btn-sm float-end'>Thêm sản phẩm</Link>
                </h4>
            </div>
            <div className='card-body'>
                <div className='table-responsive'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Danh mục</th>
                                <th>Tên sản phẩm</th>
                                <th>Giá KM</th>
                                <th>Ảnh</th>
                                <th>Sửa</th>
                                <th>Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {disPlayProductData}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;