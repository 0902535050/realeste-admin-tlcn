import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Table, Tag, message } from 'antd';
import { connect } from 'react-redux';

import { projectActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class Project extends Component {
    constructor(props) {
        super(props);
        this.props.getAll(this.props.match.params.page);
        this.state = {
            page: parseInt(this.props.match.params.page),
            isLoading: true,
        };
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
        if(prevProps.match.params.page !== this.props.match.params.page) {
            return this.props.match.params.page
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(snapshot){
            this.setState({page: parseInt(snapshot)})
            this.props.getAll(snapshot)
        }
    }

    changeIsLoading = (temp) => {
        this.setState({ isLoading: temp })
    }

    pagePrev = () => {
        this.props.history.push('/project/'+(this.state.page-1))
    }

    pageNext = () => {
        this.props.history.push('/project/'+(this.state.page+1))
    }

    render() {
        const columns = [
            {
                title: 'Tên dự án',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name > b.name,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Nhà đầu tư',
                dataIndex: 'investor',
                key: 'investor',
                sorter: (a, b) => a.investor > b.investor,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Loại BĐS',
                dataIndex: 'type',
                key: 'type',
                render: type => {
                    var color
                    if(type === 1){
                        color = 'purple'
                        return <Tag color={color} key={type}>Chung cư, căn hộ</Tag>
                    } else if(type === 2){
                        color = 'red'
                        return <Tag color={color} key={type}>Nhà ở</Tag>
                    } else if(type === 3){
                        color = 'yellow'
                        return <Tag color={color} key={type}>Đất nền</Tag>
                    } else if(type === 4){
                        color = 'green'
                        return <Tag color={color} key={type}>Văn phòng, mặt bằng</Tag>
                    }
                    return <Tag color={color} key={type}>()</Tag>
                }
            },
            {
                title: 'Diện tích',
                dataIndex: 'area',
                key: 'area',
                sorter: (a, b) => a.area - b.area,
                sortDirections: ['descend', 'ascend'],
                render: area => <Tag color={'black'} key={area}>{area}</Tag>
            },
            {
                title: 'Trạng thái',
                dataIndex: 'statusProject',
                key: 'statusProject',
                filters: [{
                    text: 'Đang rao bán',
                    value: 1,
                }, {
                    text: 'Đã bán',
                    value: 2,
                }, {
                    text: 'Đang rao cho thuê',
                    value: 3,
                }, {
                    text: 'Đã cho thuê',
                    value: 4,
                }],
                onFilter: (value, record) => record.statusProject === value,
                render: statusProject => {
                    var color
                    if (statusProject === 1){
                        color = 'geekblue'
                        return <Tag color={color} key={statusProject}>Đang rao bán</Tag>
                    } else if (statusProject === 2){
                        color = 'red'
                        return <Tag color={color} key={statusProject}>Đã bán</Tag>
                    } else if (statusProject === 3){
                        color = 'orange'
                        return <Tag color={color} key={statusProject}>Đang rao cho thuê</Tag>
                    } else if (statusProject === 4){
                        color = 'green'
                        return <Tag color={color} key={statusProject}>Đã cho thuê</Tag>
                    }
                    return <Tag color={color} key={statusProject}>{statusProject}</Tag>
                }
            },
            {
                title: 'Kiểm duyệt',
                dataIndex: 'verify',
                key: 'verify',
                filters: [{
                    text: 'Đã duyệt',
                    value: true,
                }, {
                    text: 'Đang chờ',
                    value: false,
                }],
                onFilter: (value, record) => record.verify === value,
                render: verify => {
                    var color
                    if (verify === true){
                        color = 'green'
                        return <Tag color={color} key={verify}>Đã duyệt</Tag>
                    } else if (verify === false){
                        color = 'red'
                        return <Tag color={color} key={verify}>Đang chờ</Tag>
                    }
                    return <Tag color={color} key={verify}>{verify}</Tag>
                }
            },
        ]
        var dataSource = [];
        var isLoading = true;
        const project = isEmpty(this.props.project) ? {} : this.props.project;
        dataSource = isEmpty(project.result) || this.props.project.type === "PROJECT_GETONE_SUCCESS" ? [] : project.result.projects;
        if (dataSource.length > 0) {
            isLoading = false;
        } else if (!isEmpty(project.type) && project.type === "PROJECT_GETALL_FAILURE") {
            if (!isEmpty(project.error) && project.error.data.status === 401) {
                message.error("Phiên đã hết hạn, vui lòng đăng nhập lại", 3)
                this.props.history.push('/login')
            } else {
                message.error("Lỗi không xác định, vui lòng thử lại", 3)
                isLoading = false;
            }
        }

        return (
            <div>
                <Header user={this.props.authentication.user} />
                <div id="wrapper">
                    <Navbar />
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
                                        <li className="breadcrumb-item active">Project</li>
                                    </ol>
                                </div>
                                <div className="col-1">
                                    <a className="btn btn-outline-primary" href="/projectadd">Thêm dự án</a>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div className="card-header">
                                    <i className="fas fa-table"> Bảng quản lý dự án, tin đăng</i>
                                </div>
                                <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} rowKey="_id" loading={isLoading}
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: (event) => {
                                                this.props.history.push('/project/' + this.state.page + '/' + record._id)
                                            },
                                        }
                                    }}
                                />
                            </div>
                            {/* card mb-3 */}
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className={this.state.page === 1?"page-item disabled":"page-item"}>
                                        <button className="page-link" onClick={this.pagePrev}>
                                            &laquo; Previous
                                        </button>
                                    </li>
                                    <li className="page-item"><div className="page-link">.</div></li>
                                    <li className="page-item"><div className="page-link">.</div></li>
                                    <li className="page-item"><div className="page-link">.</div></li>
                                    <li className={dataSource.length >= 10 ? "page-item" : "page-item disabled"}>
                                        <button className="page-link" onClick={this.pageNext}>
                                            Next &raquo;
                                        </button>
                                    </li>
                                </ul>
                            </nav>
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
    console.log(state)
    return {
        project: state.project,
        authentication: state.authentication,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: (page) => dispatch(projectActions.getAll(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
