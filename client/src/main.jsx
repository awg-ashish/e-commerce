import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import CartPage from "./pages/cartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import ProfileUpdatePage from "./pages/ProfileUpdatePage.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminOrderListPage from "./pages/AdminOrderListPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminUserListPage from "./pages/AdminUserListPage.jsx";
import AdminProductListPage from "./pages/AdminProductListPage.jsx";
import AdminUpdateProductDetailsPage from "./pages/AdminUpdateProductDetailsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingPage />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrderListPage />} />
        <Route path="/admin/users" element={<AdminUserListPage />} />
        <Route path="/admin/products" element={<AdminProductListPage />} />
        <Route
          path="/admin/products/:id"
          element={<AdminUpdateProductDetailsPage />}
        />
      </Route>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/orders/:id" element={<OrderDetailsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfileUpdatePage />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
