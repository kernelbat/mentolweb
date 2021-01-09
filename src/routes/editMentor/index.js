import React, { Component } from 'react';
import { Card, CardHeader, } from 'reactstrap'
import { connect } from 'react-redux';
import { getActions } from '../../actions'
import MentorForm from 'components/mentorForm'
import Axios from 'util/axiosRequest'
import { NotificationManager } from 'react-notifications';
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentorDetails: ''
        }
    }
    componentDidMount = async () => {
        await this.props.getActions()
        let res = await Axios.axiosHelperFunc('get', `user/getMentorDetails?_id=${this.props.match.params.id}`)
        if (res && res.data && !res.data.error) {
            this.setState({ mentorDetails: res.data.data })
        } else {
            NotificationManager.error('Something went wrong!')
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
        const { mentorDetails } = this.state
        return (
            <div className='app'>
                <div className='container'>
                    <div className='app-container'>
                        <Card className='mt-5'>
                            {mentorDetails ? <MentorForm title='Edit' mentorDetails={mentorDetails} history={this.props.history} />
                                :
                                <p>Fetching mentor details..</p>
                            }
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