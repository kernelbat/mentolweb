import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardHeader, CardFooter, Button, Tooltip, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { listMentor } from 'actions'
import Axios from 'util/axiosRequest'
import { NotificationManager } from 'react-notifications';
class MenotrListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            open: false,
            _id: '',
            name: ''
        }
    }
    componentDidMount(page) {
        const { mentorList, count } = this.props

        let obj = { page: page ? page : this.state.page }
        let url = Object.keys(obj).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
        this.props.listMentor({ url, page: page ? true : false }, this.props.history)
    }
    loadMore = () => {
        let page = this.state.page
        console.log('page', page)
        this.setState({ page: page + 1 })
        this.componentDidMount(page + 1)
    }
    closeModal = () => {
        this.setState({ open: false, _id: false })
    }
    openModal = (val) => {
        this.setState({ open: true, name: val.name, _id: val._id })
    }
    handleDelete = async () => {
        let res = await Axios.axiosHelperFunc('post', 'user/deleteMentor', { _id: this.state._id })
        if (res && !res.data.error) {
            this.closeModal()
            this.componentDidMount()
            NotificationManager.success(res.data.title)
        } else {
            this.closeModal()
            NotificationManager.success(res.data.title ? res.data.title : 'Something went wrong!')
        }
    }
    handleEdit = (val) => {
        this.props.history.push(`/user/edit/${val._id}`)
    }
    render() {
        const { mentorList, count } = this.props
        const { open, _id, name } = this.state
        console.log('mentorList', mentorList, count)
        return (
            <>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} cl={12} className='mt-2'>
                        {count > 0 && <h2>{`Showing Mentor results ${mentorList.length} of ${count}`}</h2>}
                    </Col>
                    {mentorList && mentorList.map((val, i) => <Col key={i} xs={12} sm={4} md={4} lg={4} cl={4} className='mt-4'>
                        <Card raised>
                            <CardHeader>
                                <Row>
                                    <Col xs={12} sm={6} md={6} lg={6} cl={6}>
                                        <h3 className='text-capitalize'>{val.name} </h3>
                                    </Col>
                                    <Col xs={12} sm={6} md={6} lg={6} cl={6} className='d-flex justify-content-end'>
                                        <div className='w-100 d-flex justify-content-end'>
                                            <span>
                                                <h3 style={{ cursor: 'pointer' }} onClick={() => this.handleEdit(val)}><i className="zmdi zmdi-edit zmdi-hc-1x mr-2 text-success"></i></h3>
                                            </span>
                                            <span>
                                                <h3 style={{ cursor: 'pointer' }} onClick={() => this.openModal(val)}><i className="zmdi zmdi-delete zmdi-hc-1x text-danger"></i></h3>
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <p>Email: {val.email}</p>
                                <p>Contact: {val.mobile}</p>
                                {val.actions && val.actions.length > 0 && <p>Actions: {val.actions.map(val => val.name).join(',')}</p>}
                            </CardBody>

                        </Card>
                    </Col>)}
                </Row>
                {count > mentorList.length && < Row >
                    <Col xs={12} sm={6} md={6} lg={6} cl={6} className='mt-2'>
                        <Button onClick={() => this.loadMore()} color="primary">Load More</Button>
                    </Col>
                </Row>}
                <Modal isOpen={open} toggle={this.closeModal} >
                    <ModalHeader toggle={this.closeModal}>{`Delete ${name}`}</ModalHeader>
                    <ModalBody>
                        Are you sure you wants to delete this mentor?
        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.closeModal}>Close</Button>{' '}
                        <Button color="danger" onClick={this.handleDelete}>Continue</Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { mentorList, count } = auth;
    return { mentorList, count }
}
export default withRouter(connect(mapStateToProps, { listMentor })(MenotrListing));