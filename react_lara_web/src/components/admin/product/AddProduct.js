import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
function AddProduct() {

    const [categoryList, setCategoryList] = useState([])
    const [productInput, setProduct] = useState({
        category_id : '',
        slug : '',
        name : '',
        description : '',

        meta_title : '',
        meta_keyword : '',
        meta_descrip : '',
        
        selling_price : '',
        original_price : '',
        qty : '',
        brand : '',
        featured : '',
        popular : '',
        status : ''
    });

    const [picture, setPicture] = useState([]);

    const handleInput = (e) => {
        e.persist();
        setProduct({...productInput, [e.target.name]:e.target.value});
    }

    const handleImage = (e) => {
        e.persist();
        setPicture({image: e.target.files[0]});
    }

    useEffect(() => {
        axios.get(`api/all-category`).then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.category);
            }
        });
    }, []);

    const submitProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_descrip', productInput.meta_descrip);

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('qty', productInput.qty);
        formData.append('brand', productInput.brand);
        formData.append('featured', productInput.featured);
        formData.append('popular', productInput.popular);
        formData.append('status', productInput.status);

        axios.post(`api/store-product`, formData).then(res => {
            if(res.data.status === 200){
                
            }
        });
    }

    return (
        <div className='container-fluid px-4'>
            <div className='card-mt-4'>
                <div className='card-header'>
                    <h4>Thêm sản phẩm
                        <Link to="/admin/view-category" className='btn btn-primary btn-sm float-end'>Danh sách</Link>
                    </h4>
                </div>
                <div className='card-body'>
                    <form onSubmit={submitProduct} encType='multipart/form-data'>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seotags-tab" data-bs-toggle="tab" data-bs-target="#seotags" type="button" role="tab" aria-controls="seotags" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="otherdetails-tab" data-bs-toggle="tab" data-bs-target="#otherdetails" type="button" role="tab" aria-controls="otherdetails" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className='form-group mb-3'>
                                    <label>Category</label>
                                    <select name="category_id" onChange={handleInput} value={productInput.category_id} className='form-control'>
                                    <option>-- Select Category --</option>
                                        {
                                            categoryList.map((item) => {
                                                return(
                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                        
                                    </select>
                                </div>

                                <div className='form-group mb-3'>
                                    <label>Slug</label>
                                    <input type="text" onChange={handleInput} value={productInput.slug} name="slug" className='form-control' />
                                </div>

                                <div className='form-group mb-3'>
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={productInput.name} className='form-control' />
                                </div>

                                <div className='form-group mb-3'>
                                    <label>Description</label>
                                    <textarea name="description" onChange={handleInput} value={productInput.description} className='form-control'></textarea>
                                </div>

                            </div>
                            <div className="tab-pane card-body border fade" id="seotags" role="tabpanel" aria-labelledby="seotags-tab">
                                <div className='form-group mb-3'>
                                    <div className='form-group mb-3'>
                                        <label>Meta Title</label>
                                        <input type="text" name="meta_title" onChange={handleInput} value={productInput.meta_title} className='form-control' />

                                    </div>

                                    <label>Meta Keyword</label>
                                    <textarea name="meta_keyword" onChange={handleInput} value={productInput.meta_keyword} className='form-control'></textarea>

                                </div>

                                <div className='form-group mb-3'>
                                    <label>Meta Descrip</label>
                                    <textarea name="meta_descrip" onChange={handleInput} value={productInput.meta_descrip} className='form-control'></textarea>

                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="otherdetails" role="tabpanel" aria-labelledby="otherdetails-tab">
                                <div className='row'>
                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Selling Price</label>
                                        <input type="text" name="selling_price" onChange={handleInput} value={productInput.selling_price} className='form-control' />
                                    </div>

                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Original Price</label>
                                        <input type="text" name="original_price" onChange={handleInput} value={productInput.original_price} className='form-control' />
                                    </div>

                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Quantity</label>
                                        <input type="text" name="qty" onChange={handleInput} value={productInput.qty} className='form-control' />
                                    </div>

                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Brand</label>
                                        <input type="text" name="brand" onChange={handleInput} value={productInput.brand} className='form-control' />
                                    </div>

                                    <div className='col-md-8 form-group mb-3'>
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className='form-control' />
                                    </div>

                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Featured</label>
                                        <input type="checkbox" name="featured" onChange={handleInput} value={productInput.featured} className='w-50 h-50' />
                                    </div>

                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Popular</label>
                                        <input type="checkbox" name="popular" onChange={handleInput} value={productInput.popular} className='w-50 h-50' />
                                    </div>

                                    <div className='col-md-4 form-group mb-3'>
                                        <label>Status</label>
                                        <input type="checkbox" name="status" onChange={handleInput} value={productInput.status} className='w-50 h-50' />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary px-4 mt-2'>Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;