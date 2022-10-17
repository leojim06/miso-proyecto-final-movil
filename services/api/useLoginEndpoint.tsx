import axios from 'axios';
import { useState } from 'react'

export const useLoginEndpoint = () => {
    const url = "";
    const [login, setLogin] = useState([]);
    const [error, setError] = useState(null);

    const loadLogin = async () => {
        axios(url)
        .then((response) => {
            setLogin(response.data);
            setError(null);
        })
        .catch(setError);
    }

    return {
        loadLogin,
        login,
        error
    }
}