import axios from "axios";


const journalApi = axios.create({
    baseURL: 'https://vue-demos-7e16d-default-rtdb.firebaseio.com/'
})

export default journalApi