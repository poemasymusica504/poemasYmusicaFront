import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { poemaDTO, repository } from '../repositories/poemas'
import React from "react";

export const usePoema = ({...filtro}) => {
    const params = {
        tipo: filtro.tipo,
    }

    const queryInfo = useQuery({
        queryKey: ['poema', params],
        enabled: true,
        placeholderData: keepPreviousData,
        queryFn: () => {
            return repository.list(params)
        },
    });

    return {
        ...queryInfo,
        data: {
            results: React.useMemo(
                () => {
                    if (queryInfo.data) {
                        return queryInfo.data?.data.results;
                    }
                    return [];
                },
                [queryInfo.data]
            ),
            count: queryInfo.data?.data.count,
            previous: queryInfo.data?.data.previous,
            next: queryInfo.data?.data.next,
        },
    };
};

export const getPoemaById = (poemaId: string) => {
    const query = useQuery({
        queryKey: ['poema', poemaId],
        enabled: !! poemaId,
        queryFn: () => {
            return repository.getAmor(poemaId);
        },
    });
    return {
        ...query,
        data: query.data as poemaDTO ?? {},
        isLoading: query.isLoading && query.fetchStatus !== 'idle',
    };
};