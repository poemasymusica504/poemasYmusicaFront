import { useParams } from "react-router-dom"
import { getPoemaById, useMutationType } from "../../../infrastructure/hooks/usePoema";
import { Result } from "antd";
import PoemaForm from "../../Components/Poemas/form";
import { poemaDTO } from "../../../infrastructure/repositories/poemas";

const CreateEditView: React.FC = () => {
    const params = useParams();
    const isEdit = params?.accion === 'editar';
    const poemaId = params.id ?? '0';
    
    const { data, isLoading, isError } = isEdit ? getPoemaById(poemaId) : { data: null, isLoading: false, isError: false };
    const mutation = useMutationType(isEdit ? 'update' : 'create');

    if (params.accion == 'editar') {
        if (isError) {
            return (
                <Result 
                    status={"error"}
                />
            )
        }
        return (
            <PoemaForm tipo="vida" values={data as poemaDTO} isLoading={isLoading} mutation={mutation} />
        )
    }
    return (
       <PoemaForm tipo="vida" isLoading={false}  mutation={mutation}/> 
    )
}

export default CreateEditView;