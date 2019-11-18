import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Skeleton, message, Modal, Switch, Icon, Badge  } from 'antd';
import moment from 'moment';

// import socket from '../../../_components/socket';
import { projectService } from '../../../_services';
import { projectActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class ProjectDetail extends Component {
    constructor(props) {
        super(props);        
        this.props.getOne(this.props.match.params.id);
        this.state = {
            id: this.props.match.params.id,
            page: this.props.match.params.page,
            isEdit: false, 
            visible: false,
            visibleCarousel: false,
            currenturl: '',
            verify: true,
            allowComment: true,
            comments: [],
            // socket: socket(),
        };  
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        var temp = {
            verify: false,
            allowComment: true,
        }
        if(prevProps.project.loading === true && !isEmpty(this.props.project.result)) {
            temp.allowComment = this.props.project.result.project.allowComment
            temp.verify = this.props.project.result.project.verify
        }
        return temp
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((snapshot.allowComment === true || snapshot.allowComment === false) && prevProps.project.loading === true){
            this.setState({
                allowComment: snapshot.allowComment,
                verify: snapshot.verify,
            })
            projectService.getAllComment(this.props.match.params.id)
            .then(result => {
                this.setState({comments: result.comments})
            })
        }
    }

    componentWillMount() {
        
    }

    // componentDidMount() {
    //     this.state.socket.register('test@gmail.com', (err, email) => {  })
    //     this.state.socket.join(this.state.id, (err, commentHistory) => {
    //         if (err)
    //             return console.error(err)
    //         // console.log(commentHistory)
    //     })
    //     this.state.socket.registerHandler(this.onCommentReceived)
    // }

    // componentWillUnmount() {
    //     this.state.socket.leave(this.state.id, (err) => {
    //         if (err)
    //           return console.error(err)
    //     })
    //     this.state.socket.unregisterHandler()
    // }

    // onCommentReceived(entry) {
    //     console.log('onCommentReceived:', entry)
    // }

    // addComment = () => {
    //     const comment = {
    //         id: 'test',
    //         content: 'comment content',
    //     }
    //     console.log("add comment" + comment)
    // }

    handleChange = (e) => {
        this.setState({isEdit: true})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.isEdit) {
            const now = moment().unix()
            const project = {
                name: this.getValueByID("name"),
                investor: this.getValueByID("investor"),
                price: this.getValueByID("price"),
                unit: this.getValueByID("unit"),
                area: this.getValueByID("area"),
                address: this.getValueByID("address"),
                type: this.getValueByID("type"),
                info: this.getValueByID("info"),
                lat: this.getValueByID("lat"),
                long: this.getValueByID("long"),
                ownerid: this.getValueByID("ownerid"),
                fullname: this.getValueByID("fullname"),
                phone: this.getValueByID("phone"),
                email: this.getValueByID("email"),
                // avatar: this.getValueByID("avatar"),
                statusProject: this.getValueByID("statusProject"),
                createTime: moment(this.getValueByID("createTime")).unix(),
                updateTime: now,
                // url: [],
                // publicId: [],
            }
            message.loading('Update project in process', 0.5)
            .then(()=>{
                projectService.update(this.state.id, project)
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

    deleteProject = () => {
        message.loading('Delete account in process', 0.5)
        .then(()=>{
            projectService.delete(this.state.id)
            .then(res => {
                if(res.status === 200){
                    message.success('Delete Done')
                    this.props.history.push('/project/' + this.state.page)
                }
            })
            .catch(err => {
                message.error('Delete Error, please try again')
            })
        })   
    }

    changeVerify = () => {
        const params = {verify: !this.state.verify}
        message.loading('Change verify in process', 0.5)
        .then(()=>{
            projectService.changeVerify(this.state.id, params)
            .then(res => {
                if(res.status === 200) {
                    this.setState({verify: !this.state.verify})
                    if(this.state.verify === true)
                        message.success('Project has been verified')
                    else 
                        message.warning('Project has no verified, let check more info')
                }
            })
            .catch(err => {
                message.error('Change Error, please try again')
            })
        })
    }

    changeAllowComment = () => {
        const params = {allowComment: !this.state.allowComment}
        message.loading('Change allow comment in process', 0.5)
        .then(()=>{
            projectService.changeAllowComment(this.state.id, params)
            .then(res => {
                if(res.status === 200) {
                    this.setState({allowComment: !this.state.allowComment})
                    if(this.state.allowComment === true)
                        message.success('Comment feature Open')
                    else 
                        message.warning('Comment feature Lock')
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

    showModalCarousel = (url) => {
        this.setState({
            visibleCarousel: true,
            currenturl: url,
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.deleteProject()
    }
    
    handleCancel = (e) => {
        this.setState({
            visible: false,
            visibleCarousel: false,
        });
    }

    getValueByID = (id) => { 
        return document.getElementById(id).value
    }

    render() {
    var projectProps = isEmpty(this.props.project) || this.props.project.type === "PROJECT_GETALL_SUCCESS" ? {type: "PROJECT"} : this.props.project
    var project = isEmpty(projectProps.result) ? {} : projectProps.result.project
    if(!isEmpty(projectProps.type) && projectProps.type === "PROJECT_GETONE_FAILURE"){
        if(!isEmpty(projectProps.error) && projectProps.error.data.status===401){
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
                                    <a href={`/project/${this.state.page}`}>Project</a>
                                </li>
                                <li className="breadcrumb-item active">{isEmpty(project)?'':project._id}</li>
                            </ol>
                        </div>
                        {!isEmpty(project)?
                            <div className="col-xl-2 col-sm-2">
                                <div className="row">
                                    <div className="col-xl-3 col-sm-3">
                                        <Switch
                                            checkedChildren={<Icon type="check"/>}
                                            unCheckedChildren={<Icon type="close"/>}
                                            checked={this.state.verify}
                                            onChange={this.changeVerify}
                                        />
                                    </div>
                                    <div className="col-xl-3 col-sm-3">
                                        {this.state.verify ? 
                                            <Badge count={'Đã duyệt'} style={{ backgroundColor: '#52c41a' }}/>
                                            :
                                            <Badge count={'Chưa duyệt'} style={{ backgroundColor: 'red' }}/>
                                        }
                                    </div>
                                </div>
                            </div> : 
                            <div></div>
                        }
                    </div>                            
                    <div className="card">
                        <div className="card-header"> 
                            <i className="fas fa-file-alt"> Thông tin dự án</i> 
                        </div>

                        {!isEmpty(project)?
                        <div>
                            <div className="row mt-3 mb-3">
                                <div className="col-xl-12 col-sm-12">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="name">Tên dự án:</label>
                                                    <input type="text" className="form-control" id="name" defaultValue={project.name} onChange={this.handleChange} placeholder="Name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="investor">Nhà đầu tư:</label>
                                                    <input type="text" className="form-control" id="investor" defaultValue={project.investor} onChange={this.handleChange} placeholder="Investor"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="price">Giá:</label>
                                                    <input type="number" className="form-control" id="price" defaultValue={project.price} onChange={this.handleChange} placeholder="Price"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="unit">Đơn vị (VNĐ):</label>
                                                    <input type="text" className="form-control" id="unit" defaultValue={project.unit} onChange={this.handleChange} placeholder="Unit"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="area">Diện tích (m2):</label>
                                                    <input type="number" className="form-control" id="area" defaultValue={project.area} onChange={this.handleChange} placeholder="Area"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fullname">Tên người đăng:</label>
                                                    <input type="text" className="form-control" id="fullname" defaultValue={project.fullname} onChange={this.handleChange} placeholder="Full name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="ownerid">ID người đăng:</label>
                                                    <input type="text" className="form-control" id="ownerid" defaultValue={project.ownerid} readOnly placeholder="OwnerID"/>
                                                </div>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <div className="form-group">
                                                    <label htmlFor="lat">Lat:</label>
                                                    <input type="text" className="form-control" id="lat" defaultValue={project.lat} readOnly placeholder="Lat"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="long">Long:</label>
                                                    <input type="text" className="form-control" id="long" defaultValue={project.long} readOnly placeholder="Long"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="type">Loại BĐS:</label>
                                                    <select className="form-control" id="type" defaultValue={project.type} onChange={this.handleChange}>
                                                        <option value="1">Chung cư, căn hộ</option>
                                                        <option value="2">Nhà ở</option>
                                                        <option value="3">Đất nền</option>
                                                        <option value="4">Văn phòng, mặt bằng kinh doanh</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="statusProject">Trạng thái:</label>
                                                    <select className="form-control" id="statusProject" defaultValue={project.statusProject} onChange={this.handleChange}>
                                                        <option value="1">Đang rao bán</option>
                                                        <option value="2">Đã bán</option>
                                                        <option value="3">Đang rao cho thuê</option>
                                                        <option value="4">Đã cho thuê</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email:</label>
                                                    <input type="email" className="form-control" id="email" defaultValue={project.email} readOnly placeholder="Email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Số điện thoại:</label>
                                                    <input type="tel" className="form-control" id="phone" defaultValue={project.phone} onChange={this.handleChange} pattern="[0-9]{10}" placeholder="Phone"/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="createTime">Thời gian đăng dự án:</label>
                                                            <input type="text" className="form-control" id="createTime" defaultValue={moment.unix(project.createTime).format('DD/MM/YYYY, h:mm a')} readOnly placeholder="Create Time"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-sm-6">
                                                        <div className="form-group">
                                                            <label htmlFor="updateTime">Thời gian cập nhật lần cuối:</label>
                                                            <input type="text" className="form-control" id="updateTime" defaultValue={moment.unix(project.updateTime).format('DD/MM/YYYY, h:mm a')} readOnly placeholder="Update Time"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="address">Địa chỉ:</label>
                                                    <input type="text" className="form-control" id="address" defaultValue={project.address} onChange={this.handleChange} placeholder="Address"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-xl-12 col-sm-12">
                                                <div className="form-group">
                                                    <label htmlFor="info">Thông tin mô tả:</label>
                                                    <textarea type="text" className="form-control" id="info" defaultValue={project.info} onChange={this.handleChange} placeholder="Info"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="submit" className="btn btn-primary" disabled={!this.state.isEdit}>Cập nhật</button>
                                            </div>
                                            <div className="col-xl-6 col-sm-6">
                                                <button type="button" className="btn btn-danger" onClick={this.showModal}>Xóa dự án</button>
                                            </div>
                                            <Modal
                                                title="Xác nhận xóa dự án"
                                                visible={this.state.visible}
                                                onOk={this.handleOk}
                                                onCancel={this.handleCancel}>
                                                <p>Bạn chắc chắn muốn xóa dự án này</p>
                                            </Modal>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            {/* <div className="divider"></div> */}

                            <div className="row">
                                {project.url.map(element => {
                                    return (
                                        <div className="col-3 col-sm-3">
                                            <div className=" cardImage">
                                                <img className="card-img-top Image" src={element} onClick={()=>this.showModalCarousel(element)}alt="Cardimage"/>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <Modal
                                title="Xem danh sách ảnh"
                                style={{ top: 0 }}
                                visible={this.state.visibleCarousel}
                                onCancel={this.handleCancel}
                                width="70%">
                                    <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            {project.url.map(element => { 
                                                const classcarousel = element === this.state.currenturl ? "carousel-item active" : "carousel-item"
                                                return (
                                                    <div className={classcarousel}>
                                                        <img className="d-block w-100 imageCarousel" src={element} alt="Firstslide"/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </div>
                            </Modal>

                            {/* <div className="divider"></div> */}

                            <div className="row mt-3">                             
                                <div className="col-xl-8 col-sm-8">
                                    <div className="row mb-3">
                                        <div className="col-xl-5 col-sm-5">
                                            <i className="fas fa-comments fa-2x">Bình luận</i>
                                        </div>             
                                        <div className="col-xl-1 col-sm-1">
                                            <Switch
                                                checkedChildren={<Icon type="check"/>}
                                                unCheckedChildren={<Icon type="close"/>}
                                                checked={this.state.allowComment}
                                                onChange={this.changeAllowComment}
                                            />
                                        </div>
                                        <div className="col-xl-3 col-sm-3">
                                            {this.state.allowComment ? 
                                                <Badge count={'Cho phép bình luận'} style={{ backgroundColor: '#52c41a' }}/>
                                                :
                                                <Badge count={'Chặn bình luận'} style={{ backgroundColor: 'red' }}/>
                                            }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xl-12 col-sm-12">
                                            <ul className="list-group">
                                                {this.state.comments.map((comment) => {
                                                    return (
                                                        <li className="list-group-item" key={comment._id}>
                                                            <div className="media">
                                                                <div className="col-xl-2 col-sm-2">
                                                                    <img className="circular_square" src={comment.user.avatar} alt="avatar"/>        
                                                                </div>
                                                                <div className="media-body">
                                                                    <p>
                                                                        <a className="float-left" href={`/account/1/${comment.user.id}`}><strong>{comment.user.fullname}</strong></a>
                                                                        <span className="float-left"><small>({moment.unix(comment.createTime).format('DD/MM/YYYY, h:mm a')})</small></span>
                                                                        {Array(5-comment.star).fill(<span className="float-right"><i className="text-warning far fa-star"></i></span>)}
                                                                        {Array(comment.star).fill(<span className="float-right"><i className="text-warning fas fa-star"></i></span>)}                                                                        
                                                                    </p>
                                                                    <div className="clearfix"></div>
                                                                    <p>{comment.content}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            {/* <button type="button" className="btn btn-primary" onClick={this.addComment}>Thêm</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    project: state.project,
    authentication: state.authentication,
  }
}

const mapDispatchToProps =(dispatch) => {
  return {
    getOne: (id) => dispatch(projectActions.getOne(id)),
 }
}

export default connect(mapStateToProps, mapDispatchToProps) (ProjectDetail)
