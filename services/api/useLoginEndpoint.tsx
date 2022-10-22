import axios, { AxiosError, AxiosResponse } from 'axios';

const useLoginEndpoint = () => {
    const url = "http://35.244.150.255/autenticador/auth";

    const loadLogin = async ({ username, password }) => {
        try {
            const response: AxiosResponse<any> = await axios.post(url, { username, password });
            return response.data;
        } catch (error) {
            if(error.response?.status === 401) {
                throw ("Usuario o contraseña incorrecta")
            } else if(error.request){
                throw ("No se pudo contactar con el servidor, intente más tarde")
            } else {
                throw ("Problemas con el servicio SportApp")
            }
        }
    }

    return { loadLogin }
}

export default useLoginEndpoint
