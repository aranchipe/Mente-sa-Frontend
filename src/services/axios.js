import axios from 'axios';


export default axios.create({
    baseURL: 'https://mente-sa.herokuapp.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});
