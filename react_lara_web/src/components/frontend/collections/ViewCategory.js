import axios from 'axios';
import React, { useEffect, useState } from 'react';
function ViewCategory() {

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`/api/getCategory`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setLoading(false);
            }
        });
    });

    if (loading) {
        return <h4>Đang tải...</h4>
    } else {
        var showCategoryList = '';
        showCategoryList = category.map((item) => {
            return (
                <div className='py-3 bg-warning'>
                    <div className='container'>
                        <h6>Trang danh mục</h6>
                    </div>
                </div>
            );
        });
    }
    return (
        <div>
            <div className='py-3 bg-warning'>
                <div className='container'>
                    <h6>Trang danh mục</h6>
                </div>
            </div>

            <div className='py-3'>
                <div className='container'>
                    <div className='row'>
                        {showCategoryList}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewCategory;