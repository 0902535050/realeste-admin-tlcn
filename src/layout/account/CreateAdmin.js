import React, { Component } from 'react';
// import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import { adminService } from '../../_services';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

class CreateAdmin extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            email: '',
            fullname: '',
            address: '',
            phone: '',
            createBy: this.props.authentication.user.id,
            submitted: false,
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ 
            submitted: true,
        });
        if (this.state.email){
            const now = moment().unix()
            const admin = {
                email: this.state.email,
                fullname: this.state.fullname,
                address: this.state.address,
                phone: this.state.phone,
                createBy: this.state.createBy,
                createTime: now,
            }
            message.loading('Create admin in process', 1)
            .then(()=>{
                adminService.create(admin)
                .then(res => {
                    if(res.status === 201){
                        this.setState({submitted: false})
                        message.success('Create Done. Please check email to verify')
                        this.props.history.push('/create')
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState({submitted: false})
                    message.error('Create Error, please try again')
                })
            })
        }
    }

    render() {
    var { email, fullname, address, phone, submitted } = this.state;
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
                                <li className="breadcrumb-item active">
                                    Create Admin
                                </li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card mb-3">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Tạo tài khoản admin</i> 
                        </div>                       
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-12 col-sm-12">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="fullname">Họ tên:</label>
                                                    <input type="text" className="form-control" id="fullname" name="fullname" value={fullname} onChange={this.handleChange} placeholder="Fullname"/>
                                                    {submitted && !fullname &&
                                                        <div className="badge badge-danger">Fullname is required</div>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="createBy">Được tạo bởi id:</label>
                                                    <input type="text" className="form-control" id="createBy" value={this.state.createBy} readOnly placeholder="id"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={email} onChange={this.handleChange} placeholder="Email"/>
                                                    {submitted && !email &&
                                                        <div className="badge badge-danger">Email is required</div>
                                                    }
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Điện thoại:</label>
                                                    <input type="text" className="form-control" id="phone" name="phone" value={phone} onChange={this.handleChange} pattern="[0-9]{10}" placeholder="Phone"/>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" name="address" value={address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary">Tạo tài khoản</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                    </div> {/* card mb-3 */} 
                </div>        
            </div> 
        </div> {/* <!-- /#wrapper --> */} 
    </div>
    )}
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        admin: state.admin,
        authentication: state.authentication,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CreateAdmin)