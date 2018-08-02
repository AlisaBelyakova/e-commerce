import axios from 'axios'

const postAddress = (bothForms) => {
    return axios.put(`/api/users/${bothForms.userId}/addAddress`, bothForms)
        .then(res => res.data)
        .catch(err => console.log(err))
}

export default  postAddress;
