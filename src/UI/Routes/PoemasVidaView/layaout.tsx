import { FC } from "react";
import { usePoema } from "../../../infrastructure/hooks/usePoema";
import { Button, Result } from "antd";
import ListVida from './listVida'
import { poemaDTO } from "../../../infrastructure/repositories/poemas";
import { useNavigate } from "react-router-dom";

const Layout: FC = () => {

    const navigate = useNavigate()

    const { data: vida, isError, error } = usePoema({tipo: 'vida'});

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
            <ListVida  list={vida.results as poemaDTO[]} />
        </>
    )
}

export default Layout;