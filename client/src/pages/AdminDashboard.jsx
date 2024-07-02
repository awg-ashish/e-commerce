import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      AdminDashboard
      <hr />
      <Link to="/admin/orders">
        <p className="text-sm hover:cursor-pointer hover:underline hover:text-red-800">
          All Orders
        </p>
      </Link>
      <Link to="/admin/products">
        <p className="text-sm hover:cursor-pointer hover:underline hover:text-red-800">
          All Products
        </p>
      </Link>
      <Link to="/admin/users">
        <p className="text-sm hover:cursor-pointer hover:underline hover:text-red-800">
          All Users
        </p>
      </Link>
    </div>
  );
};

export default AdminDashboard;
