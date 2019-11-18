import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal, Switch, Icon, Badge  } from 'antd';
import moment from 'moment';

import { companyService } from '../../../_services';
import { companyActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class CompanyDetail extends Component {
    constructor(props) {
        super(props);
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            page: this.props.match.params.page,
            isEdit: false, 
            visible: false,
            lock: true,
        };  
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        var temp = true
        if(prevProps.company.loading === true && !isEmpty(this.props.company.result)) {
            temp = this.props.company.result.company.lock
        }
        return temp
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((snapshot === true || snapshot === false) && prevProps.company.loading === true){
            this.setState({lock: snapshot})
        }
    }

    handleChange = (e) => {
        this.setState({isEdit: true})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.isEdit) {
            const now = moment().unix()
            const company = {
                companyname: this.getValueByID("companyname"),
                address: this.getValueByID("address"),
                email: this.getValueByID("email"),
                phone: this.getValueByID("phone"),
                website: this.getValueByID("website"),
                totalProject: this.getValueByID("totalProject"),
                status: this.getValueByID("status"),
                description: this.getValueByID("description"),
                createTime: moment(this.getValueByID("createTime")).unix(),
                updateTime: now,
            }
            message.loading('Update company in process', 0.5)
            .then(()=>{
                companyService.update(this.state.id, company)
                .then(res => {
                    if(res.status === 200){
                        this.setState({isEdit: false})
                        message.success('Update Done')
                        this.props.getOne(this.props.match.params.id);
                    }
                })
                .catch(err => {
                    this.setState({isEdit: false})
                    message.error('Update Error, please try again')
                    this.props.getOne(this.props.match.params.id);
                })
            })   
        }    
    }

    deleteCompany = () => {
        message.loading('Delete account in process', 0.5)
        .then(()=>{
            companyService.delete(this.state.id)
            .then(res => {
                if(res.status === 200){
                    message.success('Delete Done')
                    this.props.history.push('/company/' + this.state.page)
                }
            })
            .catch(err => {
                message.error('Delete Error, please try again')
            })
        })   
    }

    changeLock = () => {
        const params = {lock: !this.state.lock}
        message.loading('Change lock account in process', 0.5)
        .then(() => {
            companyService.changeLock(this.state.id, params)
            .then(res => {
                if(res.status === 200) {
                    this.setState({lock: !this.state.lock})
                    if(this.state.lock === true)
                        message.warning('Account company has been locked')
                    else 
                        message.success('Account company has been unlocked')
                }
            })
            .catch(err => {
                message.error('Change Error, please try again')
            })
        })
    }
    
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.deleteCompany()
    }
    
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    getValueByID = (id) => { 
        return document.getElementById(id).value
    }

    render() {
    var companyProps = isEmpty(this.props.company) || this.props.company.type === "COMPANY_GETALL_SUCCESS" ? {type: "company"} : this.props.company
    var company = isEmpty(companyProps.result) ? {} : companyProps.result.company
    if(!isEmpty(companyProps.type) && companyProps.type === "COMPANY_GETONE_FAILURE"){
        if(!isEmpty(companyProps.error) && companyProps.error.data.status===401){
            message.error("Phiên đã hết hạn, vui lòng đăng nhập lại", 3)
            this.props.history.push('/login')
        } else {
            message.error("Lỗi không xác định, vui lòng thử lại", 3)
        }
    }
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
                                <li className="breadcrumb-item active">{isEmpty(company)?'':company._id}</li>
                            </ol>
                        </div>
                        {!isEmpty(company)?
                            <div className="col-xl-2 col-sm-2">
                                <div className="row">
                                    <div className="col-xl-3 col-sm-3">
                                        <Switch
                                            checkedChildren={<Icon type="unlock"/>}
                                            unCheckedChildren={<Icon type="lock"/>}
                                            checked={!this.state.lock}
                                            onChange={this.changeLock}
                                        />
                                    </div>
                                    <div className="col-xl-3 col-sm-3">
                                        {this.state.lock ?
                                            <Badge count={'Tài khoản bị khóa'} style={{ backgroundColor: 'red' }}></Badge>
                                            :
                                            <Badge count={'Tài khoản hoạt động'} style={{ backgroundColor: '#52c41a' }}></Badge>
                                        }
                                    </div>
                                </div>
                            </div> : 
                            <div></div>
                        }
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Thông tin chi tiết công ty</i> 
                        </div>
                        {!isEmpty(company)?
                        <div>
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-12 col-sm-12">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="companyname">Tên công ty:</label>
                                                    <input type="text" className="form-control" id="companyname" defaultValue={company.companyname} onChange={this.handleChange} placeholder="Company Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Website:</label>
                                                    <input type="url" className="form-control" id="website" defaultValue={company.website} onChange={this.handleChange} placeholder="Webiste"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Điện thoại:</label>
                                                    <input type="text" className="form-control" id="phone" defaultValue={company.phone} onChange={this.handleChange} pattern="[0-9]{10}" placeholder="Phone"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="totalProject">Tổng dự án:</label>
                                                    <input type="number" className="form-control" id="totalProject" defaultValue={company.totalProject} readOnly placeholder="Total Project"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="avatar">Avatar:</label>
                                                    <input type="text" className="form-control" id="avatar" defaultValue={company.avatar} onChange={this.handleChange} placeholder="Avatar"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" defaultValue={company.email} readOnly placeholder="Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="totalemployee">Tổng số nhân viên:</label>
                                                    <input type="number" className="form-control" id="totalemployee" defaultValue={company.employees.length} readOnly placeholder="Total Employees"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="verify">Đã xác nhận:</label>
                                                    <input type="text" className="form-control" id="verify" defaultValue={company.verify} readOnly placeholder="Verify"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="status">Trạng thái:</label>
                                                    <input type="number" className="form-control" id="status" defaultValue={company.status} onChange={this.handleChange} placeholder="Status"/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="createTime">Thời gian tạo tài khoản:</label>
                                                            <input type="text" className="form-control" id="createTime" defaultValue={moment.unix(company.createTime).format('DD/MM/YYYY, h:mm a')} readOnly placeholder="Create Time"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="updateTime">Thời gian cập nhật lần cuối:</label>
                                                            <input type="text" className="form-control" id="updateTime" defaultValue={moment.unix(company.updateTime).format('DD/MM/YYYY, h:mm a')} readOnly placeholder="Update Time"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" defaultValue={company.address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="description">Thông tin mô tả:</label>
                                                    <textarea type="text" className="form-control" id="description" defaultValue={company.description} onChange={this.handleChange} placeholder="Description"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="button" className="btn btn-danger" onClick={this.showModal}>Xóa tài khoản</button>
                                            </div>
                                            <Modal
                                                title="Xác nhận xóa tài khoản công ty"
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}>
                                                <p>Bạn chắc chắn muốn xóa tài khoản công ty này</p>
                                            </Modal>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            
                            <div className="divider"></div>

                            {/* <div className="row mt-3">                             
                                <div className="col-xl-8 col-sm-8">
                                    <div className="row mb-3">
                                        <div className="col-xl-5 col-sm-5">
                                            <i className="fas">Trạng thái tài khoản:</i>
                                        </div>
                                        {this.state.lock ? 
                                            <div className="col-xl-7 col-sm-7">
                                                <button type="button" className="btn btn-danger" onClick={this.changeLock}>
                                                    <i className="fas fa-lock"></i> LOCK
                                                </button>
                                                <i className="fas">Khoá/Mở khóa tài khoản</i>
                                            </div>
                                            :
                                            <div className="col-xl-7 col-sm-7">
                                                <button type="button" className="btn btn-success" onClick={this.changeLock}>
                                                    <i className="fas fa-lock-open"></i> UNLOCK
                                                </button>
                                                <i className="fas">Khoá/Mở khóa tài khoản</i>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div> */}
                        </div>:<Skeleton loading={true} avatar active></Skeleton>
                        }
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
    company: state.company,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getOne: (id) => dispatch(companyActions.getOne(id)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (CompanyDetail)
