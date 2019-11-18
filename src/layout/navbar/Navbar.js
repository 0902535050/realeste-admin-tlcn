import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import {NavLink} from 'react-router-dom';
// import { connect } from 'react-redux';


class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        page: 0,
      };  
    }  

    componentDidMount(){
        this.setState({page: this.props.location.pathname.split("/")[1]})
    }

    componentDidUpdate(prevProps){
        const currentPage = this.props.location.pathname.split("/")[1]
        if(prevProps.location.pathname.split("/")[1] !== currentPage)
            this.setState({page: currentPage})
    }
  
    render() {
    return (
        <div>
            <ul className="sidebar navbar-nav">
                <li className={this.state.page===''?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Trang chủ</span>
                    </a>
                </li>
                <li className={this.state.page==='account'?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/account/1">
                        <i className="fas fa-fw fa-users"></i>
                        <span>Tài khoản</span>
                    </a>
                </li>
                <li className={this.state.page==='project'?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/project/1">
                        <i className="fas fa-fw fa-hotel"></i>
                        <span>Dự án</span>
                    </a>
                </li>
                <li className={this.state.page==='news'?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/news/1">
                        <i className="fas fa-fw fa-newspaper"></i>
                        <span>Bài viết</span>
                    </a>
                </li>
                <li className={this.state.page==='company'?"active nav-item":"nav-item"}>
                    <a className="nav-link" href="/company/1">
                        <i className="fas fa-fw fa-building"></i>
                        <span>Công ty</span>
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="/" id="pagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Thông tin</span>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="pagesDropdown">
                        <h6 className="dropdown-header">Màn hình đăng nhập:</h6>
                        <a className="dropdown-item" href="/login">Login</a>
                        <div className="dropdown-divider"></div>
                        <h6 className="dropdown-header">Trang khác:</h6>
                        <a className="dropdown-item" href="/notfound">404 Page</a>
                        <a className="dropdown-item" href="/">Blank Page</a>
                    </div>
                </li>
            </ul>
        </div>           
        )
    }
} 

  
export default withRouter(Navbar)