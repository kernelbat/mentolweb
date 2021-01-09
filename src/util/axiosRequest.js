import axios from 'axios';
import AppConfig from 'constants/config'

/*
#purpose: Common function to call api
#
*/
const axiosHelperFunc = async (method = 'post', url, data) => {
    return axios({
        method,
        url: `${AppConfig.baseUrl}${url}`,
        headers: {
            token: localStorage.getItem('token')
        },
        data
    })
        .then(result => result)
        .catch(error => error)
}


export default {
    axiosHelperFunc,
}
