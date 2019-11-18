import React from 'react';
// import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

const NavbarHome = (props) => {
  return (
    <div>
        <ul className="sidebar navbar-nav">
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Trang chủ</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/account">
                    <i className="fas fa-fw fa-users"></i>
                    <span>Tài khoản</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-hotel"></i>
                    <span>Dự án</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-newspaper"></i>
                    <span>Bài viết</span>
                </a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-fw fa-folder"></i>
                    <span>Thông tin</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                    <h6 className="dropdown-header">Login Screens:</h6>
                    <a className="dropdown-item" href="/">Login</a>
                    <a className="dropdown-item" href="/">Register</a>
                    <a className="dropdown-item" href="/">Forgot Password</a>
                    <div className="dropdown-divider"></div>
                    <h6 className="dropdown-header">Other Pages:</h6>
                    <a className="dropdown-item" href="/">404 Page</a>
                    <a className="dropdown-item" href="/">Blank Page</a>
                </div>
            </li>
        </ul>
    </div>
    )
} 

const mapStateToProps = (state) => {
    return {

    }
  }
  
  export default connect(mapStateToProps,null) (NavbarHome)