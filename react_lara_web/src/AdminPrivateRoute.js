import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import swal from 'sweetalert';
import Masterlayout from './layouts/admin/Masterlayout';



function AdminPrivateRoute(...rest) {
    const history = useHistory();
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`api/checkingAuthenticated`).then(res => {
            if (res.data.status === 200) {
                setAuthenticated(true);
            }
            setLoading(false);
        });
        return () => {
            setAuthenticated(false);
        };
    }, []);

    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
        if (err.response.status === 401) {
            swal('Lỗi', "Chưa đăng nhập Admin", "warning");
            history.push('/');

        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use( function (response) {
        return response;

    }, function (error){
        if(error.response.status === 403 ){
            swal("Fobedden", error.response.data.message, "warning");
            history.push('/403');
        }else if(error.response.status === 404 ){
            swal("404 Error", "Trang không tồn tại", "warning");
            history.push('/404');
        }
        return Promise.reject(error);
    }
    );

    if (loading) {
        return <h1>Đang tải...</h1>
    }
    return (
        <Route {...rest}
            render={({ props, location }) =>
                Authenticated ?
                    (<Masterlayout {...props} />) :
                    (<Redirect to={{ pathname: "/login", state: { from: location } }} />)

            }
        />
    );
}

export default AdminPrivateRoute;


