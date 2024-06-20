import { Card, Typography } from "antd";
import bannerPoema from '@assets/bannerpoema.png';
import { poemaDTO } from "../../../infrastructure/repositories/poemas";

interface ReadProps {
    isLoading?: boolean
    data: poemaDTO
}

const Read: React.FC<ReadProps> = ({ data, isLoading }) => {
    
    const { Paragraph, Title } = Typography;
    
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
        </Card>
    )
}

export default Read;