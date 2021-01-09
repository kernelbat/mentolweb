import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Button, Tooltip } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import MentorList from 'components/mentorListing'
import Axios from 'util/axiosRequest'
import { NotificationManager } from 'react-notifications';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            admin: ''
        }
    }
    handleEdit = () => {
        this.props.history.push('/user/edit')
    }
    async componentDidMount() {
        let res = await Axios.axiosHelperFunc('get', `user/getUser`)
        if (res) {
            if (res.data && res.data.loggOut) {
                NotificationManager.error(res.data.title)
                localStorage.removeItem('token')
                this.props.history.push('/signin')
            } else if (res.data && res.data.error == false) {
                this.setState({ admin: res.data.data })
            }
        }
    }
    render() {
        const { email, name, username, contact } = this.props.user_details
        const { admin } = this.state
        return (
            <>
                <Card>
                    <CardHeader>
                        <Row>
                            <Col sm={6} md={6} lg={6} cl={6}>
                                <h1 className='text-capitalize'>{admin.name} </h1>
                            </Col>
                            {/* <Col sm={6} md={6} lg={6} cl={6} className='d-flex justify-content-end'>
                                <h1 style={{ cursor: 'pointer' }} onClick={this.handleEdit}><i className="zmdi zmdi-edit zmdi-hc-1x"></i></h1>
                            </Col> */}
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <p>Email: {admin.email}</p>
                        <p>Contact: {admin.mobile}</p>
                    </CardBody>

                </Card>
                <Row>
                    <Col sm={6} md={6} lg={6} cl={6} className='mt-2'>
                        <Button onClick={() => this.props.history.push('/user/addMentor')} color="primary">Add Mentor</Button>
                    </Col>
                </Row>
                <MentorList />

            </>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { user_details } = auth;
    return { user_details }
}
export default withRouter(connect(mapStateToProps, null)(Home));