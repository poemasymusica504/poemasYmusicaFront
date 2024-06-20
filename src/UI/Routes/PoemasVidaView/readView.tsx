import { useParams } from "react-router-dom";
import { getPoemaById } from "../../../infrastructure/hooks/usePoema";
import Read from "../../Components/Poemas/read";

const ReadView: React.FC = () => {

    const params = useParams();

    const { data, isLoading } = getPoemaById(params.id as string)

    return (
        <Read data={data} isLoading={isLoading} />
    )
}

export default ReadView;