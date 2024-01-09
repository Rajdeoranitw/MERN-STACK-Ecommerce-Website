import { useEffect } from 'react';
import './App.css';
import Header from './component/layout/Header/Header';
import { Routes, Route } from 'react-router-dom';
import WebFont from "webfontloader";
import Footer from './component/layout/Footer/Footer';
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from 'react-redux';
import Profile from "./component/User/Profile";
import ProtectedRoute from './component/Route/ProtectedRoute';
import AdminElement from "./component/Route/AdminElement.jsx";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword.jsx";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Parent from "./component/Cart/Parent";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";
import ProductList from "./component/Admin/ProductList";
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import About from "./component/layout/About/About.jsx";
import Contact from "./component/layout/Contact/Contact.jsx";


function App() {

  const { isAuthenticated, user } = useSelector(state => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      }
    });
    store.dispatch(loadUser());
  }, []);


  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>

        <Route exact path='/' element={<Home />} />
        <Route exact path='/product/:id' element={<ProductDetails />} />
        <Route exact path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route exact path='/search' element={<Search />} />
        <Route exact path='/password/forgot' element={<ForgotPassword />} />
        <Route exact path='/password/reset/:token' element={<ResetPassword />} />
        <Route exact path='/login' element={<LoginSignUp />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />


        <Route exact path='/account' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} > </Route>
        <Route exact path='/me/update' element={<ProtectedRoute> <UpdateProfile /> </ProtectedRoute>} ></Route>
        <Route exact path='/password/update' element={<ProtectedRoute> <UpdatePassword /> </ProtectedRoute>} ></Route>
        <Route exact path='/login/shipping' element={<ProtectedRoute> <Shipping /> </ProtectedRoute>} ></Route>
        <Route exact path='/process/payment' element={<ProtectedRoute> <Parent /> </ProtectedRoute>} > </Route>
        <Route exact path='/success' element={<ProtectedRoute> <OrderSuccess /> </ProtectedRoute>} ></Route>
        <Route exact path='/orders' element={<ProtectedRoute> <MyOrders /> </ProtectedRoute>} > </Route>
        <Route exact path='/order/:id' element={<ProtectedRoute> <OrderDetails /> </ProtectedRoute>} ></Route>
        <Route exact path='/order/confirm' element={<ProtectedRoute> <ConfirmOrder /> </ProtectedRoute>} />


        <Route exact path='/admin/dashboard' element={<AdminElement><Dashboard /></AdminElement>} > </Route>
        <Route exact path='/admin/products' element={<AdminElement><ProductList /></AdminElement>} ></Route>
        <Route exact path='/admin/product' element={<AdminElement><NewProduct /></AdminElement>} ></Route>
        <Route exact path='/admin/product/:id' element={<AdminElement><UpdateProduct /></AdminElement>} ></Route>
        <Route exact path='/admin/orders' element={<AdminElement><OrderList /></AdminElement>} ></Route>
        <Route exact path='/admin/order/:id' element={<AdminElement><ProcessOrder /></AdminElement>} ></Route>
        <Route exact path='/admin/users' element={<AdminElement><UsersList /></AdminElement>} ></Route>
        <Route exact path='/admin/user/:id' element={<AdminElement><UpdateUser /></AdminElement>} ></Route>
        <Route exact path='/admin/reviews' element={<AdminElement><ProductReviews /></AdminElement>} ></Route>

      </Routes>
      <Footer />
    </>

  )
}


export default App;
