import React, { Component } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import Home from 'routes/home'
import Edit from 'routes/editMentor'
import AddMentor from 'routes/addMentor';
class User extends Component {

    render() {
        const { match } = this.props;
        if (match === '/user') {
            return <Redirect to='/user/home' />
        }
        return (
            <div className='app'>
                <div className='container'>
                    <div className='mt-5'>
                        <Route exact path={`${match.url}/home`} component={Home} />
                        <Route exact path={`${match.url}/edit/:id`} component={Edit} />
                        <Route exact path={`${match.url}/addMentor`} component={AddMentor} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(User);