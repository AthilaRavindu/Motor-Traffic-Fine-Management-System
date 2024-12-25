import React from "react";
import "./AdminLogin.css";

const AdminLogin = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h2>Traffic Management</h2>
        </div>
        <div className="login-content">
          <div className="role-selection">
            <label>
              <input type="radio" name="role" value="admin" /> Admin
            </label>
            <label>
              <input type="radio" name="role" value="superAdmin" /> Super Admin
            </label>
          </div>
          <form className="login-form">
            <div className="form-group">
              <input type="text" placeholder="User Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="form-input" />
            </div>
            <button type="submit" className="login-button">LOGIN</button>
          </form>
          <div className="reset-password">
            <a href="#">Reset Password</a>
          </div>
        </div>
        <div className="login-footer">
          <p>©2018 Copyright Government, Inc. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
