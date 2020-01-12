import React, { Component } from 'react';
import {Col,Row,Card,CardBody,CardHeader,CardFooter,Button} from 'reactstrap'
import TextField from '../../components/reactstrapTextField'
import { Field, reduxForm, getFormInitialValues, initialize, change } from 'redux-form'
import{required, emailField, validatePhone} from '../../constants/validators'
import {connect} from 'react-redux';
import {editProfile} from '../../actions'
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    handleSubmit = ()=>{
        const {email,password,username,name,contact} = this.props.form.Edit.values
        this.props.editProfile({email,password,username,name,contact,history:this.props.history})
        this.props.reset('Edit')
    }
    componentDidMount() {
        const {email,name,username,contact} = this.props.user_details
        this.props.initialize({
            email,name,username,contact
        })
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
                    <CardHeader>Edit</CardHeader>
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
                            
                            
                        </Row>
                    </CardBody>
                    <CardFooter>
                    <Row>
                    
                    </Row>
                    <Button type='submit' color='primary'>Edit</Button>
                    
                    </CardFooter>
                    </form>
                </Card>
                </div>
                </div>
            </div>
         );
    }
}
const mapStateToProps = ({form,auth})=>{
    const {user_details} = auth
    return {form,user_details}
}
Edit = connect(mapStateToProps,{editProfile})(Edit)
export default Edit = reduxForm({
    form: 'Edit',// a unique identifier for this form
    enableReinitialize: true,
    onSubmitSuccess: (result, dispatch) => {
      const newInitialValues = getFormInitialValues('Edit')();
    }
  })(Edit)