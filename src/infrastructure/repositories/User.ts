import axios, { AxiosResponse } from "axios";
import { IUser } from "../context/User";

//Env
const URL_API  = import.meta.env.VITE_URL_API;


export interface LoginProps {
    username: string;
    password: string;
}

export class UserRepository {

    async Login(props: LoginProps): Promise<AxiosResponse<IUser>> {
        const url = `${URL_API}/api-token-auth/`;
        return axios.post(url, props, {
            headers: {
                'Content-Type':'application/json',
            }
        })
    }
}

