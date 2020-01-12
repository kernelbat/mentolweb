import React, { Component } from 'react';
import{Row,Col,Card,CardBody,CardHeader,CardFooter,Button,Tooltip } from 'reactstrap'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

class Home extends Component {
    state = {  }
    handleEdit =()=>{
        this.props.history.push('/user/edit')
    }
    render() { 
        const{email,name,username,contact} = this.props.user_details
        return ( 
            <Card>
                <CardHeader>
                    <Row>
                        <Col sm={6} md={6} lg={6} cl={6}>
                        <h1 className='text-capitalize'>{name} </h1>
                        </Col>
                        <Col sm={6} md={6} lg={6} cl={6} className='d-flex justify-content-end'>
                            <h1 style={{cursor:'pointer'}} onClick = {this.handleEdit}><i className="zmdi zmdi-edit zmdi-hc-1x"></i></h1>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <p>Email: {email}</p>
                    <p>Username: {username}</p>
                    <p>Contact: {contact}</p>
                </CardBody>
                
            </Card>
         );
    }
}
const mapStateToProps = ({auth})=>{
    const {user_details} = auth;
    return {user_details}
}
export default withRouter(connect(mapStateToProps,null) (Home));