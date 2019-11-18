import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Skeleton, message } from 'antd';

import { adminService } from '../../_services';
import { authenticationActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            countAccount: 0,
            countProject: 0,
            countNews: 0,
            countCompany: 0,
        };
        this.getData()
    }  

    getData = () => {
        adminService.statisticData()
        .then(res => {
            this.setState({ isLoading: false })
            console.log(res)
            this.setState({
                countAccount: res.countAccount,
                countProject: res.countProject,
                countNews: res.countNews,
                countCompany: res.countCompany,
            })
        })
        .catch(err => {
            console.log(err);
            if (err === undefined) {
                message.error('Không thể kết nối đến máy chủ', 3)
            } else if (err.data.status === 401) {
                message.error("Phiên đã hết hạn, vui lòng đăng nhập lại", 3)
                this.props.history.push('/login')
            }
            else {
                message.error('Lỗi không xác định, vui lòng thử lại', 3)
            }
            this.setState({ isLoading: false })
        })
    }

    render() {
        return (
        <div>
            <Header user={this.props.authentication.user}/>
            <div id="wrapper">
                <Navbar/>  
                <div id="content-wrapper">   
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-1">
                                <button className="btn btn-link btn-sm order-1 order-sm-0" id="sidebarToggle" href="#">
                                    <i className="fas fa-bars"></i>
                                </button>
                            </div>   
                            <div className="col-9">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="/">Dashboard</a>
                                    </li>
                                    <li className="breadcrumb-item active">Overview</li>
                                </ol>
                            </div>
                        </div>     

                        {!this.state.isLoading ?
                            <div className="row">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-comments"></i>
                                            </div>
                                            <div className="mr-5">{this.state.countAccount} Tài khoản!</div>
                                        </div>
                                        <a className="card-footer text-white clearfix small z-1" href="/account/1">
                                            <span className="float-left">Xem chi tiết</span>
                                            <span className="float-right">
                                                <i className="fas fa-angle-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="card-body-icon">
                                                <i className="fas fa-fw fa-list"></i>
                                            </div>
                                            <div className="mr-5">{this.state.countProject} Dự án!</div>
                                        </div>
                                        <a className="card-footer text-white clearfix small z-1" href="/project/1">
                                            <span className="float-left">Xem chi tiết</span>
                                            <span className="float-right">
                                            <i className="fas fa-angle-right"></i>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon">
                                        <i className="fas fa-fw fa-shopping-cart"></i>
                                        </div>
                                        <div className="mr-5">{this.state.countNews} Tin tức Online!</div>
                                    </div>
                                    <a className="card-footer text-white clearfix small z-1" href="/news/1">
                                        <span className="float-left">Xem chi tiết</span>
                                        <span className="float-right">
                                        <i className="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                    <div className="card-body">
                                        <div className="card-body-icon">
                                        <i className="fas fa-fw fa-life-ring"></i>
                                        </div>
                                        <div className="mr-5">{this.state.countCompany} Công ty!</div>
                                    </div>
                                    <a className="card-footer text-white clearfix small z-1" href="/company/1">
                                        <span className="float-left">Xem chi tiết</span>
                                        <span className="float-right">
                                        <i className="fas fa-angle-right"></i>
                                        </span>
                                    </a>
                                    </div>
                                </div>
                            </div> : 
                            <Skeleton loading={true} active></Skeleton>
                        }
                    </div>
                </div>
                {/* <!-- /.content-wrapper --> */}
            </div>
            {/* <!-- /#wrapper --> */}
        </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    logout: () => dispatch(authenticationActions.logout()),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)
