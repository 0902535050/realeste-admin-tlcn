import React, { Component } from 'react';
// import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { message } from 'antd';
import moment from 'moment';

import { companyService } from '../../../_services';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };  
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const now = moment().unix()
        const company = {
            companyname: this.getValueByID("companyname"),
            address: this.getValueByID("address"),
            email: this.getValueByID("email"),
            phone: this.getValueByID("phone"),
            website: this.getValueByID("website"),
            totalProject: this.getValueByID("totalProject"),
            status: this.getValueByID("status"),
            avatar: this.getValueByID("avatar"),
            description: this.getValueByID("description"),
            createTime: now,
            updateTime: now,
        }
        message.loading('Create company in process', 0.5)
        .then(()=>{
            companyService.add(company)
            .then(res => {
                if(res.status === 201){
                    message.success('Add company Done')
                    this.props.history.push('/company/1')
                }
            })
            .catch(err => {
                message.error('Add Error, please try again')
            })
        })   
          
    }

    getValueByID = (id) => { 
        return document.getElementById(id).value
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
                                <li className="breadcrumb-item">
                                    <a href={`/company/${this.state.page}`}>Company</a>
                                </li>
                                <li className="breadcrumb-item active">AddCompany</li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Thêm tài khoản công ty</i>
                        </div>

                        <div>
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-12 col-sm-12">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="companyname">Tên công ty:</label>
                                                    <input type="text" className="form-control" id="companyname" placeholder="Company Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Điện thoại:</label>
                                                    <input type="text" className="form-control" id="phone" pattern="[0-9]{10}" placeholder="Phone"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Website:</label>
                                                    <input type="url" className="form-control" id="website" placeholder="Webiste"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="totalProject">Tổng dự án:</label>
                                                    <input type="number" className="form-control" id="totalProject" defaultValue={0} readOnly placeholder="Total Project"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="avatar">Avatar:</label>
                                                    <input type="text" className="form-control" id="avatar" defaultValue={'avatar'} placeholder="Avatar"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" placeholder="Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="totalemployee">Tổng số nhân viên:</label>
                                                    <input type="number" className="form-control" id="totalemployee" defaultValue={0} readOnly placeholder="Total Employees"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="verify">Đã xác nhận:</label>
                                                    <input type="text" className="form-control" id="verify" defaultValue={false} readOnly placeholder="Verify"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="status">Trạng thái:</label>
                                                    <input type="number" className="form-control" id="status" defaultValue={0} readOnly placeholder="Status"/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="createTime">Thời gian tạo tài khoản:</label>
                                                            <input type="text" className="form-control" id="createTime" readOnly placeholder="Create Time"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="updateTime">Thời gian cập nhật lần cuối:</label>
                                                            <input type="text" className="form-control" id="updateTime" readOnly placeholder="Update Time"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="description">Thông tin mô tả:</label>
                                                    <textarea type="text" className="form-control" id="description" placeholder="Description"/>
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
                            <div className="divider"></div>
                        </div>
                    </div> {/* card */} 
                </div>        
            </div> 
        </div> {/* <!-- /#wrapper --> */} 
    </div>
    )}
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return {
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (CompanyDetail)
