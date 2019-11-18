import React, { Component } from 'react';
import { isEmpty } from 'react-redux-firebase';
import { Table, Tag, message } from 'antd';
import { connect } from 'react-redux';
// import moment from 'moment';

import { companyActions } from '../../../_actions';
import Header from '../../navbar/Header';
import Navbar from '../../navbar/Navbar';

class Company extends Component {
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
        this.props.history.push('/company/' + (this.state.page - 1))
    }

    pageNext = () => {
        this.props.history.push('/company/' + (this.state.page + 1))
    }

    render() {
        const columns = [
            {
                title: 'Tên công ty',
                dataIndex: 'companyname',
                key: 'companyname',
                // render: text => <a href="">{text}</a>,
                sorter: (a, b) => a.companyname > b.companyname,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                sorter: (a, b) => a.email > b.email,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Trạng thái',
                dataIndex: 'lock',
                key: 'lock',
                filters: [{
                    text: 'Bị khóa',
                    value: true,
                },{
                    text: 'Đang hoạt động',
                    value: false,
                }],
                onFilter: (value, record) => record.lock===value,
                render: type => {
                    var color = 'geekblue'
                    if(type === true){
                        color = 'red'
                        return <Tag color={color} key={type}>Đang bị khóa</Tag>
                    } else if(type === false){
                        color = 'green'
                        return <Tag color={color} key={type}>Đang hoạt động</Tag>
                    }
                    return <Tag color={color} key={type}>()</Tag>
                }
            },
            {
                title: 'Kích hoạt',
                dataIndex: 'verify',
                key: 'verify',
                sorter: (a, b) => a.verify - b.verify,
                sortDirections: ['descend', 'ascend'],
                filters: [{
                    text: 'Đã kích hoạt',
                    value: true,
                },{
                    text: 'Đang chờ',
                    value: false,
                }],
                onFilter: (value, record) => record.verify===value,
                render: verify => {
                    var color = 'geekblue'
                    if(verify === true){
                        color = 'geekblue'
                        return <Tag color={color} key={verify}>Đã kích hoạt</Tag>
                    } else if(verify === false){
                        color = 'red'
                        return <Tag color={color} key={verify}>Đang chờ</Tag>
                    }
                    return <Tag color={color} key={verify}>()</Tag>
                }
            },
        ]
        var dataSource = [];
        var isLoading = true;
        const company = isEmpty(this.props.company) ? {} : this.props.company;
        dataSource = isEmpty(company.result) || this.props.company.type === "COMPANY_GETONE_SUCCESS" ? [] : company.result.company;
        if(dataSource.length>0){
            isLoading = false;
        } else if(!isEmpty(company.type) && company.type === "COMPANY_GETALL_FAILURE"){
            if(!isEmpty(company.error) && company.error.data.status===401){
                message.error("Phiên đã hết hạn, vui lòng đăng nhập lại", 3)
                this.props.history.push('/login')
            } else {
                message.error("Lỗi không xác định, vui lòng thử lại", 3)
                isLoading = false;
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
                                    <li className="breadcrumb-item active">Company</li>
                                </ol>
                            </div>
                            <div className="col-1">
                                <a className="btn btn-outline-primary" href="/companyadd">Thêm công ty</a>
                            </div>
                        </div>                            
                    
                        <div className="card mb-3">
                            <div className="card-header">
                                <i className="fas fa-table"> Bảng quản lý thông tin công ty</i>
                            </div>
                            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }} rowKey="_id" loading={isLoading}
                                onRow={(record, rowIndex) => {
                                return {
                                    onClick: (event) => {
                                        this.props.history.push('/company/'+this.state.page+'/'+record._id)
                                    },
                                }}}      
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
    )}
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
        company: state.company,
        authentication: state.authentication,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAll: (page) => dispatch(companyActions.getAll(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Company)
