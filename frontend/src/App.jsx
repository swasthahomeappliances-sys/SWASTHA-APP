import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from "./pages/About";
import ForgotPassword
from "./pages/ForgotPassword";

import ResetPassword
from "./pages/ResetPassword";
import AdminOrderDetails
from "./pages/AdminOrderDetails";
import AdminRoute from "./components/AdminRoute";
import MyOrders
from "./pages/MyOrders";
import AdminOrders
from "./pages/AdminOrders";
import Footer from "./components/Footer";
import AdminAdvertisements from "./pages/AdminAdvertisements";
import AdminDashboard
from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Addresses from "./pages/Addresses";
import Checkout from "./pages/Checkout";

import Offers
from "./pages/Offers";
function App() {
  return (
    <BrowserRouter>

      <Navbar />
      
      <Routes>
        <Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboard/>
    </AdminRoute>
  }
/>
<Route
  path="/forgot-password"
  element={
    <ForgotPassword />
  }
/>

<Route
  path="/reset-password/:token"
  element={
    <ResetPassword />
  }
/>
<Route
  path="/about"
  element={<About />}
/>
<Route
  path="/admin/advertisements"
   element={
    <AdminRoute>
      <AdminAdvertisements/>
    </AdminRoute> }
/>
<Route
  path="/offers"
  element={
    <Offers />
  }
/>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>
<Route
  path="/admin/orders/:id"
  element={
    <AdminRoute>
      <AdminOrderDetails />
    </AdminRoute>
  }
/>
        <Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>
<Route
  path="/orders"
  element={
    <MyOrders />
  }
/>
<Route
  path="/checkout"
  element={<Checkout />}
/>
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />
        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/addresses"
          element={<Addresses />}
        />

      </Routes>
    <Footer />
    </BrowserRouter>
    
  );
}

export default App;