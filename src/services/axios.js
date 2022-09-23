import axios from 'axios';


export default axios.create({
    baseURL: 'http://localhost:3334',
    /*  baseURL: 'https://mente-sa.herokuapp.com', */
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});
