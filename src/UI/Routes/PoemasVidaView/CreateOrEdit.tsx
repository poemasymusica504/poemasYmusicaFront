import { useParams } from "react-router-dom"
import { getPoemaById } from "../../../infrastructure/hooks/usePoema";
import { Result } from "antd";
import PoemaForm from "../../Components/Poemas/form";

const CreateEditView: React.FC = () => {
    const params = useParams();
    
    if (params.accion == 'editar') {
        const poemaId = params.id ?? '0';
        const { data, isLoading, isError } = getPoemaById(poemaId)
        if (isError) {
            return (
                <Result 
                    status={"error"}
                />
            )
        }
        return (
            <PoemaForm tipo="vida" values={data} isLoading={isLoading} />
        )
    }
    return (
       <PoemaForm tipo="vida" isLoading={false} /> 
    )
}

export default CreateEditView;