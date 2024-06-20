import axios, { AxiosResponse } from 'axios';
import { UsuarioProps } from '../../domain/Usuario';
import { IUser } from '../context/User';

//Env
const URL_API  = import.meta.env.VITE_URL_API;

export class UsuarioRepository {

    async singIn(model: UsuarioProps): Promise<AxiosResponse<IUser>> {
        const url = `${URL_API}/singIn/`;
        return axios.post(url, model, {
            headers: {
                'Content-Type':'application/json',
            }
        })
    }
}