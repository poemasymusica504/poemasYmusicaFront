import { Button, Card, Typography } from "antd";
import { poemaDTO } from "../../../infrastructure/repositories/poemas";
import useUserStore from "../../../infrastructure/context/User";
import { useNavigate } from "react-router-dom";

interface PoemaCardProps {
    poema: poemaDTO
}

const PoemaCard: React.FC<PoemaCardProps> = ({ poema }) => {

    const { Paragraph, Title } = Typography;

    const { admin } = useUserStore((state) => state)

    const navigate = useNavigate();

    return (
       <Card
            hoverable
            cover={<img alt="Imagen Poema" width={350} height={200} src={poema.img_url} style={{ borderRadius: 15, padding: 10}}/>}
            style={{ alignContent: 'center', alignSelf:'center', textAlign: 'center' }}
        >
            <Title
                style={{ margin: 0 }}
                level={4}
            >
                {poema.titulo}
            </Title>
            <Paragraph 
                ellipsis={{ rows: 4, expandable: true, symbol: 'Leer Más' }}
            >
                {poema.resumen}
            </Paragraph>

            { admin == true ? 
                <Button type="primary" onClick={() => navigate(`editar/${poema.id}/`)}>Editar</Button>
            : 
                <Button type="default" onClick={() => navigate(`${poema.id}/`)} > Leer</Button>
            }
       </Card> 
    )
}

export default PoemaCard;