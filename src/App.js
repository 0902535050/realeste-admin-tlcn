import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';

import { PrivateRoute } from './_components';
import Dashboard from './layout/content/Dashboard';
import Login from './layout/account/Login';
import SettingAdmin from './layout/account/SettingAdmin';
import CreateAdmin from './layout/account/CreateAdmin';
import VerifyAdmin from './layout/account/VerifyAdmin';
import Account from './layout/content/account/Account';
import AccountDetail from './layout/content/account/AccountDetail';
import Project from './layout/content/project/Project';
import ProjectDetail from './layout/content/project/ProjectDetail';
import ProjectAdd from './layout/content/project/ProjectAdd';
import News from './layout/content/news/News';
import NewsEditor from './layout/content/news/NewsEditor';
import NewsAdd from './layout/content/news/NewsAdd';
import Company from './layout/content/company/Company';
import CompanyDetail from './layout/content/company/CompanyDetail';
import CompanyAdd from './layout/content/company/CompanyAdd';
import Notfound from './layout/content/component/NotFound';
import './style/App.css';
import './style/sb-admin.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard}/>
          <PrivateRoute exact path="/setting/:id" component={SettingAdmin}/>
          <PrivateRoute exact path="/create" component={CreateAdmin}/>
          <Route exact path="/verify/:id/:hash" component={VerifyAdmin}/>
          <PrivateRoute exact path='/account/:page' component={Account}/>
          <PrivateRoute exact path='/account/:page/:id' component={AccountDetail}/>
          <PrivateRoute exact path='/project/:page' component={Project}/>
          <PrivateRoute exact path='/project/:page/:id' component={ProjectDetail}/>
          <PrivateRoute exact path='/projectadd' component={ProjectAdd}/>
          <PrivateRoute exact path='/news/:page' component={News}/>
          <PrivateRoute exact path='/news/:page/:id' component={NewsEditor}/>
          <PrivateRoute exact path='/newsadd' component={NewsAdd}/>
          <PrivateRoute exact path='/company/:page' component={Company}/>
          <PrivateRoute exact path='/company/:page/:id' component={CompanyDetail}/>
          <PrivateRoute exact path='/companyadd' component={CompanyAdd}/>
          <Route exact path='/login' component={Login}/>
          <PrivateRoute component={Notfound}/>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
