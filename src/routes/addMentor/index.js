import React, { Component } from 'react';
import { Card, CardHeader, } from 'reactstrap'
import { connect } from 'react-redux';
import { getActions } from '../../actions'
import MentorForm from 'components/mentorForm'
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actionList: [],
            actionData: []
        }
    }
    componentDidMount() {
        this.props.getActions()

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
        return (
            <div className='app'>
                <div className='container'>
                    <div className='app-container'>
                        <Card className='mt-5'>
                            <MentorForm title='Add Mentor' history={this.props.history} />
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { user_details, actions } = auth
    return { user_details, actions }
}
export default connect(mapStateToProps, { getActions })(Edit)