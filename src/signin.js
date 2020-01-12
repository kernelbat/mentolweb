import React, { Component } from 'react';
import {Col,Row,Card,CardBody,CardHeader,CardFooter,Button} from 'reactstrap'
import TextField from './components/reactstrapTextField'
import { Field, reduxForm, getFormInitialValues, initialize, change } from 'redux-form'
import{required, emailField} from './constants/validators'
import {connect} from 'react-redux';
import {login} from './actions'
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleSubmit = ()=>{
        const {email,password} = this.props.form.Signin.values
        this.props.login({email,password,history:this.props.history})
        this.props.reset('Signin')
    }
    handleClick = ()=>{
        this.props.history.push('/signup')
    }
    render() { 
        const { handleSubmit, pristine, reset, submitting,form} = this.props
        console.log('form',form)
        return ( 
            <div className='app'>
                <div className='container'>
                <div className='app-container'>
                <Card className='mt-5'>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <CardHeader>Signin</CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm = {12} md={12}lg={12}xl={12}>
                            <Field id="email" name="email" type="text"
                                component={TextField} label={"email"}
                                validate={[required,emailField]}
                                
                                />
                            </Col>
                            <Col sm = {12} md={12}lg={12}xl={12}>
                            <Field id="password" name="password" type="password"
                                component={TextField} label={"Password"}
                                validate={[required]}
                                
                                />
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                    <Row>
                    
                    </Row>
                    <Button type='submit' color='primary'>Login</Button>
                    <p>New User?<a href={'javascript:void(0);'} onClick = {this.handleClick}>Create an account</a></p>
                    </CardFooter>
                    </form>
                </Card>
                </div>
                </div>
            </div>
         );
    }
}
const mapStateToProps = ({form})=>{
    return {form}
}
Signin = connect(mapStateToProps,{login})(Signin)
export default Signin = reduxForm({
    form: 'Signin',// a unique identifier for this form
    enableReinitialize: true,
    onSubmitSuccess: (result, dispatch) => {
      const newInitialValues = getFormInitialValues('Signin')();
    }
  })(Signin)