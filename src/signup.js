import React, { Component } from 'react';
import {Col,Row,Card,CardBody,CardHeader,CardFooter,Button} from 'reactstrap'
import TextField from './components/reactstrapTextField'
import { Field, reduxForm, getFormInitialValues, initialize, change } from 'redux-form'
import{required, emailField, validatePhone} from './constants/validators'
import {connect} from 'react-redux';
import {signup} from './actions'
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleSubmit = ()=>{
        const {email,password,username,name,contact} = this.props.form.Signup.values
        this.props.signup({email,password,username,name,contact,history:this.props.history})
        this.props.reset('Signup')
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
                    <CardHeader>Signup</CardHeader>
                    <CardBody>
                        <Row>
                            <Col sm = {6} md={6}lg={6}xl={6}>
                            <Field id="name" name="name" type="text"
                                component={TextField} label={"Name"}
                                validate={[required]}
                                
                                />
                            </Col>
                            <Col sm = {6} md={6}lg={6}xl={6}>
                            <Field id="username" name="username" type="text"
                                component={TextField} label={"User Name"}
                                validate={[required]}
                                
                                />
                            </Col>
                            <Col sm = {6} md={6}lg={6}xl={6}>
                            <Field id="email" name="email" type="text"
                                component={TextField} label={"email"}
                                validate={[required,emailField]}
                                
                                />
                            </Col>
                            <Col sm = {6} md={6}lg={6}xl={6}>
                            <Field id="contact" name="contact" type="text"
                                component={TextField} label={"Contact"}
                                validate={[required,validatePhone]}
                                
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
                    <Button type='submit' color='primary'>Signup</Button>
                    <p>Already have an acount?<a href={'javascript:void(0);'}>Sign in</a></p>
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
Signup = connect(mapStateToProps,{signup})(Signup)
export default Signup = reduxForm({
    form: 'Signup',// a unique identifier for this form
    enableReinitialize: true,
    onSubmitSuccess: (result, dispatch) => {
      const newInitialValues = getFormInitialValues('Signup')();
    }
  })(Signup)