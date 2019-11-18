import React from 'react';
// import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

const Header = (props) => {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand mr-1" href="/">Admin RealState</a>
       
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Tìm kiếm..." aria-label="Search" aria-describedby="basic-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </form>

        <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span>{props.user.fullname}</span><i className="fas fa-user-circle fa-fw"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <a className="dropdown-item" href={`/setting/${props.user.id}`}>Cài đặt</a>
                    <a className="dropdown-item" href="/create">Tạo tài khoản mới</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/login">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Đăng xuất</span>
                    </a>
                </div>
            </li>
        </ul>
    </nav>
    </div>
)}

const mapStateToProps = (state) => {
    return {

    }
}
  
export default connect(mapStateToProps,null) (Header)