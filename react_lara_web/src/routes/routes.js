import Category from '../components/admin/category/Category';
import EditCategory from '../components/admin/category/EditCategory';
import ViewCategory from '../components/admin/category/ViewCategory';
import Dashboard from '../components/admin/Dashboard';
import AddProduct from '../components/admin/product/AddProduct';
import Profile from '../components/admin/Profile';


const routes = [
    {path: '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    {path: '/admin/add-category', exact: true, name: 'Category', component: Category},
    {path: '/admin/view-category', exact: true, name: 'ViewCategory', component: ViewCategory},
    {path: '/admin/edit-category/:id', exact: true, name: 'EditCategory', component: EditCategory},
    {path: '/admin/profile', exact: true, name: 'Profile', component: Profile},
    {path: '/admin/add-product', exact: true, name: 'AddProduct', component: AddProduct}
    
];
export default routes;