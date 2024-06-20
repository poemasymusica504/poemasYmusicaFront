import { Button, Result } from "antd";
import { FC } from "react"
import { usePoema } from "../../../infrastructure/hooks/usePoema";
import ListAmor from "./listAmor"
import { poemaDTO } from "../../../infrastructure/repositories/poemas";
import { useNavigate } from "react-router-dom";


const Layout: FC = () => {

    const navigate = useNavigate()
    const { data: amor, isError, error } = usePoema({tipo: 'amor'});
    if (isError) {
        return (
            <Result 
                status="500"
                title="500"
                subTitle={error instanceof Error && error?.message || ''}
            />
        )
    }
    return (
        <>  
            <Button onClick={() => navigate('crear/0/')}>Crear Poema</Button>
            <ListAmor list={amor.results as poemaDTO[]} />
        </>
    )
}

export default Layout;