import React, { useState } from 'react';
import axios from "axios";
function Category() {
    const [categoryInput, setCategory] = useState({
        slug : '',
        name : '',
        Descrip : '',
        status : '',
        meta_title : '',
        meta_keyword : '',
        meta_descrip : ''
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name] : e.target.value})
    }

    const submitCategory = (e) => {
        e.persist();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.Descrip,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_descrip: categoryInput.meta_descrip
        }

        axios.post(`api/store-category`, data).then(res => {
            if(res.data.status === 200){

            }else if(res.data.status === 400){

            }
        });
    }
    return (
        <div className='container-fluid px-4'>
            <h1 className='mt-4'>Add Category</h1>

            <form onSubmit={submitCategory}>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO-Tag</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className='form-group mb-3'>
                            <label>Slug</label>
                            <input type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className='form-control' />
                        </div>

                        <div className='form-group mb-3'>
                            <label>Name</label>
                            <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className='form-control' />
                        </div>

                        <div className='form-group mb-3'>
                            <label>Description</label>
                            <textarea name="Descrip" onChange={handleInput} value={categoryInput.Descrip} className='form-control'></textarea>
                        </div>

                        <div className='form-group mb-3'>
                            <label>Status</label>
                            <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} />
                        </div>
                    </div>
                    <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                        <div className='form-group mb-3'>
                            <div className='form-group mb-3'>
                                <label>Meta Title</label>
                                <input type="text" name="meta_title"  onChange={handleInput} value={categoryInput.meta_title} className='form-control' />
                            </div>

                            <label>Meta Keyword</label>
                            <textarea name="meta_keyword"  onChange={handleInput} value={categoryInput.meta_keyword} className='form-control'></textarea>
                        </div>

                        <div className='form-group mb-3'>
                            <label>Meta Descrip</label>
                            <textarea name="meta_descrip"  onChange={handleInput} value={categoryInput.meta_descrip} className='form-control'></textarea>
                        </div>
                    </div>
                </div>
                <button type='submit' className='btn btn-primary px-4 float-end'>Submit</button>
            </form>
        </div>
    );
}

export default Category;