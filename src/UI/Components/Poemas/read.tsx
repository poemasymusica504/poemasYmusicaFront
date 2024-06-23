import { Button, Card, Typography } from "antd";
import bannerPoema from '@assets/bannerpoema.png';
import { poemaDTO } from "../../../infrastructure/repositories/poemas";
import useUserStore from "../../../infrastructure/context/User";
import { useNavigate } from "react-router-dom";

interface ReadProps {
    isLoading?: boolean
    data: poemaDTO
}

const Read: React.FC<ReadProps> = ({ data, isLoading }) => {
    
    const { Paragraph, Title } = Typography;

    const { admin } = useUserStore((state) => state);
    
    const navigate = useNavigate(); 
    
    return (
        <Card
            loading={isLoading}
            style={{ 
                backgroundImage: `url(${bannerPoema})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}  
        >
            <Title 
                style={{
                    fontFamily: 'Lobster',
                    textAlign: 'center',
                }}
            >
                {data.titulo}
            </Title>
            <Paragraph
                style={{ 
                    whiteSpace: 'pre-line', 
                    textAlign: 'justify',  
                    display: 'flex' , 
                    justifyContent: 'center', 
                    alignContent: 'center',
                    lineHeight: '1',
                    fontFamily: 'Indie Flower'
                }}
            >
                {data.poema}
            </Paragraph>
            <Paragraph
                style={{
                    fontFamily: 'Lobster',
                    textAlign: 'center',
                }}
            >
                {data.escritor} | {data.create_at}
            </Paragraph>
            <div style={{ display:'flex', justifyContent:'end', paddingTop: '5px'}}>
                <Button onClick={() => navigate(`/home/${data.tipo}/`)}>Salir</Button> 
                { admin && 
                   <Button onClick={() => navigate(`/home/${data.tipo}/editar/${data.id}/`)} type="primary">Editar</Button> 
                }
            </div>
        </Card>
    )
}

export default Read;