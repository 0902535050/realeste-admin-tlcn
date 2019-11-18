import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal, Switch, Icon, Badge, Tooltip } from 'antd';

import { userService } from '../../../_services';
import { accountActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

const titleTooltip = 'Chức năng cho phép tài khoản đăng dự án, tin rao mà không cần qua kiểm duyệt'

class AccountDetail extends Component {
    constructor(props) {
        super(props);        
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            page: this.props.match.params.page,
            isEdit: false, 
            visible: false,
            lock: true,
            permission: true,
        };  
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        var temp = {
            lock: true,
            permission: false,
        }
        if(prevProps.account.loading === true && !isEmpty(this.props.account.result)) {
            temp.lock = this.props.account.result.account.lock
            temp.permission = this.props.account.result.account.permission
        }
        return temp
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((snapshot.lock === true || snapshot.lock === false) && prevProps.account.loading === true){
            this.setState({
                lock: snapshot.lock,
                permission: snapshot.permission,
            })
        }
    }

    handleChange = (e) => {
        this.setState({isEdit: true})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.isEdit) {
            const account = {
                fullname: this.getValueByID("fullname"),
                address: this.getValueByID("address"),
                email: this.getValueByID("email"),
                phone: this.getValueByID("phone"),
                totalProject: this.getValueByID("totalProject"),
                statusAccount: this.getValueByID("statusAccount"),
                description: this.getValueByID("description"),
            }
            message.loading('Update account in process', 0.5)
            .then(()=>{
                userService.update(this.state.id, account)
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

    deleteAccount = () => {
        message.loading('Delete account in process', 0.5)
            .then(()=>{
                userService.delete(this.state.id)
                .then(res => {
                    if(res.status === 200){
                        message.success('Delete Done')
                        this.props.history.push('/account/' + this.state.page)
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
            userService.changeLock(this.state.id, params)
            .then(res => {
                if(res.status === 200) {
                    this.setState({lock: !this.state.lock})
                    if(this.state.lock === true)
                        message.warning('Account user has been locked')
                    else 
                        message.success('Account user has been unlocked')
                }
            })
            .catch(err => {
                message.error('Change Error, please try again')
            })
        })
    }

    changePermission = () => {
        const params = {permission: !this.state.permission}
        message.loading('Change permission account in process', 0.5)
        .then(() => {
            userService.changePermission(this.state.id, params)
            .then(res => {
                if(res.status === 200) {
                    this.setState({permission: !this.state.permission})
                    if(this.state.permission === true)
                        message.success('Account user has permission')
                    else 
                        message.warning('Account user has non-permission')
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
        this.deleteAccount()
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
    var accountProps = isEmpty(this.props.account) || this.props.account.type === "ACCOUNT_GETALL_SUCCESS" ? {type: "ACCOUNT"} : this.props.account
    var account = isEmpty(accountProps.result) ? {} : accountProps.result.account
    if(!isEmpty(accountProps.type) && accountProps.type === "ACCOUNT_GETONE_FAILURE"){
        if(!isEmpty(accountProps.error) && accountProps.error.data.status===401){
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
                                    <a href={`/account/${this.state.page}`}>Account</a>
                                </li>
                                <li className="breadcrumb-item active">{isEmpty(account)?'':account._id}</li>
                            </ol>
                        </div>
                        {!isEmpty(account)?
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
                            <i className="fas fa-file-alt"> Thông tin chi tiết tài khoản</i> 
                        </div>
                        {!isEmpty(account)?
                        <div>
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-4 col-sm-4">
                                    <div className="card">
                                        <img className="circular_square" src={account.avatar} alt="imagecap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">{account.fullname}</h5>
                                            <p className="card-text">{account.description}</p>
                                        </div>
                                    </div>
                            
                                </div>
                                <div className="col-xl-8 col-sm-8">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="fullname">Họ tên:</label>
                                                    <input type="text" className="form-control" id="fullname" defaultValue={account.fullname} onChange={this.handleChange} placeholder="Fullname"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="identify">CMND:</label>
                                                    <input type="number" className="form-control" id="identify" defaultValue={account.identify} readOnly placeholder="Identify"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="totalProject">Số dự án:</label>
                                                    <input type="number" className="form-control" id="totalProject" defaultValue={account.totalProject} readOnly placeholder="Project"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" defaultValue={account.email} readOnly placeholder="Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Điện thoại:</label>
                                                    <input type="text" className="form-control" id="phone" defaultValue={account.phone} onChange={this.handleChange} pattern="[0-9]{10}" placeholder="Phone"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="statusAccount">Trạng thái tài khoản:</label>
                                                    <select className="form-control" id="statusAccount" defaultValue={account.statusAccount} onChange={this.handleChange}>
                                                        <option value="1">Người dùng phổ thông</option>
                                                        <option value="2">Nhà môi giới</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" defaultValue={account.address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="description">Thông tin mô tả:</label>
                                                    <textarea type="text" className="form-control" id="description" defaultValue={account.description} onChange={this.handleChange} placeholder="Description"/>
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
                                                title="Xác nhận xóa tài khoản"
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}>
                                                <p>Bạn chắc chắn muốn xóa tài khoản này</p>
                                            </Modal>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="divider"></div>

                            <div className="row mt-3">                             
                                <div className="col-xl-8 col-sm-8">
                                    <div className="row mb-3">
                                        <div className="col-xl-5 col-sm-5">
                                            <i className="fas">Chức năng thay đổi quyền tài khoản:</i>
                                        </div>
                                        {this.state.permission ? 
                                            <div className="col-xl-7 col-sm-7">
                                                <Tooltip title={titleTooltip} mouseEnterDelay={0.5}>
                                                    <button type="button" className="btn btn-success" onClick={this.changePermission}>
                                                        <i className="fas fa-lock-open"></i> Permission
                                                    </button>
                                                </Tooltip>
                                            </div> 
                                            :
                                            <div className="col-xl-7 col-sm-7">
                                                <Tooltip title={titleTooltip} mouseEnterDelay={0.25}>
                                                    <button type="button" className="btn btn-danger" onClick={this.changePermission}>
                                                        <i className="fas fa-lock"></i> Non-Permission
                                                    </button>
                                                </Tooltip>
                                            </div>                                          
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>:<Skeleton loading={true} avatar active></Skeleton>
                        }
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
    account: state.account,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getOne: (id) => dispatch(accountActions.getOne(id)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (AccountDetail)