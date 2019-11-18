import React, { Component } from 'react';
import { isEmpty, getFirebase } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal } from 'antd';
import ReactLoading from "react-loading";

import { adminService } from '../../_services';
import { adminActions } from '../../_actions';
import Header from '../navbar/Header';
import Navbar from '../navbar/Navbar';

function handledUpLoad (file, id) {
    return new Promise((resolve, reject) => { 
        let formData = new FormData();
        formData.append('file', file);
        var firebase = getFirebase();
        var storageRef = firebase.storage().ref('avatars/'+id+'/'+file.name);
        var uploadTask = storageRef.put(file);
        uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                case firebase.storage.TaskState.SUCCESS: // or 'running'
                    console.log('Upload is success');
                    break;
                default:
            }
        }, err => {
            reject(err);
        }, () => {
            console.log('Upload is done');
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                resolve(downloadURL)
            })
            .catch(err => {
                reject(err);
            })
        })
    })
}

class SettingAdmin extends Component {
    constructor(props) {
        super(props);        
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            page: this.props.match.params.page,
            isEdit: false, 
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            submitted: false,
            file: '',
            filePreview: '',
            isChooseImage: false,
            isUpload: false,
            visibleAvatar: false,
            visibleImage: false,
        };
    }  

    handleChange = (e) => {
        this.setState({isEdit: true})
    }

    handleChangePassword = (e) => {
        const { name, value } = e.target;
        this.setState({ [name] : value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.isEdit) {
            const admin = {
                createBy: this.getValueByID("createBy"),
                fullname: this.getValueByID("fullname"),
                address: this.getValueByID("address"),
                email: this.getValueByID("email"),
                phone: this.getValueByID("phone"),
            }
            message.loading('Update admin in process', 0.5)
            .then(()=>{
                adminService.update(admin)
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

    handleSubmitChangePassword = (e) => {
        e.preventDefault();
        this.setState({ 
          submitted: true,
        });
        const { currentPassword, newPassword, confirmPassword } = this.state;
       
        if((newPassword !== confirmPassword) && currentPassword && newPassword && confirmPassword) {
            message.loading('Change password in process', 0.5)
            .then(() => message.error('Confirm passwor error, please try again'))
            this.setState({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
                submitted: false,
            })
        } else if ((newPassword === confirmPassword) && currentPassword && newPassword && confirmPassword) {
            message.loading('Change password in process', 0.5)
            .then(()=>{
                const postParam = {
                    currentPassword,
                    newPassword,
                }
                adminService.changePassword(postParam)
                .then(res => {
                    if(res.status === 200) {
                        message.success(res.message)
                    }
                    this.setState({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                        submitted: false,
                    })
                })
                .catch(err=> {
                    this.setState({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                        submitted: false,
                    })
                    console.log(err)
                    message.error('Change password failed')
                })
            })
        }
    }

    chooseFile = (file) => {
        if(file.size  < 1024*1024){
            this.setState({
                file: file,
                filePreview: URL.createObjectURL(file),
                isChooseImage: true,
            })
        } else {
            message.error('Image size is larger than 1MB')
        }
    }

    handleSubmitChangeAvatar = (e) => {
        e.preventDefault();
        this.setState({
            isUpload: true,
        })
        handledUpLoad(this.state.file, this.state.id)
        .then(url => {
            const postParam = {
                avatar: url,
            }
            adminService.changeAvatar(postParam)
            .then(res => {
                if(res.status === 200) {
                    message.success('Change Avatar Done')
                }
                this.setState({
                    file: '',
                    isChooseImage: false,
                    isUpload: false,
                })
                this.props.getOne(this.props.match.params.id);
            })
            .catch(err => {
                message.error('Change avatar failed')
                this.setState({
                    file: '',
                    isChooseImage: false,
                    isUpload: false,
                })
            })
        })
        .catch(err => {
            message.error('Change avatar failed')
            this.setState({
                file: '',
                isChooseImage: false,
                isUpload: false,
            })
        })
    }

    showModalAvatar = () => {
        this.setState({
            visibleAvatar: true,
        });
    }

    showmodalImage = () => {
        this.setState({
            visibleImage: true,
        });
    }

    handleOk = (e) => {
        this.setState({
            visibleAvatar: false,
            visibleImage: false,
        });
    }
    
    handleCancel = (e) => {
        this.setState({
            visibleAvatar: false,
            visibleImage: false,
        });
    }

    getValueByID = (id) => { 
        return document.getElementById(id).value
    }

    render() {
    var input='';
    var { currentPassword, newPassword, confirmPassword, submitted } = this.state;
    var adminProps = isEmpty(this.props.admin) || this.props.admin.type === "ADMIN_GETALL_SUCCESS" ? {type: "ADMIN"} : this.props.admin
    var admin = isEmpty(adminProps.result) ? {} : adminProps.result.admin
    if(!isEmpty(adminProps.type) && adminProps.type === "ADMIN_GETONE_FAILURE"){
        if(!isEmpty(adminProps.error) && adminProps.error.data.status===401){
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
                                <li className="breadcrumb-item active">
                                    {isEmpty(admin)?'':admin._id}
                                </li>
                            </ol>
                        </div>
                    </div>                            
                    <div className="card mb-3">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Quản lý thông tin tài khoản</i> 
                        </div>
                        {!isEmpty(admin) ?
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-4 col-sm-4">
                                    <div className="card">
                                        <img className="circular_square avatar" src={admin.avatar} alt="imagecap" onClick={this.showModalAvatar}/>
                                        <Modal
                                            title="Avatar"
                                            visible={this.state.visibleAvatar}
                                            onOk={this.handleOk}
                                            onCancel={this.handleCancel}>
                                            <img className="avatar_modal" src={admin.avatar} alt="imagecap"/>
                                        </Modal>
                                        <form name="form3" onSubmit={this.handleSubmitChangeAvatar}>
                                            <div className="changeavatar">
                                                <label htmlFor="upload-photo">
                                                    <i className="fas fa-image fa-2x" aria-hidden="true" ></i>
                                                </label>
                                                {this.state.isChooseImage ? 
                                                    <span className="badge badge-pill badge-info"> selected - ready to change</span> : 
                                                    <span className="badge badge-pill badge-warning"> choose image less than 1MB </span>
                                                }
                                                <input type="file" name="photo" id="upload-photo" ref={node => input = node}
                                                    onChange={event => {
                                                        this.chooseFile(event.target.files[0]);
                                                    }}
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-6 col-sm-6">
                                                    <button type="submit" className="btn btn-primary" disabled={!this.state.isChooseImage}>Cập nhật Avatar</button>
                                                </div>
                                                {(this.state.isUpload)?<ReactLoading type="spin" color="black" height={'25'} width={'25px'}/>:<div></div>}
                                                <div className="col-xl-6 col-sm-6">
                                                    <button type="button"className="btn btn-outline-danger" disabled={!this.state.isChooseImage} onClick={this.showmodalImage}> Xem ảnh đã chọn</button>
                                                </div>
                                                <Modal
                                                    title="Ảnh đang được chọn"
                                                    visible={this.state.visibleImage}
                                                    onOk={this.handleOk}
                                                    onCancel={this.handleCancel}>
                                                    <img className="avatar_modal" src={this.state.filePreview} alt="imagecap"/>
                                                </Modal>
                                            </div>
                                        </form>
                                        <div className="card-body">
                                            <h5 className="card-title">{admin.fullname}</h5>
                                        </div>
                                    </div>
                            
                                </div>
                                <div className="col-xl-8 col-sm-8">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="fullname">Họ tên:</label>
                                                    <input type="text" className="form-control" id="fullname" defaultValue={admin.fullname} onChange={this.handleChange} placeholder="Fullname"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="createBy">Được tạo bởi id:</label>
                                                    <input type="text" className="form-control" id="createBy" defaultValue={admin.createBy} readOnly placeholder="id"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" defaultValue={admin.email} readOnly placeholder="Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Điện thoại:</label>
                                                    <input type="text" className="form-control" id="phone" defaultValue={admin.phone} onChange={this.handleChange} pattern="[0-9]{10}" placeholder="Phone"/>
                                                </div>                                               
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" defaultValue={admin.address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div> : 
                            <Skeleton loading={true} avatar active></Skeleton>
                        }
                    </div> {/* card mb-3 */} 
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Change Password</i> 
                        </div>
                        <div className="col-xl-12 col-sm-12">
                            <form name="form2" onSubmit={this.handleSubmitChangePassword}>
                                <div className="row mt-3">
                                    <div className="col-xl-3 col-sm-3">
                                        <div className={'form-group' + (submitted && !currentPassword ? ' has-error' : '')}>
                                            <label htmlFor="currentPassword">Mật khẩu hiện tại:</label>
                                            <input type="password" className="form-control" name="currentPassword" value={currentPassword} onChange={this.handleChangePassword} placeholder="Current Password"/>
                                            {submitted && !currentPassword &&
                                                <div className="badge badge-danger">Current Password is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-3">
                                        <div className={'form-group' + (submitted && !newPassword ? ' has-error' : '')}>
                                            <label htmlFor="newPassword">Mật khẩu mới:</label>
                                            <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.handleChangePassword} placeholder="New Password"/>
                                            {submitted && !newPassword &&
                                                <div className="badge badge-danger">New Password is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-sm-3">
                                        <div className={'form-group' + (submitted && !confirmPassword ? ' has-error' : '')}>
                                            <label htmlFor="confirmPassword">Xác nhận mật khẩu mới:</label>
                                            <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={this.handleChangePassword} placeholder="Confirm Password"/>
                                            {submitted && !confirmPassword &&
                                                <div className="badge badge-danger">Confirm Password is required</div>
                                            }
                                        </div>
                                    </div>
                                    <div className="col-xl-2 col-sm-2">
                                        <div className="form-group">
                                            <label htmlFor="confirmPassword">.</label>
                                            <button type="submit" className="btn btn-success form-control">Đổi mật khẩu</button>
                                        </div>
                                    </div>
                                </div>      
                            </form>
                        </div>
                    </div>
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
        getOne: (id) => dispatch(adminActions.getOne(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SettingAdmin)