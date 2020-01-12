import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {connect} from 'react-redux'
import Signin from './signin'
import Signup from './signup'
import User from './components/user'
const RestrictRoute = ({component:Component,adminActions,...rest}) =>
<Route
{...rest}
render={props =>
  adminActions
    ? <Component {...props} />
    : <Redirect
      to={{
        pathname: '/signin',
        state: { from: props.location }
      }}
    />}
/>
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const {match} = this.props
    let user = localStorage.getItem('email')
    if (this.props.location.pathname === '/') {
      if (!user||user===null) {
        return<Redirect to='/signin'/>
      }else{
        return<Redirect to='/user/home'/>
      }
    }
    if(this.props.location.pathname==='/user'){
      console.log('admin paths=',this.props.location.pathname)
      if (!user) {
        
        return (<Redirect to={'/signin'} />);
      } else {
        return (<Redirect to={'/user/home'} />);
      }
    }
    if(this.props.location.pathname==='/signin'  || this.props.location.pathname==='/signup'){
      if(user){
        return<Redirect to = {'/user/home'}/>
      }
    }
    return ( 
      <React.Fragment>
      <Switch>
      <RestrictRoute path = {`/user`} adminActions ={user} component={User}/>
        <Route exact path={`/signin`} component = {Signin}/>
        <Route exact path={`/signup`} component = {Signup}/> 
      </Switch>
      <NotificationContainer/>
      </React.Fragment>
     );
  }
}
const mapStateToProps = ({auth})=>{
  const {user_details} = auth
  return {user_details}
}
export default App;