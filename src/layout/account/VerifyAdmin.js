import React, { Component } from 'react';
// import { isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { message } from 'antd';

import {authenticationActions} from '../../_actions'
import { adminService } from '../../_services';

const loading = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";

class VerifyAdmin extends Component {
    constructor(props) {
        super(props);   
        this.props.logout();     
        this.state = {
            id: this.props.match.params.id,
            hash: this.props.match.params.hash,
            isLoading: true,
            success: false,
        };
    }

    componentDidMount() {
        const postParam = {
            id: this.state.id,
            hash: this.state.hash,
        }
        message.loading('Verify account in process', 0.5)
        .then(()=>{
            adminService.verify(postParam)
            .then(res => {
                if(res.status === 200){
                    this.setState({
                        isLoading: false,
                        success: true,
                    })
                    message.success('Verify Done')
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    isLoading: false,
                    success: false,
                })
                message.error('Error, please try again')
            })
        })
    }

    render() {
        return (
            <div>
                <div className="login_backgr">
                    <nav className="navbar navbar-expand-lg navbar-dark mtren">
                        <div className="container">
                            <a className="navbar-brand logo" href="/login">Admin Verify</a>
                        </div>
                    </nav>
                </div>
                <div className="container">
                {!this.state.isLoading && this.state.success ?
                    <div className="jumbotron">
                        <h1>Xác thực thành công</h1>
                        <p>Tài khoản đã được xác thực thành công, hãy đăng nhập để tiếp tục sử dụng dịch vụ</p>
                        <a className="btn btn-lg btn-primary" href="/login">Go to Login</a>
                    </div> :
                    <div>
                        {!this.state.isLoading && !this.state.success ?
                        <div className="jumbotron">
                            <h1>Lỗi xác thực</h1>
                            <p>Tài khoản không tồn tại hoặc đã được xác thực, vui lòng kiểm tra lại</p>
                        </div> :
                        <div className="jumbotron">
                            <h1>Vui lòng chờ trong giây lát ...</h1>
                            <img src={loading} alt=""/>
                        </div>
                        }
                    </div>
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(authenticationActions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (VerifyAdmin)