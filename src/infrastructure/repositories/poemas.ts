import axios from "axios";
import { FetchResponsePaginator } from "../../domain/types";

//Env
const URL_API  = import.meta.env.VITE_URL_API;

export type poemaDTO = {
    id?: number
    escritor: string
    titulo: string
    resumen: string
    poema: string
    img_url: string
    tipo: string
    create_at?: string
    user_id_favorito?: number[]
}

type params = {
    tipo: string,
}

export class amorRepository {


    async list(params: params) {
        const url = `${URL_API}/poema/`
        return axios<FetchResponsePaginator<poemaDTO>>({ method:'get', url, params: {...params} }).then((reponse) => {
            const formattedData = {
                ...reponse,
                data: {
                    ...reponse.data,
                    results: reponse.data.results
                }
            };
            return formattedData;
        })
    }

    async getAmor(id: string) {
        if (!id) return;
        const url = `${URL_API}/poema/${id}/`;
        const { data } = await axios.get<poemaDTO>(url).then((response) => {
            const data = {
                ...response,
                data: response.data,
            };
            return data;
        });

        return data;
    }

    async create(dataPoema: poemaDTO) {
        const url = `${URL_API}/poema/`;
        const { data } = await axios.post<poemaDTO>(url, dataPoema).then((response) => {
            const data = {
                ...response,
                data: response.data,
            };

            return data;
        })

        return data;
    }

    async edit(dataPoema: poemaDTO) {
        const url = `${URL_API}/poema/${dataPoema.id}/`;
        const { data } = await axios.put<poemaDTO>(url, dataPoema).then((response) => {
            const data = {
                ...response,
                data: response.data,
            };

            return data;
        })

        return data;
    }
}

export const repository = new amorRepository();