import React, { Component } from 'react';
import { Col, Row, Card, CardBody, CardHeader, CardFooter, Button } from 'reactstrap'
import TextField from '../../components/reactstrapTextField'
import { Field, reduxForm, getFormInitialValues, initialize, change } from 'redux-form'
import { required, emailField, validatePhone } from '../../constants/validators'
import { connect } from 'react-redux';
import { addMentor } from '../../actions'
import MultiSelect from 'components/multipleSelectTexField'
import asyncValidate from 'constants/asyncValidate'
class MentorFrom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionList: [],
            actionData: []
        }
    }
    handleSubmit = () => {
        const { values } = this.props.mentor
        console.log('this.props.mentor.values', this.props.mentor.values)
        let actions = values.actionData.map((val) => val._id ? val._id : val)
        this.props.addMentor({ ...values, actions }, this.props.history)
    }
    componentDidMount() {

        const { email, name, username, contact } = this.props.user_details
        const { mentorDetails, actions } = this.props
        console.log('this.props,amtch', mentorDetails, actions)
        if (mentorDetails) {
            let actionData = []
            for (let j = 0; j < mentorDetails.actions.length; j++) {
                let index = actions.findIndex((val) => (val._id == mentorDetails.actions[j]))
                let data1 = actions[index]
                actionData.push(data1)
            }
            this.props.initialize({
                email: mentorDetails.email,
                name: mentorDetails.name,
                mobile: mentorDetails.mobile,
                actionData: actionData,
                user_id: mentorDetails._id,
                _id: mentorDetails._id
            })
            this.setState({ actionData: actionData })
        }

    }
    handleActions = (e) => {
        try {
            let temp = []
            this.setState({
                actionData: e.target.value
            });
        } catch (error) {
            console.log('error', error)
        }



    }
    render() {
        const { handleSubmit, pristine, reset, submitting, form, actions } = this.props
        console.log('form', this.state.actionData)
        return (
            <form onSubmit={handleSubmit(this.handleSubmit)}>
                <CardHeader>{this.props.title}</CardHeader>
                <CardBody>
                    <Row>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <Field id="name" name="name" type="text"
                                component={TextField} label={"Name"}
                                validate={[required]}

                            />
                        </Col>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <Field id="email" name="email" type="text"
                                component={TextField} label={"email"}
                                validate={[required, emailField]}

                            />
                        </Col>
                        <Col sm={6} md={6} lg={6} xl={6}>
                            <Field id="mobile" name="mobile" type="text"
                                component={TextField} label={"Mobile"}
                                validate={[required, validatePhone]}

                            />
                        </Col>
                        <Col sm={12} xs={12} md={6} lg={6}>
                            <Field name="actionData" type="select"
                                component={MultiSelect} label="Action"
                                fullWidth={true}
                                validate={required}
                                margin="normal"
                                data={actions}
                                classNameField='form-control form-control-lg'
                                value={this.state.actionData}
                                value1={this.state.actionData}
                                classNameField='form-control form-control-lg'

                                multiple={true}
                                onChange={(e) => this.handleActions(e)}

                            />
                        </Col>

                    </Row>
                </CardBody>
                <CardFooter>
                    <Row>

                    </Row>
                    <Button type='submit' color='primary' disabled={submitting}>{submitting ? 'Submitting..' : 'Submit'}</Button>

                </CardFooter>
            </form>

        );
    }
}
const mapStateToProps = ({ form, auth }) => {
    const { user_details, actions } = auth
    const { mentor } = form
    return { form, user_details, actions, mentor }
}
MentorFrom = connect(mapStateToProps, { addMentor })(MentorFrom)
export default MentorFrom = reduxForm({
    form: 'mentor',// a unique identifier for this form
    enableReinitialize: true,
    asyncValidate,
    destroyOnUnmount: true,
    onSubmitSuccess: (result, dispatch) => {
        const newInitialValues = getFormInitialValues('mentor')();
    }
})(MentorFrom)