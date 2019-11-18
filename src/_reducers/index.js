import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { account } from './account.reducer';
import { admin } from './admin.reducer';
import { project } from './project.reducer';
import { news } from './news.reducer';
import { company } from './company.reducer';
import { alert } from './alert.reducer';

const appReducers = combineReducers({
    authentication,
    account,
    admin,
    alert,
    project,
    news,
    company,
});

export default appReducers;